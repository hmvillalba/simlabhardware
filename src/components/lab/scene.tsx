import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { BootKind } from "@/lib/hw/diagnose";
import { diagnose } from "@/lib/hw/diagnose";
import {
  NOTEBOOKS,
  PARTS,
  SLOT_LABEL,
  activeDesktopSlots,
  canPlace,
  partById,
  ramSlotsFor,
  nextBuildStep,
  type Part,
  type SlotId,
} from "@/lib/hw/parts";
import { useLab, type Phase, type ViewId } from "@/lib/hw/store";

type V3 = [number, number, number];

const VIEWS: Record<ViewId, { pos: V3; target: V3 }> = {
  banco: { pos: [0.1, 5.4, 0.15], target: [0.05, 0, 0] },
  tres: { pos: [3.15, 2.55, 3.35], target: [0.05, 0.28, 0] },
  frente: { pos: [0.05, 1.7, 4.35], target: [0.05, 0.32, -0.05] },
};

function RigControls() {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as { target: THREE.Vector3; update: () => void } | null;
  const view = useLab((s) => s.view);
  useEffect(() => {
    const dest = VIEWS[view];
    camera.position.set(dest.pos[0], dest.pos[1], dest.pos[2]);
    camera.lookAt(dest.target[0], dest.target[1], dest.target[2]);
    if (!controls) return;
    controls.target.set(dest.target[0], dest.target[1], dest.target[2]);
    controls.update();
  }, [view, camera, controls]);
  return (
    <OrbitControls
      makeDefault
      enableDamping
      dampingFactor={0.14}
      maxPolarAngle={Math.PI / 2.08}
      minDistance={2.2}
      maxDistance={9}
      target={[0.05, 0.28, 0]}
    />
  );
}

function makeWood() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d");
  if (!g) return new THREE.CanvasTexture(c);
  g.fillStyle = "#5a4332";
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 48; i++) {
    g.strokeStyle = `rgba(42, 24, 12, ${0.06 + (i % 4) * 0.03})`;
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(0, i * 11);
    g.bezierCurveTo(160, i * 11 + 8, 340, i * 11 - 6, 512, i * 11 + 3);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1.6, 1.6);
  return t;
}

function makePcb(socket: string, dimms: number) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 896;
  const g = c.getContext("2d");
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  if (!g) return tex;
  g.fillStyle = "#1a7a43";
  g.fillRect(0, 0, 1024, 896);
  for (let i = 0; i < 1400; i++) {
    g.fillStyle = i % 4 === 0 ? "rgba(255,255,255,0.03)" : "rgba(0,40,12,0.07)";
    g.fillRect((i * 47) % 1024, (i * 19) % 896, 2, 2);
  }
  g.strokeStyle = "rgba(214, 170, 78, 0.28)";
  g.lineWidth = 1.5;
  for (let i = 0; i < 28; i++) {
    g.beginPath();
    g.moveTo(30 + (i % 7) * 22, 30);
    g.lineTo(160 + i * 18, 280);
    g.lineTo(80 + (i % 11) * 40, 860);
    g.stroke();
  }
  g.strokeStyle = "rgba(230, 245, 230, 0.55)";
  g.lineWidth = 3;
  g.strokeRect(18, 18, 988, 860);
  g.fillStyle = "#e8f6ea";
  g.font = "700 34px sans-serif";
  g.fillText(socket, 48, 64);
  g.font = "600 22px sans-serif";
  g.fillText("CPU", 300, 210);
  g.fillText(dimms === 4 ? "A1   A2   B1   B2" : "A2          B2", 560, 150);
  g.fillText("M.2", 150, 470);
  g.fillText("PCIe x16", 340, 690);
  g.fillText("24 pin", 760, 620);
  g.fillText("EPS", 48, 800);
  g.fillStyle = "#0e4e2c";
  g.fillRect(470, 300, 150, 90);
  g.fillStyle = "#d7c7a4";
  g.font = "600 20px sans-serif";
  g.fillText("chipset", 498, 352);
  tex.needsUpdate = true;
  return tex;
}

function useLabel(text: string) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 160;
    const g = c.getContext("2d");
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    if (!g) return t;
    g.fillStyle = "rgba(20, 16, 12, 0.82)";
    g.beginPath();
    g.roundRect(8, 28, 496, 104, 28);
    g.fill();
    g.fillStyle = "#f3ead7";
    g.font = "600 54px sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(text, 256, 82);
    t.needsUpdate = true;
    return t;
  }, [text]);
}

function Label({ text, position, scale = 0.72 }: { text: string; position: V3; scale?: number }) {
  const map = useLabel(text);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <sprite position={position} scale={[scale, scale * 0.3, 1]}>
      <spriteMaterial map={map} transparent depthWrite={false} />
    </sprite>
  );
}

function Fan({ radius = 0.16 }: { radius?: number }) {
  const ref = useRef<THREE.Group>(null);
  const reduce = useRef(false);
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  useFrame((_, delta) => {
    const phase = useLab.getState().phase;
    const spin = phase === "posting" || phase === "on";
    if (!ref.current || !spin || reduce.current) return;
    ref.current.rotation.y += Math.min(delta, 0.1) * (14 + radius * 10);
  });
  const blades = [0, 1, 2, 3, 4, 5];
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[radius * 1.05, radius * 1.05, 0.018, 24]} />
        <meshStandardMaterial color="#1a1c1e" metalness={0.4} roughness={0.45} />
      </mesh>
      <group ref={ref}>
        {blades.map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 3, 0]} position={[0, 0.012, 0]}>
            <boxGeometry args={[radius * 0.22, 0.01, radius * 1.65]} />
            <meshStandardMaterial color="#d9d3c5" metalness={0.35} roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[radius * 0.2, radius * 0.2, 0.02, 16]} />
          <meshStandardMaterial color="#e2a23a" metalness={0.5} roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
}

