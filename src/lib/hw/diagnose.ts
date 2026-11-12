import {
  CHANNEL_A,
  CHANNEL_B,
  NOTEBOOKS,
  channelFilled,
  partById,
  type Part,
  type SlotId,
  type Snap,
} from "./parts";

export type BootKind = "os" | "no-disk" | "no-display" | "no-post" | "thermal" | "psu";

export type Issue = { level: "block" | "warn"; text: string };

export type LoadLine = { label: string; watts: number };

export type Diagnosis = {
  issues: Issue[];
  watts: number;
  loads: LoadLine[];
  psuWatts: number | null;
  ramGb: number;
  dualChannel: boolean;
  credits: number;
  boot: BootKind;
  post: string[];
  headline: string;
};

const STORAGE_SLOTS_DESKTOP: SlotId[] = ["m2-1", "m2-2", "sata-1"];
const STORAGE_SLOTS_NB: SlotId[] = ["nb-m2-1", "nb-m2-2"];

function push(issues: Issue[], level: Issue["level"], text: string) {
  issues.push({ level, text });
}

export function diagnose(snap: Snap): Diagnosis {
  if (snap.platform === "notebook") return diagnoseNotebook(snap);
  return diagnoseDesktop(snap);
}

function creditsOf(slots: Snap["slots"]): number {
  let n = 0;
  for (const id of Object.values(slots)) {
    const p = partById(id);
    if (p) n += p.credits;
  }
  return n;
}

