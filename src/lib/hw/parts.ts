export type Platform = "desktop" | "notebook";
export type ModelId = "aulabook" | "probook";
export type Socket = "AM5" | "AM4" | "LGA1700";
export type MemoryGen = "DDR4" | "DDR5";
export type BoardForm = "ATX" | "mATX";
export type Category =
  | "case"
  | "psu"
  | "mobo"
  | "cpu"
  | "cooler"
  | "ram"
  | "gpu"
  | "storage"
  | "cable";

export type SlotId =
  | "case"
  | "psu"
  | "mobo"
  | "cpu"
  | "cooler"
  | "ram-a1"
  | "ram-a2"
  | "ram-b1"
  | "ram-b2"
  | "gpu"
  | "m2-1"
  | "m2-2"
  | "sata-1"
  | "cable-24"
  | "cable-eps"
  | "cable-pcie"
  | "sodimm"
  | "nb-m2-1"
  | "nb-m2-2";

export type Slots = Partial<Record<SlotId, string>>;

export type Part = {
  id: string;
  name: string;
  short: string;
  category: Category;
  platform: Platform | "both";
  credits: number;
  lesson: string;
  socket?: Socket;
  memory?: MemoryGen;
  form?: BoardForm;
  caseForms?: BoardForm[];
  dimmSlots?: 2 | 4;
  m2Slots?: 1 | 2;
  tdp?: number;
  coolerMaxW?: number;
  coolerHeight?: number;
  caseMaxCooler?: number;
  caseMaxGpu?: number;
  igpu?: boolean;
  capacityGb?: number;
  watts?: number;
  psuWatts?: number;
  pcie8pin?: boolean;
  gpuLength?: number;
  storageKind?: "nvme" | "sata" | "hdd";
  stick?: "dimm" | "sodimm";
};

export type NotebookModel = {
  id: ModelId;
  name: string;
  cpu: string;
  ramSolderedGb: number;
  memory: MemoryGen;
  gpu: string;
  m2Slots: 1 | 2;
  lesson: string;
};

export const NOTEBOOKS: Record<ModelId, NotebookModel> = {
  aulabook: {
    id: "aulabook",
    name: "AulaBook 14",
    cpu: "Procesador U · 15 W · gráficos integrados, soldado",
    ramSolderedGb: 8,
    memory: "DDR4",
    gpu: "Gráficos integrados (no se cambian)",
    m2Slots: 1,
    lesson:
      "Notebook de aula. El procesador va soldado: no se actualiza. Podés sumar un SODIMM DDR4 y un SSD M.2.",
  },
  probook: {
    id: "probook",
    name: "ProBook 16",
    cpu: "Procesador HS · 35 W · gráficos integrados, soldado",
    ramSolderedGb: 8,
    memory: "DDR5",
    gpu: "Gráfica dedicada de entrada, soldada",
    m2Slots: 2,
    lesson:
      "Trae 8 GB DDR5 soldados y dos bahías M.2. Una ya tiene un SSD de 500 GB. La gráfica no se cambia.",
  },
};