function PartMesh({ part }: { part: Part }) {
  if (part.category === "cpu") {
    return (
      <group>
        <mesh castShadow position={[0, 0.02, 0]}>
          <boxGeometry args={[0.32, 0.04, 0.32]} />
          <meshStandardMaterial color="#c5ccd2" metalness={0.85} roughness={0.22} />
        </mesh>
        <mesh position={[-0.11, 0.045, -0.11]}>
          <boxGeometry args={[0.05, 0.012, 0.05]} />
          <meshStandardMaterial color="#e2a23a" emissive="#e2a23a" emissiveIntensity={0.35} />
        </mesh>
      </group>
    );
  }
  if (part.category === "cooler") {
    if (part.id === "cool-aio") {
      return (
        <group>
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[0.36, 0.05, 0.36]} />
            <meshStandardMaterial color="#1c1914" metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0.16, 0.14, 0]} rotation={[0, 0, 0.5]}>
            <cylinderGeometry args={[0.025, 0.025, 0.28, 8]} />
            <meshStandardMaterial color="#e2a23a" />
          </mesh>
          <mesh position={[-0.16, 0.14, 0]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.025, 0.025, 0.28, 8]} />
            <meshStandardMaterial color="#e2a23a" />
          </mesh>
          <mesh castShadow position={[0, 0.3, 0]}>
            <boxGeometry args={[0.95, 0.08, 0.32]} />
            <meshStandardMaterial color="#2a2e33" metalness={0.45} roughness={0.4} />
          </mesh>
          <group position={[0, 0.36, 0]}>
            <Fan radius={0.14} />
          </group>
        </group>
      );
    }
    const low = part.coolerHeight != null && part.coolerHeight < 80;
    const h = low ? 0.22 : part.id === "cool-tower" ? 0.62 : 0.28;
    return (
      <group>
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.4, 0.04, 0.4]} />
          <meshStandardMaterial color="#9aa3a8" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh castShadow position={[0, 0.06 + h / 2, 0]}>
          <boxGeometry args={low ? [0.7, h, 0.7] : [0.46, h, 0.38]} />
          <meshStandardMaterial color="#cfd5da" metalness={0.55} roughness={0.32} />
        </mesh>
        <group position={[0, 0.08 + h, 0]}>
          <Fan radius={low ? 0.22 : 0.16} />
        </group>
      </group>
    );
  }
  if (part.category === "ram") {
    const ddr5 = part.memory === "DDR5";
    const tall = part.stick === "dimm";
    const h = !tall ? 0.12 : (part.capacityGb ?? 8) <= 4 ? 0.26 : 0.38;
    return (
      <group>
        <mesh castShadow position={[0, tall ? h / 2 + 0.02 : 0.08, 0]}>
          <boxGeometry args={tall ? [0.036, h, 0.68] : [0.62, 0.1, 0.24]} />
          <meshStandardMaterial color={ddr5 ? "#17191d" : "#173528"} metalness={0.25} roughness={0.55} />
        </mesh>
        <mesh position={[0, tall ? 0.035 : 0.03, 0]}>
          <boxGeometry args={tall ? [0.012, 0.02, 0.58] : [0.5, 0.02, 0.18]} />
          <meshStandardMaterial color="#d4b56a" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>
    );
  }
  if (part.category === "gpu") {
    const len = part.gpuLength && part.gpuLength > 300 ? 1.18 : part.gpuLength && part.gpuLength > 220 ? 0.96 : 0.74;
    const fans = len > 0.9 ? [-0.22, 0.22] : [0];
    return (
      <group>
        <mesh castShadow position={[0, 0.07, 0]}>
          <boxGeometry args={[len, 0.09, 0.2]} />
          <meshStandardMaterial color="#1c1f24" metalness={0.5} roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.015, 0.02]}>
          <boxGeometry args={[0.46, 0.012, 0.045]} />
          <meshStandardMaterial color="#d4b56a" metalness={0.85} roughness={0.22} />
        </mesh>
        <mesh position={[-len / 2 + 0.015, 0.1, 0]} castShadow>
          <boxGeometry args={[0.03, 0.2, 0.14]} />
          <meshStandardMaterial color="#c5ccd1" metalness={0.75} roughness={0.28} />
        </mesh>
        {fans.map((x) => (
          <group key={x} position={[x, 0.125, 0]}>
            <Fan radius={0.075} />
          </group>
        ))}
      </group>
    );
  }
  if (part.category === "storage") {
    if (part.storageKind === "nvme") {
      return (
        <mesh castShadow position={[0, 0.015, 0]}>
          <boxGeometry args={[0.62, 0.02, 0.16]} />
          <meshStandardMaterial color="#1b4a34" metalness={0.3} roughness={0.45} />
        </mesh>
      );
    }
    if (part.storageKind === "hdd") {
      return (
        <mesh castShadow>
          <boxGeometry args={[0.72, 0.16, 0.5]} />
          <meshStandardMaterial color="#2c3136" metalness={0.5} roughness={0.4} />
        </mesh>
      );
    }
    return (
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.06, 0.48]} />
        <meshStandardMaterial color="#3d4650" metalness={0.4} roughness={0.45} />
      </mesh>
    );
  }
  if (part.category === "psu") {
    const watts = part.psuWatts ?? 0;
    const gamer = watts >= 800;
    const weak = watts <= 350;
    const body = gamer ? "#1c1914" : weak ? "#4a463c" : "#2a2e33";
    const stripe = gamer ? "#e2a23a" : weak ? "#6b5a42" : "#3dba7a";
    return (
      <group>
        <mesh castShadow>
          <boxGeometry args={[0.68, 0.52, 0.86]} />
          <meshStandardMaterial color={body} metalness={0.35} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.16, 0.44]}>
          <boxGeometry args={[0.52, 0.05, 0.02]} />
          <meshStandardMaterial color={stripe} emissive={stripe} emissiveIntensity={gamer ? 0.35 : 0.12} />
        </mesh>
        <group position={[0.34, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <Fan radius={0.16} />
        </group>
      </group>
    );
  }
  if (part.category === "mobo") return <Motherboard part={part} />;
  if (part.category === "case") {
    return (
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.28, 0.08, 0.16]} />
        <meshStandardMaterial color="#e2a23a" emissive="#e2a23a" emissiveIntensity={0.25} metalness={0.3} roughness={0.45} />
      </mesh>
    );
  }
  if (part.category === "cable") {
    return (
      <group>
        <mesh castShadow position={[0, 0.045, 0]}>
          <boxGeometry args={[0.28, 0.07, 0.14]} />
          <meshStandardMaterial color="#141210" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <boxGeometry args={[0.18, 0.02, 0.08]} />
          <meshStandardMaterial color="#e2a23a" emissive="#e2a23a" emissiveIntensity={0.25} />
        </mesh>
      </group>
    );
  }
  return (
    <mesh castShadow position={[0, 0.05, 0]}>
      <boxGeometry args={[0.28, 0.08, 0.16]} />
      <meshStandardMaterial color="#1c1a17" />
    </mesh>
  );
}