function diagnoseDesktop(snap: Snap): Diagnosis {
  const { slots } = snap;
  const issues: Issue[] = [];
  const mobo = partById(slots.mobo);
  const cpu = partById(slots.cpu);
  const cooler = partById(slots.cooler);
  const gpu = partById(slots.gpu);
  const psu = partById(slots.psu);
  const kase = partById(slots.case);

  const rams = (["ram-a1", "ram-a2", "ram-b1", "ram-b2"] as SlotId[])
    .map((id) => partById(slots[id]))
    .filter((p): p is Part => Boolean(p));

  const stores = STORAGE_SLOTS_DESKTOP.map((id) => partById(slots[id])).filter((p): p is Part => Boolean(p));

  if (!mobo) push(issues, "block", "Falta la placa madre.");
  if (mobo && !cpu) push(issues, "block", "Falta el procesador.");
  if (mobo && cpu && cpu.socket !== mobo.socket) {
    push(issues, "block", `El CPU es ${cpu.socket} y la placa es ${mobo.socket}.`);
  }
  if (cpu && !cooler) push(issues, "block", "Falta el disipador. Sin él el equipo corta por temperatura.");
  if (cpu && cooler && cooler.coolerMaxW! < cpu.tdp!) {
    push(
      issues,
      "block",
      `El disipador llega a ${cooler.coolerMaxW} W y el procesador pide ${cpu.tdp} W.`,
    );
  }
  if (kase && cooler && cooler.coolerHeight! > kase.caseMaxCooler!) {
    push(issues, "block", "El disipador no entra en el gabinete.");
  }
  if (kase && mobo && !kase.caseForms!.includes(mobo.form!)) {
    push(issues, "block", "La placa madre no entra en el gabinete.");
  }
  if (mobo && rams.length === 0) push(issues, "block", "No hay memoria RAM. Sin ella no hay POST.");
  if (mobo && rams.some((r) => r.memory !== mobo.memory)) {
    push(issues, "block", "Hay RAM de una generación que la placa no admite.");
  }
  if (!kase) push(issues, "warn", "Está en banco abierto: no hace falta gabinete para el POST, pero una PC terminada lo lleva.");
  if (!psu) push(issues, "block", "Falta la fuente.");
  if (psu && mobo && !slots["cable-24"]) push(issues, "block", "Falta enchufar el cable de 24 pines a la placa.");
  if (psu && mobo && !slots["cable-eps"]) push(issues, "block", "Falta el cable EPS de 8 pines del procesador.");
  if (gpu?.pcie8pin && !slots["cable-pcie"]) {
    push(issues, "block", "La gráfica pide un cable PCIe de 8 pines y no está conectado.");
  }
  if (kase && gpu && gpu.gpuLength! > kase.caseMaxGpu!) {
    push(issues, "block", "La placa de video es más larga que el gabinete.");
  }
  if (cpu && !cpu.igpu && !gpu) {
    push(issues, "block", `${cpu.name} no tiene gráficos integrados. Sin placa de video no hay imagen.`);
  }

  const dual = channelFilled(slots, CHANNEL_A) && channelFilled(slots, CHANNEL_B);
  const ramGb = rams.reduce((n, r) => n + (r.capacityGb ?? 0), 0);
  if (rams.length === 1) {
    push(issues, "warn", "Hay un solo módulo: la memoria trabaja en single channel.");
  } else if (rams.length >= 2 && !dual) {
    push(issues, "warn", "Los módulos están en el mismo canal. Para dual channel usá A2 y B2.");
  }
  if (mobo?.dimmSlots === 4 && slots["ram-a1"] && !slots["ram-a2"] && rams.length === 1) {
    push(issues, "warn", "En una placa de cuatro zócalos, un solo módulo va en A2, no en A1.");
  }
  if (stores.length === 0 && mobo) push(issues, "block", "No hay disco de arranque.");
  if (stores.length > 0 && stores.every((s) => s.storageKind === "hdd")) {
    push(issues, "warn", "El sistema está en un disco mecánico. Arranca, pero mucho más lento que con un SSD.");
  }

  const loads: LoadLine[] = [];
  if (mobo) loads.push({ label: "Placa madre", watts: 35 });
  if (cpu) loads.push({ label: cpu.name, watts: cpu.tdp! });
  if (gpu) loads.push({ label: gpu.name, watts: gpu.watts! });
  if (rams.length) loads.push({ label: "Memoria", watts: rams.length * 5 });
  for (const s of stores) loads.push({ label: s.name, watts: s.watts! });
  if (cooler) loads.push({ label: "Disipador", watts: 6 });
  if (mobo) loads.push({ label: "Varios", watts: 12 });
  const watts = loads.reduce((n, l) => n + l.watts, 0);
  const psuWatts = psu?.psuWatts ?? null;
  if (psuWatts != null && watts > psuWatts) {
    push(issues, "block", `La carga estimada es ${watts} W y la fuente es de ${psuWatts} W. Se apaga por protección.`);
  } else if (psuWatts != null && watts > psuWatts * 0.85) {
    push(issues, "warn", `La fuente queda justa: ${watts} W sobre ${psuWatts} W. Conviene más margen.`);
  }

  const blocks = issues.filter((i) => i.level === "block");
  let boot: BootKind = "os";
  if (!mobo || !cpu || !cooler || rams.length === 0 || !psu || !slots["cable-24"] || !slots["cable-eps"] || (mobo && cpu && cpu.socket !== mobo.socket)) {
    boot = "no-post";
  } else if (cpu && cooler && cooler.coolerMaxW! < cpu.tdp!) {
    boot = "thermal";
  } else if (psuWatts != null && watts > psuWatts) {
    boot = "psu";
  } else if ((cpu && !cpu.igpu && !gpu) || (gpu?.pcie8pin && !slots["cable-pcie"])) {
    boot = "no-display";
  } else if (stores.length === 0) {
    boot = "no-disk";
  }

  if (blocks.some((b) => b.text.includes("gabinete") || b.text.includes("no entra"))) {
    if (boot === "os" || boot === "no-disk" || boot === "no-display") boot = "no-post";
  }

  const post = buildDesktopPost({
    boot,
    mobo,
    cpu,
    cooler,
    gpu,
    psuWatts,
    kase,
    slots,
    rams,
    ramGb,
    dual,
    stores,
    watts,
  });

  return {
    issues,
    watts,
    loads,
    psuWatts,
    ramGb,
    dualChannel: dual,
    credits: creditsOf(slots),
    boot,
    post,
    headline: headline(boot),
  };
}