const list: Part[] = [
  {
    id: "case-atx",
    name: "Torre gamer ATX",
    short: "Vidrio al costado · ATX y mATX · cooler 168 mm · GPU 340 mm",
    category: "case",
    platform: "desktop",
    credits: 75,
    caseForms: ["ATX", "mATX"],
    caseMaxCooler: 168,
    caseMaxGpu: 340,
    lesson: "Gabinete de equipo gamer. Entra una placa ATX y una gráfica larga. El panel lateral se deja afuera para ver el armado.",
  },
  {
    id: "case-matx",
    name: "Torre oficina compacta",
    short: "Solo mATX · cooler 145 mm · GPU 260 mm",
    category: "case",
    platform: "desktop",
    credits: 55,
    caseForms: ["mATX"],
    caseMaxCooler: 145,
    caseMaxGpu: 260,
    lesson: "Más chica y barata. Una placa ATX no entra, y un disipador de torre alta tampoco.",
  },
  {
    id: "psu-350",
    name: "Fuente genérica 350 W",
    short: "Sin certificación · alcanza para oficina muy básica",
    category: "psu",
    platform: "desktop",
    credits: 30,
    psuWatts: 350,
    lesson: "La fuente barata del aula. Con una gráfica media o un procesador exigente se protege y apaga el equipo.",
  },
  {
    id: "psu-450",
    name: "Fuente común 450 W",
    short: "80 Plus · oficina y gráficas chicas",
    category: "psu",
    platform: "desktop",
    credits: 45,
    psuWatts: 450,
    lesson: "Incluye cables de 24 pines, EPS de 8 pines y PCIe. 450 W no alcanzan si la suma de consumos la supera.",
  },
  {
    id: "psu-650",
    name: "Fuente estándar 650 W",
    short: "80 Plus Bronze · margen para una gráfica media",
    category: "psu",
    platform: "desktop",
    credits: 75,
    psuWatts: 650,
    lesson: "La opción sensata cuando hay placa de video dedicada. Los cables no se enchufan solos: hay que conectarlos.",
  },
  {
    id: "psu-850",
    name: "Fuente gamer 850 W",
    short: "80 Plus Gold · sobra para una gráfica alta",
    category: "psu",
    platform: "desktop",
    credits: 110,
    psuWatts: 850,
    lesson: "La fuente de un equipo gamer. Aguanta la gráfica alta con margen. En una PC de oficina gasta créditos de más.",
  },
  {
    id: "mb-b650m",
    name: "Placa gamer B650M",
    short: "mATX · AM5 · DDR5 · 2 DIMM · 1 M.2",
    category: "mobo",
    platform: "desktop",
    credits: 150,
    socket: "AM5",
    memory: "DDR5",
    form: "mATX",
    dimmSlots: 2,
    m2Slots: 1,
    lesson: "Para Ryzen 7000. Solo DDR5: un módulo DDR4 no entra, la muesca es otra. Con dos zócalos, usá los dos para dual channel.",
  },
  {
    id: "mb-b550",
    name: "Placa clásica B550",
    short: "ATX · AM4 · DDR4 · 4 DIMM · 2 M.2",
    category: "mobo",
    platform: "desktop",
    credits: 130,
    socket: "AM4",
    memory: "DDR4",
    form: "ATX",
    dimmSlots: 4,
    m2Slots: 2,
    lesson: "Para Ryzen 5000. Cuatro zócalos: un solo módulo va en A2. Dos módulos van en A2 y B2, nunca en el mismo canal.",
  },
  {
    id: "mb-b760m",
    name: "Placa Intel B760M",
    short: "mATX · LGA1700 · DDR5 · 2 DIMM · 1 M.2",
    category: "mobo",
    platform: "desktop",
    credits: 140,
    socket: "LGA1700",
    memory: "DDR5",
    form: "mATX",
    dimmSlots: 2,
    m2Slots: 1,
    lesson: "Para Intel de 12ª a 14ª en LGA1700, versión DDR5. No acepta un procesador AM4 ni AM5.",
  },
  {
    id: "mb-h610m",
    name: "Placa oficina H610M",
    short: "mATX · LGA1700 · DDR4 · 2 DIMM · 1 M.2",
    category: "mobo",
    platform: "desktop",
    credits: 85,
    socket: "LGA1700",
    memory: "DDR4",
    form: "mATX",
    dimmSlots: 2,
    m2Slots: 1,
    lesson: "La placa económica de oficina. Mismo zócalo LGA1700 que la B760, pero memoria DDR4. No mezcles generaciones.",
  },
  {
    id: "cpu-7600",
    name: "Ryzen 5 7600",
    short: "AM5 · 6 núcleos · 65 W · con gráficos",
    category: "cpu",
    platform: "desktop",
    credits: 230,
    socket: "AM5",
    tdp: 65,
    igpu: true,
    lesson: "Lleva gráficos integrados: hay imagen sin placa de video. El triángulo del CPU se alinea con el del zócalo. Si no cae solo, no se empuja.",
  },
  {
    id: "cpu-5800x",
    name: "Ryzen 7 5800X",
    short: "AM4 · 8 núcleos · 105 W · sin gráficos",
    category: "cpu",
    platform: "desktop",
    credits: 190,
    socket: "AM4",
    tdp: 105,
    igpu: false,
    lesson: "No tiene gráficos integrados. Sin una placa de video el monitor queda negro aunque el resto encienda. El 5600G, en el mismo zócalo AM4, sí da imagen.",
  },
  {
    id: "cpu-5600g",
    name: "Ryzen 5 5600G",
    short: "AM4 · 6 núcleos · 65 W · con gráficos",
    category: "cpu",
    platform: "desktop",
    credits: 160,
    socket: "AM4",
    tdp: 65,
    igpu: true,
    lesson: "Mismo zócalo AM4 que el 5800X, pero este sí trae gráficos. Alcanza para oficina sin placa de video. El cooler de caja le sobra.",
  },
  {
    id: "cpu-14400",
    name: "Core i5-14400",
    short: "LGA1700 · 10 núcleos · 148 W turbo · con gráficos",
    category: "cpu",
    platform: "desktop",
    credits: 200,
    socket: "LGA1700",
    tdp: 148,
    igpu: true,
    lesson: "La ficha base es baja, pero en turbo este modelo pide unos 148 W. El cooler de stock no alcanza: el equipo se apaga por temperatura.",
  },
  {
    id: "cpu-12100",
    name: "Core i3-12100",
    short: "LGA1700 · 4 núcleos · 60 W · con gráficos",
    category: "cpu",
    platform: "desktop",
    credits: 110,
    socket: "LGA1700",
    tdp: 60,
    igpu: true,
    lesson: "Procesador de oficina. Gráficos integrados y poco calor: el disipador incluido alcanza. Mismo zócalo que el i5-14400.",
  },
  {
    id: "cool-stock",
    name: "Cooler de caja",
    short: "Hasta 95 W · 58 mm de alto",
    category: "cooler",
    platform: "desktop",
    credits: 20,
    coolerMaxW: 95,
    coolerHeight: 58,
    lesson: "Viene con varios procesadores de bajo consumo. No alcanza para un 5800X (105 W) ni para un 14400 (148 W).",
  },
  {
    id: "cool-low",
    name: "Cooler bajo de oficina",
    short: "Hasta 130 W · 68 mm · entra en torres chicas",
    category: "cooler",
    platform: "desktop",
    credits: 40,
    coolerMaxW: 130,
    coolerHeight: 68,
    lesson: "Perfil bajo para gabinetes compactos. Cubre al 5800X. Se queda corto con el turbo del 14400.",
  },
  {
    id: "cool-tower",
    name: "Cooler torre gamer",
    short: "Hasta 190 W · 158 mm · no entra en la torre de oficina",
    category: "cooler",
    platform: "desktop",
    credits: 55,
    coolerMaxW: 190,
    coolerHeight: 158,
    lesson: "El más capaz de aire del banco. Mide 158 mm: la torre de oficina solo admite 145 mm. En la torre gamer entra bien.",
  },
  {
    id: "cool-aio",
    name: "Líquida 240",
    short: "Hasta 220 W · 52 mm · entra en torres chicas",
    category: "cooler",
    platform: "desktop",
    credits: 95,
    coolerMaxW: 220,
    coolerHeight: 52,
    lesson: "Refrigeración líquida. El bloque es bajo, así que entra donde la torre de aire no. Cubre al i5-14400. Sale más cara.",
  },
  {
    id: "ram-d4-4",
    name: "DIMM DDR4 4 GB",
    short: "2666 MT/s · módulo chico de oficina",
    category: "ram",
    platform: "desktop",
    credits: 12,
    memory: "DDR4",
    capacityGb: 4,
    stick: "dimm",
    lesson: "El módulo viejo de las PCs del aula. Con uno solo el equipo enciende, pero 4 GB se quedan cortos y trabajan en un canal.",
  },
  {
    id: "ram-d4-8",
    name: "DIMM DDR4 8 GB",
    short: "3200 MT/s · un módulo · escritorio",
    category: "ram",
    platform: "desktop",
    credits: 25,
    memory: "DDR4",
    capacityGb: 8,
    stick: "dimm",
    lesson: "Un módulo solo trabaja en single channel. Para dual channel hace falta otro módulo en el otro canal (A2 y B2).",
  },
  {
    id: "ram-d4-16",
    name: "DIMM DDR4 16 GB",
    short: "3200 MT/s · un módulo",
    category: "ram",
    platform: "desktop",
    credits: 48,
    memory: "DDR4",
    capacityGb: 16,
    stick: "dimm",
    lesson: "16 GB en un solo stick alcanzan para oficina, pero siguen siendo un canal. Dos sticks de 8 GB rinden mejor en dual channel.",
  },
  {
    id: "ram-d5-16",
    name: "DIMM DDR5 gamer 16 GB",
    short: "5600 MT/s · un módulo",
    category: "ram",
    platform: "desktop",
    credits: 55,
    memory: "DDR5",
    capacityGb: 16,
    stick: "dimm",
    lesson: "Solo entra en placas DDR5 (B650 o B760 de este banco). No es compatible con B550 ni H610.",
  },
  {
    id: "ram-d5-32",
    name: "DIMM DDR5 gamer 32 GB",
    short: "6000 MT/s · un módulo",
    category: "ram",
    platform: "desktop",
    credits: 95,
    memory: "DDR5",
    capacityGb: 32,
    stick: "dimm",
    lesson: "Mucho margen para edición. Dos de estos son 64 GB y dual channel, si la placa tiene dos zócalos libres.",
  },
  {
    id: "sodimm-d4-8",
    name: "SODIMM DDR4 8 GB",
    short: "Módulo corto de notebook · 3200",
    category: "ram",
    platform: "notebook",
    credits: 28,
    memory: "DDR4",
    capacityGb: 8,
    stick: "sodimm",
    lesson: "El formato de las notebooks no entra en un escritorio. En el AulaBook suma al canal que ya está soldado.",
  },
  {
    id: "sodimm-d4-16",
    name: "SODIMM DDR4 16 GB",
    short: "Módulo corto · 3200",
    category: "ram",
    platform: "notebook",
    credits: 52,
    memory: "DDR4",
    capacityGb: 16,
    stick: "sodimm",
    lesson: "Lleva el AulaBook a 24 GB (8 soldados + 16). Si las capacidades no coinciden, parte queda en flex mode.",
  },
  {
    id: "sodimm-d5-8",
    name: "SODIMM DDR5 8 GB",
    short: "Para la ProBook · 5600",
    category: "ram",
    platform: "notebook",
    credits: 40,
    memory: "DDR5",
    capacityGb: 8,
    stick: "sodimm",
    lesson: "Iguala los 8 GB soldados de la ProBook y habilita dual channel parejo.",
  },
  {
    id: "sodimm-d5-16",
    name: "SODIMM DDR5 16 GB",
    short: "Para la ProBook · 5600",
    category: "ram",
    platform: "notebook",
    credits: 70,
    memory: "DDR5",
    capacityGb: 16,
    stick: "sodimm",
    lesson: "Más capacidad, pero no coincide con los 8 GB soldados: el equipo usa flex mode.",
  },
  {
    id: "gpu-entrada",
    name: "Gráfica básica",
    short: "Oficina · 4 GB · 75 W · sin conector extra · 19 cm",
    category: "gpu",
    platform: "desktop",
    credits: 90,
    watts: 75,
    pcie8pin: false,
    gpuLength: 190,
    lesson: "Se alimenta solo del zócalo PCIe. Sirve para dar imagen a un CPU sin gráficos y para juegos poco exigentes.",
  },
  {
    id: "gpu-media",
    name: "Gráfica gamer media",
    short: "8 GB · 150 W · cable de 8 pines · 24 cm",
    category: "gpu",
    platform: "desktop",
    credits: 280,
    watts: 150,
    pcie8pin: true,
    gpuLength: 240,
    lesson: "Pide un cable PCIe de la fuente. Sin ese cable no hay imagen, aunque el resto encienda.",
  },
  {
    id: "gpu-alta",
    name: "Gráfica gamer alta",
    short: "16 GB · 320 W · cable de 8 pines · 32 cm",
    category: "gpu",
    platform: "desktop",
    credits: 520,
    watts: 320,
    pcie8pin: true,
    gpuLength: 320,
    lesson: "No entra en la torre de oficina (máximo 26 cm) y una fuente común de 450 W no la aguanta. Hay que mirar largo y vatios, no solo el zócalo.",
  },
  {
    id: "ssd-nvme-500",
    name: "SSD NVMe oficina 500 GB",
    short: "M.2 · disco de arranque",
    category: "storage",
    platform: "both",
    credits: 50,
    capacityGb: 500,
    storageKind: "nvme",
    watts: 7,
    lesson: "Va acostado en el zócalo M.2, atornillado. Si la placa de video tapa ese zócalo, se instala el SSD antes.",
  },
  {
    id: "ssd-nvme-1000",
    name: "SSD NVMe gamer 1 TB",
    short: "M.2 · disco de arranque",
    category: "storage",
    platform: "both",
    credits: 80,
    capacityGb: 1000,
    storageKind: "nvme",
    watts: 7,
    lesson: "El mismo zócalo M.2 que el de oficina, con más lugar para juegos y proyectos.",
  },
  {
    id: "ssd-nvme-2000",
    name: "SSD NVMe gamer 2 TB",
    short: "M.2 · mucho lugar · también entra en la notebook",
    category: "storage",
    platform: "both",
    credits: 140,
    capacityGb: 2000,
    storageKind: "nvme",
    watts: 8,
    lesson: "Misma instalación que los otros NVMe. En la notebook ocupa una bahía M.2. No es un disco mecánico: el sistema arranca rápido.",
  },
  {
    id: "ssd-sata-1000",
    name: "SSD SATA 2,5\" 1 TB",
    short: "2,5 pulgadas · cable de datos, no M.2",
    category: "storage",
    platform: "desktop",
    credits: 60,
    capacityGb: 1000,
    storageKind: "sata",
    watts: 5,
    lesson: "No entra en el zócalo M.2. Usa el puerto SATA de la placa. También puede ser disco de arranque.",
  },
  {
    id: "hdd-2000",
    name: "HDD archivos 2 TB",
    short: "HDD · SATA · mucho lugar, arranque lento",
    category: "storage",
    platform: "desktop",
    credits: 40,
    capacityGb: 2000,
    storageKind: "hdd",
    watts: 9,
    lesson: "Guarda archivos grandes a bajo costo. Si el sistema está solo acá, el escritorio aparece, pero el arranque es lento.",
  },
  {
    id: "hdd-1000",
    name: "HDD viejo 1 TB",
    short: "Mecánico · SATA · el disco que ya estaba en el aula",
    category: "storage",
    platform: "desktop",
    credits: 22,
    capacityGb: 1000,
    storageKind: "hdd",
    watts: 8,
    lesson: "Sirve de disco de arranque, pero se escucha y tarda. Para la práctica de oficina conviene un SSD.",
  },
  {
    id: "cable-24",
    name: "Cable 24 pines",
    short: "Alimenta la placa madre",
    category: "cable",
    platform: "desktop",
    credits: 0,
    lesson: "Sale de la fuente. Sin este conector la placa no tiene energía y no hay POST.",
  },
  {
    id: "cable-eps",
    name: "Cable EPS 8 pines",
    short: "Alimenta el procesador",
    category: "cable",
    platform: "desktop",
    credits: 0,
    lesson: "No es el de 24 pines. Va arriba de la placa, junto al zócalo del CPU. Si falta, el procesador no arranca.",
  },
  {
    id: "cable-pcie",
    name: "Cable PCIe 8 pines",
    short: "Alimenta la placa de video",
    category: "cable",
    platform: "desktop",
    credits: 0,
    lesson: "Solo hace falta si la gráfica lo pide. La básica (75 W) no lo usa. Sin este cable, una gráfica media o alta no da imagen.",
  },
];