function Motherboard({ part }: { part: Part }) {
  const tex = useMemo(() => makePcb(part.socket ?? "PCB", part.dimmSlots ?? 2), [part.socket, part.dimmSlots]);
  useEffect(() => () => tex.dispose(), [tex]);
  const posts: V3[] = [
    [-1.02, -0.02, -0.88],
    [1.02, -0.02, -0.88],
    [-1.02, -0.02, 0.88],
    [1.02, -0.02, 0.88],
  ];
  const dimmX = part.dimmSlots === 4 ? [0.26, 0.4, 0.54, 0.68] : [0.36, 0.52];
  const caps = [-0.55, -0.42, -0.29, 0.08, 0.2];
  const chokes = [-0.58, -0.46, -0.34];
  return (
    <group>
      {posts.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <cylinderGeometry args={[0.04, 0.045, 0.05, 10]} />
          <meshStandardMaterial color="#d5dbe0" metalness={0.75} roughness={0.28} />
        </mesh>
      ))}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.25, 0.04, 1.95]} />
        <meshStandardMaterial color="#166b3c" roughness={0.72} metalness={0.04} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.021, 0]} receiveShadow>
        <planeGeometry args={[2.18, 1.88]} />
        <meshStandardMaterial map={tex} roughness={0.55} metalness={0.12} />
      </mesh>
      <mesh position={[-0.22, 0.045, -0.32]} castShadow>
        <boxGeometry args={[0.48, 0.03, 0.48]} />
        <meshStandardMaterial color="#c5ccd2" metalness={0.82} roughness={0.22} />
      </mesh>
      <mesh position={[-0.22, 0.06, -0.32]}>
        <boxGeometry args={[0.34, 0.02, 0.34]} />
        <meshStandardMaterial color="#8d9499" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.42, 0.07, -0.5]}>
        <boxGeometry args={[0.08, 0.02, 0.16]} />
        <meshStandardMaterial color="#9aa3a8" metalness={0.6} roughness={0.35} />
      </mesh>
      {dimmX.map((x) => (
        <mesh key={x} position={[x, 0.04, -0.22]} castShadow>
          <boxGeometry args={[0.048, 0.028, 0.74]} />
          <meshStandardMaterial color="#14161a" roughness={0.45} metalness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0.03, 0.38]} castShadow>
        <boxGeometry args={[0.48, 0.018, 0.06]} />
        <meshStandardMaterial color="#121418" roughness={0.4} metalness={0.25} />
      </mesh>
      <mesh position={[0.22, 0.028, 0.55]}>
        <boxGeometry args={[0.26, 0.014, 0.045]} />
        <meshStandardMaterial color="#1a1e24" roughness={0.45} metalness={0.2} />
      </mesh>
      <mesh position={[-0.55, 0.03, 0.08]}>
        <boxGeometry args={[0.7, 0.012, 0.18]} />
        <meshStandardMaterial color="#0e3d28" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0.9, 0.04, 0.42]}>
        <boxGeometry args={[0.22, 0.04, 0.16]} />
        <meshStandardMaterial color="#f2f4f6" roughness={0.35} />
      </mesh>
      <mesh position={[-0.9, 0.04, -0.72]}>
        <boxGeometry args={[0.2, 0.035, 0.12]} />
        <meshStandardMaterial color="#111214" roughness={0.4} />
      </mesh>
      <mesh position={[0.2, 0.05, 0.12]} castShadow>
        <boxGeometry args={[0.28, 0.04, 0.28]} />
        <meshStandardMaterial color="#b7c0c6" metalness={0.55} roughness={0.35} />
      </mesh>
      {chokes.map((x) => (
        <mesh key={`c-${x}`} position={[x, 0.06, -0.55]} castShadow>
          <boxGeometry args={[0.07, 0.06, 0.07]} />
          <meshStandardMaterial color="#2a2e28" metalness={0.55} roughness={0.4} />
        </mesh>
      ))}
      {caps.map((x) => (
        <mesh key={x} position={[x, 0.07, -0.78]} castShadow>
          <cylinderGeometry args={[0.028, 0.028, 0.07, 10]} />
          <meshStandardMaterial color="#1c1e22" metalness={0.45} roughness={0.35} />
        </mesh>
      ))}
      <group position={[0.15, 0.05, -0.92]}>
        <mesh castShadow>
          <boxGeometry args={[0.95, 0.08, 0.08]} />
          <meshStandardMaterial color="#cfd5da" metalness={0.65} roughness={0.3} />
        </mesh>
        <mesh position={[-0.28, 0.02, 0.02]}>
          <boxGeometry args={[0.16, 0.05, 0.04]} />
          <meshStandardMaterial color="#1a4f86" />
        </mesh>
        <mesh position={[0.05, 0.02, 0.02]}>
          <boxGeometry args={[0.22, 0.045, 0.04]} />
          <meshStandardMaterial color="#111214" />
        </mesh>
        <mesh position={[0.32, 0.02, 0.02]}>
          <boxGeometry args={[0.1, 0.045, 0.04]} />
          <meshStandardMaterial color="#2a2e24" metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