function buildDesktopPost(x: {
  boot: BootKind;
  mobo?: Part;
  cpu?: Part;
  cooler?: Part;
  gpu?: Part;
  psuWatts: number | null;
  kase?: Part;
  slots: Snap["slots"];
  rams: Part[];
  ramGb: number;
  dual: boolean;
  stores: Part[];
  watts: number;
}): string[] {
  const lines = ["Banco de pruebas · POST didáctico", "Comprobando alimentación…"];
  if (!x.psuWatts || !x.slots["cable-24"]) {
    lines.push("Sin 24 pines la placa no recibe energía.");
    lines.push("POST detenido. No hay señal.");
    return lines;
  }
  if (!x.slots["cable-eps"]) {
    lines.push(`Fuente ${x.psuWatts} W · 24 pines OK`);
    lines.push("Falta el EPS de 8 pines. El procesador no tiene alimentación.");
    lines.push("POST detenido.");
    return lines;
  }
  lines.push(`Fuente ${x.psuWatts} W · 24 pines OK · EPS OK`);
  if (!x.mobo || !x.cpu) {
    lines.push("No se detecta procesador.");
    lines.push("POST detenido.");
    return lines;
  }
  if (x.cpu.socket !== x.mobo.socket) {
    lines.push("El procesador no asienta en el zócalo.");
    lines.push("POST detenido.");
    return lines;
  }
  lines.push(`CPU ${x.cpu.name} · ${x.cpu.socket} · ${x.cpu.tdp} W`);
  if (!x.cooler) {
    lines.push("No hay disipador. Protección térmica: apagado.");
    return lines;
  }
  if (x.cooler.coolerMaxW! < x.cpu.tdp!) {
    lines.push(`Disipador hasta ${x.cooler.coolerMaxW} W · el CPU pide ${x.cpu.tdp} W`);
    lines.push("Temperatura crítica. El equipo se apaga.");
    return lines;
  }
  lines.push(`Disipador ${x.cooler.name} · dentro del margen`);
  if (x.rams.length === 0) {
    lines.push("No se detecta memoria.");
    lines.push("POST detenido.");
    return lines;
  }
  const gen = x.rams[0]?.memory;
  lines.push(
    `Memoria ${gen} · ${x.ramGb} GB · ${x.dual ? "dual channel" : x.rams.length > 1 ? "un solo canal" : "single channel"}`,
  );
  if (x.psuWatts != null && x.watts > x.psuWatts) {
    lines.push(`Carga estimada ${x.watts} W · fuente ${x.psuWatts} W`);
    lines.push("Protección de la fuente. El equipo se apaga bajo carga.");
    return lines;
  }
  if (x.gpu) {
    if (x.gpu.pcie8pin && !x.slots["cable-pcie"]) {
      lines.push(`${x.gpu.name} detectada, sin cable PCIe.`);
      lines.push("Ventiladores giran. El monitor sigue negro.");
      return lines;
    }
    lines.push(`Video · ${x.gpu.name}`);
  } else if (x.cpu.igpu) {
    lines.push("Video · gráficos integrados del procesador");
  } else {
    lines.push("No hay adaptador de video.");
    lines.push("Ventiladores giran. El monitor sigue negro.");
    return lines;
  }
  if (x.stores.length === 0) {
    lines.push("POST correcto.");
    lines.push("No hay dispositivo de arranque.");
    return lines;
  }
  lines.push(`Disco · ${x.stores.map((s) => s.name).join(" + ")}`);
  if (x.stores.every((s) => s.storageKind === "hdd")) {
    lines.push("Es un disco mecánico. El arranque va a tardar.");
  }
  if (x.kase) lines.push(`Gabinete · ${x.kase.name}`);
  lines.push(`Carga estimada ${x.watts} W · margen OK`);
  lines.push("POST correcto. Entrando al sistema.");
  return lines;
}