export const PARTS: Record<string, Part> = Object.fromEntries(list.map((p) => [p.id, p]));

export const RAM_SLOTS: SlotId[] = ["ram-a1", "ram-a2", "ram-b1", "ram-b2"];

export function partById(id: string | undefined | null): Part | undefined {
  if (!id) return undefined;
  return PARTS[id];
}

export function ramSlotsFor(mobo: Part | undefined): SlotId[] {
  if (!mobo) return [];
  return mobo.dimmSlots === 4 ? ["ram-a1", "ram-a2", "ram-b1", "ram-b2"] : ["ram-a2", "ram-b2"];
}

export function nextBuildStep(snap: Snap): { slot: SlotId | null; label: string } {
  const slots = snap.slots;
  if (snap.platform === "notebook") {
    if (!slots.sodimm) return { slot: "sodimm", label: "Memoria SODIMM" };
    if (!slots["nb-m2-1"] && !slots["nb-m2-2"]) return { slot: "nb-m2-1", label: "Disco M.2" };
    return { slot: null, label: "Encendé para probar" };
  }
  if (!slots.psu) return { slot: "psu", label: "Fuente" };
  if (!slots.mobo) return { slot: "mobo", label: "Placa madre" };
  if (!slots.cpu) return { slot: "cpu", label: "Procesador" };
  if (!slots.cooler) return { slot: "cooler", label: "Disipador" };
  const ram = ramSlotsFor(partById(slots.mobo)).find((id) => !slots[id]);
  const anyRam = ramSlotsFor(partById(slots.mobo)).some((id) => slots[id]);
  if (!anyRam && ram) return { slot: ram, label: "Memoria" };
  if (!slots["m2-1"] && !slots["m2-2"] && !slots["sata-1"]) return { slot: "m2-1", label: "Disco" };
  if (!slots["cable-24"]) return { slot: "cable-24", label: "Cable de 24 pines" };
  if (!slots["cable-eps"]) return { slot: "cable-eps", label: "Cable EPS" };
  const gpu = partById(slots.gpu);
  if (gpu?.pcie8pin && !slots["cable-pcie"]) return { slot: "cable-pcie", label: "Cable PCIe" };
  return { slot: null, label: "Encendé para probar" };
}