function Hotspot({ id, position, size }: { id: SlotId; position: V3; size: V3 }) {
  const platform = useLab((s) => s.platform);
  const model = useLab((s) => s.model);
  const slots = useLab((s) => (s.platform === "desktop" ? s.desktop : s.notebook));
  const selectedId = useLab((s) => s.selectedId);
  const selectedSlot = useLab((s) => s.selectedSlot);
  const occupant = slots[id];
  const part = partById(occupant);
  const help = useLab((s) => s.help);
  const solved = useLab((s) => s.solved);
  const full = help === "pistas" || solved;
  const paso = help === "paso" && !solved;
  const next = paso ? nextBuildStep({ platform, model, slots }).slot : null;
  const hot = next === id || (full && selectedId ? canPlace(selectedId, id, { platform, model, slots }).ok : false);
  const active = selectedSlot === id;
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        useLab.getState().place(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        useLab.getState().setHover(id);
      }}
      onPointerOut={() => {
        if (useLab.getState().hoverSlot === id) useLab.getState().setHover(null);
      }}
    >
      {part ? (
        <PartMesh part={part} />
      ) : (
        <mesh position={[0, size[1] / 2, 0]}>
          <boxGeometry args={size} />
          <meshStandardMaterial
            color={hot ? "#e2a23a" : "#2a241c"}
            emissive={hot ? "#e2a23a" : "#000000"}
            emissiveIntensity={hot ? 0.45 : 0}
            transparent
            opacity={hot ? 0.55 : 0.04}
          />
        </mesh>
      )}
      <mesh position={[0, 0.24, 0]}>
        <boxGeometry args={[Math.max(size[0], 0.36), 0.48, Math.max(size[2], 0.16)]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {active ? (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.22, 0.28, 24]} />
          <meshBasicMaterial color="#e2a23a" />
        </mesh>
      ) : null}
      {!part && hot ? <Label text={SLOT_LABEL[id]} position={[0, 0.42, 0]} /> : null}
    </group>
  );
}

function CaseShell({ compact }: { compact: boolean }) {
  const w = compact ? 3.4 : 3.85;
  const h = 1.82;
  const d = compact ? 2.45 : 2.85;
  const geo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d]);
  useEffect(() => () => geo.dispose(), [geo]);
  const posts: V3[] = [
    [-w / 2 + 0.04, 0, -d / 2 + 0.04],
    [w / 2 - 0.04, 0, -d / 2 + 0.04],
    [-w / 2 + 0.04, 0, d / 2 - 0.04],
    [w / 2 - 0.04, 0, d / 2 - 0.04],
  ];
  return (
    <group position={[0.1, 0.91, -0.02]}>
      <lineSegments geometry={geo}>
        <lineBasicMaterial color="#d7c4a4" transparent opacity={0.72} />
      </lineSegments>
      {posts.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <boxGeometry args={[0.055, h, 0.055]} />
          <meshStandardMaterial color="#2c2822" metalness={0.45} roughness={0.48} />
        </mesh>
      ))}
    </group>
  );
}

