import {
  BookOpen,
  Box,
  Cable,
  Check,
  Circle,
  CircuitBoard,
  Cpu,
  Fan,
  GraduationCap,
  HardDrive,
  KeyRound,
  Laptop,
  MemoryStick,
  Moon,
  Monitor,
  Power,
  RotateCcw,
  Sun,
  Trash2,
  Undo2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { diagnose, type BootKind } from "@/lib/hw/diagnose";
import { choiceById, gradeMission, MISSIONS, missionById } from "@/lib/hw/exams";
import {
  DESKTOP_GROUPS,
  NOTEBOOKS,
  NOTEBOOK_GROUPS,
  PARTS,
  SLOT_LABEL,
  canPlace,
  nextBuildStep,
  partsForGroup,
  preferredSlots,
  type Category,
  type SlotId,
} from "@/lib/hw/parts";
import { useLab, type Phase } from "@/lib/hw/store";

const scenePromise = typeof window === "undefined" ? null : import("./scene");

function BenchSlot() {
  const [Canvas, setCanvas] = useState<ComponentType | null>(null);
  useEffect(() => {
    let alive = true;
    void (scenePromise ?? import("./scene")).then((mod) => {
      if (alive) setCanvas(() => mod.BenchCanvas);
    });
    return () => {
      alive = false;
    };
  }, []);
  if (!Canvas) {
    return <div className="grid h-full place-items-center px-6 text-center text-sm text-muted">Armando el banco 3D…</div>;
  }
  return <Canvas />;
}

const ICONS: Record<Category, typeof Cpu> = {
  case: Box,
  psu: Power,
  mobo: CircuitBoard,
  cpu: Cpu,
  cooler: Fan,
  ram: MemoryStick,
  gpu: Monitor,
  storage: HardDrive,
  cable: Cable,
};

function tone(ok: boolean) {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = ok ? 740 : 196;
  g.gain.value = 0.035;
  o.connect(g);
  g.connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + (ok ? 0.09 : 0.22));
  window.setTimeout(() => void ctx.close(), 400);
}

function statusLabel(phase: Phase, boot: BootKind, headline: string) {
  if (phase === "posting") return "POST en curso";
  if (phase === "on" && boot === "os") return "En el escritorio";
  if (phase === "on" || phase === "halt") return headline.replace("Llegaría", "Llegó");
  return headline;
}

export function LabApp() {
  const phase = useLab((s) => s.phase);
  const boot = useLab((s) => s.boot);
  const message = useLab((s) => s.message);
  const introSeen = useLab((s) => s.introSeen);
  const guide = useLab((s) => s.guide);
  const theme = useLab((s) => s.theme);

  useEffect(() => {
    if (phase !== "posting") return;
    const id = window.setInterval(() => useLab.getState().advancePost(), 420);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (!message) return;
    const id = window.setTimeout(() => {
      if (useLab.getState().message === message) useLab.getState().setMessage(null);
    }, 4600);
    return () => window.clearTimeout(id);
  }, [message]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "claro" ? "#f3eee6" : "#14120e");
  }, [theme]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg text-fg">
      <Header />
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="hidden w-80 shrink-0 flex-col border-r border-border bg-surface lg:flex">
          <Pieces />
        </aside>
        <main className="relative min-h-52 flex-1">
          <BenchSlot />
          <ViewportChrome />
        </main>
        <aside className="hidden w-80 shrink-0 flex-col border-l border-border bg-surface lg:flex">
          <SideTabs />
        </aside>
      </div>
      <MobileDock />
      {introSeen ? null : <Intro />}
      {guide ? <Guide /> : null}
      <KeyDialog />
    </div>
  );
}

