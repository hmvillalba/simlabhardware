import { diagnose, hasSsd, type Diagnosis } from "./diagnose";
import { type ModelId, type Slots, type Snap } from "./parts";

export type Choice = {
  id: string;
  prompt: string;
  choices: { id: string; text: string }[];
  answer: string;
  explain: string;
};

export const CHOICES: Choice[] = [
  {
    id: "am5-ram",
    prompt: "Un Ryzen 5 7600 va en zócalo AM5. ¿Qué memoria acepta la plataforma de este banco?",
    choices: [
      { id: "d4", text: "DDR4, porque es más barata" },
      { id: "d5", text: "DDR5, nada más" },
      { id: "both", text: "DDR4 o DDR5, según el módulo" },
      { id: "sodimm", text: "SODIMM de notebook" },
    ],
    answer: "d5",
    explain: "AM5, en estas placas, es DDR5. Un DIMM DDR4 no entra: la muesca del módulo es distinta. No se fuerza.",
  },
  {
    id: "no-igpu",
    prompt: "Armaste una B550 con un Ryzen 7 5800X, RAM y SSD. El monitor sigue negro y los ventiladores giran. ¿Qué falta?",
    choices: [
      { id: "gpu", text: "Una placa de video: ese CPU no tiene gráficos" },
      { id: "ram", text: "Otro módulo, porque con uno no hay imagen" },
      { id: "hdd", text: "Un disco mecánico además del SSD" },
      { id: "case", text: "El gabinete: sin torre no hay señal" },
    ],
    answer: "gpu",
    explain: "El 5800X no trae gráficos integrados. El POST puede avanzar, pero no hay adaptador de video. Un i3-12100 o un 7600 sí dan imagen solos.",
  },
  {
    id: "channels",
    prompt: "En una placa de cuatro zócalos pusiste dos módulos en A1 y A2. ¿Qué pasa con los canales?",
    choices: [
      { id: "dual", text: "Es dual channel, porque son dos módulos" },
      { id: "same", text: "Quedan en el mismo canal. Dual channel es A2 y B2" },
      { id: "none", text: "No enciende: A1 está prohibido" },
      { id: "quad", text: "Pasa a quad channel" },
    ],
    answer: "same",
    explain: "Dos módulos no alcanzan: tienen que ocupar los dos canales. En estas placas, A1+A2 es un canal y B1+B2 el otro. Lo habitual es A2 y B2.",
  },
  {
    id: "notch",
    prompt: "¿Por qué no se puede colocar un DIMM DDR4 en una placa DDR5?",
    choices: [
      { id: "bios", text: "La BIOS lo bloquea, aunque entre físico" },
      { id: "fit", text: "No entra: la muesca y los contactos no coinciden" },
      { id: "os", text: "Entra, pero Windows no lo reconoce" },
      { id: "psu", text: "La fuente no entrega el voltaje DDR4" },
    ],
    answer: "fit",
    explain: "Es una incompatibilidad física. Si no cae solo en el zócalo, no se empuja. Forzarlo dobla pines o parte el módulo.",
  },
  {
    id: "eps",
    prompt: "¿Qué cable alimenta al procesador?",
    choices: [
      { id: "eps", text: "El EPS de 8 pines, arriba de la placa" },
      { id: "24", text: "El de 24 pines alcanza para todo" },
      { id: "sata", text: "Un cable SATA de la fuente" },
      { id: "hdmi", text: "El HDMI del monitor" },
    ],
    answer: "eps",
    explain: "El de 24 pines alimenta la placa. El CPU tiene su propio conector de 8 pines (EPS). Sin ese cable no hay POST, aunque la fuente sea grande.",
  },
  {
    id: "sodimm",
    prompt: "Una notebook trae 8 GB soldados y un banco vacío. ¿Qué podés ampliar?",
    choices: [
      { id: "sodimm", text: "La RAM, con un SODIMM de la misma generación" },
      { id: "cpu", text: "El procesador, está en un zócalo" },
      { id: "dimm", text: "La RAM, con un DIMM de escritorio" },
      { id: "psu", text: "La fuente interna, por una de 650 W" },
    ],
    answer: "sodimm",
    explain: "En estas notebooks el CPU va soldado. Se amplía la memoria con un SODIMM (módulo corto) de la misma generación, DDR4 o DDR5 según el modelo, y el SSD en M.2.",
  },
  {
    id: "a2",
    prompt: "Si la placa tiene cuatro zócalos y vas a poner un solo módulo, ¿dónde va?",
    choices: [
      { id: "a2", text: "En A2, el segundo del canal A" },
      { id: "a1", text: "En A1, el más cercano al CPU" },
      { id: "any", text: "En cualquiera: es lo mismo" },
      { id: "gpu", text: "En el zócalo PCIe, si no hay DIMM libre" },
    ],
    answer: "a2",
    explain: "El manual de casi todas las placas pide el primer módulo en A2. A1 solo se usa cuando ya están A2 y, para el segundo canal, B2.",
  },
  {
    id: "thermal",
    prompt: "El i5-14400 de este banco pide 148 W en turbo y le pusiste el disipador de stock (95 W). ¿Qué hace el equipo al encender?",
    choices: [
      { id: "ok", text: "Entra al sistema igual, un poco más lento" },
      { id: "off", text: "Se protege y se apaga por temperatura" },
      { id: "bios", text: "Pide otra clave de BIOS" },
      { id: "ram", text: "Pierde la mitad de la RAM" },
    ],
    answer: "off",
    explain: "El disipador tiene que cubrir el calor real del procesador, no solo el nombre de la caja. Si se queda corto, la protección térmica corta la alimentación.",
  },
  {
    id: "m2-order",
    prompt: "El SSD NVMe quedó debajo de la zona de la placa de video. ¿En qué orden se instala?",
    choices: [
      { id: "first", text: "Primero el M.2, después la gráfica" },
      { id: "after", text: "Primero la gráfica, el SSD se apoya arriba" },
      { id: "sata", text: "No importa: el NVMe usa el puerto SATA" },
      { id: "outside", text: "El NVMe va fuera del gabinete" },
    ],
    answer: "first",
    explain: "El M.2 va atornillado a la placa, bien plano. Si lo tapa el disipador de la gráfica, después no se puede colocar ni cambiar sin sacar la placa de video.",
  },
  {
    id: "format",
    prompt: "¿Cuál es la diferencia entre un DIMM y un SODIMM?",
    choices: [
      { id: "size", text: "El SODIMM es el módulo corto de las notebooks" },
      { id: "gen", text: "DIMM es DDR4 y SODIMM es DDR5" },
      { id: "speed", text: "El SODIMM es siempre más rápido" },
      { id: "same", text: "Son el mismo módulo con dos nombres" },
    ],
    answer: "size",
    explain: "DIMM es la memoria larga de escritorio. SODIMM es la corta de las notebooks. Además tienen que coincidir en generación: DDR4 o DDR5.",
  },
  {
    id: "psu-math",
    prompt: "La carga estimada da 530 W y la fuente es de 450 W. ¿Qué conviene decirle al alumno?",
    choices: [
      { id: "trip", text: "No alcanza: la fuente se va a proteger y apagar el equipo" },
      { id: "ok", text: "Alcanza, porque 450 W es el mínimo legal" },
      { id: "cpu", text: "Alcanza si se saca un módulo de RAM" },
      { id: "case", text: "Alcanza si se usa un gabinete más grande" },
    ],
    answer: "trip",
    explain: "La fuente tiene que cubrir la suma de CPU, gráfica, placa y discos. Si la cuenta la supera, el equipo no se queda encendido. El gabinete no suma vatios.",
  },
  {
    id: "triangle",
    prompt: "El procesador no cae en el zócalo. ¿Qué corresponde hacer?",
    choices: [
      { id: "align", text: "Mirar el triángulo y apoyarlo sin empujar. Si no coincide, es otro zócalo" },
      { id: "push", text: "Empujar con el pulgar hasta que entre" },
      { id: "screw", text: "Atornillarlo a la placa por los cuatro costados" },
      { id: "paste", text: "Poner más pasta térmica para que deslice" },
    ],
    answer: "align",
    explain: "El triángulo del procesador se alinea con el del zócalo. Entra por su peso. Empujarlo dobla pines (AM4/AM5) o daña los contactos del LGA.",
  },
];