function CaseTray({ compact }: { compact: boolean }) {
  const w = compact ? 3.15 : 3.6;
  const d = compact ? 2.2 : 2.6;
  const signs = [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];
  return (
    <group position={[0.1, 0, -0.02]}>
      <mesh receiveShadow position={[0, 0.012, 0]}>
        <boxGeometry args={[w, 0.024, d]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.55} roughness={0.4} />
      </mesh>
      {signs.map((sign, i) => (
        <mesh key={i} position={[sign[0]! * (w / 2 - 0.14), 0.006, sign[1]! * (d / 2 - 0.14)]}>
          <cylinderGeometry args={[0.055, 0.07, 0.02, 12]} />
          <meshStandardMaterial color="#0e0d0b" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Cable({
  ax,
  ay,
  az,
  bx,
  by,
  bz,
  color,
}: {
  ax: number;
  ay: number;
  az: number;
  bx: number;
  by: number;
  bz: number;
  color: string;
}) {
  const geo = useMemo(() => {
    const start = new THREE.Vector3(ax, ay, az);
    const end = new THREE.Vector3(bx, by, bz);
    const mid = start.clone().lerp(end, 0.5);
    mid.y = Math.max(ay, by) + 0.42;
    const curve = new THREE.CatmullRomCurve3([start, mid, end]);
    return new THREE.TubeGeometry(curve, 22, 0.02, 6, false);
  }, [ax, ay, az, bx, by, bz]);
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <mesh geometry={geo} castShadow>
      <meshStandardMaterial color={color} roughness={0.55} metalness={0.12} />
    </mesh>
  );
}

const BOARD: V3 = [0.15, 0.06, -0.15];

function at(lx: number, y: number, lz: number): V3 {
  return [BOARD[0] + lx, y, BOARD[2] + lz];
}

function BoardMarks({ ramIds, ramX }: { ramIds: SlotId[]; ramX: number[] }) {
  const marks: Array<{ key: string; text: string; at: V3 }> = [
    { key: "cpu", text: "CPU", at: at(-0.22, 0.36, -0.62) },
    { key: "eps", text: "EPS", at: at(-0.9, 0.3, -0.48) },
    { key: "atx", text: "24 pines", at: at(0.9, 0.3, 0.64) },
    { key: "pcie", text: "PCIe", at: at(0.42, 0.28, 0.52) },
  ];
  ramIds.forEach((id, i) => {
    marks.push({ key: id, text: id.replace("ram-", "").toUpperCase(), at: at(ramX[i] ?? 0.4, 0.38, 0.24) });
  });
  return (
    <>
      {marks.map((m) => (
        <Label key={m.key} text={m.text} position={m.at} scale={0.46} />
      ))}
    </>
  );
}

function DesktopRig() {
  const slots = useLab((s) => s.desktop);
  const mobo = partById(slots.mobo);
  const ramIds = ramSlotsFor(mobo);
  const show = new Set(activeDesktopSlots(slots));
  const phase = useLab((s) => s.phase);
  const boot = useLab((s) => s.boot);
  const led = ledHex(phase, boot);
  const ramX = ramIds.length === 4 ? [0.26, 0.4, 0.54, 0.68] : [0.36, 0.52];
  return (
    <group>
      {slots.case ? <CaseTray compact={slots.case === "case-matx"} /> : null}
      {slots.case ? <CaseShell compact={slots.case === "case-matx"} /> : null}
      <Hotspot id="case" position={slots.case ? [-1.28, 0.05, 0.95] : [-2.05, 0.02, -1.15]} size={[0.4, 0.08, 0.22]} />
      <Hotspot id="psu" position={[-1.2, 0.34, 0.18]} size={[0.7, 0.48, 0.88]} />
      {mobo ? (
        <group
          position={BOARD}
          onClick={(e) => {
            e.stopPropagation();
            const s = useLab.getState();
            const picked = s.selectedId ? PARTS[s.selectedId] : undefined;
            const full = s.help === "pistas" || s.solved;
            const paso = s.help === "paso" && !s.solved;
            if (picked && picked.category !== "mobo") {
              s.setMessage(
                full
                  ? "Tocá el zócalo ámbar de esa pieza, no el centro de la placa."
                  : paso
                    ? "Tocá el zócalo marcado, no el centro de la placa."
                    : "Tocá el lugar de esa pieza, no el centro de la placa.",
              );
              return;
            }
            s.place("mobo");
          }}
        >
          <Motherboard part={mobo} />
          <mesh position={[1.02, 0.08, -0.82]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color={led} emissive={led} emissiveIntensity={phase === "off" ? 0.2 : 1.1} />
          </mesh>
        </group>
      ) : (
        <Hotspot id="mobo" position={at(0, 0.02, 0)} size={[2.25, 0.05, 1.95]} />
      )}
      {show.has("cpu") ? <Hotspot id="cpu" position={at(-0.22, 0.1, -0.32)} size={[0.4, 0.06, 0.4]} /> : null}
      {show.has("cooler") ? <Hotspot id="cooler" position={at(-0.22, 0.16, -0.32)} size={[0.5, 0.08, 0.5]} /> : null}
      {ramIds.map((id, i) => (
        <Hotspot key={id} id={id} position={at(ramX[i] ?? 0.4, 0.1, -0.22)} size={[0.07, 0.1, 0.76]} />
      ))}
      {show.has("gpu") ? <Hotspot id="gpu" position={at(0, 0.12, 0.38)} size={[0.52, 0.08, 0.12]} /> : null}
      {show.has("m2-1") ? <Hotspot id="m2-1" position={at(-0.55, 0.1, 0.08)} size={[0.7, 0.04, 0.2]} /> : null}
      {show.has("m2-2") ? <Hotspot id="m2-2" position={at(0.2, 0.1, 0.72)} size={[0.7, 0.04, 0.2]} /> : null}
      {show.has("sata-1") ? <Hotspot id="sata-1" position={at(-0.85, 0.12, 0.72)} size={[0.55, 0.08, 0.36]} /> : null}
      {show.has("cable-24") ? <Hotspot id="cable-24" position={at(0.9, 0.1, 0.42)} size={[0.34, 0.08, 0.2]} /> : null}
      {show.has("cable-eps") ? <Hotspot id="cable-eps" position={at(-0.9, 0.1, -0.72)} size={[0.34, 0.08, 0.18]} /> : null}
      {show.has("cable-pcie") ? <Hotspot id="cable-pcie" position={at(0.72, 0.22, 0.38)} size={[0.28, 0.08, 0.16]} /> : null}
      {mobo ? <BoardMarks ramIds={ramIds} ramX={ramX} /> : null}
      {slots["cable-24"] ? (
        <Cable ax={-1.05} ay={0.62} az={0.05} bx={1.05} by={0.18} bz={0.27} color="#1a1612" />
      ) : null}
      {slots["cable-eps"] ? (
        <Cable ax={-1.05} ay={0.62} az={0.28} bx={-0.75} by={0.18} bz={-0.87} color="#1a1612" />
      ) : null}
      {slots["cable-pcie"] ? (
        <Cable ax={-1.05} ay={0.62} az={0.45} bx={0.4} by={0.26} bz={0.27} color="#2a2418" />
      ) : null}
      <Monitor position={[2.28, 0.86, 1.2]} rotation={[-0.28, 0.42, 0]} />
    </group>
  );
}

function ledHex(phase: Phase, boot: BootKind | null): string {
  if (phase === "off") return "#3a3328";
  if (phase === "posting") return "#e2a23a";
  if (phase === "halt" || boot === "no-display" || boot === "thermal" || boot === "psu" || boot === "no-post") return "#e15d45";
  return "#3dba7a";
}

function useScreenTexture() {
  const post = useLab((s) => s.post);
  const shown = useLab((s) => s.shown);
  const phase = useLab((s) => s.phase);
  const boot = useLab((s) => s.boot);
  const hints = useLab((s) => s.help !== "prueba" || s.solved);
  const platform = useLab((s) => s.platform);
  const model = useLab((s) => s.model);
  const slots = useLab((s) => (s.platform === "desktop" ? s.desktop : s.notebook));
  const holder = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 640;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return { c, t };
  }, []);
  useEffect(() => {
    const g = holder.c.getContext("2d");
    if (!g) return;
    g.clearRect(0, 0, 1024, 640);
    if (phase === "on" && boot === "os") {
      paintDesktop(g, platform, model, slots);
    } else if (!hints && phase !== "off" && phase !== "posting") {
      paintNotice(g, "NO ARRANCÓ", "No llegó al sistema. El docente abre Resolver para ver la causa.", "#e15d45");
    } else if (phase === "on" && boot === "no-disk") {
      paintNotice(g, "NO HAY DISCO", "El hardware hizo POST. Falta un SSD o un HDD para entrar al sistema.", "#e2a23a");
    } else if (phase === "on" && boot === "no-display") {
      paintNotice(g, "SIN IMAGEN", "Los ventiladores giran, pero no hay señal de video.", "#e15d45");
    } else if (phase === "off") {
      g.fillStyle = "#100e0c";
      g.fillRect(0, 0, 1024, 640);
      g.fillStyle = "#e2a23a";
      g.fillRect(0, 0, 1024, 8);
      g.fillStyle = "#a89b86";
      g.font = "600 54px sans-serif";
      g.textAlign = "center";
      g.fillText("SIN SEÑAL", 512, 300);
      g.font = "500 24px sans-serif";
      g.fillText(hints ? "Encendé el equipo para ver el POST" : "Encendé para probar si arranca", 512, 360);
      g.textAlign = "left";
    } else {
      g.fillStyle = "#100e0c";
      g.fillRect(0, 0, 1024, 640);
      g.fillStyle = "#e2a23a";
      g.fillRect(0, 0, 1024, 8);
      g.font = "600 28px monospace";
      g.textAlign = "left";
      const lines = post.slice(0, shown);
      lines.forEach((line, i) => {
        const last = i === lines.length - 1;
        g.fillStyle = last && (phase === "halt" || boot === "no-display") ? "#e15d45" : last ? "#e2a23a" : "#d7eccf";
        g.fillText(line, 48, 70 + i * 46);
      });
    }
    holder.t.needsUpdate = true;
  }, [post, shown, phase, boot, platform, model, slots, holder, hints]);
  useEffect(() => () => holder.t.dispose(), [holder]);
  return holder.t;
}

function paintNotice(g: CanvasRenderingContext2D, title: string, body: string, color: string) {
  g.fillStyle = "#100e0c";
  g.fillRect(0, 0, 1024, 640);
  g.fillStyle = color;
  g.fillRect(0, 0, 1024, 8);
  g.textAlign = "center";
  g.font = "700 64px sans-serif";
  g.fillText(title, 512, 280);
  g.fillStyle = "#f3ecdf";
  g.font = "500 26px sans-serif";
  wrapText(g, body, 512, 350, 760, 36);
  g.textAlign = "left";
}

function paintDesktop(
  g: CanvasRenderingContext2D,
  platform: "desktop" | "notebook",
  model: "aulabook" | "probook",
  slots: Partial<Record<SlotId, string>>,
) {
  const report = diagnose({ platform, model, slots });
  const grd = g.createLinearGradient(0, 0, 1024, 640);
  grd.addColorStop(0, "#16343a");
  grd.addColorStop(1, "#0e1c22");
  g.fillStyle = grd;
  g.fillRect(0, 0, 1024, 640);

  g.fillStyle = "rgba(18,16,14,0.9)";
  g.beginPath();
  g.roundRect(64, 40, 896, 500, 18);
  g.fill();
  g.strokeStyle = "#e2a23a";
  g.lineWidth = 3;
  g.stroke();

  g.textAlign = "left";
  g.fillStyle = "#e2a23a";
  g.font = "700 44px sans-serif";
  g.fillText("Escritorio", 96, 104);
  g.fillStyle = "#a89b86";
  g.font = "500 22px sans-serif";
  g.fillText(platform === "notebook" ? NOTEBOOKS[model].name : "El equipo encendió y entró al sistema", 96, 142);

  const stores = Object.values(slots)
    .map((id) => partById(id))
    .filter((p): p is Part => Boolean(p && (p.category === "storage")));
  const slow = stores.length > 0 && stores.every((s) => s.storageKind === "hdd");
  const cpu = Object.values(slots).map((id) => partById(id)).find((p) => p?.category === "cpu");
  const gpu = Object.values(slots).map((id) => partById(id)).find((p) => p?.category === "gpu");
  const lines: { text: string; warn?: boolean }[] = [];
  if (platform === "notebook") {
    lines.push({ text: NOTEBOOKS[model].cpu });
    lines.push({ text: `Memoria ${report.ramGb} GB · ${report.dualChannel ? "dual channel" : "un canal"}` });
  } else if (cpu) {
    lines.push({ text: cpu.name });
    lines.push({ text: `Memoria ${report.ramGb} GB · ${report.dualChannel ? "dual channel" : "un canal"}` });
    lines.push({ text: gpu ? gpu.name : "Video por gráficos del procesador" });
  }
  if (stores.length) lines.push({ text: stores.map((s) => s.name).join(" + ") });
  if (report.psuWatts) lines.push({ text: `Fuente ${report.psuWatts} W · carga ${report.watts} W` });
  if (slow) lines.push({ text: "Arranque lento: el sistema está en un disco mecánico", warn: true });
  if (!report.dualChannel) lines.push({ text: "La memoria no está en dual channel", warn: true });

  lines.forEach((line, i) => {
    g.fillStyle = line.warn ? "#e2a23a" : "#f3ecdf";
    g.font = "600 26px sans-serif";
    g.fillText(line.text, 96, 200 + i * 42);
  });

  g.fillStyle = "#141210";
  g.fillRect(0, 568, 1024, 72);
  g.fillStyle = "#e2a23a";
  g.beginPath();
  g.roundRect(24, 582, 132, 44, 8);
  g.fill();
  g.fillStyle = "#1a140c";
  g.font = "700 22px sans-serif";
  g.fillText("Inicio", 52, 612);
  g.fillStyle = "#d7eccf";
  g.font = "600 22px sans-serif";
  g.textAlign = "right";
  g.fillText("en marcha", 990, 612);
  g.textAlign = "left";
}

function wrapText(g: CanvasRenderingContext2D, text: string, x: number, y: number, max: number, lh: number) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (g.measureText(test).width > max) {
      g.fillText(line, x, yy);
      line = w;
      yy += lh;
    } else line = test;
  }
  if (line) g.fillText(line, x, yy);
}

function useScreenZoom(hx: number, hy: number, hz: number, rx: number, ry: number, rz: number, baseH: number) {
  const ref = useRef<THREE.Group>(null);
  const zoomed = useRef(false);
  const { camera, gl } = useThree();
  const home = useMemo(() => new THREE.Vector3(hx, hy, hz), [hx, hy, hz]);
  const homeQuat = useMemo(() => new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), [rx, ry, rz]);
  const dest = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const parentQuat = useMemo(() => new THREE.Quaternion(), []);
  const face = useMemo(() => new THREE.Quaternion(), []);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    if (zoomed.current) {
      camera.getWorldDirection(dir);
      dest.copy(camera.position).addScaledVector(dir, 1.45);
      if (g.parent) g.parent.worldToLocal(dest);
      g.position.lerp(dest, 0.18);
      if (g.parent) {
        g.parent.getWorldQuaternion(parentQuat);
        face.copy(parentQuat).invert().multiply(camera.quaternion);
      } else {
        face.copy(camera.quaternion);
      }
      g.quaternion.slerp(face, 0.18);
      const persp = camera as THREE.PerspectiveCamera;
      const viewH = 2 * 1.45 * Math.tan(((persp.fov ?? 42) * Math.PI) / 360);
      const next = (viewH * 0.82) / baseH;
      g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, next, 0.18));
    } else {
      g.position.lerp(home, 0.18);
      g.quaternion.slerp(homeQuat, 0.18);
      g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, 1, 0.18));
    }
  });
  return {
    ref,
    toggle: (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      zoomed.current = !zoomed.current;
      gl.domElement.style.cursor = zoomed.current ? "zoom-out" : "zoom-in";
    },
    over: (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      gl.domElement.style.cursor = zoomed.current ? "zoom-out" : "zoom-in";
    },
    out: () => {
      gl.domElement.style.cursor = "";
    },
  };
}