export function m2SlotsFor(mobo: Part | undefined): SlotId[] {
  if (!mobo) return [];
  return mobo.m2Slots === 2 ? ["m2-1", "m2-2"] : ["m2-1"];
}

export const SLOT_LABEL: Record<SlotId, string> = {
  case: "Gabinete",
  psu: "Fuente",
  mobo: "Placa madre",
  cpu: "CPU",
  cooler: "Disipador",
  "ram-a1": "RAM A1",
  "ram-a2": "RAM A2",
  "ram-b1": "RAM B1",
  "ram-b2": "RAM B2",
  gpu: "PCIe x16",
  "m2-1": "M.2",
  "m2-2": "M.2 secundario",
  "sata-1": "SATA",
  "cable-24": "Conector 24 pines",
  "cable-eps": "Conector EPS",
  "cable-pcie": "Conector PCIe",
  sodimm: "SODIMM",
  "nb-m2-1": "M.2",
  "nb-m2-2": "M.2 secundario",
};

export type Snap = {
  platform: Platform;
  model: ModelId;
  slots: Slots;
};

const CHANNEL_A: SlotId[] = ["ram-a1", "ram-a2"];
const CHANNEL_B: SlotId[] = ["ram-b1", "ram-b2"];

export function channelFilled(slots: Slots, ids: SlotId[]): boolean {
  return ids.some((id) => Boolean(slots[id]));
}