export type MissionCheck = {
  id: string;
  label: string;
  test: (snap: Snap, d: Diagnosis) => boolean;
};

export type Mission = {
  id: string;
  title: string;
  brief: string;
  platform: Snap["platform"];
  model?: ModelId;
  setup: Slots;
  checks: MissionCheck[];
};

export const MISSIONS: Mission[] = [
  {
    id: "oficina",
    title: "PC de oficina",
    brief: "Armá un escritorio que llegue al sistema, con gabinete, al menos 16 GB, un SSD y no más de 600 créditos.",
    platform: "desktop",
    setup: {},
    checks: [
      { id: "boot", label: "Llega al escritorio", test: (_s, d) => d.boot === "os" },
      { id: "case", label: "Tiene gabinete", test: (s) => Boolean(s.slots.case) },
      { id: "ram", label: "16 GB o más", test: (_s, d) => d.ramGb >= 16 },
      { id: "ssd", label: "El arranque es un SSD, no solo un HDD", test: (s) => hasSsd(s.slots) },
      { id: "budget", label: "600 créditos o menos", test: (_s, d) => d.credits <= 600 },
    ],
  },
  {
    id: "dedicada",
    title: "Gráfica dedicada",
    brief: "Armá una PC con placa de video que encienda, en dual channel, dentro de un gabinete. La fuente y el disipador tienen que aguantar.",
    platform: "desktop",
    setup: {},
    checks: [
      { id: "boot", label: "Llega al escritorio", test: (_s, d) => d.boot === "os" },
      { id: "gpu", label: "Tiene placa de video", test: (s) => Boolean(s.slots.gpu) },
      { id: "dual", label: "La RAM está en dual channel", test: (_s, d) => d.dualChannel },
      { id: "case", label: "Está dentro de un gabinete", test: (s) => Boolean(s.slots.case) },
    ],
  },
  {
    id: "notebook",
    title: "Ampliar el AulaBook",
    brief: "Esta notebook trae 8 GB DDR4 soldados y ningún disco. Llevala a 16 GB o más y dejala con un SSD que arranque.",
    platform: "notebook",
    model: "aulabook",
    setup: {},
    checks: [
      { id: "boot", label: "Llega al escritorio", test: (_s, d) => d.boot === "os" },
      { id: "ram", label: "16 GB o más en total", test: (_s, d) => d.ramGb >= 16 },
      { id: "ssd", label: "Tiene un SSD M.2", test: (s) => hasSsd(s.slots) },
    ],
  },
  {
    id: "sin-imagen",
    title: "Enciende, pero no hay imagen",
    brief: "Los ventiladores giran y el monitor sigue negro. El procesador es un 5800X. Corregí la falla sin cambiar ese CPU.",
    platform: "desktop",
    setup: {
      case: "case-atx",
      psu: "psu-650",
      mobo: "mb-b550",
      cpu: "cpu-5800x",
      cooler: "cool-tower",
      "ram-a2": "ram-d4-8",
      "ram-b2": "ram-d4-8",
      "m2-1": "ssd-nvme-500",
      "cable-24": "cable-24",
      "cable-eps": "cable-eps",
    },
    checks: [
      { id: "boot", label: "Ahora llega al escritorio", test: (_s, d) => d.boot === "os" },
      { id: "cpu", label: "Sigue el Ryzen 7 5800X", test: (s) => s.slots.cpu === "cpu-5800x" },
      { id: "gpu", label: "Hay una placa de video alimentada", test: (s) => Boolean(s.slots.gpu) },
    ],
  },
  {
    id: "fuente",
    title: "Se apaga al cargar",
    brief: "Esta PC se apaga. La gráfica alta y el i5 se quedan: el arreglo es la alimentación, no sacar la placa de video.",
    platform: "desktop",
    setup: {
      case: "case-atx",
      psu: "psu-450",
      mobo: "mb-b760m",
      cpu: "cpu-14400",
      cooler: "cool-tower",
      "ram-a2": "ram-d5-16",
      "ram-b2": "ram-d5-16",
      "m2-1": "ssd-nvme-1000",
      gpu: "gpu-alta",
      "cable-24": "cable-24",
      "cable-eps": "cable-eps",
      "cable-pcie": "cable-pcie",
    },
    checks: [
      { id: "boot", label: "Llega al escritorio", test: (_s, d) => d.boot === "os" },
      { id: "cpu", label: "Sigue el i5-14400", test: (s) => s.slots.cpu === "cpu-14400" },
      { id: "gpu", label: "Sigue la gráfica alta", test: (s) => s.slots.gpu === "gpu-alta" },
      { id: "psu", label: "La fuente ya no es la de 450 W", test: (s) => s.slots.psu !== "psu-450" && Boolean(s.slots.psu) },
    ],
  },
];

export function missionById(id: string | null): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}

export function gradeMission(mission: Mission, snap: Snap): { ok: boolean; label: string }[] {
  const d = diagnose(snap);
  return mission.checks.map((c) => ({ label: c.label, ok: c.test(snap, d) }));
}

export function choiceById(id: string): Choice | undefined {
  return CHOICES.find((q) => q.id === id);
}