function Monitor({ position, rotation = [0, 0, 0] }: { position: V3; rotation?: V3 }) {
  const map = useScreenTexture();
  const phase = useLab((s) => s.phase);
  const boot = useLab((s) => s.boot);
  const led = ledHex(phase, boot);
  const zoom = useScreenZoom(position[0], position[1], position[2], rotation[0], rotation[1], rotation[2], 0.88);
  return (
    <>
      <group position={position} rotation={rotation}>
        <mesh position={[0, -0.58, 0]}>
          <boxGeometry args={[0.08, 0.28, 0.08]} />
          <meshStandardMaterial color="#2a261f" />
        </mesh>
        <mesh position={[0, -0.74, 0]}>
          <boxGeometry args={[0.42, 0.04, 0.26]} />
          <meshStandardMaterial color="#2a261f" />
        </mesh>
      </group>
      <group
        ref={zoom.ref}
        position={position}
        rotation={rotation}
        onDoubleClick={zoom.toggle}
        onPointerOver={zoom.over}
        onPointerOut={zoom.out}
      >
        <mesh castShadow>
          <boxGeometry args={[1.45, 0.88, 0.06]} />
          <meshStandardMaterial color="#1c1914" />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[1.3, 0.74]} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>
        <mesh position={[0.62, -0.38, 0.04]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color={led} emissive={led} emissiveIntensity={phase === "off" ? 0.15 : 1} />
        </mesh>
      </group>
    </>
  );
}