function Header() {
  const platform = useLab((s) => s.platform);
  const model = useLab((s) => s.model);
  const phase = useLab((s) => s.phase);
  const boot = useLab((s) => s.boot);
  const sound = useLab((s) => s.sound);
  const theme = useLab((s) => s.theme);
  const help = useLab((s) => s.help);
  const solved = useLab((s) => s.solved);
  const paso = help === "paso" && !solved;
  const slots = useLab((s) => (s.platform === "desktop" ? s.desktop : s.notebook));
  const d = diagnose({ platform, model, slots });
  const step = nextBuildStep({ platform, model, slots });
  const liveBoot = phase === "off" ? d.boot : (boot ?? d.boot);
  let label = statusLabel(phase, liveBoot, d.headline);
  let good = liveBoot === "os" || liveBoot === "no-disk";
  if (help === "prueba" && !solved) {
    if (phase === "off") {
      label = "Sin pistas";
      good = true;
    } else if (phase === "posting") {
      label = "Probando";
      good = true;
    } else if (boot === "os") {
      label = "Arrancó";
      good = true;
    } else {
      label = "No arrancó";
      good = false;
    }
  } else if (paso && phase === "off") {
    label = `Siguiente: ${step.label}`;
    good = true;
  }
  const on = phase === "posting" || phase === "on" || phase === "halt";

  return (
    <header className="flex flex-wrap items-center gap-2 border-b border-border bg-surface px-3 py-2">
      <div className="mr-auto min-w-0">
        <p className="font-mono text-xs tracking-widest text-primary">BANCO DE HARDWARE</p>
        <h1 className="text-lg font-semibold leading-none">TallerPC</h1>
      </div>
      <div className="flex rounded-lg border border-border p-0.5">
        <Seg active={platform === "desktop"} onClick={() => useLab.getState().setPlatform("desktop")}>
          <Monitor className="size-4" /> Escritorio
        </Seg>
        <Seg active={platform === "notebook"} onClick={() => useLab.getState().setPlatform("notebook")}>
          <Laptop className="size-4" /> Notebook
        </Seg>
      </div>
      <div className="flex rounded-lg border border-border p-0.5">
        <Seg active={help === "pistas"} onClick={() => useLab.getState().setHelp("pistas")}>
          Con pistas
        </Seg>
        <Seg active={help === "paso"} onClick={() => useLab.getState().setHelp("paso")}>
          Paso a paso
        </Seg>
        <Seg active={help === "prueba"} onClick={() => useLab.getState().setHelp("prueba")}>
          Sin pistas
        </Seg>
      </div>
      {help === "prueba" ? (
        <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm" onClick={() => useLab.getState().setKeyOpen(true)}>
          <KeyRound className="size-4" /> Resolver
        </button>
      ) : null}
      <p className={`hidden max-w-56 truncate text-sm font-medium sm:block ${good ? "text-ok" : "text-danger"}`}>{label}</p>
      <button
        type="button"
        className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-4 font-semibold ${on ? "bg-surface-2 text-fg" : "bg-primary text-primary-fg"}`}
        onClick={() => useLab.getState().powerToggle()}
      >
        <Power className="size-4" />
        {on ? "Apagar" : "Encender"}
      </button>
      <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm" onClick={() => useLab.getState().undo()}>
        <Undo2 className="size-4" /> Deshacer
      </button>
      <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border" onClick={() => useLab.getState().setTheme(theme === "claro" ? "oscuro" : "claro")} aria-label={theme === "claro" ? "Modo oscuro" : "Modo claro"}>
        {theme === "claro" ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </button>
      <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border" onClick={() => useLab.getState().setSound(!sound)} aria-label={sound ? "Silenciar" : "Activar sonido"}>
        {sound ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      </button>
      <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm" onClick={() => useLab.getState().setGuide(true)}>
        <BookOpen className="size-4" /> Guía
      </button>
    </header>
  );
}

function Seg({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-md px-3 text-sm font-medium ${active ? "bg-primary text-primary-fg" : "text-muted"}`}
    >
      {children}
    </button>
  );
}