export type PlaceCheck = { ok: boolean; reason: string };

function no(reason: string): PlaceCheck {
  return { ok: false, reason };
}

export function canPlace(partId: string, slot: SlotId, snap: Snap): PlaceCheck {
  const part = PARTS[partId];
  if (!part) return no("Esa pieza no está en el banco.");
  const { slots, platform, model } = snap;

  if (platform === "notebook") {
    const nb = NOTEBOOKS[model];
    if (slot === "sodimm") {
      if (part.stick !== "sodimm") return no("En la notebook entra un SODIMM, no un DIMM de escritorio.");
      if (part.memory !== nb.memory) {
        return no(`Esta ${nb.name} usa ${nb.memory}. Un módulo ${part.memory} no entra: la muesca no coincide.`);
      }
      return { ok: true, reason: "" };
    }
    if (slot === "nb-m2-1" || slot === "nb-m2-2") {
      if (part.storageKind !== "nvme") return no("Esa bahía es M.2. El disco SATA o el HDD no entran ahí.");
      if (slot === "nb-m2-2" && nb.m2Slots < 2) return no("Este modelo tiene una sola bahía M.2.");
      return { ok: true, reason: "" };
    }
    return no("Esa pieza es de escritorio. Acá solo se amplían memoria y SSD.");
  }

  const mobo = partById(slots.mobo);
  const kase = partById(slots.case);
  const gpu = partById(slots.gpu);

  switch (slot) {
    case "case": {
      if (part.category !== "case") return no("Ese zócalo es del gabinete.");
      if (mobo && part.caseForms && !part.caseForms.includes(mobo.form!)) {
        return no(`La placa es ${mobo.form} y este gabinete no la acepta.`);
      }
      if (gpu && part.caseMaxGpu && gpu.gpuLength! > part.caseMaxGpu) {
        return no("La gráfica que ya está puesta es más larga que este gabinete.");
      }
      const cooler = partById(slots.cooler);
      if (cooler && part.caseMaxCooler && cooler.coolerHeight! > part.caseMaxCooler) {
        return no("El disipador es más alto que este gabinete. Sacalo o elegí otra torre.");
      }
      return { ok: true, reason: "" };
    }
    case "psu":
      if (part.category !== "psu") return no("Ahí va la fuente.");
      return { ok: true, reason: "" };
    case "mobo":
      if (part.category !== "mobo") return no("Ahí va la placa madre.");
      if (kase && !kase.caseForms!.includes(part.form!)) {
        return no(`Esa placa es ${part.form} y el gabinete no la admite. Sacá el gabinete o cambialo.`);
      }
      return { ok: true, reason: "" };
    case "cpu":
      if (part.category !== "cpu") return no("Ahí va el procesador.");
      if (!mobo) return no("Primero colocá la placa madre.");
      if (part.socket !== mobo.socket) {
        return no(`Ese CPU es ${part.socket} y la placa es ${mobo.socket}. No entra, y no se fuerza.`);
      }
      return { ok: true, reason: "" };
    case "cooler":
      if (part.category !== "cooler") return no("Ahí va el disipador.");
      if (!slots.cpu) return no("Primero el procesador, después el disipador.");
      if (kase && part.coolerHeight! > kase.caseMaxCooler!) {
        return no(`Mide ${part.coolerHeight} mm y el gabinete admite ${kase.caseMaxCooler} mm.`);
      }
      return { ok: true, reason: "" };
    case "ram-a1":
    case "ram-a2":
    case "ram-b1":
    case "ram-b2": {
      if (part.stick !== "dimm") return no("Eso es memoria de notebook (SODIMM). En el escritorio va un DIMM.");
      if (!mobo) return no("Sin placa madre no hay zócalos de memoria.");
      if (!ramSlotsFor(mobo).includes(slot)) return no("Esta placa no tiene ese zócalo.");
      if (part.memory !== mobo.memory) {
        return no(`La placa es ${mobo.memory} y el módulo es ${part.memory}. La muesca no coincide.`);
      }
      return { ok: true, reason: "" };
    }
    case "gpu":
      if (part.category !== "gpu") return no("Ahí va la placa de video, en el PCIe x16.");
      if (!mobo) return no("Primero la placa madre.");
      if (kase && part.gpuLength! > kase.caseMaxGpu!) {
        return no(`Mide ${part.gpuLength! / 10} cm y el gabinete admite ${kase.caseMaxGpu! / 10} cm.`);
      }
      return { ok: true, reason: "" };
    case "m2-1":
    case "m2-2":
      if (part.storageKind !== "nvme") return no("En M.2 va un SSD NVMe. El SATA y el HDD usan el puerto SATA.");
      if (!mobo) return no("Primero la placa madre.");
      if (!m2SlotsFor(mobo).includes(slot)) return no("Esta placa no tiene esa bahía M.2.");
      return { ok: true, reason: "" };
    case "sata-1":
      if (part.storageKind !== "sata" && part.storageKind !== "hdd") {
        return no("Ese puerto es SATA. El NVMe va en M.2.");
      }
      if (!mobo) return no("Primero la placa madre.");
      return { ok: true, reason: "" };
    case "cable-24":
      if (part.id !== "cable-24") return no("Ahí va el conector de 24 pines.");
      if (!slots.psu) return no("Primero instalá la fuente: los cables salen de ahí.");
      if (!mobo) return no("No hay placa donde enchufarlo.");
      return { ok: true, reason: "" };
    case "cable-eps":
      if (part.id !== "cable-eps") return no("Ahí va el EPS de 8 pines, el que alimenta el CPU.");
      if (!slots.psu) return no("Primero instalá la fuente.");
      if (!mobo) return no("No hay placa donde enchufarlo.");
      return { ok: true, reason: "" };
    case "cable-pcie":
      if (part.id !== "cable-pcie") return no("Ahí va el cable PCIe de la gráfica.");
      if (!gpu) return no("Primero colocá la placa de video.");
      if (!gpu.pcie8pin) return no("Esta gráfica no pide cable extra: se alimenta del zócalo.");
      if (!slots.psu) return no("Primero instalá la fuente.");
      return { ok: true, reason: "" };
    default:
      return no("Ese lugar no se usa en el escritorio.");
  }
}