function Keys() {
  const geo = useMemo(() => new THREE.BoxGeometry(0.12, 0.035, 0.11), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2c2822", roughness: 0.7 }), []);
  const ref = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3(1, 1, 1);
    const p = new THREE.Vector3();
    let i = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 11; col++) {
        p.set(-0.78 + col * 0.15, 0.11, -0.42 + row * 0.14);
        m.compose(p, q, s);
        mesh.setMatrixAt(i, m);
        i += 1;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);
  useEffect(() => {
    return () => {
      geo.dispose();
      mat.dispose();
    };
  }, [geo, mat]);
  return <instancedMesh ref={ref} args={[geo, mat, 55]} castShadow />;
}

function NotebookRig() {
  const model = useLab((s) => s.model);
  const nb = NOTEBOOKS[model];
  const map = useScreenTexture();
  const phase = useLab((s) => s.phase);
  const boot = useLab((s) => s.boot);
  const led = ledHex(phase, boot);
  const zoom = useScreenZoom(0, 0.82, 0, 0, 0, 0, 1.62);
  return (
    <group position={[0, 0, 0.15]}>
      <mesh castShadow receiveShadow position={[0, 0.06, 0.05]}>
        <boxGeometry args={[2.7, 0.12, 1.9]} />
        <meshStandardMaterial color="#3a3935" metalness={0.35} roughness={0.5} />
      </mesh>
      <Keys />
      <mesh position={[0, 0.13, 0.62]}>
        <boxGeometry args={[0.7, 0.02, 0.42]} />
        <meshStandardMaterial color="#2a2926" />
      </mesh>
      <mesh position={[0.85, 0.14, 0.15]}>
        <boxGeometry args={[0.28, 0.03, 0.18]} />
        <meshStandardMaterial color="#1d4a34" />
      </mesh>
      <Label text={`${nb.ramSolderedGb} GB soldados`} position={[0.85, 0.36, 0.15]} />
      <mesh position={[0.15, 0.1, 0.78]}>
        <boxGeometry args={[1.15, 0.05, 0.28]} />
        <meshStandardMaterial color="#2f3338" />
      </mesh>
      <Label text="batería" position={[0.15, 0.32, 0.78]} />
      <Hotspot id="sodimm" position={[-0.15, 0.14, 0.22]} size={[0.78, 0.05, 0.32]} />
      <Label text="SODIMM" position={[-0.15, 0.36, 0.22]} scale={0.5} />
      <Hotspot id="nb-m2-1" position={[-0.85, 0.14, 0.35]} size={[0.7, 0.04, 0.22]} />
      <Label text="M.2" position={[-0.85, 0.36, 0.35]} scale={0.42} />
      {nb.m2Slots === 2 ? <Hotspot id="nb-m2-2" position={[-0.85, 0.14, 0.68]} size={[0.7, 0.04, 0.22]} /> : null}
      <group position={[0, 0.12, -0.88]} rotation={[0.62, 0, 0]}>
        <group
          ref={zoom.ref}
          position={[0, 0.82, 0]}
          onDoubleClick={zoom.toggle}
          onPointerOver={zoom.over}
          onPointerOut={zoom.out}
        >
          <mesh castShadow>
            <boxGeometry args={[2.6, 1.62, 0.07]} />
            <meshStandardMaterial color="#2a2926" />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[2.4, 1.42]} />
            <meshBasicMaterial map={map} toneMapped={false} />
          </mesh>
        </group>
        <mesh position={[1.15, 0.08, 0.04]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color={led} emissive={led} emissiveIntensity={phase === "off" ? 0.15 : 1} />
        </mesh>
      </group>
    </group>
  );
}