function diagnoseNotebook(snap: Snap): Diagnosis {
  const nb = NOTEBOOKS[snap.model];
  const { slots } = snap;
  const issues: Issue[] = [];
  const sodimm = partById(slots.sodimm);
  const stores = STORAGE_SLOTS_NB.map((id) => partById(slots[id])).filter((p): p is Part => Boolean(p));
  let ramGb = nb.ramSolderedGb;
  let dual = false;
  if (sodimm) {
    if (sodimm.memory !== nb.memory) {
      push(issues, "block", `El SODIMM es ${sodimm.memory} y esta notebook es ${nb.memory}. No pasa el entrenamiento de memoria.`);
    } else {
      ramGb += sodimm.capacityGb ?? 0;
      dual = true;
      if (sodimm.capacityGb !== nb.ramSolderedGb) {
        push(
          issues,
          "warn",
          `La RAM soldada es de ${nb.ramSolderedGb} GB y el módulo de ${sodimm.capacityGb} GB. Dual channel en flex mode: solo una parte queda en doble canal.`,
        );
      }
    }
  } else {
    push(issues, "warn", `Solo están los ${nb.ramSolderedGb} GB soldados, en un canal. Hay un banco SODIMM libre.`);
  }
  if (stores.length === 0) push(issues, "block", "No hay SSD. Esta notebook no tiene disco soldado de fábrica.");

  const loads: LoadLine[] = [
    { label: "Plataforma notebook", watts: nb.id === "probook" ? 55 : 28 },
    { label: "Memoria", watts: 4 },
  ];
  for (const s of stores) loads.push({ label: s.name, watts: s.watts ?? 6 });
  const watts = loads.reduce((n, l) => n + l.watts, 0);

  const badRam = Boolean(sodimm && sodimm.memory !== nb.memory);
  const boot: BootKind = badRam ? "no-post" : stores.length === 0 ? "no-disk" : "os";

  const post = [
    `${nb.name} · POST didáctico`,
    nb.cpu,
    `RAM soldada ${nb.ramSolderedGb} GB ${nb.memory}`,
  ];
  if (badRam) {
    post.push(`SODIMM ${sodimm?.memory} incompatible.`);
    post.push("Fallo de memoria. POST detenido.");
  } else if (sodimm) {
    post.push(`SODIMM ${sodimm.capacityGb} GB · total ${ramGb} GB · ${dual ? "dual channel" : "single channel"}`);
  } else {
    post.push(`Sin SODIMM extra · ${ramGb} GB en un canal`);
  }
  post.push(nb.gpu);
  if (!badRam) {
    if (stores.length === 0) {
      post.push("POST de hardware correcto.");
      post.push("No hay dispositivo de arranque.");
    } else {
      post.push(`Disco · ${stores.map((s) => s.name).join(" + ")}`);
      post.push("POST correcto. Entrando al sistema.");
    }
  }

  return {
    issues,
    watts,
    loads,
    psuWatts: null,
    ramGb,
    dualChannel: dual && !badRam,
    credits: creditsOf(slots),
    boot,
    post,
    headline: headline(boot),
  };
}

function headline(boot: BootKind): string {
  switch (boot) {
    case "os":
      return "Llegaría al escritorio";
    case "no-disk":
      return "Hace POST, pero no arranca el sistema";
    case "no-display":
      return "Enciende, sin imagen";
    case "thermal":
      return "Se apaga por temperatura";
    case "psu":
      return "La fuente no aguanta";
    default:
      return "No hace POST";
  }
}

export function hasSsd(slots: Snap["slots"]): boolean {
  const ids = [...STORAGE_SLOTS_DESKTOP, ...STORAGE_SLOTS_NB];
  return ids.some((id) => {
    const p = partById(slots[id]);
    return Boolean(p && p.storageKind !== "hdd");
  });
}
