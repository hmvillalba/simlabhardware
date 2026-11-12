import { create } from "zustand";
import { persist } from "zustand/middleware";
import { diagnose, type BootKind } from "./diagnose";
import { CHOICES, missionById } from "./exams";
import {
  NOTEBOOKS,
  canPlace,
  tidyAfterPlace,
  tidyAfterRemove,
  type ModelId,
  type Platform,
  type SlotId,
  type Slots,
  type Snap,
} from "./parts";

export type Phase = "off" | "posting" | "on" | "halt";
export type ViewId = "banco" | "tres" | "frente";
export type Dock = "piezas" | "estado" | "examen";

export type HelpMode = "pistas" | "paso" | "prueba";
export type ThemeMode = "oscuro" | "claro";

export type HistoryEntry = {
  id: string;
  name: string;
  title: string;
  score: number;
  total: number;
  at: number;
};

type Quiz = {
  ids: string[];
  index: number;
  picked: string | null;
  score: number;
  done: boolean;
};

type LabState = {
  platform: Platform;
  model: ModelId;
  desktop: Slots;
  notebook: Slots;
  selectedId: string | null;
  selectedSlot: SlotId | null;
  hoverSlot: SlotId | null;
  message: string | null;
  view: ViewId;
  phase: Phase;
  post: string[];
  shown: number;
  boot: BootKind | null;
  studentName: string;
  dock: Dock;
  rightTab: "estado" | "examen";
  quiz: Quiz | null;
  missionId: string | null;
  missionNote: string | null;
  history: HistoryEntry[];
  sound: boolean;
  theme: ThemeMode;
  introSeen: boolean;
  guide: boolean;
  help: HelpMode;
  solved: boolean;
  teacherKey: string;
  keyOpen: boolean;
  pendingHelp: HelpMode | null;
  past: Array<{ desktop: Slots; notebook: Slots }>;
  snap: () => Snap;
  setPlatform: (p: Platform) => void;
  setModel: (m: ModelId) => void;
  selectPart: (id: string | null) => void;
  selectSlot: (slot: SlotId | null) => void;
  setHover: (slot: SlotId | null) => void;
  setMessage: (text: string | null) => void;
  setView: (v: ViewId) => void;
  place: (slot: SlotId) => void;
  remove: (slot: SlotId) => void;
  powerToggle: () => void;
  advancePost: () => void;
  resetBuild: () => void;
  setName: (name: string) => void;
  setDock: (d: Dock) => void;
  setRightTab: (t: "estado" | "examen") => void;
  setSound: (on: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  setIntro: (seen: boolean) => void;
  setGuide: (open: boolean) => void;
  setHelp: (help: HelpMode) => void;
  tryUnlock: (key: string) => boolean;
  hideSolution: () => void;
  setTeacherKey: (key: string) => void;
  setKeyOpen: (open: boolean) => void;
  undo: () => void;
  startQuiz: () => void;
  pickAnswer: (choiceId: string) => void;
  nextQuestion: () => void;
  closeQuiz: () => void;
  startMission: (id: string) => void;
  submitMission: () => void;
  clearMission: () => void;
};

function emptyPower() {
  return { phase: "off" as Phase, post: [] as string[], shown: 0, boot: null as BootKind | null };
}

function remember(s: { past: Array<{ desktop: Slots; notebook: Slots }>; desktop: Slots; notebook: Slots }) {
  return [...s.past, { desktop: { ...s.desktop }, notebook: { ...s.notebook } }].slice(-25);
}

function shuffleQuiz(): string[] {
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

export const useLab = create<LabState>()(
  persist(
    (set, get) => ({
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
      theme: "oscuro",
      introSeen: false,
      guide: false,
      help: "pistas",
      solved: false,
      teacherKey: "docente",
      keyOpen: false,
      pendingHelp: null,
      past: [],
      snap: () => {
        const s = get();
        return {
          platform: s.platform,
          model: s.model,
          slots: s.platform === "desktop" ? s.desktop : s.notebook,
        };
      },
      setPlatform: (platform) => set({ platform, ...emptyPower(), message: null, selectedSlot: null }),
      setModel: (model) => {
        const notebook: Slots = {};
        if (model === "probook") notebook["nb-m2-1"] = "ssd-nvme-500";
        set({
          model,
          notebook,
          platform: "notebook",
          ...emptyPower(),
          message: NOTEBOOKS[model].lesson,
          selectedSlot: null,
        });
      },
      selectPart: (selectedId) => set({ selectedId, selectedSlot: null }),
      selectSlot: (selectedSlot) => set({ selectedSlot }),
      setHover: (hoverSlot) => set({ hoverSlot }),
      setMessage: (message) => set({ message }),
      setView: (view) => set({ view }),
      place: (slot) => {
        const s = get();
        const partId = s.selectedId;
        const occ = s.snap().slots[slot];
        if (!partId) {
          const hints = s.help === "pistas" || s.solved;
          if (occ) set({ selectedId: occ, selectedSlot: slot, message: hints ? "Pieza seleccionada. Tocá el mismo zócalo para sacarla." : "Pieza del banco. Tocá de nuevo para sacarla." });
          else set({ message: hints ? "Elegí una pieza en la bandeja y tocá el zócalo ámbar." : "Elegí una pieza y tocá el lugar del banco." });
          return;
        }
        if (occ === partId) {
          get().remove(slot);
          return;
        }
        const check = canPlace(partId, slot, s.snap());
        const full = s.help === "pistas" || s.solved;
        if (!check.ok) {
          set({ message: full ? check.reason : "No entra en ese lugar." });
          return;
        }
        const current = { ...s.snap().slots, [slot]: partId };
        const tidied = tidyAfterPlace(current, slot);
        const patch = s.platform === "desktop" ? { desktop: tidied.slots } : { notebook: tidied.slots };
        set({
          ...patch,
          past: remember(s),
          selectedSlot: slot,
          ...emptyPower(),
          message: full ? (tidied.note ?? "Pieza colocada.") : "Colocada.",
        });
      },
      remove: (slot) => {
        const s = get();
        const slots = tidyAfterRemove(s.snap().slots, slot);
        const patch = s.platform === "desktop" ? { desktop: slots } : { notebook: slots };
        set({
          ...patch,
          past: remember(s),
          selectedSlot: null,
          ...emptyPower(),
          message: "Pieza fuera. Lo que dependía de ella también salió.",
        });
      },
      powerToggle: () => {
        const s = get();
        if (s.phase === "posting" || s.phase === "on" || s.phase === "halt") {
          set({ ...emptyPower(), message: "Equipo apagado." });
          return;
        }
        const d = diagnose(s.snap());
        const reveal = s.help !== "prueba" || s.solved;
        const post = reveal ? d.post : ["Encendiendo…", "Probando si arranca…"];
        set({ phase: "posting", post, shown: Math.min(1, post.length), boot: d.boot, message: null });
      },
      advancePost: () => {
        const s = get();
        if (s.phase !== "posting") return;
        const shown = s.shown + 1;
        if (shown >= s.post.length) {
          const stay = s.boot === "os" || s.boot === "no-disk" || s.boot === "no-display";
          set({ shown, phase: stay ? "on" : "halt" });
        } else {
          set({ shown });
        }
      },
      resetBuild: () => {
        const s = get();
        if (s.platform === "notebook") {
          const notebook: Slots = {};
          if (s.model === "probook") notebook["nb-m2-1"] = "ssd-nvme-500";
          set({ notebook, past: remember(s), selectedSlot: null, ...emptyPower(), message: "Notebook en estado de fábrica." });
        } else {
          set({ desktop: {}, past: remember(s), selectedSlot: null, ...emptyPower(), message: "Banco vacío." });
        }
      },
      setName: (studentName) => set({ studentName }),
      setDock: (dock) => set({ dock }),
      setRightTab: (rightTab) => set({ rightTab }),
      setSound: (sound) => set({ sound }),
      setTheme: (theme) => set({ theme }),
      setIntro: (introSeen) => set({ introSeen }),
      setGuide: (guide) => set({ guide }),
      setHelp: (help) => {
        const s = get();
        if (s.help === "prueba" && !s.solved && help !== "prueba") {
          set({ keyOpen: true, pendingHelp: help, message: "Para salir de Sin pistas hace falta la clave." });
          return;
        }
        set({
          help,
          solved: false,
          keyOpen: false,
          pendingHelp: null,
          ...emptyPower(),
          message: help === "prueba" ? "Modo sin pistas. Encendé para probar." : help === "paso" ? "Paso a paso: seguí el zócalo marcado." : "Modo con pistas.",
        });
      },
      tryUnlock: (key) => {
        const s = get();
        const typed = key.trim().toLowerCase();
        if (!typed || typed !== s.teacherKey.trim().toLowerCase()) return false;
        if (s.pendingHelp) {
          const help = s.pendingHelp;
          set({
            help,
            pendingHelp: null,
            solved: false,
            keyOpen: false,
            ...emptyPower(),
            message: help === "paso" ? "Paso a paso." : "Modo con pistas.",
          });
          return true;
        }
        const d = diagnose(s.snap());
        const posting = s.phase === "posting" || s.phase === "on" || s.phase === "halt";
        set({
          solved: true,
          keyOpen: false,
          message: "Corrección abierta.",
          ...(posting ? { post: d.post, shown: d.post.length } : {}),
        });
        return true;
      },
      hideSolution: () => set({ solved: false, message: "Corrección oculta. El alumno vuelve a estar sin pistas." }),
      setTeacherKey: (key) => {
        const next = key.trim();
        if (next.length < 4) return;
        set({ teacherKey: next, message: "Clave de docente actualizada en este navegador." });
      },
      setKeyOpen: (keyOpen) => set(keyOpen ? { keyOpen } : { keyOpen: false, pendingHelp: null }),
      undo: () => {
        const s = get();
        const prev = s.past[s.past.length - 1];
        if (!prev) {
          set({ message: "No hay nada para deshacer." });
          return;
        }
        set({
          desktop: prev.desktop,
          notebook: prev.notebook,
          past: s.past.slice(0, -1),
          selectedSlot: null,
          ...emptyPower(),
          message: "Deshecho.",
        });
      },
      startQuiz: () =>
        set({
          quiz: { ids: shuffleQuiz(), index: 0, picked: null, score: 0, done: false },
          rightTab: "examen",
          dock: "examen",
          missionId: null,
          missionNote: null,
        }),
      pickAnswer: (choiceId) => {
        const q = get().quiz;
        if (!q || q.picked || q.done) return;
        const questionId = q.ids[q.index];
        const question = CHOICES.find((c) => c.id === questionId);
        const score = q.score + (question?.answer === choiceId ? 1 : 0);
        set({ quiz: { ...q, picked: choiceId, score } });
      },
      nextQuestion: () => {
        const s = get();
        const q = s.quiz;
        if (!q) return;
        if (q.index + 1 >= q.ids.length) {
          const entry: HistoryEntry = {
            id: `${Date.now()}`,
            name: s.studentName.trim() || "Alumno",
            title: "Cuestionario",
            score: q.score,
            total: q.ids.length,
            at: Date.now(),
          };
          set({ quiz: { ...q, done: true }, history: [entry, ...s.history].slice(0, 30) });
          return;
        }
        set({ quiz: { ...q, index: q.index + 1, picked: null } });
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
          message: mission.brief,
        });
      },
      submitMission: () => {
        const s = get();
        const mission = missionById(s.missionId);
        if (!mission) return;
        const d = diagnose(s.snap());
        const results = mission.checks.map((c) => c.test(s.snap(), d));
        const score = results.filter(Boolean).length;
        const entry: HistoryEntry = {
          id: `${Date.now()}`,
          name: s.studentName.trim() || "Alumno",
          title: mission.title,
          score,
          total: mission.checks.length,
          at: Date.now(),
        };
        const note =
          score === mission.checks.length
            ? "Práctica completa. Quedó registrada en este navegador."
            : `Entregaste ${score} de ${mission.checks.length}. Podés seguir corrigiendo y volver a entregar.`;
        set({ missionNote: note, history: [entry, ...s.history].slice(0, 30) });
      },
      clearMission: () => set({ missionId: null, missionNote: null }),
    }),
    {
      name: "tallerpc-v1",
      partialize: (s) => ({
        platform: s.platform,
        model: s.model,
        desktop: s.desktop,
        notebook: s.notebook,
        studentName: s.studentName,
        history: s.history,
        sound: s.sound,
        theme: s.theme,
        introSeen: s.introSeen,
        help: s.help,
        teacherKey: s.teacherKey,
      }),
    },
  ),
);