function Lamp() {
  return (
    <group position={[-2.55, 0, -1.85]}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 1.1, 12]} />
        <meshStandardMaterial color="#2a241c" />
      </mesh>
      <mesh position={[0.4, 1.2, 0.15]} rotation={[0.2, 0, -0.7]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 8]} />
        <meshStandardMaterial color="#3a3328" />
      </mesh>
      <pointLight position={[0.85, 1.25, 0.4]} intensity={18} distance={8} color="#ffc57a" decay={2} />
    </group>
  );
}

function StudioEnv({ bright }: { bright: boolean }) {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const tex = pmrem.fromScene(room, 0.04).texture;
    scene.environment = tex;
    scene.environmentIntensity = bright ? 0.85 : 0.42;
    return () => {
      scene.environment = null;
      tex.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, bright]);
  return null;
}

function Bench() {
  const platform = useLab((s) => s.platform);
  const theme = useLab((s) => s.theme);
  const bright = theme === "claro";
  const wood = useMemo(() => makeWood(), []);
  useEffect(() => () => wood.dispose(), [wood]);
  return (
    <>
      <color attach="background" args={[bright ? "#e6e0d4" : "#14120e"]} />
      <StudioEnv bright={bright} />
      <hemisphereLight args={[bright ? "#fff8ee" : "#f3ead7", bright ? "#c9bba6" : "#2a2118", bright ? 0.9 : 0.55]} />
      <ambientLight intensity={bright ? 0.42 : 0.22} />
      <directionalLight
        position={[5, 9, 4]}
        intensity={bright ? 2.15 : 1.85}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={24}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
      />
      <directionalLight position={[-4, 3.5, 5]} intensity={bright ? 0.75 : 0.4} color={bright ? "#fff4e0" : "#f3ead7"} />
      <Lamp />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color={bright ? "#d5ccbe" : "#2a2118"} roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[4.6, 72]} />
        <meshStandardMaterial map={wood} roughness={0.88} metalness={0.02} />
      </mesh>
      <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={12} blur={2.4} far={4} />
      {platform === "desktop" ? <DesktopRig /> : <NotebookRig />}
      <RigControls />
    </>
  );
}

export function BenchCanvas() {
  const hover = useLab((s) => s.hoverSlot);
  return (
    <div className={`absolute inset-0 touch-none ${hover ? "cursor-pointer" : "cursor-grab"}`}>
      <Canvas
        shadows
        dpr={[1, 1.7]}
        camera={{ position: [3.15, 2.55, 3.35], fov: 42 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        onCreated={({ camera }) => {
          camera.lookAt(0.05, 0.28, 0);
        }}
        onPointerMissed={() => useLab.getState().selectPart(null)}
      >
        <Bench />
      </Canvas>
    </div>
  );
}