export function activeDesktopSlots(slots: Slots): SlotId[] {
  const mobo = partById(slots.mobo);
  const gpu = partById(slots.gpu);
  const out: SlotId[] = ["case", "psu", "mobo"];
  if (!mobo) return out;
  out.push("cpu", "cooler", "gpu", "sata-1", "cable-24", "cable-eps");
  out.push(...ramSlotsFor(mobo));
  out.push(...m2SlotsFor(mobo));
  if (gpu?.pcie8pin) out.push("cable-pcie");
  return out;
}

export function activeNotebookSlots(model: ModelId): SlotId[] {
  const nb = NOTEBOOKS[model];
  const out: SlotId[] = ["sodimm", "nb-m2-1"];
  if (nb.m2Slots === 2) out.push("nb-m2-2");
  return out;
}

export function preferredSlots(partId: string, snap: Snap): SlotId[] {
  const active = snap.platform === "notebook" ? activeNotebookSlots(snap.model) : activeDesktopSlots(snap.slots);
  const order: SlotId[] = [
    "ram-a2",
    "ram-b2",
    "ram-a1",
    "ram-b1",
    "m2-1",
    "m2-2",
    "nb-m2-1",
    "nb-m2-2",
    "sata-1",
    "cpu",
    "cooler",
    "gpu",
    "mobo",
    "psu",
    "case",
    "cable-24",
    "cable-eps",
    "cable-pcie",
    "sodimm",
  ];
  return active
    .filter((slot) => canPlace(partId, slot, snap).ok)
    .sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export function tidyAfterPlace(slots: Slots, slot: SlotId): { slots: Slots; note?: string } {
  const next: Slots = { ...slots };
  let note: string | undefined;
  if (slot === "mobo") {
    const mobo = partById(next.mobo);
    if (mobo) {
      const cpu = partById(next.cpu);
      if (cpu && cpu.socket !== mobo.socket) {
        delete next.cpu;
        delete next.cooler;
        note = "El procesador no servía para esta placa. Lo saqué, junto con el disipador.";
      }
      const allowed = new Set(ramSlotsFor(mobo));
      for (const id of RAM_SLOTS) {
        const ram = partById(next[id]);
        if (ram && (ram.memory !== mobo.memory || !allowed.has(id))) {
          delete next[id];
          note = "Saqué la RAM que no coincide con la placa nueva.";
        }
      }
      if (mobo.m2Slots === 1) delete next["m2-2"];
    }
  }
  if (slot === "gpu") {
    const gpu = partById(next.gpu);
    if (!gpu?.pcie8pin) delete next["cable-pcie"];
  }
  if (slot === "cpu") {
    // cooler stays; wattage is checked at boot so the mistake is visible
  }
  return { slots: next, note };
}

export function tidyAfterRemove(slots: Slots, slot: SlotId): Slots {
  const next: Slots = { ...slots };
  delete next[slot];
  if (slot === "psu") {
    delete next["cable-24"];
    delete next["cable-eps"];
    delete next["cable-pcie"];
  }
  if (slot === "mobo") {
    const gone: SlotId[] = [
      "cpu",
      "cooler",
      "ram-a1",
      "ram-a2",
      "ram-b1",
      "ram-b2",
      "gpu",
      "m2-1",
      "m2-2",
      "sata-1",
      "cable-24",
      "cable-eps",
      "cable-pcie",
    ];
    for (const id of gone) delete next[id];
  }
  if (slot === "cpu") delete next.cooler;
  if (slot === "gpu") delete next["cable-pcie"];
  return next;
}

export const DESKTOP_GROUPS: { id: Category; label: string }[] = [
  { id: "case", label: "Gabinete" },
  { id: "psu", label: "Fuente" },
  { id: "mobo", label: "Placa madre" },
  { id: "cpu", label: "Procesador" },
  { id: "cooler", label: "Disipador" },
  { id: "ram", label: "Memoria" },
  { id: "storage", label: "Almacenamiento" },
  { id: "gpu", label: "Placa de video" },
  { id: "cable", label: "Cables de la fuente" },
];

export const NOTEBOOK_GROUPS: { id: Category; label: string }[] = [
  { id: "ram", label: "Memoria SODIMM" },
  { id: "storage", label: "SSD" },
];

export function partsForGroup(platform: Platform, category: Category, psuIn: boolean): Part[] {
  return list.filter((p) => {
    if (p.category !== category) return false;
    if (platform === "notebook") return p.platform === "notebook" || (p.platform === "both" && p.storageKind === "nvme");
    if (p.platform === "notebook") return false;
    if (p.category === "cable" && !psuIn) return false;
    return true;
  });
}

export { CHANNEL_A, CHANNEL_B };