function Pieces() {
  const platform = useLab((s) => s.platform);
  const model = useLab((s) => s.model);
  const slots = useLab((s) => (s.platform === "desktop" ? s.desktop : s.notebook));
  const selectedId = useLab((s) => s.selectedId);
  const groups = platform === "desktop" ? DESKTOP_GROUPS : NOTEBOOK_GROUPS;
  const snap = { platform, model, slots };
  const selected = selectedId ? PARTS[selectedId] : undefined;
  const hints = useLab((s) => s.help === "pistas" || s.solved);
  const paso = useLab((s) => s.help === "paso" && !s.solved);
  const step = nextBuildStep(snap);
  const fits = selected ? preferredSlots(selected.id, snap) : [];
  const emptyFit = fits.find((slot) => !slots[slot]);
  const sameFit = selected ? fits.find((slot) => slots[slot] === selected.id) : undefined;
  const placeTarget = emptyFit ?? sameFit ?? fits[0];
  const placeLabel = !fits.length
    ? "No entra en este equipo"
    : emptyFit
      ? `Colocar en ${SLOT_LABEL[emptyFit]}`
      : sameFit
        ? "Sacar del banco"
        : `Reemplazar en ${SLOT_LABEL[placeTarget!]}`;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <p className="text-sm font-medium">Bandeja de piezas</p>
        {platform === "notebook" ? (
          <label className="text-xs text-muted">
            Modelo
            <select
              className="ml-2 rounded-md border border-border bg-bg px-2 py-1 text-sm text-fg"
              value={model}
              onChange={(e) => useLab.getState().setModel(e.target.value as "aulabook" | "probook")}
            >
              <option value="aulabook">AulaBook 14</option>
              <option value="probook">ProBook 16</option>
            </select>
          </label>
        ) : (
          <p className="font-mono text-xs text-muted">{diagnose(snap).credits} cr</p>
        )}
      </div>
      {selected ? (
        <div className="border-b border-border px-3 py-2">
          <p className="text-sm font-medium">{selected.name}</p>
          {hints ? <p className="mt-1 text-sm leading-snug text-muted">{selected.lesson}</p> : <p className="mt-1 text-sm text-muted">{paso ? `Siguiente: ${step.label}.` : "Sin pistas. Colocala en el banco."}</p>}
          {hints ? (
            <button
              type="button"
              disabled={fits.length === 0}
              className="mt-2 min-h-11 w-full rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg disabled:opacity-40"
              onClick={() => {
                if (!placeTarget) {
                  useLab.getState().setMessage("No hay un zócalo compatible.");
                  return;
                }
                useLab.getState().place(placeTarget);
              }}
            >
              {placeLabel}
            </button>
          ) : paso && step.slot && selected && canPlace(selected.id, step.slot, snap).ok ? (
            <button
              type="button"
              className="mt-2 min-h-11 w-full rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg"
              onClick={() => useLab.getState().place(step.slot!)}
            >
              {`Colocar: ${step.label}`}
            </button>
          ) : (
            <p className="mt-2 text-sm text-muted">{paso ? "Esa no es la del paso. Tocá el zócalo marcado si igual querés probar." : "En este modo no se coloca sola: tocá el lugar en la placa."}</p>
          )}
        </div>
      ) : (
        <p className="border-b border-border px-3 py-2 text-sm text-muted">
          {hints ? "Elegí una pieza. El zócalo compatible se pone ámbar." : paso ? `Siguiente: ${step.label}. Solo ese zócalo está marcado.` : "Elegí una pieza y tocala en el banco. Acá no dice dónde entra."}
        </p>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
        {groups.map((group) => {
          const parts = partsForGroup(platform, group.id, Boolean(slots.psu));
          if (group.id === "cable" && platform === "desktop" && !slots.psu) {
            return (
              <p key={group.id} className="mb-3 text-sm text-muted">
                Los cables aparecen cuando instalás la fuente.
              </p>
            );
          }
          if (!parts.length) return null;
          const Icon = ICONS[group.id];
          return (
            <section key={group.id} className="mb-4">
              <h2 className="mb-1.5 flex items-center gap-1.5 font-mono text-xs tracking-wide text-muted">
                <Icon className="size-3.5" /> {group.label}
              </h2>
              <ul className="flex flex-col gap-1.5">
                {parts.map((part) => {
                  const on = selectedId === part.id;
                  return (
                    <li key={part.id}>
                      <button
                        type="button"
                        onClick={() => useLab.getState().selectPart(on ? null : part.id)}
                        className={`w-full rounded-lg border px-3 py-2 text-left ${on ? "border-primary bg-surface-2" : "border-border bg-bg"}`}
                      >
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="font-medium">{part.name}</span>
                          {part.credits > 0 ? <span className="font-mono text-xs text-muted">{part.credits} cr</span> : null}
                        </span>
                        {hints ? <span className="mt-0.5 block text-sm text-muted">{part.short}</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function SideTabs() {
  const tab = useLab((s) => s.rightTab);
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex border-b border-border">
        <TabButton on={tab === "estado"} click={() => useLab.getState().setRightTab("estado")}>
          Estado
        </TabButton>
        <TabButton on={tab === "examen"} click={() => useLab.getState().setRightTab("examen")}>
          <GraduationCap className="size-4" /> Examen
        </TabButton>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{tab === "estado" ? <StatusPanel /> : <ExamPanel />}</div>
    </div>
  );
}

function TabButton({ on, click, children }: { on: boolean; click: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={click} className={`inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 text-sm font-medium ${on ? "border-b-2 border-primary text-fg" : "text-muted"}`}>
      {children}
    </button>
  );
}

function StatusPanel() {
  const platform = useLab((s) => s.platform);
  const model = useLab((s) => s.model);
  const slots = useLab((s) => (s.platform === "desktop" ? s.desktop : s.notebook));
  const selectedSlot = useLab((s) => s.selectedSlot);
  const d = diagnose({ platform, model, slots });
  const hints = useLab((s) => s.help === "pistas" || s.solved);
  const paso = useLab((s) => s.help === "paso" && !s.solved);
  const phase = useLab((s) => s.phase);
  const boot = useLab((s) => s.boot);
  const nb = NOTEBOOKS[model];
  const ratio = d.psuWatts ? Math.min(100, Math.round((d.watts / d.psuWatts) * 100)) : 0;
  const booted = phase === "on" && boot === "os";

  if (!hints && !paso) {
    return (
      <div className="flex flex-col gap-4 px-3 py-3">
        <div className="rounded-lg border border-border bg-bg px-3 py-3 text-sm">
          <p className="font-medium">Modo sin pistas</p>
          <p className="mt-1 leading-snug text-muted">Armá y encendé. Si llega al escritorio, quedó verificado. Para salir de este modo hace falta la clave.</p>
          {phase === "posting" ? <p className="mt-2 font-medium">Probando…</p> : null}
          {phase === "on" || phase === "halt" ? (
            <p className={`mt-2 font-medium ${booted ? "text-ok" : "text-danger"}`}>{booted ? "Arrancó." : "No arrancó."}</p>
          ) : null}
        </div>
        <InstalledList />
        <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border text-sm" onClick={() => useLab.getState().setKeyOpen(true)}>
          <KeyRound className="size-4" /> Resolver con clave
        </button>
        <BenchActions />
      </div>
    );
  }

  if (paso) {
    const step = nextBuildStep({ platform, model, slots });
    return (
      <div className="flex flex-col gap-4 px-3 py-3">
        <div className="rounded-lg border border-border bg-bg px-3 py-3 text-sm">
          <p className="font-medium">Paso a paso</p>
          <p className="mt-1 leading-snug text-muted">Solo está marcado el próximo zócalo. El resto lo resolvés vos.</p>
          <p className="mt-2 font-medium text-primary">Siguiente: {step.label}</p>
        </div>
        <InstalledList />
        <BenchActions />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-3 py-3">
      {platform === "notebook" ? (
        <div className="rounded-lg border border-border bg-bg px-3 py-2 text-sm">
          <p className="font-medium">{nb.name}</p>
          <p className="mt-1 text-muted">{nb.cpu}</p>
          <p className="text-muted">{nb.gpu}</p>
          <p className="text-muted">RAM soldada: {nb.ramSolderedGb} GB {nb.memory}</p>
        </div>
      ) : null}
      <div>
        <div className="mb-1 flex items-baseline justify-between gap-2">
          <p className="text-sm font-medium">{d.headline}</p>
          <p className="font-mono text-xs text-muted">{d.credits} cr</p>
        </div>
        <p className="text-sm text-muted">
          RAM {d.ramGb} GB · {d.dualChannel ? "dual channel" : "sin dual channel"}
          {d.psuWatts ? ` · ${d.watts} W / ${d.psuWatts} W` : ` · ${d.watts} W`}
        </p>
        {d.psuWatts ? (
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg">
            <div className={`h-full ${ratio > 100 ? "bg-danger" : ratio > 85 ? "bg-primary" : "bg-ok"}`} style={{ width: `${Math.min(ratio, 100)}%` }} />
          </div>
        ) : null}
      </div>
      <ul className="flex flex-col gap-1.5">
        {d.issues.length === 0 ? <li className="text-sm text-ok">Sin advertencias. El equipo está en condiciones de llegar al sistema.</li> : null}
        {d.issues.map((issue) => (
          <li key={issue.text} className={`rounded-lg border px-2.5 py-2 text-sm ${issue.level === "block" ? "border-danger text-fg" : "border-border text-muted"}`}>
            {issue.text}
          </li>
        ))}
      </ul>
      {d.loads.length ? (
        <div>
          <h2 className="mb-1 font-mono text-xs tracking-wide text-muted">CARGA ESTIMADA</h2>
          <ul className="font-mono text-xs text-muted">
            {d.loads.map((line) => (
              <li key={line.label} className="flex justify-between gap-2 py-0.5">
                <span className="truncate">{line.label}</span>
                <span>{line.watts} W</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <InstalledList />
      <Assembly />
      <BenchActions />
      {selectedSlot ? <p className="text-xs text-muted">Seleccionado: {SLOT_LABEL[selectedSlot]}</p> : null}
      <p className="text-xs leading-relaxed text-muted">Simulación didáctica. Modela compatibilidad, cables, memoria y arranque. No mide FPS ni reemplaza un banco real.</p>
    </div>
  );
}

function BenchActions() {
  return (
    <div className="flex flex-col gap-2">
      <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border text-sm" onClick={() => useLab.getState().undo()}>
        <Undo2 className="size-4" /> Deshacer
      </button>
      <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border text-sm" onClick={() => useLab.getState().resetBuild()}>
        <RotateCcw className="size-4" /> Vaciar el banco
      </button>
    </div>
  );
}

function downloadSheet(history: { name: string; title: string; score: number; total: number; at: number }[]) {
  const cell = (value: string) => (/[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value);
  const lines = history.map((h) => [cell(h.name), cell(h.title), String(h.score), String(h.total), cell(new Date(h.at).toLocaleString("es-AR"))].join(","));
  const blob = new Blob(["\uFEFF" + ["nombre,actividad,puntaje,de,fecha", ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "tallerpc-planilla.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function InstalledList() {
  const platform = useLab((s) => s.platform);
  const slots = useLab((s) => (s.platform === "desktop" ? s.desktop : s.notebook));
  const selectedSlot = useLab((s) => s.selectedSlot);
  const entries = Object.entries(slots) as [SlotId, string][];
  if (!entries.length) return <p className="text-sm text-muted">Todavía no hay piezas colocadas.</p>;
  return (
    <div>
      <h2 className="mb-1.5 font-mono text-xs tracking-wide text-muted">COLOCADAS</h2>
      <ul className="flex flex-col gap-1">
        {entries.map(([slot, id]) => {
          const part = PARTS[id];
          if (!part) return null;
          const on = selectedSlot === slot;
          return (
            <li key={slot} className={`flex items-center gap-1 rounded-lg border px-2 py-1 ${on ? "border-primary" : "border-border"}`}>
              <button type="button" className="min-h-11 flex-1 text-left text-sm" onClick={() => useLab.getState().selectSlot(on ? null : slot)}>
                <span className="block font-medium">{part.name}</span>
                <span className="text-muted">{SLOT_LABEL[slot]}</span>
              </button>
              <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted" aria-label={`Quitar ${part.name}`} onClick={() => useLab.getState().remove(slot)}>
                <Trash2 className="size-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Assembly() {
  const platform = useLab((s) => s.platform);
  const model = useLab((s) => s.model);
  const slots = useLab((s) => (s.platform === "desktop" ? s.desktop : s.notebook));
  const d = diagnose({ platform, model, slots });
  const steps =
    platform === "desktop"
      ? [
          ["Fuente", Boolean(slots.psu)],
          ["Placa madre", Boolean(slots.mobo)],
          ["Procesador", Boolean(slots.cpu)],
          ["Disipador", Boolean(slots.cooler)],
          ["Memoria", Boolean(slots["ram-a1"] || slots["ram-a2"] || slots["ram-b1"] || slots["ram-b2"])],
          ["Disco", Boolean(slots["m2-1"] || slots["m2-2"] || slots["sata-1"])],
          ["Cable 24 pines", Boolean(slots["cable-24"])],
          ["Cable EPS", Boolean(slots["cable-eps"])],
          ["Llega al sistema", d.boot === "os"],
        ]
      : [
          ["Módulo SODIMM", Boolean(slots.sodimm)],
          ["SSD M.2", Boolean(slots["nb-m2-1"] || slots["nb-m2-2"])],
          ["Llega al sistema", d.boot === "os"],
        ];
  return (
    <div>
      <h2 className="mb-1.5 font-mono text-xs tracking-wide text-muted">ORDEN SUGERIDO</h2>
      <ul className="flex flex-col gap-1">
        {steps.map(([label, done]) => (
          <li key={String(label)} className="flex items-center gap-2 text-sm">
            {done ? <Check className="size-4 text-ok" /> : <Circle className="size-4 text-muted" />}
            <span className={done ? "text-fg" : "text-muted"}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExamPanel() {
  const name = useLab((s) => s.studentName);
  const quiz = useLab((s) => s.quiz);
  const missionId = useLab((s) => s.missionId);
  const missionNote = useLab((s) => s.missionNote);
  const history = useLab((s) => s.history);
  const platform = useLab((s) => s.platform);
  const model = useLab((s) => s.model);
  const slots = useLab((s) => (s.platform === "desktop" ? s.desktop : s.notebook));

  return (
    <div className="flex flex-col gap-4 px-3 py-3">
      <label className="text-sm">
        <span className="mb-1 block text-muted">Nombre en la planilla</span>
        <input
          value={name}
          placeholder="Cómo te anoto"
          maxLength={32}
          onChange={(e) => useLab.getState().setName(e.target.value)}
          className="min-h-11 w-full rounded-lg border border-border bg-bg px-3 text-fg"
        />
      </label>
      {quiz ? <QuizBox /> : null}
      {missionId ? (
        <MissionBox id={missionId} note={missionNote} snap={{ platform, model, slots }} />
      ) : null}
      {!quiz && !missionId ? (
        <>
          <button type="button" className="min-h-11 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg" onClick={() => useLab.getState().startQuiz()}>
            Cuestionario de 6 preguntas
          </button>
          <div>
            <h2 className="mb-1.5 font-mono text-xs tracking-wide text-muted">PRÁCTICAS</h2>
            <ul className="flex flex-col gap-1.5">
              {MISSIONS.map((m) => (
                <li key={m.id}>
                  <button type="button" className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-left" onClick={() => useLab.getState().startMission(m.id)}>
                    <span className="block font-medium">{m.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{m.brief}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
      {history.length ? (
        <div>
          <h2 className="mb-1.5 font-mono text-xs tracking-wide text-muted">PLANILLA DE ESTE NAVEGADOR</h2>
          <ul className="flex flex-col gap-1 text-sm">
            {history.slice(0, 6).map((h) => (
              <li key={h.id} className="flex justify-between gap-2 text-muted">
                <span className="truncate">{h.name} · {h.title}</span>
                <span className="font-mono text-fg">{h.score}/{h.total}</span>
              </li>
            ))}
          </ul>
          <button type="button" className="mt-2 min-h-11 w-full rounded-lg border border-border text-sm" onClick={() => downloadSheet(history)}>
            Bajar planilla
          </button>
        </div>
      ) : (
        <p className="text-sm text-muted">Cuando entreguen una práctica o terminen el cuestionario, la planilla se puede bajar.</p>
      )}
    </div>
  );
}

function QuizBox() {
  const quiz = useLab((s) => s.quiz);
  if (!quiz) return null;
  if (quiz.done) {
    return (
      <div className="rounded-lg border border-border bg-bg px-3 py-3">
        <p className="font-medium">Resultado: {quiz.score} de {quiz.ids.length}</p>
        <p className="mt-1 text-sm text-muted">Quedó en la planilla. Podés rehacerlo: las preguntas se mezclan.</p>
        <button type="button" className="mt-3 min-h-11 rounded-lg border border-border px-3 text-sm" onClick={() => useLab.getState().closeQuiz()}>
          Volver
        </button>
      </div>
    );
  }
  const q = choiceById(quiz.ids[quiz.index] ?? "");
  if (!q) return null;
  return (
    <div>
      <p className="font-mono text-xs text-muted">Pregunta {quiz.index + 1} de {quiz.ids.length}</p>
      <p className="mt-1 font-medium leading-snug">{q.prompt}</p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {q.choices.map((c) => {
          const picked = quiz.picked;
          const show = Boolean(picked);
          const correct = c.id === q.answer;
          const mine = c.id === picked;
          const cls = !show ? "border-border bg-bg" : correct ? "border-ok bg-bg" : mine ? "border-danger bg-bg" : "border-border opacity-50";
          return (
            <li key={c.id}>
              <button type="button" disabled={show} className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${cls}`} onClick={() => useLab.getState().pickAnswer(c.id)}>
                {c.text}
              </button>
            </li>
          );
        })}
      </ul>
      {quiz.picked ? (
        <div className="mt-2">
          <p className="text-sm leading-snug text-muted">{q.explain}</p>
          <button type="button" className="mt-2 min-h-11 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg" onClick={() => useLab.getState().nextQuestion()}>
            {quiz.index + 1 === quiz.ids.length ? "Ver resultado" : "Siguiente"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function MissionBox({
  id,
  note,
  snap,
}: {
  id: string;
  note: string | null;
  snap: { platform: "desktop" | "notebook"; model: "aulabook" | "probook"; slots: Partial<Record<SlotId, string>> };
}) {
  const mission = missionById(id);
  if (!mission) return null;
  const checks = gradeMission(mission, snap);
  const passed = checks.filter((c) => c.ok).length;
  const hints = useLab((s) => s.help !== "prueba" || s.solved);
  return (
    <div className="rounded-lg border border-border bg-bg px-3 py-3">
      <p className="font-mono text-xs text-muted">PRÁCTICA</p>
      <p className="font-medium">{mission.title}</p>
      <p className="mt-1 text-sm leading-snug text-muted">{mission.brief}</p>
      {hints ? (
        <ul className="mt-2 flex flex-col gap-1">
          {checks.map((c) => (
            <li key={c.label} className="flex items-start gap-2 text-sm">
              {c.ok ? <Check className="mt-0.5 size-4 shrink-0 text-ok" /> : <Circle className="mt-0.5 size-4 shrink-0 text-muted" />}
              <span>{c.label}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted">Los ítems se ven cuando el docente abre la corrección, o si volvés a Con pistas.</p>
      )}
      <p className="mt-2 font-mono text-xs text-muted">{passed}/{checks.length}</p>
      {note ? <p className="mt-2 text-sm">{note}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="min-h-11 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-fg" onClick={() => useLab.getState().submitMission()}>
          Entregar
        </button>
        <button type="button" className="min-h-11 rounded-lg border border-border px-3 text-sm" onClick={() => useLab.getState().clearMission()}>
          Salir
        </button>
      </div>
    </div>
  );
}

function ViewportChrome() {
  const view = useLab((s) => s.view);
  const message = useLab((s) => s.message);
  const hover = useLab((s) => s.hoverSlot);
  const platform = useLab((s) => s.platform);
  const slots = useLab((s) => (s.platform === "desktop" ? s.desktop : s.notebook));
  const selectedId = useLab((s) => s.selectedId);
  const hints = useLab((s) => s.help === "pistas" || s.solved);
  const paso = useLab((s) => s.help === "paso" && !s.solved);
  const occupant = hover ? PARTS[slots[hover] ?? ""] : undefined;
  let hint = hints
    ? "Doble clic en el monitor lo agranda para leer. Otro doble clic lo devuelve."
    : paso
      ? "Solo el próximo zócalo está marcado. Doble clic en el monitor lo agranda."
      : "Sin pistas. Doble clic en el monitor para leerlo. Encendé para probar.";
  if (platform === "notebook" && !hover) hint = hints ? "Corte didáctico: la tapa de abajo está afuera." : hint;
  if (hover && occupant) {
    hint = selectedId === occupant.id ? `${occupant.name} · tocá de nuevo para sacarla` : `${occupant.name} · ${SLOT_LABEL[hover]}`;
  } else if (hover) {
    hint = hints ? `${SLOT_LABEL[hover]} · elegí la pieza y tocalo` : SLOT_LABEL[hover];
  }
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
        <p className="max-w-xs rounded-lg bg-bg/80 px-3 py-2 text-sm text-fg backdrop-blur-sm">{hint}</p>
        <div className="pointer-events-auto flex gap-1">
          {(
            [
              ["tres", "3/4"],
              ["banco", "Arriba"],
              ["frente", "Frente"],
            ] as const
          ).map(([id, label]) => (
            <button key={id} type="button" className={`min-h-11 rounded-lg px-3 text-sm ${view === id ? "bg-primary text-primary-fg" : "bg-bg/80 text-fg"}`} onClick={() => useLab.getState().setView(id)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      {message ? (
        <p className="absolute inset-x-3 bottom-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm shadow-lg">{message}</p>
      ) : null}
    </>
  );
}

function MobileDock() {
  const dock = useLab((s) => s.dock);
  return (
    <div className="flex h-[46dvh] min-h-52 flex-col border-t border-border bg-surface lg:hidden">
      <div className="flex border-b border-border">
        <TabButton on={dock === "piezas"} click={() => useLab.getState().setDock("piezas")}>Piezas</TabButton>
        <TabButton on={dock === "estado"} click={() => useLab.getState().setDock("estado")}>Estado</TabButton>
        <TabButton on={dock === "examen"} click={() => useLab.getState().setDock("examen")}>Examen</TabButton>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {dock === "piezas" ? <Pieces /> : null}
        {dock === "estado" ? <StatusPanel /> : null}
        {dock === "examen" ? <ExamPanel /> : null}
      </div>
    </div>
  );
}

function KeyDialog() {
  const open = useLab((s) => s.keyOpen);
  const solved = useLab((s) => s.solved);
  const pending = useLab((s) => s.pendingHelp);
  const phase = useLab((s) => s.phase);
  const boot = useLab((s) => s.boot);
  const [value, setValue] = useState("");
  const [nextKey, setNextKey] = useState("");
  const [err, setErr] = useState(false);
  if (!open) return null;
  const booted = phase === "on" && boot === "os";
  return (
    <div className="absolute inset-0 z-30 flex items-end justify-center bg-bg/80 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-5">
        <p className="font-mono text-xs tracking-widest text-primary">DOCENTE</p>
        <h2 className="mt-1 text-xl font-semibold">{pending ? "Salir de Sin pistas" : "Resolver"}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {pending
            ? "El alumno no puede volver a las pistas solo. La clave del docente abre el otro modo."
            : booted
              ? "Arrancó: el armado ya está verificado, sin clave. La clave solo abre el detalle de la corrección."
              : "Si no arranca, la clave muestra por qué. Si llega al escritorio, no hace falta."}
        </p>
        {solved ? (
          <div className="mt-3 flex flex-col gap-2">
            <p className="text-sm text-ok">Corrección abierta. Estado vuelve a explicar el armado.</p>
            <label className="text-sm">
              <span className="mb-1 block text-muted">Cambiar clave (mínimo 4 letras)</span>
              <input
                type="password"
                value={nextKey}
                maxLength={32}
                onChange={(e) => setNextKey(e.target.value)}
                className="min-h-11 w-full rounded-lg border border-border bg-bg px-3"
              />
            </label>
            <button type="button" className="min-h-11 rounded-lg border border-border text-sm" onClick={() => useLab.getState().setTeacherKey(nextKey)}>
              Guardar clave
            </button>
            <button type="button" className="min-h-11 rounded-lg border border-border text-sm" onClick={() => useLab.getState().hideSolution()}>
              Ocultar otra vez
            </button>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            <input
              type="password"
              value={value}
              placeholder="Clave de docente"
              maxLength={32}
              onChange={(e) => {
                setValue(e.target.value);
                setErr(false);
              }}
              className="min-h-11 w-full rounded-lg border border-border bg-bg px-3"
            />
            {err ? <p className="text-sm text-danger">Clave incorrecta.</p> : null}
            <button
              type="button"
              className="min-h-11 rounded-lg bg-primary text-sm font-semibold text-primary-fg"
              onClick={() => setErr(!useLab.getState().tryUnlock(value))}
            >
              {pending ? "Confirmar salida" : "Abrir corrección"}
            </button>
          </div>
        )}
        <button type="button" className="mt-3 min-h-11 rounded-lg px-3 text-sm text-muted" onClick={() => useLab.getState().setKeyOpen(false)}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div className="absolute inset-0 z-30 flex items-end justify-center bg-bg/80 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-5">
        <p className="font-mono text-xs tracking-widest text-primary">PARA EL AULA</p>
        <h2 className="mt-1 text-2xl font-semibold">Armá, desarmá y encendé</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Un banco de pruebas para ver si las piezas entran, si los cables alcanzan y si la máquina llega al sistema. Después hay un cuestionario y prácticas para entregar.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button type="button" className="min-h-11 rounded-xl bg-primary px-3 py-3 text-left font-semibold text-primary-fg" onClick={() => { useLab.getState().setPlatform("desktop"); useLab.getState().setIntro(true); }}>
            <Monitor className="mb-1 size-5" />
            PC de escritorio
            <span className="mt-1 block text-sm font-normal">Gabinete, fuente, placa, CPU, RAM y cables.</span>
          </button>
          <button type="button" className="min-h-11 rounded-xl border border-border bg-bg px-3 py-3 text-left font-semibold" onClick={() => { useLab.getState().setPlatform("notebook"); useLab.getState().setIntro(true); }}>
            <Laptop className="mb-1 size-5" />
            Notebook
            <span className="mt-1 block text-sm font-normal text-muted">Sumar SODIMM y SSD. El procesador va soldado.</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Guide() {
  return (
    <div className="absolute inset-0 z-30 flex items-end justify-center bg-bg/80 p-4 sm:items-center">
      <div className="max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-xl font-semibold">Cómo se usa el banco</h2>
        <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-muted">
          <li>Elegí escritorio o notebook arriba.</li>
          <li>Elegí una pieza y tocá Colocar, o el recuadro ámbar en el modelo. Para sacarla, tocala otra vez en el banco.</li>
          <li>Con pistas se ve todo. Paso a paso marca solo el próximo zócalo. Sin pistas no marca nada, y salir pide la clave. La inicial es docente.</li>
          <li>Los zócalos dicen CPU, A2, EPS y 24 pines. Deshacer vuelve un paso atrás. La planilla se baja desde Examen.</li>
          <li>En el escritorio, enchufá el cable de 24 pines y el EPS de 8 pines. La gráfica media y la alta piden además el PCIe.</li>
          <li>Encendé y leé el monitor. Doble clic lo pone grande; otro doble clic lo vuelve al banco. Verde: llegó al sistema. Rojo: temperatura, fuente o sin imagen.</li>
          <li>En Examen están el cuestionario y las prácticas. La planilla queda guardada en este navegador.</li>
        </ol>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          En un banco real: pulsera antiestática, fuente desenchufada, y el procesador no se empuja. El triángulo va con el triángulo del zócalo.
        </p>
        <button type="button" className="mt-4 min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg" onClick={() => useLab.getState().setGuide(false)}>
          Volver al banco
        </button>
      </div>
    </div>
  );
}
