import { i as __toESM } from "../_runtime.mjs";
import { b as require_react, y as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { _ as Cable, a as RotateCcw, c as MemoryStick, d as GraduationCap, f as Fan, g as Check, h as Circle, i as Trash2, l as Laptop, m as CircuitBoard, n as Volume2, o as Power, p as Cpu, s as Monitor, t as VolumeX, u as HardDrive, v as Box, y as BookOpen } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D1ynSZHX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var NOTEBOOKS = {
	aulabook: {
		id: "aulabook",
		name: "AulaBook 14",
		cpu: "Procesador U · 15 W · gráficos integrados, soldado",
		ramSolderedGb: 8,
		memory: "DDR4",
		gpu: "Gráficos integrados (no se cambian)",
		m2Slots: 1,
		lesson: "Notebook de aula. El procesador va soldado: no se actualiza. Podés sumar un SODIMM DDR4 y un SSD M.2."
	},
	probook: {
		id: "probook",
		name: "ProBook 16",
		cpu: "Procesador HS · 35 W · gráficos integrados, soldado",
		ramSolderedGb: 8,
		memory: "DDR5",
		gpu: "Gráfica dedicada de entrada, soldada",
		m2Slots: 2,
		lesson: "Trae 8 GB DDR5 soldados y dos bahías M.2. Una ya tiene un SSD de 500 GB. La gráfica no se cambia."
	}
};
var list = [
	{
		id: "case-atx",
		name: "Torre media ATX",
		short: "Acepta ATX y mATX · cooler 168 mm · GPU 340 mm",
		category: "case",
		platform: "desktop",
		credits: 75,
		caseForms: ["ATX", "mATX"],
		caseMaxCooler: 168,
		caseMaxGpu: 340,
		lesson: "Gabinete de clase grande. Entra una placa ATX y una gráfica larga. El panel lateral se deja afuera para ver el armado."
	},
	{
		id: "case-matx",
		name: "Torre compacta",
		short: "Solo mATX · cooler 145 mm · GPU 260 mm",
		category: "case",
		platform: "desktop",
		credits: 55,
		caseForms: ["mATX"],
		caseMaxCooler: 145,
		caseMaxGpu: 260,
		lesson: "Más chica y barata. Una placa ATX no entra, y un disipador de torre alta tampoco."
	},
	{
		id: "psu-450",
		name: "Fuente 450 W",
		short: "80 Plus · alcanza para oficina y gráficas chicas",
		category: "psu",
		platform: "desktop",
		credits: 45,
		psuWatts: 450,
		lesson: "Incluye cables de 24 pines, EPS de 8 pines y PCIe. 450 W no alcanzan si la suma de consumos la supera."
	},
	{
		id: "psu-650",
		name: "Fuente 650 W",
		short: "80 Plus Bronze · margen para una gráfica media o alta",
		category: "psu",
		platform: "desktop",
		credits: 75,
		psuWatts: 650,
		lesson: "La opción sensata cuando hay placa de video dedicada. Los cables no se enchufan solos: hay que conectarlos."
	},
	{
		id: "psu-850",
		name: "Fuente 850 W",
		short: "80 Plus Gold · sobra margen",
		category: "psu",
		platform: "desktop",
		credits: 110,
		psuWatts: 850,
		lesson: "Sobredimensionada para estas prácticas. Sirve, pero gasta créditos de más."
	},
	{
		id: "mb-b650m",
		name: "Placa B650M",
		short: "mATX · AM5 · DDR5 · 2 DIMM · 1 M.2",
		category: "mobo",
		platform: "desktop",
		credits: 150,
		socket: "AM5",
		memory: "DDR5",
		form: "mATX",
		dimmSlots: 2,
		m2Slots: 1,
		lesson: "Para Ryzen 7000. Solo DDR5: un módulo DDR4 no entra, la muesca es otra. Con dos zócalos, usá los dos para dual channel."
	},
	{
		id: "mb-b550",
		name: "Placa B550",
		short: "ATX · AM4 · DDR4 · 4 DIMM · 2 M.2",
		category: "mobo",
		platform: "desktop",
		credits: 130,
		socket: "AM4",
		memory: "DDR4",
		form: "ATX",
		dimmSlots: 4,
		m2Slots: 2,
		lesson: "Para Ryzen 5000. Cuatro zócalos: un solo módulo va en A2. Dos módulos van en A2 y B2, nunca en el mismo canal."
	},
	{
		id: "mb-b760m",
		name: "Placa B760M",
		short: "mATX · LGA1700 · DDR5 · 2 DIMM · 1 M.2",
		category: "mobo",
		platform: "desktop",
		credits: 140,
		socket: "LGA1700",
		memory: "DDR5",
		form: "mATX",
		dimmSlots: 2,
		m2Slots: 1,
		lesson: "Para Intel de 12ª a 14ª en LGA1700, versión DDR5. No acepta un procesador AM4 ni AM5."
	},
	{
		id: "mb-h610m",
		name: "Placa H610M",
		short: "mATX · LGA1700 · DDR4 · 2 DIMM · 1 M.2",
		category: "mobo",
		platform: "desktop",
		credits: 85,
		socket: "LGA1700",
		memory: "DDR4",
		form: "mATX",
		dimmSlots: 2,
		m2Slots: 1,
		lesson: "La placa económica de oficina. Mismo zócalo LGA1700 que la B760, pero memoria DDR4. No mezcles generaciones."
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
		lesson: "Lleva gráficos integrados: hay imagen sin placa de video. El triángulo del CPU se alinea con el del zócalo. Si no cae solo, no se empuja."
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
		lesson: "No tiene gráficos integrados. Sin una placa de video el monitor queda negro aunque el resto encienda. Pide un disipador de más de 105 W."
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
		lesson: "La ficha base es baja, pero en turbo este modelo pide unos 148 W. El cooler de stock no alcanza: el equipo se apaga por temperatura."
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
		lesson: "Procesador de oficina. Gráficos integrados y poco calor: el disipador incluido alcanza. Mismo zócalo que el i5-14400."
	},
	{
		id: "cool-stock",
		name: "Disipador de stock",
		short: "Hasta 95 W · 58 mm de alto",
		category: "cooler",
		platform: "desktop",
		credits: 20,
		coolerMaxW: 95,
		coolerHeight: 58,
		lesson: "Viene con varios procesadores de bajo consumo. No alcanza para un 5800X (105 W) ni para un 14400 (148 W)."
	},
	{
		id: "cool-low",
		name: "Disipador bajo",
		short: "Hasta 130 W · 68 mm · entra en torres chicas",
		category: "cooler",
		platform: "desktop",
		credits: 40,
		coolerMaxW: 130,
		coolerHeight: 68,
		lesson: "Perfil bajo para gabinetes compactos. Cubre al 5800X. Se queda corto con el turbo del 14400."
	},
	{
		id: "cool-tower",
		name: "Torre de aire",
		short: "Hasta 190 W · 158 mm · no entra en la torre compacta",
		category: "cooler",
		platform: "desktop",
		credits: 55,
		coolerMaxW: 190,
		coolerHeight: 158,
		lesson: "El más capaz del banco. Mide 158 mm: la torre compacta solo admite 145 mm. En la torre ATX entra bien."
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
		lesson: "Un módulo solo trabaja en single channel. Para dual channel hace falta otro módulo en el otro canal (A2 y B2)."
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
		lesson: "16 GB en un solo stick alcanzan para oficina, pero siguen siendo un canal. Dos sticks de 8 GB rinden mejor en dual channel."
	},
	{
		id: "ram-d5-16",
		name: "DIMM DDR5 16 GB",
		short: "5600 MT/s · un módulo",
		category: "ram",
		platform: "desktop",
		credits: 55,
		memory: "DDR5",
		capacityGb: 16,
		stick: "dimm",
		lesson: "Solo entra en placas DDR5 (B650 o B760 de este banco). No es compatible con B550 ni H610."
	},
	{
		id: "ram-d5-32",
		name: "DIMM DDR5 32 GB",
		short: "6000 MT/s · un módulo",
		category: "ram",
		platform: "desktop",
		credits: 95,
		memory: "DDR5",
		capacityGb: 32,
		stick: "dimm",
		lesson: "Mucho margen para edición. Dos de estos son 64 GB y dual channel, si la placa tiene dos zócalos libres."
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
		lesson: "El formato de las notebooks no entra en un escritorio. En el AulaBook suma al canal que ya está soldado."
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
		lesson: "Lleva el AulaBook a 24 GB (8 soldados + 16). Si las capacidades no coinciden, parte queda en flex mode."
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
		lesson: "Iguala los 8 GB soldados de la ProBook y habilita dual channel parejo."
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
		lesson: "Más capacidad, pero no coincide con los 8 GB soldados: el equipo usa flex mode."
	},
	{
		id: "gpu-entrada",
		name: "Gráfica de entrada",
		short: "4 GB · 75 W · sin conector extra · 19 cm",
		category: "gpu",
		platform: "desktop",
		credits: 90,
		watts: 75,
		pcie8pin: false,
		gpuLength: 190,
		lesson: "Se alimenta solo del zócalo PCIe. Sirve para dar imagen a un CPU sin gráficos y para juegos poco exigentes."
	},
	{
		id: "gpu-media",
		name: "Gráfica media",
		short: "8 GB · 150 W · cable de 8 pines · 24 cm",
		category: "gpu",
		platform: "desktop",
		credits: 280,
		watts: 150,
		pcie8pin: true,
		gpuLength: 240,
		lesson: "Pide un cable PCIe de la fuente. Sin ese cable no hay imagen, aunque el resto encienda."
	},
	{
		id: "gpu-alta",
		name: "Gráfica alta",
		short: "16 GB · 320 W · cable de 8 pines · 32 cm",
		category: "gpu",
		platform: "desktop",
		credits: 520,
		watts: 320,
		pcie8pin: true,
		gpuLength: 320,
		lesson: "No entra en la torre compacta (máximo 26 cm) y una fuente de 450 W no la aguanta. Hay que mirar largo y vatios, no solo el zócalo."
	},
	{
		id: "ssd-nvme-500",
		name: "SSD NVMe 500 GB",
		short: "M.2 · disco de arranque",
		category: "storage",
		platform: "both",
		credits: 50,
		capacityGb: 500,
		storageKind: "nvme",
		watts: 7,
		lesson: "Va acostado en el zócalo M.2, atornillado. Si la placa de video tapa ese zócalo, se instala el SSD antes."
	},
	{
		id: "ssd-nvme-1000",
		name: "SSD NVMe 1 TB",
		short: "M.2 · disco de arranque",
		category: "storage",
		platform: "both",
		credits: 80,
		capacityGb: 1e3,
		storageKind: "nvme",
		watts: 7,
		lesson: "Misma instalación que el de 500 GB, más lugar para el sistema y los archivos de los alumnos."
	},
	{
		id: "ssd-sata-1000",
		name: "SSD SATA 1 TB",
		short: "2,5 pulgadas · cable de datos, no M.2",
		category: "storage",
		platform: "desktop",
		credits: 60,
		capacityGb: 1e3,
		storageKind: "sata",
		watts: 5,
		lesson: "No entra en el zócalo M.2. Usa el puerto SATA de la placa. También puede ser disco de arranque."
	},
	{
		id: "hdd-2000",
		name: "Disco mecánico 2 TB",
		short: "HDD · SATA · mucho lugar, arranque lento",
		category: "storage",
		platform: "desktop",
		credits: 40,
		capacityGb: 2e3,
		storageKind: "hdd",
		watts: 9,
		lesson: "Guarda archivos grandes a bajo costo. El sistema arranca y trabaja mucho más lento que en un SSD."
	},
	{
		id: "cable-24",
		name: "Cable 24 pines",
		short: "Alimenta la placa madre",
		category: "cable",
		platform: "desktop",
		credits: 0,
		lesson: "Sale de la fuente. Sin este conector la placa no tiene energía y no hay POST."
	},
	{
		id: "cable-eps",
		name: "Cable EPS 8 pines",
		short: "Alimenta el procesador",
		category: "cable",
		platform: "desktop",
		credits: 0,
		lesson: "No es el de 24 pines. Va arriba de la placa, junto al zócalo del CPU. Si falta, el procesador no arranca."
	},
	{
		id: "cable-pcie",
		name: "Cable PCIe 8 pines",
		short: "Alimenta la placa de video",
		category: "cable",
		platform: "desktop",
		credits: 0,
		lesson: "Solo hace falta si la gráfica lo pide. La de entrada (75 W) no lo usa. Sin este cable, una gráfica media o alta no da imagen."
	}
];
var PARTS = Object.fromEntries(list.map((p) => [p.id, p]));
var RAM_SLOTS = [
	"ram-a1",
	"ram-a2",
	"ram-b1",
	"ram-b2"
];
function partById(id) {
	if (!id) return void 0;
	return PARTS[id];
}
function ramSlotsFor(mobo) {
	if (!mobo) return [];
	return mobo.dimmSlots === 4 ? [
		"ram-a1",
		"ram-a2",
		"ram-b1",
		"ram-b2"
	] : ["ram-a2", "ram-b2"];
}
function m2SlotsFor(mobo) {
	if (!mobo) return [];
	return mobo.m2Slots === 2 ? ["m2-1", "m2-2"] : ["m2-1"];
}
var SLOT_LABEL = {
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
	"nb-m2-2": "M.2 secundario"
};
var CHANNEL_A = ["ram-a1", "ram-a2"];
var CHANNEL_B = ["ram-b1", "ram-b2"];
function channelFilled(slots, ids) {
	return ids.some((id) => Boolean(slots[id]));
}
function no(reason) {
	return {
		ok: false,
		reason
	};
}
function canPlace(partId, slot, snap) {
	const part = PARTS[partId];
	if (!part) return no("Esa pieza no está en el banco.");
	const { slots, platform, model } = snap;
	if (platform === "notebook") {
		const nb = NOTEBOOKS[model];
		if (slot === "sodimm") {
			if (part.stick !== "sodimm") return no("En la notebook entra un SODIMM, no un DIMM de escritorio.");
			if (part.memory !== nb.memory) return no(`Esta ${nb.name} usa ${nb.memory}. Un módulo ${part.memory} no entra: la muesca no coincide.`);
			return {
				ok: true,
				reason: ""
			};
		}
		if (slot === "nb-m2-1" || slot === "nb-m2-2") {
			if (part.storageKind !== "nvme") return no("Esa bahía es M.2. El disco SATA o el HDD no entran ahí.");
			if (slot === "nb-m2-2" && nb.m2Slots < 2) return no("Este modelo tiene una sola bahía M.2.");
			return {
				ok: true,
				reason: ""
			};
		}
		return no("Esa pieza es de escritorio. Acá solo se amplían memoria y SSD.");
	}
	const mobo = partById(slots.mobo);
	const kase = partById(slots.case);
	const gpu = partById(slots.gpu);
	switch (slot) {
		case "case": {
			if (part.category !== "case") return no("Ese zócalo es del gabinete.");
			if (mobo && part.caseForms && !part.caseForms.includes(mobo.form)) return no(`La placa es ${mobo.form} y este gabinete no la acepta.`);
			if (gpu && part.caseMaxGpu && gpu.gpuLength > part.caseMaxGpu) return no("La gráfica que ya está puesta es más larga que este gabinete.");
			const cooler = partById(slots.cooler);
			if (cooler && part.caseMaxCooler && cooler.coolerHeight > part.caseMaxCooler) return no("El disipador es más alto que este gabinete. Sacalo o elegí otra torre.");
			return {
				ok: true,
				reason: ""
			};
		}
		case "psu":
			if (part.category !== "psu") return no("Ahí va la fuente.");
			return {
				ok: true,
				reason: ""
			};
		case "mobo":
			if (part.category !== "mobo") return no("Ahí va la placa madre.");
			if (kase && !kase.caseForms.includes(part.form)) return no(`Esa placa es ${part.form} y el gabinete no la admite. Sacá el gabinete o cambialo.`);
			return {
				ok: true,
				reason: ""
			};
		case "cpu":
			if (part.category !== "cpu") return no("Ahí va el procesador.");
			if (!mobo) return no("Primero colocá la placa madre.");
			if (part.socket !== mobo.socket) return no(`Ese CPU es ${part.socket} y la placa es ${mobo.socket}. No entra, y no se fuerza.`);
			return {
				ok: true,
				reason: ""
			};
		case "cooler":
			if (part.category !== "cooler") return no("Ahí va el disipador.");
			if (!slots.cpu) return no("Primero el procesador, después el disipador.");
			if (kase && part.coolerHeight > kase.caseMaxCooler) return no(`Mide ${part.coolerHeight} mm y el gabinete admite ${kase.caseMaxCooler} mm.`);
			return {
				ok: true,
				reason: ""
			};
		case "ram-a1":
		case "ram-a2":
		case "ram-b1":
		case "ram-b2":
			if (part.stick !== "dimm") return no("Eso es memoria de notebook (SODIMM). En el escritorio va un DIMM.");
			if (!mobo) return no("Sin placa madre no hay zócalos de memoria.");
			if (!ramSlotsFor(mobo).includes(slot)) return no("Esta placa no tiene ese zócalo.");
			if (part.memory !== mobo.memory) return no(`La placa es ${mobo.memory} y el módulo es ${part.memory}. La muesca no coincide.`);
			return {
				ok: true,
				reason: ""
			};
		case "gpu":
			if (part.category !== "gpu") return no("Ahí va la placa de video, en el PCIe x16.");
			if (!mobo) return no("Primero la placa madre.");
			if (kase && part.gpuLength > kase.caseMaxGpu) return no(`Mide ${part.gpuLength / 10} cm y el gabinete admite ${kase.caseMaxGpu / 10} cm.`);
			return {
				ok: true,
				reason: ""
			};
		case "m2-1":
		case "m2-2":
			if (part.storageKind !== "nvme") return no("En M.2 va un SSD NVMe. El SATA y el HDD usan el puerto SATA.");
			if (!mobo) return no("Primero la placa madre.");
			if (!m2SlotsFor(mobo).includes(slot)) return no("Esta placa no tiene esa bahía M.2.");
			return {
				ok: true,
				reason: ""
			};
		case "sata-1":
			if (part.storageKind !== "sata" && part.storageKind !== "hdd") return no("Ese puerto es SATA. El NVMe va en M.2.");
			if (!mobo) return no("Primero la placa madre.");
			return {
				ok: true,
				reason: ""
			};
		case "cable-24":
			if (part.id !== "cable-24") return no("Ahí va el conector de 24 pines.");
			if (!slots.psu) return no("Primero instalá la fuente: los cables salen de ahí.");
			if (!mobo) return no("No hay placa donde enchufarlo.");
			return {
				ok: true,
				reason: ""
			};
		case "cable-eps":
			if (part.id !== "cable-eps") return no("Ahí va el EPS de 8 pines, el que alimenta el CPU.");
			if (!slots.psu) return no("Primero instalá la fuente.");
			if (!mobo) return no("No hay placa donde enchufarlo.");
			return {
				ok: true,
				reason: ""
			};
		case "cable-pcie":
			if (part.id !== "cable-pcie") return no("Ahí va el cable PCIe de la gráfica.");
			if (!gpu) return no("Primero colocá la placa de video.");
			if (!gpu.pcie8pin) return no("Esta gráfica no pide cable extra: se alimenta del zócalo.");
			if (!slots.psu) return no("Primero instalá la fuente.");
			return {
				ok: true,
				reason: ""
			};
		default: return no("Ese lugar no se usa en el escritorio.");
	}
}
function activeDesktopSlots(slots) {
	const mobo = partById(slots.mobo);
	const gpu = partById(slots.gpu);
	const out = [
		"case",
		"psu",
		"mobo"
	];
	if (!mobo) return out;
	out.push("cpu", "cooler", "gpu", "sata-1", "cable-24", "cable-eps");
	out.push(...ramSlotsFor(mobo));
	out.push(...m2SlotsFor(mobo));
	if (gpu?.pcie8pin) out.push("cable-pcie");
	return out;
}
function activeNotebookSlots(model) {
	const nb = NOTEBOOKS[model];
	const out = ["sodimm", "nb-m2-1"];
	if (nb.m2Slots === 2) out.push("nb-m2-2");
	return out;
}
function preferredSlots(partId, snap) {
	const active = snap.platform === "notebook" ? activeNotebookSlots(snap.model) : activeDesktopSlots(snap.slots);
	const order = [
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
		"sodimm"
	];
	return active.filter((slot) => canPlace(partId, slot, snap).ok).sort((a, b) => order.indexOf(a) - order.indexOf(b));
}
function tidyAfterPlace(slots, slot) {
	const next = { ...slots };
	let note;
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
		if (!partById(next.gpu)?.pcie8pin) delete next["cable-pcie"];
	}
	if (slot === "cpu") {}
	return {
		slots: next,
		note
	};
}
function tidyAfterRemove(slots, slot) {
	const next = { ...slots };
	delete next[slot];
	if (slot === "psu") {
		delete next["cable-24"];
		delete next["cable-eps"];
		delete next["cable-pcie"];
	}
	if (slot === "mobo") for (const id of [
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
		"cable-pcie"
	]) delete next[id];
	if (slot === "cpu") delete next.cooler;
	if (slot === "gpu") delete next["cable-pcie"];
	return next;
}
var DESKTOP_GROUPS = [
	{
		id: "case",
		label: "Gabinete"
	},
	{
		id: "psu",
		label: "Fuente"
	},
	{
		id: "mobo",
		label: "Placa madre"
	},
	{
		id: "cpu",
		label: "Procesador"
	},
	{
		id: "cooler",
		label: "Disipador"
	},
	{
		id: "ram",
		label: "Memoria"
	},
	{
		id: "storage",
		label: "Almacenamiento"
	},
	{
		id: "gpu",
		label: "Placa de video"
	},
	{
		id: "cable",
		label: "Cables de la fuente"
	}
];
var NOTEBOOK_GROUPS = [{
	id: "ram",
	label: "Memoria SODIMM"
}, {
	id: "storage",
	label: "SSD"
}];
function partsForGroup(platform, category, psuIn) {
	return list.filter((p) => {
		if (p.category !== category) return false;
		if (platform === "notebook") return p.platform === "notebook" || p.platform === "both" && p.storageKind === "nvme";
		if (p.platform === "notebook") return false;
		if (p.category === "cable" && !psuIn) return false;
		return true;
	});
}
var STORAGE_SLOTS_DESKTOP = [
	"m2-1",
	"m2-2",
	"sata-1"
];
var STORAGE_SLOTS_NB = ["nb-m2-1", "nb-m2-2"];
function push(issues, level, text) {
	issues.push({
		level,
		text
	});
}
function diagnose(snap) {
	if (snap.platform === "notebook") return diagnoseNotebook(snap);
	return diagnoseDesktop(snap);
}
function creditsOf(slots) {
	let n = 0;
	for (const id of Object.values(slots)) {
		const p = partById(id);
		if (p) n += p.credits;
	}
	return n;
}
function diagnoseDesktop(snap) {
	const { slots } = snap;
	const issues = [];
	const mobo = partById(slots.mobo);
	const cpu = partById(slots.cpu);
	const cooler = partById(slots.cooler);
	const gpu = partById(slots.gpu);
	const psu = partById(slots.psu);
	const kase = partById(slots.case);
	const rams = [
		"ram-a1",
		"ram-a2",
		"ram-b1",
		"ram-b2"
	].map((id) => partById(slots[id])).filter((p) => Boolean(p));
	const stores = STORAGE_SLOTS_DESKTOP.map((id) => partById(slots[id])).filter((p) => Boolean(p));
	if (!mobo) push(issues, "block", "Falta la placa madre.");
	if (mobo && !cpu) push(issues, "block", "Falta el procesador.");
	if (mobo && cpu && cpu.socket !== mobo.socket) push(issues, "block", `El CPU es ${cpu.socket} y la placa es ${mobo.socket}.`);
	if (cpu && !cooler) push(issues, "block", "Falta el disipador. Sin él el equipo corta por temperatura.");
	if (cpu && cooler && cooler.coolerMaxW < cpu.tdp) push(issues, "block", `El disipador llega a ${cooler.coolerMaxW} W y el procesador pide ${cpu.tdp} W.`);
	if (kase && cooler && cooler.coolerHeight > kase.caseMaxCooler) push(issues, "block", "El disipador no entra en el gabinete.");
	if (kase && mobo && !kase.caseForms.includes(mobo.form)) push(issues, "block", "La placa madre no entra en el gabinete.");
	if (mobo && rams.length === 0) push(issues, "block", "No hay memoria RAM. Sin ella no hay POST.");
	if (mobo && rams.some((r) => r.memory !== mobo.memory)) push(issues, "block", "Hay RAM de una generación que la placa no admite.");
	if (!kase) push(issues, "warn", "Está en banco abierto: no hace falta gabinete para el POST, pero una PC terminada lo lleva.");
	if (!psu) push(issues, "block", "Falta la fuente.");
	if (psu && mobo && !slots["cable-24"]) push(issues, "block", "Falta enchufar el cable de 24 pines a la placa.");
	if (psu && mobo && !slots["cable-eps"]) push(issues, "block", "Falta el cable EPS de 8 pines del procesador.");
	if (gpu?.pcie8pin && !slots["cable-pcie"]) push(issues, "block", "La gráfica pide un cable PCIe de 8 pines y no está conectado.");
	if (kase && gpu && gpu.gpuLength > kase.caseMaxGpu) push(issues, "block", "La placa de video es más larga que el gabinete.");
	if (cpu && !cpu.igpu && !gpu) push(issues, "block", `${cpu.name} no tiene gráficos integrados. Sin placa de video no hay imagen.`);
	const dual = channelFilled(slots, CHANNEL_A) && channelFilled(slots, CHANNEL_B);
	const ramGb = rams.reduce((n, r) => n + (r.capacityGb ?? 0), 0);
	if (rams.length === 1) push(issues, "warn", "Hay un solo módulo: la memoria trabaja en single channel.");
	else if (rams.length >= 2 && !dual) push(issues, "warn", "Los módulos están en el mismo canal. Para dual channel usá A2 y B2.");
	if (mobo?.dimmSlots === 4 && slots["ram-a1"] && !slots["ram-a2"] && rams.length === 1) push(issues, "warn", "En una placa de cuatro zócalos, un solo módulo va en A2, no en A1.");
	if (stores.length === 0 && mobo) push(issues, "block", "No hay disco de arranque.");
	if (stores.length > 0 && stores.every((s) => s.storageKind === "hdd")) push(issues, "warn", "El sistema está en un disco mecánico. Arranca, pero mucho más lento que con un SSD.");
	const loads = [];
	if (mobo) loads.push({
		label: "Placa madre",
		watts: 35
	});
	if (cpu) loads.push({
		label: cpu.name,
		watts: cpu.tdp
	});
	if (gpu) loads.push({
		label: gpu.name,
		watts: gpu.watts
	});
	if (rams.length) loads.push({
		label: "Memoria",
		watts: rams.length * 5
	});
	for (const s of stores) loads.push({
		label: s.name,
		watts: s.watts
	});
	if (cooler) loads.push({
		label: "Disipador",
		watts: 6
	});
	if (mobo) loads.push({
		label: "Varios",
		watts: 12
	});
	const watts = loads.reduce((n, l) => n + l.watts, 0);
	const psuWatts = psu?.psuWatts ?? null;
	if (psuWatts != null && watts > psuWatts) push(issues, "block", `La carga estimada es ${watts} W y la fuente es de ${psuWatts} W. Se apaga por protección.`);
	else if (psuWatts != null && watts > psuWatts * .85) push(issues, "warn", `La fuente queda justa: ${watts} W sobre ${psuWatts} W. Conviene más margen.`);
	const blocks = issues.filter((i) => i.level === "block");
	let boot = "os";
	if (!mobo || !cpu || !cooler || rams.length === 0 || !psu || !slots["cable-24"] || !slots["cable-eps"] || mobo && cpu && cpu.socket !== mobo.socket) boot = "no-post";
	else if (cpu && cooler && cooler.coolerMaxW < cpu.tdp) boot = "thermal";
	else if (psuWatts != null && watts > psuWatts) boot = "psu";
	else if (cpu && !cpu.igpu && !gpu || gpu?.pcie8pin && !slots["cable-pcie"]) boot = "no-display";
	else if (stores.length === 0) boot = "no-disk";
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
		watts
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
		headline: headline(boot)
	};
}
function buildDesktopPost(x) {
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
	if (x.cooler.coolerMaxW < x.cpu.tdp) {
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
	lines.push(`Memoria ${gen} · ${x.ramGb} GB · ${x.dual ? "dual channel" : x.rams.length > 1 ? "un solo canal" : "single channel"}`);
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
	} else if (x.cpu.igpu) lines.push("Video · gráficos integrados del procesador");
	else {
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
	if (x.kase) lines.push(`Gabinete · ${x.kase.name}`);
	lines.push(`Carga estimada ${x.watts} W · margen OK`);
	lines.push("POST correcto. Entrando al sistema.");
	return lines;
}
function diagnoseNotebook(snap) {
	const nb = NOTEBOOKS[snap.model];
	const { slots } = snap;
	const issues = [];
	const sodimm = partById(slots.sodimm);
	const stores = STORAGE_SLOTS_NB.map((id) => partById(slots[id])).filter((p) => Boolean(p));
	let ramGb = nb.ramSolderedGb;
	let dual = false;
	if (sodimm) {
		if (sodimm.memory !== nb.memory) push(issues, "block", `El SODIMM es ${sodimm.memory} y esta notebook es ${nb.memory}. No pasa el entrenamiento de memoria.`);
		else {
			ramGb += sodimm.capacityGb ?? 0;
			dual = true;
			if (sodimm.capacityGb !== nb.ramSolderedGb) push(issues, "warn", `La RAM soldada es de ${nb.ramSolderedGb} GB y el módulo de ${sodimm.capacityGb} GB. Dual channel en flex mode: solo una parte queda en doble canal.`);
		}
	} else push(issues, "warn", `Solo están los ${nb.ramSolderedGb} GB soldados, en un canal. Hay un banco SODIMM libre.`);
	if (stores.length === 0) push(issues, "block", "No hay SSD. Esta notebook no tiene disco soldado de fábrica.");
	const loads = [{
		label: "Plataforma notebook",
		watts: nb.id === "probook" ? 55 : 28
	}, {
		label: "Memoria",
		watts: 4
	}];
	for (const s of stores) loads.push({
		label: s.name,
		watts: s.watts ?? 6
	});
	const watts = loads.reduce((n, l) => n + l.watts, 0);
	const badRam = Boolean(sodimm && sodimm.memory !== nb.memory);
	const boot = badRam ? "no-post" : stores.length === 0 ? "no-disk" : "os";
	const post = [
		`${nb.name} · POST didáctico`,
		nb.cpu,
		`RAM soldada ${nb.ramSolderedGb} GB ${nb.memory}`
	];
	if (badRam) {
		post.push(`SODIMM ${sodimm?.memory} incompatible.`);
		post.push("Fallo de memoria. POST detenido.");
	} else if (sodimm) post.push(`SODIMM ${sodimm.capacityGb} GB · total ${ramGb} GB · ${dual ? "dual channel" : "single channel"}`);
	else post.push(`Sin SODIMM extra · ${ramGb} GB en un canal`);
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
		headline: headline(boot)
	};
}
function headline(boot) {
	switch (boot) {
		case "os": return "Llegaría al escritorio";
		case "no-disk": return "Hace POST, pero no arranca el sistema";
		case "no-display": return "Enciende, sin imagen";
		case "thermal": return "Se apaga por temperatura";
		case "psu": return "La fuente no aguanta";
		default: return "No hace POST";
	}
}
function hasSsd(slots) {
	return [...STORAGE_SLOTS_DESKTOP, ...STORAGE_SLOTS_NB].some((id) => {
		const p = partById(slots[id]);
		return Boolean(p && p.storageKind !== "hdd");
	});
}
var CHOICES = [
	{
		id: "am5-ram",
		prompt: "Un Ryzen 5 7600 va en zócalo AM5. ¿Qué memoria acepta la plataforma de este banco?",
		choices: [
			{
				id: "d4",
				text: "DDR4, porque es más barata"
			},
			{
				id: "d5",
				text: "DDR5, nada más"
			},
			{
				id: "both",
				text: "DDR4 o DDR5, según el módulo"
			},
			{
				id: "sodimm",
				text: "SODIMM de notebook"
			}
		],
		answer: "d5",
		explain: "AM5, en estas placas, es DDR5. Un DIMM DDR4 no entra: la muesca del módulo es distinta. No se fuerza."
	},
	{
		id: "no-igpu",
		prompt: "Armaste una B550 con un Ryzen 7 5800X, RAM y SSD. El monitor sigue negro y los ventiladores giran. ¿Qué falta?",
		choices: [
			{
				id: "gpu",
				text: "Una placa de video: ese CPU no tiene gráficos"
			},
			{
				id: "ram",
				text: "Otro módulo, porque con uno no hay imagen"
			},
			{
				id: "hdd",
				text: "Un disco mecánico además del SSD"
			},
			{
				id: "case",
				text: "El gabinete: sin torre no hay señal"
			}
		],
		answer: "gpu",
		explain: "El 5800X no trae gráficos integrados. El POST puede avanzar, pero no hay adaptador de video. Un i3-12100 o un 7600 sí dan imagen solos."
	},
	{
		id: "channels",
		prompt: "En una placa de cuatro zócalos pusiste dos módulos en A1 y A2. ¿Qué pasa con los canales?",
		choices: [
			{
				id: "dual",
				text: "Es dual channel, porque son dos módulos"
			},
			{
				id: "same",
				text: "Quedan en el mismo canal. Dual channel es A2 y B2"
			},
			{
				id: "none",
				text: "No enciende: A1 está prohibido"
			},
			{
				id: "quad",
				text: "Pasa a quad channel"
			}
		],
		answer: "same",
		explain: "Dos módulos no alcanzan: tienen que ocupar los dos canales. En estas placas, A1+A2 es un canal y B1+B2 el otro. Lo habitual es A2 y B2."
	},
	{
		id: "notch",
		prompt: "¿Por qué no se puede colocar un DIMM DDR4 en una placa DDR5?",
		choices: [
			{
				id: "bios",
				text: "La BIOS lo bloquea, aunque entre físico"
			},
			{
				id: "fit",
				text: "No entra: la muesca y los contactos no coinciden"
			},
			{
				id: "os",
				text: "Entra, pero Windows no lo reconoce"
			},
			{
				id: "psu",
				text: "La fuente no entrega el voltaje DDR4"
			}
		],
		answer: "fit",
		explain: "Es una incompatibilidad física. Si no cae solo en el zócalo, no se empuja. Forzarlo dobla pines o parte el módulo."
	},
	{
		id: "eps",
		prompt: "¿Qué cable alimenta al procesador?",
		choices: [
			{
				id: "eps",
				text: "El EPS de 8 pines, arriba de la placa"
			},
			{
				id: "24",
				text: "El de 24 pines alcanza para todo"
			},
			{
				id: "sata",
				text: "Un cable SATA de la fuente"
			},
			{
				id: "hdmi",
				text: "El HDMI del monitor"
			}
		],
		answer: "eps",
		explain: "El de 24 pines alimenta la placa. El CPU tiene su propio conector de 8 pines (EPS). Sin ese cable no hay POST, aunque la fuente sea grande."
	},
	{
		id: "sodimm",
		prompt: "Una notebook trae 8 GB soldados y un banco vacío. ¿Qué podés ampliar?",
		choices: [
			{
				id: "sodimm",
				text: "La RAM, con un SODIMM de la misma generación"
			},
			{
				id: "cpu",
				text: "El procesador, está en un zócalo"
			},
			{
				id: "dimm",
				text: "La RAM, con un DIMM de escritorio"
			},
			{
				id: "psu",
				text: "La fuente interna, por una de 650 W"
			}
		],
		answer: "sodimm",
		explain: "En estas notebooks el CPU va soldado. Se amplía la memoria con un SODIMM (módulo corto) de la misma generación, DDR4 o DDR5 según el modelo, y el SSD en M.2."
	},
	{
		id: "a2",
		prompt: "Si la placa tiene cuatro zócalos y vas a poner un solo módulo, ¿dónde va?",
		choices: [
			{
				id: "a2",
				text: "En A2, el segundo del canal A"
			},
			{
				id: "a1",
				text: "En A1, el más cercano al CPU"
			},
			{
				id: "any",
				text: "En cualquiera: es lo mismo"
			},
			{
				id: "gpu",
				text: "En el zócalo PCIe, si no hay DIMM libre"
			}
		],
		answer: "a2",
		explain: "El manual de casi todas las placas pide el primer módulo en A2. A1 solo se usa cuando ya están A2 y, para el segundo canal, B2."
	},
	{
		id: "thermal",
		prompt: "El i5-14400 de este banco pide 148 W en turbo y le pusiste el disipador de stock (95 W). ¿Qué hace el equipo al encender?",
		choices: [
			{
				id: "ok",
				text: "Entra al sistema igual, un poco más lento"
			},
			{
				id: "off",
				text: "Se protege y se apaga por temperatura"
			},
			{
				id: "bios",
				text: "Pide otra clave de BIOS"
			},
			{
				id: "ram",
				text: "Pierde la mitad de la RAM"
			}
		],
		answer: "off",
		explain: "El disipador tiene que cubrir el calor real del procesador, no solo el nombre de la caja. Si se queda corto, la protección térmica corta la alimentación."
	},
	{
		id: "m2-order",
		prompt: "El SSD NVMe quedó debajo de la zona de la placa de video. ¿En qué orden se instala?",
		choices: [
			{
				id: "first",
				text: "Primero el M.2, después la gráfica"
			},
			{
				id: "after",
				text: "Primero la gráfica, el SSD se apoya arriba"
			},
			{
				id: "sata",
				text: "No importa: el NVMe usa el puerto SATA"
			},
			{
				id: "outside",
				text: "El NVMe va fuera del gabinete"
			}
		],
		answer: "first",
		explain: "El M.2 va atornillado a la placa, bien plano. Si lo tapa el disipador de la gráfica, después no se puede colocar ni cambiar sin sacar la placa de video."
	},
	{
		id: "format",
		prompt: "¿Cuál es la diferencia entre un DIMM y un SODIMM?",
		choices: [
			{
				id: "size",
				text: "El SODIMM es el módulo corto de las notebooks"
			},
			{
				id: "gen",
				text: "DIMM es DDR4 y SODIMM es DDR5"
			},
			{
				id: "speed",
				text: "El SODIMM es siempre más rápido"
			},
			{
				id: "same",
				text: "Son el mismo módulo con dos nombres"
			}
		],
		answer: "size",
		explain: "DIMM es la memoria larga de escritorio. SODIMM es la corta de las notebooks. Además tienen que coincidir en generación: DDR4 o DDR5."
	},
	{
		id: "psu-math",
		prompt: "La carga estimada da 530 W y la fuente es de 450 W. ¿Qué conviene decirle al alumno?",
		choices: [
			{
				id: "trip",
				text: "No alcanza: la fuente se va a proteger y apagar el equipo"
			},
			{
				id: "ok",
				text: "Alcanza, porque 450 W es el mínimo legal"
			},
			{
				id: "cpu",
				text: "Alcanza si se saca un módulo de RAM"
			},
			{
				id: "case",
				text: "Alcanza si se usa un gabinete más grande"
			}
		],
		answer: "trip",
		explain: "La fuente tiene que cubrir la suma de CPU, gráfica, placa y discos. Si la cuenta la supera, el equipo no se queda encendido. El gabinete no suma vatios."
	},
	{
		id: "triangle",
		prompt: "El procesador no cae en el zócalo. ¿Qué corresponde hacer?",
		choices: [
			{
				id: "align",
				text: "Mirar el triángulo y apoyarlo sin empujar. Si no coincide, es otro zócalo"
			},
			{
				id: "push",
				text: "Empujar con el pulgar hasta que entre"
			},
			{
				id: "screw",
				text: "Atornillarlo a la placa por los cuatro costados"
			},
			{
				id: "paste",
				text: "Poner más pasta térmica para que deslice"
			}
		],
		answer: "align",
		explain: "El triángulo del procesador se alinea con el del zócalo. Entra por su peso. Empujarlo dobla pines (AM4/AM5) o daña los contactos del LGA."
	}
];
var MISSIONS = [
	{
		id: "oficina",
		title: "PC de oficina",
		brief: "Armá un escritorio que llegue al sistema, con gabinete, al menos 16 GB, un SSD y no más de 600 créditos.",
		platform: "desktop",
		setup: {},
		checks: [
			{
				id: "boot",
				label: "Llega al escritorio",
				test: (_s, d) => d.boot === "os"
			},
			{
				id: "case",
				label: "Tiene gabinete",
				test: (s) => Boolean(s.slots.case)
			},
			{
				id: "ram",
				label: "16 GB o más",
				test: (_s, d) => d.ramGb >= 16
			},
			{
				id: "ssd",
				label: "El arranque es un SSD, no solo un HDD",
				test: (s) => hasSsd(s.slots)
			},
			{
				id: "budget",
				label: "600 créditos o menos",
				test: (_s, d) => d.credits <= 600
			}
		]
	},
	{
		id: "dedicada",
		title: "Gráfica dedicada",
		brief: "Armá una PC con placa de video que encienda, en dual channel, dentro de un gabinete. La fuente y el disipador tienen que aguantar.",
		platform: "desktop",
		setup: {},
		checks: [
			{
				id: "boot",
				label: "Llega al escritorio",
				test: (_s, d) => d.boot === "os"
			},
			{
				id: "gpu",
				label: "Tiene placa de video",
				test: (s) => Boolean(s.slots.gpu)
			},
			{
				id: "dual",
				label: "La RAM está en dual channel",
				test: (_s, d) => d.dualChannel
			},
			{
				id: "case",
				label: "Está dentro de un gabinete",
				test: (s) => Boolean(s.slots.case)
			}
		]
	},
	{
		id: "notebook",
		title: "Ampliar el AulaBook",
		brief: "Esta notebook trae 8 GB DDR4 soldados y ningún disco. Llevala a 16 GB o más y dejala con un SSD que arranque.",
		platform: "notebook",
		model: "aulabook",
		setup: {},
		checks: [
			{
				id: "boot",
				label: "Llega al escritorio",
				test: (_s, d) => d.boot === "os"
			},
			{
				id: "ram",
				label: "16 GB o más en total",
				test: (_s, d) => d.ramGb >= 16
			},
			{
				id: "ssd",
				label: "Tiene un SSD M.2",
				test: (s) => hasSsd(s.slots)
			}
		]
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
			"cable-eps": "cable-eps"
		},
		checks: [
			{
				id: "boot",
				label: "Ahora llega al escritorio",
				test: (_s, d) => d.boot === "os"
			},
			{
				id: "cpu",
				label: "Sigue el Ryzen 7 5800X",
				test: (s) => s.slots.cpu === "cpu-5800x"
			},
			{
				id: "gpu",
				label: "Hay una placa de video alimentada",
				test: (s) => Boolean(s.slots.gpu)
			}
		]
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
			"cable-pcie": "cable-pcie"
		},
		checks: [
			{
				id: "boot",
				label: "Llega al escritorio",
				test: (_s, d) => d.boot === "os"
			},
			{
				id: "cpu",
				label: "Sigue el i5-14400",
				test: (s) => s.slots.cpu === "cpu-14400"
			},
			{
				id: "gpu",
				label: "Sigue la gráfica alta",
				test: (s) => s.slots.gpu === "gpu-alta"
			},
			{
				id: "psu",
				label: "La fuente ya no es la de 450 W",
				test: (s) => s.slots.psu !== "psu-450" && Boolean(s.slots.psu)
			}
		]
	}
];
function missionById(id) {
	return MISSIONS.find((m) => m.id === id);
}
function gradeMission(mission, snap) {
	const d = diagnose(snap);
	return mission.checks.map((c) => ({
		label: c.label,
		ok: c.test(snap, d)
	}));
}
function choiceById(id) {
	return CHOICES.find((q) => q.id === id);
}
function emptyPower() {
	return {
		phase: "off",
		post: [],
		shown: 0,
		boot: null
	};
}
function shuffleQuiz() {
	const ids = CHOICES.map((q) => q.id);
	for (let i = ids.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = ids[i];
		const b = ids[j];
		if (a && b) {
			ids[i] = b;
			ids[j] = a;
		}
	}
	return ids.slice(0, 6);
}
var useLab = create()(persist((set, get) => ({
	platform: "desktop",
	model: "aulabook",
	desktop: {},
	notebook: {},
	selectedId: null,
	selectedSlot: null,
	hoverSlot: null,
	message: null,
	view: "tres",
	phase: "off",
	post: [],
	shown: 0,
	boot: null,
	studentName: "",
	dock: "piezas",
	rightTab: "estado",
	quiz: null,
	missionId: null,
	missionNote: null,
	history: [],
	sound: false,
	introSeen: false,
	guide: false,
	snap: () => {
		const s = get();
		return {
			platform: s.platform,
			model: s.model,
			slots: s.platform === "desktop" ? s.desktop : s.notebook
		};
	},
	setPlatform: (platform) => set({
		platform,
		...emptyPower(),
		message: null,
		selectedSlot: null
	}),
	setModel: (model) => {
		const notebook = {};
		if (model === "probook") notebook["nb-m2-1"] = "ssd-nvme-500";
		set({
			model,
			notebook,
			platform: "notebook",
			...emptyPower(),
			message: NOTEBOOKS[model].lesson,
			selectedSlot: null
		});
	},
	selectPart: (selectedId) => set({
		selectedId,
		selectedSlot: null
	}),
	selectSlot: (selectedSlot) => set({ selectedSlot }),
	setHover: (hoverSlot) => set({ hoverSlot }),
	setMessage: (message) => set({ message }),
	setView: (view) => set({ view }),
	place: (slot) => {
		const s = get();
		const partId = s.selectedId;
		const occ = s.snap().slots[slot];
		if (!partId) {
			if (occ) set({
				selectedId: occ,
				selectedSlot: slot,
				message: "Pieza seleccionada. Tocá el mismo zócalo para sacarla."
			});
			else set({ message: "Elegí una pieza en la bandeja y tocá el zócalo ámbar." });
			return;
		}
		if (occ === partId) {
			get().remove(slot);
			return;
		}
		const check = canPlace(partId, slot, s.snap());
		if (!check.ok) {
			set({ message: check.reason });
			return;
		}
		const tidied = tidyAfterPlace({
			...s.snap().slots,
			[slot]: partId
		}, slot);
		set({
			...s.platform === "desktop" ? { desktop: tidied.slots } : { notebook: tidied.slots },
			selectedSlot: slot,
			...emptyPower(),
			message: tidied.note ?? "Pieza colocada."
		});
	},
	remove: (slot) => {
		const s = get();
		const slots = tidyAfterRemove(s.snap().slots, slot);
		set({
			...s.platform === "desktop" ? { desktop: slots } : { notebook: slots },
			selectedSlot: null,
			...emptyPower(),
			message: "Pieza fuera. Lo que dependía de ella también salió."
		});
	},
	powerToggle: () => {
		const s = get();
		if (s.phase === "posting" || s.phase === "on" || s.phase === "halt") {
			set({
				...emptyPower(),
				message: "Equipo apagado."
			});
			return;
		}
		const d = diagnose(s.snap());
		set({
			phase: "posting",
			post: d.post,
			shown: Math.min(1, d.post.length),
			boot: d.boot,
			message: null
		});
	},
	advancePost: () => {
		const s = get();
		if (s.phase !== "posting") return;
		const shown = s.shown + 1;
		if (shown >= s.post.length) set({
			shown,
			phase: s.boot === "os" || s.boot === "no-disk" || s.boot === "no-display" ? "on" : "halt"
		});
		else set({ shown });
	},
	resetBuild: () => {
		const s = get();
		if (s.platform === "notebook") {
			const notebook = {};
			if (s.model === "probook") notebook["nb-m2-1"] = "ssd-nvme-500";
			set({
				notebook,
				selectedSlot: null,
				...emptyPower(),
				message: "Notebook en estado de fábrica."
			});
		} else set({
			desktop: {},
			selectedSlot: null,
			...emptyPower(),
			message: "Banco vacío."
		});
	},
	setName: (studentName) => set({ studentName }),
	setDock: (dock) => set({ dock }),
	setRightTab: (rightTab) => set({ rightTab }),
	setSound: (sound) => set({ sound }),
	setIntro: (introSeen) => set({ introSeen }),
	setGuide: (guide) => set({ guide }),
	startQuiz: () => set({
		quiz: {
			ids: shuffleQuiz(),
			index: 0,
			picked: null,
			score: 0,
			done: false
		},
		rightTab: "examen",
		dock: "examen",
		missionId: null,
		missionNote: null
	}),
	pickAnswer: (choiceId) => {
		const q = get().quiz;
		if (!q || q.picked || q.done) return;
		const questionId = q.ids[q.index];
		const question = CHOICES.find((c) => c.id === questionId);
		const score = q.score + (question?.answer === choiceId ? 1 : 0);
		set({ quiz: {
			...q,
			picked: choiceId,
			score
		} });
	},
	nextQuestion: () => {
		const s = get();
		const q = s.quiz;
		if (!q) return;
		if (q.index + 1 >= q.ids.length) {
			const entry = {
				id: `${Date.now()}`,
				name: s.studentName.trim() || "Alumno",
				title: "Cuestionario",
				score: q.score,
				total: q.ids.length,
				at: Date.now()
			};
			set({
				quiz: {
					...q,
					done: true
				},
				history: [entry, ...s.history].slice(0, 30)
			});
			return;
		}
		set({ quiz: {
			...q,
			index: q.index + 1,
			picked: null
		} });
	},
	closeQuiz: () => set({ quiz: null }),
	startMission: (id) => {
		const mission = missionById(id);
		if (!mission) return;
		const notebook = mission.platform === "notebook" ? { ...mission.setup } : get().notebook;
		const desktop = mission.platform === "desktop" ? { ...mission.setup } : get().desktop;
		set({
			missionId: id,
			missionNote: null,
			platform: mission.platform,
			model: mission.model ?? get().model,
			desktop,
			notebook,
			rightTab: "examen",
			dock: "examen",
			quiz: null,
			selectedId: null,
			selectedSlot: null,
			introSeen: true,
			...emptyPower(),
			message: mission.brief
		});
	},
	submitMission: () => {
		const s = get();
		const mission = missionById(s.missionId);
		if (!mission) return;
		const d = diagnose(s.snap());
		const score = mission.checks.map((c) => c.test(s.snap(), d)).filter(Boolean).length;
		const entry = {
			id: `${Date.now()}`,
			name: s.studentName.trim() || "Alumno",
			title: mission.title,
			score,
			total: mission.checks.length,
			at: Date.now()
		};
		set({
			missionNote: score === mission.checks.length ? "Práctica completa. Quedó registrada en este navegador." : `Entregaste ${score} de ${mission.checks.length}. Podés seguir corrigiendo y volver a entregar.`,
			history: [entry, ...s.history].slice(0, 30)
		});
	},
	clearMission: () => set({
		missionId: null,
		missionNote: null
	})
}), {
	name: "tallerpc-v1",
	partialize: (s) => ({
		platform: s.platform,
		model: s.model,
		desktop: s.desktop,
		notebook: s.notebook,
		studentName: s.studentName,
		history: s.history,
		sound: s.sound,
		introSeen: s.introSeen
	})
}));
var scenePromise = typeof window === "undefined" ? null : import("./scene-BCcG-A0F.mjs");
function BenchSlot() {
	const [Canvas, setCanvas] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let alive = true;
		(scenePromise ?? import("./scene-BCcG-A0F.mjs")).then((mod) => {
			if (alive) setCanvas(() => mod.BenchCanvas);
		});
		return () => {
			alive = false;
		};
	}, []);
	if (!Canvas) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-full place-items-center px-6 text-center text-sm text-muted",
		children: "Armando el banco 3D…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {});
}
var ICONS = {
	case: Box,
	psu: Power,
	mobo: CircuitBoard,
	cpu: Cpu,
	cooler: Fan,
	ram: MemoryStick,
	gpu: Monitor,
	storage: HardDrive,
	cable: Cable
};
function tone(ok) {
	const Ctx = window.AudioContext || window.webkitAudioContext;
	if (!Ctx) return;
	const ctx = new Ctx();
	const o = ctx.createOscillator();
	const g = ctx.createGain();
	o.type = "sine";
	o.frequency.value = ok ? 740 : 196;
	g.gain.value = .035;
	o.connect(g);
	g.connect(ctx.destination);
	o.start();
	o.stop(ctx.currentTime + (ok ? .09 : .22));
	window.setTimeout(() => void ctx.close(), 400);
}
function statusLabel(phase, boot, headline) {
	if (phase === "posting") return "POST en curso";
	if (phase === "on" && boot === "os") return "En el escritorio";
	if (phase === "on" || phase === "halt") return headline.replace("Llegaría", "Llegó");
	return headline;
}
function LabApp() {
	const phase = useLab((s) => s.phase);
	const boot = useLab((s) => s.boot);
	const message = useLab((s) => s.message);
	const introSeen = useLab((s) => s.introSeen);
	const guide = useLab((s) => s.guide);
	(0, import_react.useEffect)(() => {
		if (phase !== "posting") return;
		const id = window.setInterval(() => useLab.getState().advancePost(), 420);
		return () => window.clearInterval(id);
	}, [phase]);
	(0, import_react.useEffect)(() => {
		if (!message) return;
		const id = window.setTimeout(() => {
			if (useLab.getState().message === message) useLab.getState().setMessage(null);
		}, 4600);
		return () => window.clearTimeout(id);
	}, [message]);
	(0, import_react.useEffect)(() => {
		if (phase !== "on" && phase !== "halt") return;
		if (!useLab.getState().sound || !boot) return;
		tone(boot === "os" || boot === "no-disk");
	}, [phase, boot]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col lg:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden w-80 shrink-0 flex-col border-r border-border bg-surface lg:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pieces, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "relative min-h-52 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchSlot, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewportChrome, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden w-80 shrink-0 flex-col border-l border-border bg-surface lg:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideTabs, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileDock, {}),
			introSeen ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, {}),
			guide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guide, {}) : null
		]
	});
}
function Header() {
	const platform = useLab((s) => s.platform);
	const model = useLab((s) => s.model);
	const phase = useLab((s) => s.phase);
	const boot = useLab((s) => s.boot);
	const sound = useLab((s) => s.sound);
	const d = diagnose({
		platform,
		model,
		slots: useLab((s) => s.platform === "desktop" ? s.desktop : s.notebook)
	});
	const liveBoot = phase === "off" ? d.boot : boot ?? d.boot;
	const label = statusLabel(phase, liveBoot, d.headline);
	const good = liveBoot === "os" || liveBoot === "no-disk";
	const on = phase === "posting" || phase === "on" || phase === "halt";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-wrap items-center gap-2 border-b border-border bg-surface px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mr-auto min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-primary",
					children: "BANCO DE HARDWARE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-semibold leading-none",
					children: "TallerPC"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex rounded-lg border border-border p-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Seg, {
					active: platform === "desktop",
					onClick: () => useLab.getState().setPlatform("desktop"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "size-4" }), " Escritorio"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Seg, {
					active: platform === "notebook",
					onClick: () => useLab.getState().setPlatform("notebook"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "size-4" }), " Notebook"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `hidden max-w-56 truncate text-sm font-medium sm:block ${good ? "text-ok" : "text-danger"}`,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: `inline-flex min-h-11 items-center gap-2 rounded-lg px-4 font-semibold ${on ? "bg-surface-2 text-fg" : "bg-primary text-primary-fg"}`,
				onClick: () => useLab.getState().powerToggle(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "size-4" }), on ? "Apagar" : "Encender"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border",
				onClick: () => useLab.getState().setSound(!sound),
				"aria-label": sound ? "Silenciar" : "Activar sonido",
				children: sound ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm",
				onClick: () => useLab.getState().setGuide(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), " Guía"]
			})
		]
	});
}
function Seg({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `inline-flex min-h-11 items-center gap-1.5 rounded-md px-3 text-sm font-medium ${active ? "bg-primary text-primary-fg" : "text-muted"}`,
		children
	});
}
function Pieces() {
	const platform = useLab((s) => s.platform);
	const model = useLab((s) => s.model);
	const slots = useLab((s) => s.platform === "desktop" ? s.desktop : s.notebook);
	const selectedId = useLab((s) => s.selectedId);
	const groups = platform === "desktop" ? DESKTOP_GROUPS : NOTEBOOK_GROUPS;
	const snap = {
		platform,
		model,
		slots
	};
	const selected = selectedId ? PARTS[selectedId] : void 0;
	const fits = selected ? preferredSlots(selected.id, snap) : [];
	const emptyFit = fits.find((slot) => !slots[slot]);
	const sameFit = selected ? fits.find((slot) => slots[slot] === selected.id) : void 0;
	const placeTarget = emptyFit ?? sameFit ?? fits[0];
	const placeLabel = !fits.length ? "No entra en este equipo" : emptyFit ? `Colocar en ${SLOT_LABEL[emptyFit]}` : sameFit ? "Sacar del banco" : `Reemplazar en ${SLOT_LABEL[placeTarget]}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Bandeja de piezas"
				}), platform === "notebook" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-xs text-muted",
					children: ["Modelo", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "ml-2 rounded-md border border-border bg-bg px-2 py-1 text-sm text-fg",
						value: model,
						onChange: (e) => useLab.getState().setModel(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "aulabook",
							children: "AulaBook 14"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "probook",
							children: "ProBook 16"
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs text-muted",
					children: [diagnose(snap).credits, " cr"]
				})]
			}),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: selected.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-snug text-muted",
						children: selected.lesson
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: fits.length === 0,
						className: "mt-2 min-h-11 w-full rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg disabled:opacity-40",
						onClick: () => {
							if (!placeTarget) {
								useLab.getState().setMessage("No hay un zócalo compatible.");
								return;
							}
							useLab.getState().place(placeTarget);
						},
						children: placeLabel
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-b border-border px-3 py-2 text-sm text-muted",
				children: "Elegí una pieza. El zócalo compatible se pone ámbar."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-3 py-2",
				children: groups.map((group) => {
					const parts = partsForGroup(platform, group.id, Boolean(slots.psu));
					if (group.id === "cable" && platform === "desktop" && !slots.psu) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: "Los cables aparecen cuando instalás la fuente."
					}, group.id);
					if (!parts.length) return null;
					const Icon = ICONS[group.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mb-1.5 flex items-center gap-1.5 font-mono text-xs tracking-wide text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }),
								" ",
								group.label
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-1.5",
							children: parts.map((part) => {
								const on = selectedId === part.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => useLab.getState().selectPart(on ? null : part.id),
									className: `w-full rounded-lg border px-3 py-2 text-left ${on ? "border-primary bg-surface-2" : "border-border bg-bg"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-baseline justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: part.name
										}), part.credits > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs text-muted",
											children: [part.credits, " cr"]
										}) : null]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block text-sm text-muted",
										children: part.short
									})]
								}) }, part.id);
							})
						})]
					}, group.id);
				})
			})
		]
	});
}
function SideTabs() {
	const tab = useLab((s) => s.rightTab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
				on: tab === "estado",
				click: () => useLab.getState().setRightTab("estado"),
				children: "Estado"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabButton, {
				on: tab === "examen",
				click: () => useLab.getState().setRightTab("examen"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-4" }), " Examen"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto",
			children: tab === "estado" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPanel, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamPanel, {})
		})]
	});
}
function TabButton({ on, click, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: click,
		className: `inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 text-sm font-medium ${on ? "border-b-2 border-primary text-fg" : "text-muted"}`,
		children
	});
}
function StatusPanel() {
	const platform = useLab((s) => s.platform);
	const model = useLab((s) => s.model);
	const slots = useLab((s) => s.platform === "desktop" ? s.desktop : s.notebook);
	const selectedSlot = useLab((s) => s.selectedSlot);
	const d = diagnose({
		platform,
		model,
		slots
	});
	const nb = NOTEBOOKS[model];
	const ratio = d.psuWatts ? Math.min(100, Math.round(d.watts / d.psuWatts * 100)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 px-3 py-3",
		children: [
			platform === "notebook" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-bg px-3 py-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: nb.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: nb.cpu
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: nb.gpu
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							"RAM soldada: ",
							nb.ramSolderedGb,
							" GB ",
							nb.memory
						]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: d.headline
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-muted",
						children: [d.credits, " cr"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"RAM ",
						d.ramGb,
						" GB · ",
						d.dualChannel ? "dual channel" : "sin dual channel",
						d.psuWatts ? ` · ${d.watts} W / ${d.psuWatts} W` : ` · ${d.watts} W`
					]
				}),
				d.psuWatts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 h-2 overflow-hidden rounded-full bg-bg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `h-full ${ratio > 100 ? "bg-danger" : ratio > 85 ? "bg-primary" : "bg-ok"}`,
						style: { width: `${Math.min(ratio, 100)}%` }
					})
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-col gap-1.5",
				children: [d.issues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-ok",
					children: "Sin advertencias. El equipo está en condiciones de llegar al sistema."
				}) : null, d.issues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: `rounded-lg border px-2.5 py-2 text-sm ${issue.level === "block" ? "border-danger text-fg" : "border-border text-muted"}`,
					children: issue.text
				}, issue.text))]
			}),
			d.loads.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-1 font-mono text-xs tracking-wide text-muted",
				children: "CARGA ESTIMADA"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "font-mono text-xs text-muted",
				children: d.loads.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between gap-2 py-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: line.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [line.watts, " W"] })]
				}, line.label))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstalledList, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Assembly, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border text-sm",
				onClick: () => useLab.getState().resetBuild(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Vaciar el banco"]
			}),
			selectedSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: ["Seleccionado: ", SLOT_LABEL[selectedSlot]]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-muted",
				children: "Simulación didáctica. Modela compatibilidad, cables, memoria y arranque. No mide FPS ni reemplaza un banco real."
			})
		]
	});
}
function InstalledList() {
	useLab((s) => s.platform);
	const slots = useLab((s) => s.platform === "desktop" ? s.desktop : s.notebook);
	const selectedSlot = useLab((s) => s.selectedSlot);
	const entries = Object.entries(slots);
	if (!entries.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Todavía no hay piezas colocadas."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-1.5 font-mono text-xs tracking-wide text-muted",
		children: "COLOCADAS"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-1",
		children: entries.map(([slot, id]) => {
			const part = PARTS[id];
			if (!part) return null;
			const on = selectedSlot === slot;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: `flex items-center gap-1 rounded-lg border px-2 py-1 ${on ? "border-primary" : "border-border"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "min-h-11 flex-1 text-left text-sm",
					onClick: () => useLab.getState().selectSlot(on ? null : slot),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: part.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: SLOT_LABEL[slot]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-11 min-w-11 items-center justify-center text-muted",
					"aria-label": `Quitar ${part.name}`,
					onClick: () => useLab.getState().remove(slot),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})]
			}, slot);
		})
	})] });
}
function Assembly() {
	const platform = useLab((s) => s.platform);
	const model = useLab((s) => s.model);
	const slots = useLab((s) => s.platform === "desktop" ? s.desktop : s.notebook);
	const d = diagnose({
		platform,
		model,
		slots
	});
	const steps = platform === "desktop" ? [
		["Fuente", Boolean(slots.psu)],
		["Placa madre", Boolean(slots.mobo)],
		["Procesador", Boolean(slots.cpu)],
		["Disipador", Boolean(slots.cooler)],
		["Memoria", Boolean(slots["ram-a1"] || slots["ram-a2"] || slots["ram-b1"] || slots["ram-b2"])],
		["Disco", Boolean(slots["m2-1"] || slots["m2-2"] || slots["sata-1"])],
		["Cable 24 pines", Boolean(slots["cable-24"])],
		["Cable EPS", Boolean(slots["cable-eps"])],
		["Llega al sistema", d.boot === "os"]
	] : [
		["Módulo SODIMM", Boolean(slots.sodimm)],
		["SSD M.2", Boolean(slots["nb-m2-1"] || slots["nb-m2-2"])],
		["Llega al sistema", d.boot === "os"]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-1.5 font-mono text-xs tracking-wide text-muted",
		children: "ORDEN SUGERIDO"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-1",
		children: steps.map(([label, done]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-2 text-sm",
			children: [done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-ok" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: done ? "text-fg" : "text-muted",
				children: label
			})]
		}, String(label)))
	})] });
}
function ExamPanel() {
	const name = useLab((s) => s.studentName);
	const quiz = useLab((s) => s.quiz);
	const missionId = useLab((s) => s.missionId);
	const missionNote = useLab((s) => s.missionNote);
	const history = useLab((s) => s.history);
	const platform = useLab((s) => s.platform);
	const model = useLab((s) => s.model);
	const slots = useLab((s) => s.platform === "desktop" ? s.desktop : s.notebook);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-muted",
					children: "Nombre en la planilla"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					placeholder: "Cómo te anoto",
					maxLength: 32,
					onChange: (e) => useLab.getState().setName(e.target.value),
					className: "min-h-11 w-full rounded-lg border border-border bg-bg px-3 text-fg"
				})]
			}),
			quiz ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizBox, {}) : null,
			missionId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionBox, {
				id: missionId,
				note: missionNote,
				snap: {
					platform,
					model,
					slots
				}
			}) : null,
			!quiz && !missionId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg",
				onClick: () => useLab.getState().startQuiz(),
				children: "Cuestionario de 6 preguntas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-1.5 font-mono text-xs tracking-wide text-muted",
				children: "PRÁCTICAS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-1.5",
				children: MISSIONS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "w-full rounded-lg border border-border bg-bg px-3 py-2 text-left",
					onClick: () => useLab.getState().startMission(m.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: m.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-sm text-muted",
						children: m.brief
					})]
				}) }, m.id))
			})] })] }) : null,
			history.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-1.5 font-mono text-xs tracking-wide text-muted",
				children: "PLANILLA DE ESTE NAVEGADOR"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-1 text-sm",
				children: history.slice(0, 6).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between gap-2 text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "truncate",
						children: [
							h.name,
							" · ",
							h.title
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-fg",
						children: [
							h.score,
							"/",
							h.total
						]
					})]
				}, h.id))
			})] }) : null
		]
	});
}
function QuizBox() {
	const quiz = useLab((s) => s.quiz);
	if (!quiz) return null;
	if (quiz.done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-bg px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-medium",
				children: [
					"Resultado: ",
					quiz.score,
					" de ",
					quiz.ids.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Quedó en la planilla. Podés rehacerlo: las preguntas se mezclan."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 min-h-11 rounded-lg border border-border px-3 text-sm",
				onClick: () => useLab.getState().closeQuiz(),
				children: "Volver"
			})
		]
	});
	const q = choiceById(quiz.ids[quiz.index] ?? "");
	if (!q) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-xs text-muted",
			children: [
				"Pregunta ",
				quiz.index + 1,
				" de ",
				quiz.ids.length
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-medium leading-snug",
			children: q.prompt
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 flex flex-col gap-1.5",
			children: q.choices.map((c) => {
				const picked = quiz.picked;
				const show = Boolean(picked);
				const correct = c.id === q.answer;
				const mine = c.id === picked;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: show,
					className: `w-full rounded-lg border px-3 py-2 text-left text-sm ${!show ? "border-border bg-bg" : correct ? "border-ok bg-bg" : mine ? "border-danger bg-bg" : "border-border opacity-50"}`,
					onClick: () => useLab.getState().pickAnswer(c.id),
					children: c.text
				}) }, c.id);
			})
		}),
		quiz.picked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-snug text-muted",
				children: q.explain
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-2 min-h-11 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg",
				onClick: () => useLab.getState().nextQuestion(),
				children: quiz.index + 1 === quiz.ids.length ? "Ver resultado" : "Siguiente"
			})]
		}) : null
	] });
}
function MissionBox({ id, note, snap }) {
	const mission = missionById(id);
	if (!mission) return null;
	const checks = gradeMission(mission, snap);
	const passed = checks.filter((c) => c.ok).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-bg px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-muted",
				children: "PRÁCTICA"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: mission.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-snug text-muted",
				children: mission.brief
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex flex-col gap-1",
				children: checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2 text-sm",
					children: [c.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-ok" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "mt-0.5 size-4 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.label })]
				}, c.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-xs text-muted",
				children: [
					passed,
					"/",
					checks.length
				]
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg",
					onClick: () => useLab.getState().submitMission(),
					children: "Entregar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 rounded-lg border border-border px-3 text-sm",
					onClick: () => useLab.getState().clearMission(),
					children: "Salir"
				})]
			})
		]
	});
}
function ViewportChrome() {
	const view = useLab((s) => s.view);
	const message = useLab((s) => s.message);
	const hover = useLab((s) => s.hoverSlot);
	const platform = useLab((s) => s.platform);
	const slots = useLab((s) => s.platform === "desktop" ? s.desktop : s.notebook);
	const selectedId = useLab((s) => s.selectedId);
	const occupant = hover ? PARTS[slots[hover] ?? ""] : void 0;
	let hint = "Arriba deja ver los zócalos. El monitor muestra el POST.";
	if (platform === "notebook") hint = "Corte didáctico: la tapa de abajo está afuera.";
	if (hover && occupant) hint = selectedId === occupant.id ? `${occupant.name} · tocá de nuevo para sacarla` : `${occupant.name} · ${SLOT_LABEL[hover]}`;
	else if (hover) hint = `${SLOT_LABEL[hover]} · elegí la pieza y tocalo`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-xs rounded-lg bg-bg/80 px-3 py-2 text-sm text-fg backdrop-blur-sm",
			children: hint
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-auto flex gap-1",
			children: [
				["tres", "3/4"],
				["banco", "Arriba"],
				["frente", "Frente"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: `min-h-11 rounded-lg px-3 text-sm ${view === id ? "bg-primary text-primary-fg" : "bg-bg/80 text-fg"}`,
				onClick: () => useLab.getState().setView(id),
				children: label
			}, id))
		})]
	}), message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "absolute inset-x-3 bottom-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm shadow-lg",
		children: message
	}) : null] });
}
function MobileDock() {
	const dock = useLab((s) => s.dock);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[46dvh] min-h-52 flex-col border-t border-border bg-surface lg:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex border-b border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
					on: dock === "piezas",
					click: () => useLab.getState().setDock("piezas"),
					children: "Piezas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
					on: dock === "estado",
					click: () => useLab.getState().setDock("estado"),
					children: "Estado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
					on: dock === "examen",
					click: () => useLab.getState().setDock("examen"),
					children: "Examen"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-y-auto",
			children: [
				dock === "piezas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pieces, {}) : null,
				dock === "estado" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPanel, {}) : null,
				dock === "examen" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamPanel, {}) : null
			]
		})]
	});
}
function Intro() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-30 flex items-end justify-center bg-bg/80 p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-2xl border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-widest text-primary",
					children: "PARA EL AULA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-2xl font-semibold",
					children: "Armá, desarmá y encendé"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "Un banco de pruebas para ver si las piezas entran, si los cables alcanzan y si la máquina llega al sistema. Después hay un cuestionario y prácticas para entregar."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-2 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "min-h-11 rounded-xl bg-primary px-3 py-3 text-left font-semibold text-primary-fg",
						onClick: () => {
							useLab.getState().setPlatform("desktop");
							useLab.getState().setIntro(true);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "mb-1 size-5" }),
							"PC de escritorio",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm font-normal",
								children: "Gabinete, fuente, placa, CPU, RAM y cables."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "min-h-11 rounded-xl border border-border bg-bg px-3 py-3 text-left font-semibold",
						onClick: () => {
							useLab.getState().setPlatform("notebook");
							useLab.getState().setIntro(true);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, { className: "mb-1 size-5" }),
							"Notebook",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm font-normal text-muted",
								children: "Sumar SODIMM y SSD. El procesador va soldado."
							})
						]
					})]
				})
			]
		})
	});
}
function Guide() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-30 flex items-end justify-center bg-bg/80 p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Cómo se usa el banco"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-3 flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Elegí escritorio o notebook arriba." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Elegí una pieza y tocá Colocar, o el recuadro ámbar en el modelo. Para sacarla, tocala otra vez en el banco." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Si no entra, el banco te dice por qué: zócalo, generación de RAM, largo o altura." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "En el escritorio, enchufá el cable de 24 pines y el EPS de 8 pines. La gráfica media y la alta piden además el PCIe." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Encendé y leé el POST en el monitor, que quedó al costado para no tapar la placa. El LED de la placa copia el del monitor. Verde: llegó al sistema. Rojo: temperatura, fuente o sin imagen. Los cables se ven salir de la fuente." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "En Examen están el cuestionario y las prácticas. La planilla queda guardada en este navegador." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "En un banco real: pulsera antiestática, fuente desenchufada, y el procesador no se empuja. El triángulo va con el triángulo del zócalo."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-4 min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg",
					onClick: () => useLab.getState().setGuide(false),
					children: "Volver al banco"
				})
			]
		})
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabApp, {});
}
//#endregion
export { SLOT_LABEL as a, partById as c, PARTS as i, ramSlotsFor as l, useLab as n, activeDesktopSlots as o, NOTEBOOKS as r, canPlace as s, routes_exports as t };
