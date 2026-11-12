import { i as __toESM } from "../_runtime.mjs";
import { O as require_jsx_runtime, S as SRGBColorSpace, T as Vector3, _ as MeshStandardMaterial, a as useThree, b as Quaternion, c as CanvasTexture, d as Euler, i as useFrame, k as require_react, l as CatmullRomCurve3, m as Matrix4, n as OrbitControls, o as PMREMGenerator, p as MathUtils, r as Canvas, s as BoxGeometry, t as ContactShadows, u as EdgesGeometry, w as TubeGeometry, x as RepeatWrapping } from "../_libs/@react-three/drei+[...].mjs";
import { a as PARTS, c as canPlace, d as ramSlotsFor, i as NOTEBOOKS, l as nextBuildStep, n as useLab, o as SLOT_LABEL, r as diagnose, s as activeDesktopSlots, u as partById } from "./routes-fZo7FTEz.mjs";
import { t as RoomEnvironment } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BG92rYHn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VIEWS = {
	banco: {
		pos: [
			.1,
			5.4,
			.15
		],
		target: [
			.05,
			0,
			0
		]
	},
	tres: {
		pos: [
			3.15,
			2.55,
			3.35
		],
		target: [
			.05,
			.28,
			0
		]
	},
	frente: {
		pos: [
			.05,
			1.7,
			4.35
		],
		target: [
			.05,
			.32,
			-.05
		]
	}
};
function RigControls() {
	const camera = useThree((s) => s.camera);
	const controls = useThree((s) => s.controls);
	const view = useLab((s) => s.view);
	(0, import_react.useEffect)(() => {
		const dest = VIEWS[view];
		camera.position.set(dest.pos[0], dest.pos[1], dest.pos[2]);
		camera.lookAt(dest.target[0], dest.target[1], dest.target[2]);
		if (!controls) return;
		controls.target.set(dest.target[0], dest.target[1], dest.target[2]);
		controls.update();
	}, [
		view,
		camera,
		controls
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
		makeDefault: true,
		enableDamping: true,
		dampingFactor: .14,
		maxPolarAngle: Math.PI / 2.08,
		minDistance: 2.2,
		maxDistance: 9,
		target: [
			.05,
			.28,
			0
		]
	});
}
function makeWood() {
	const c = document.createElement("canvas");
	c.width = 512;
	c.height = 512;
	const g = c.getContext("2d");
	if (!g) return new CanvasTexture(c);
	g.fillStyle = "#5a4332";
	g.fillRect(0, 0, 512, 512);
	for (let i = 0; i < 48; i++) {
		g.strokeStyle = `rgba(42, 24, 12, ${.06 + i % 4 * .03})`;
		g.lineWidth = 2;
		g.beginPath();
		g.moveTo(0, i * 11);
		g.bezierCurveTo(160, i * 11 + 8, 340, i * 11 - 6, 512, i * 11 + 3);
		g.stroke();
	}
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	t.wrapS = RepeatWrapping;
	t.wrapT = RepeatWrapping;
	t.repeat.set(1.6, 1.6);
	return t;
}
function makePcb(socket, dimms) {
	const c = document.createElement("canvas");
	c.width = 1024;
	c.height = 896;
	const g = c.getContext("2d");
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 8;
	if (!g) return tex;
	g.fillStyle = "#1a7a43";
	g.fillRect(0, 0, 1024, 896);
	for (let i = 0; i < 1400; i++) {
		g.fillStyle = i % 4 === 0 ? "rgba(255,255,255,0.03)" : "rgba(0,40,12,0.07)";
		g.fillRect(i * 47 % 1024, i * 19 % 896, 2, 2);
	}
	g.strokeStyle = "rgba(214, 170, 78, 0.28)";
	g.lineWidth = 1.5;
	for (let i = 0; i < 28; i++) {
		g.beginPath();
		g.moveTo(30 + i % 7 * 22, 30);
		g.lineTo(160 + i * 18, 280);
		g.lineTo(80 + i % 11 * 40, 860);
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
function useLabel(text) {
	return (0, import_react.useMemo)(() => {
		const c = document.createElement("canvas");
		c.width = 512;
		c.height = 160;
		const g = c.getContext("2d");
		const t = new CanvasTexture(c);
		t.colorSpace = SRGBColorSpace;
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
function Label({ text, position, scale = .72 }) {
	const map = useLabel(text);
	(0, import_react.useEffect)(() => () => map.dispose(), [map]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sprite", {
		position,
		scale: [
			scale,
			scale * .3,
			1
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("spriteMaterial", {
			map,
			transparent: true,
			depthWrite: false
		})
	});
}
function Fan({ radius = .16 }) {
	const ref = (0, import_react.useRef)(null);
	const reduce = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}, []);
	useFrame((_, delta) => {
		const phase = useLab.getState().phase;
		const spin = phase === "posting" || phase === "on";
		if (!ref.current || !spin || reduce.current) return;
		ref.current.rotation.y += Math.min(delta, .1) * (14 + radius * 10);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
		radius * 1.05,
		radius * 1.05,
		.018,
		24
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		color: "#1a1c1e",
		metalness: .4,
		roughness: .45
	})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		children: [[
			0,
			1,
			2,
			3,
			4,
			5
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				0,
				i * Math.PI / 3,
				0
			],
			position: [
				0,
				.012,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				radius * .22,
				.01,
				radius * 1.65
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d9d3c5",
				metalness: .35,
				roughness: .4
			})]
		}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.02,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				radius * .2,
				radius * .2,
				.02,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e2a23a",
				metalness: .5,
				roughness: .35
			})]
		})]
	})] });
}
function PartMesh({ part }) {
	if (part.category === "cpu") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		castShadow: true,
		position: [
			0,
			.02,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.32,
			.04,
			.32
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#c5ccd2",
			metalness: .85,
			roughness: .22
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			-.11,
			.045,
			-.11
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.05,
			.012,
			.05
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#e2a23a",
			emissive: "#e2a23a",
			emissiveIntensity: .35
		})]
	})] });
	if (part.category === "cooler") {
		if (part.id === "cool-aio") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.03,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.36,
					.05,
					.36
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1c1914",
					metalness: .4,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.16,
					.14,
					0
				],
				rotation: [
					0,
					0,
					.5
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.025,
					.025,
					.28,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#e2a23a" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.16,
					.14,
					0
				],
				rotation: [
					0,
					0,
					-.5
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.025,
					.025,
					.28,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#e2a23a" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				position: [
					0,
					.3,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.95,
					.08,
					.32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#2a2e33",
					metalness: .45,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					0,
					.36,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fan, { radius: .14 })
			})
		] });
		const low = part.coolerHeight != null && part.coolerHeight < 80;
		const h = low ? .22 : part.id === "cool-tower" ? .62 : .28;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.03,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.4,
					.04,
					.4
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#9aa3a8",
					metalness: .6,
					roughness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				position: [
					0,
					.06 + h / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: low ? [
					.7,
					h,
					.7
				] : [
					.46,
					h,
					.38
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cfd5da",
					metalness: .55,
					roughness: .32
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					0,
					.08 + h,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fan, { radius: low ? .22 : .16 })
			})
		] });
	}
	if (part.category === "ram") {
		const ddr5 = part.memory === "DDR5";
		const tall = part.stick === "dimm";
		const h = !tall ? .12 : (part.capacityGb ?? 8) <= 4 ? .26 : .38;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			position: [
				0,
				tall ? h / 2 + .02 : .08,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: tall ? [
				.036,
				h,
				.68
			] : [
				.62,
				.1,
				.24
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: ddr5 ? "#17191d" : "#173528",
				metalness: .25,
				roughness: .55
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				tall ? .035 : .03,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: tall ? [
				.012,
				.02,
				.58
			] : [
				.5,
				.02,
				.18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d4b56a",
				metalness: .8,
				roughness: .25
			})]
		})] });
	}
	if (part.category === "gpu") {
		const len = part.gpuLength && part.gpuLength > 300 ? 1.18 : part.gpuLength && part.gpuLength > 220 ? .96 : .74;
		const fans = len > .9 ? [-.22, .22] : [0];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				position: [
					0,
					.07,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					len,
					.09,
					.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1c1f24",
					metalness: .5,
					roughness: .38
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.015,
					.02
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.46,
					.012,
					.045
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#d4b56a",
					metalness: .85,
					roughness: .22
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-len / 2 + .015,
					.1,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.03,
					.2,
					.14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c5ccd1",
					metalness: .75,
					roughness: .28
				})]
			}),
			fans.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					x,
					.125,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fan, { radius: .075 })
			}, x))
		] });
	}
	if (part.category === "storage") {
		if (part.storageKind === "nvme") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			position: [
				0,
				.015,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.62,
				.02,
				.16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1b4a34",
				metalness: .3,
				roughness: .45
			})]
		});
		if (part.storageKind === "hdd") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.72,
				.16,
				.5
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2c3136",
				metalness: .5,
				roughness: .4
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.7,
				.06,
				.48
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3d4650",
				metalness: .4,
				roughness: .45
			})]
		});
	}
	if (part.category === "psu") {
		const watts = part.psuWatts ?? 0;
		const gamer = watts >= 800;
		const weak = watts <= 350;
		const body = gamer ? "#1c1914" : weak ? "#4a463c" : "#2a2e33";
		const stripe = gamer ? "#e2a23a" : weak ? "#6b5a42" : "#3dba7a";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.68,
					.52,
					.86
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: body,
					metalness: .35,
					roughness: .55
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.16,
					.44
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.52,
					.05,
					.02
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: stripe,
					emissive: stripe,
					emissiveIntensity: gamer ? .35 : .12
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					.34,
					0,
					0
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fan, { radius: .16 })
			})
		] });
	}
	if (part.category === "mobo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Motherboard, { part });
	if (part.category === "case") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			0,
			.05,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.28,
			.08,
			.16
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#e2a23a",
			emissive: "#e2a23a",
			emissiveIntensity: .25,
			metalness: .3,
			roughness: .45
		})]
	});
	if (part.category === "cable") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		castShadow: true,
		position: [
			0,
			.045,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.28,
			.07,
			.14
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#141210",
			roughness: .45
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			0,
			.09,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.18,
			.02,
			.08
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#e2a23a",
			emissive: "#e2a23a",
			emissiveIntensity: .25
		})]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		castShadow: true,
		position: [
			0,
			.05,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.28,
			.08,
			.16
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1c1a17" })]
	});
}
function Motherboard({ part }) {
	const tex = (0, import_react.useMemo)(() => makePcb(part.socket ?? "PCB", part.dimmSlots ?? 2), [part.socket, part.dimmSlots]);
	(0, import_react.useEffect)(() => () => tex.dispose(), [tex]);
	const posts = [
		[
			-1.02,
			-.02,
			-.88
		],
		[
			1.02,
			-.02,
			-.88
		],
		[
			-1.02,
			-.02,
			.88
		],
		[
			1.02,
			-.02,
			.88
		]
	];
	const dimmX = part.dimmSlots === 4 ? [
		.26,
		.4,
		.54,
		.68
	] : [.36, .52];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		posts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: p,
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.04,
				.045,
				.05,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d5dbe0",
				metalness: .75,
				roughness: .28
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.25,
				.04,
				1.95
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#166b3c",
				roughness: .72,
				metalness: .04
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.021,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.18, 1.88] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: tex,
				roughness: .55,
				metalness: .12
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.22,
				.045,
				-.32
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.48,
				.03,
				.48
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c5ccd2",
				metalness: .82,
				roughness: .22
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.22,
				.06,
				-.32
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.34,
				.02,
				.34
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#8d9499",
				metalness: .7,
				roughness: .3
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.42,
				.07,
				-.5
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.08,
				.02,
				.16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#9aa3a8",
				metalness: .6,
				roughness: .35
			})]
		}),
		dimmX.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				.04,
				-.22
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.048,
				.028,
				.74
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#14161a",
				roughness: .45,
				metalness: .2
			})]
		}, x)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.03,
				.38
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.48,
				.018,
				.06
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121418",
				roughness: .4,
				metalness: .25
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.22,
				.028,
				.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.26,
				.014,
				.045
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1a1e24",
				roughness: .45,
				metalness: .2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.55,
				.03,
				.08
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.7,
				.012,
				.18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#0e3d28",
				metalness: .3,
				roughness: .5
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.9,
				.04,
				.42
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.22,
				.04,
				.16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f2f4f6",
				roughness: .35
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.9,
				.04,
				-.72
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.2,
				.035,
				.12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#111214",
				roughness: .4
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.2,
				.05,
				.12
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.28,
				.04,
				.28
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#b7c0c6",
				metalness: .55,
				roughness: .35
			})]
		}),
		[
			-.58,
			-.46,
			-.34
		].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				.06,
				-.55
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.07,
				.06,
				.07
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2a2e28",
				metalness: .55,
				roughness: .4
			})]
		}, `c-${x}`)),
		[
			-.55,
			-.42,
			-.29,
			.08,
			.2
		].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				.07,
				-.78
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.028,
				.028,
				.07,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1c1e22",
				metalness: .45,
				roughness: .35
			})]
		}, x)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				.15,
				.05,
				-.92
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.95,
						.08,
						.08
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cfd5da",
						metalness: .65,
						roughness: .3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.28,
						.02,
						.02
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.16,
						.05,
						.04
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1a4f86" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.05,
						.02,
						.02
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.22,
						.045,
						.04
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#111214" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.32,
						.02,
						.02
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.1,
						.045,
						.04
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#2a2e24",
						metalness: .4
					})]
				})
			]
		})
	] });
}
function Hotspot({ id, position, size }) {
	const platform = useLab((s) => s.platform);
	const model = useLab((s) => s.model);
	const slots = useLab((s) => s.platform === "desktop" ? s.desktop : s.notebook);
	const selectedId = useLab((s) => s.selectedId);
	const selectedSlot = useLab((s) => s.selectedSlot);
	const occupant = slots[id];
	const part = partById(occupant);
	const help = useLab((s) => s.help);
	const solved = useLab((s) => s.solved);
	const full = help === "pistas" || solved;
	const hot = (help === "paso" && !solved ? nextBuildStep({
		platform,
		model,
		slots
	}).slot : null) === id || (full && selectedId ? canPlace(selectedId, id, {
		platform,
		model,
		slots
	}).ok : false);
	const active = selectedSlot === id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		onClick: (e) => {
			e.stopPropagation();
			useLab.getState().place(id);
		},
		onPointerOver: (e) => {
			e.stopPropagation();
			useLab.getState().setHover(id);
		},
		onPointerOut: () => {
			if (useLab.getState().hoverSlot === id) useLab.getState().setHover(null);
		},
		children: [
			part ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartMesh, { part }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					size[1] / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: size }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: hot ? "#e2a23a" : "#2a241c",
					emissive: hot ? "#e2a23a" : "#000000",
					emissiveIntensity: hot ? .45 : 0,
					transparent: true,
					opacity: hot ? .55 : .04
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.24,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					Math.max(size[0], .36),
					.48,
					Math.max(size[2], .16)
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					transparent: true,
					opacity: 0,
					depthWrite: false
				})]
			}),
			active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.01,
					0
				],
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
					.22,
					.28,
					24
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#e2a23a" })]
			}) : null,
			!part && hot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				text: SLOT_LABEL[id],
				position: [
					0,
					.42,
					0
				]
			}) : null
		]
	});
}
function CaseShell({ compact }) {
	const w = compact ? 3.4 : 3.85;
	const h = 1.82;
	const d = compact ? 2.45 : 2.85;
	const geo = (0, import_react.useMemo)(() => new EdgesGeometry(new BoxGeometry(w, h, d)), [
		w,
		h,
		d
	]);
	(0, import_react.useEffect)(() => () => geo.dispose(), [geo]);
	const posts = [
		[
			-w / 2 + .04,
			0,
			-d / 2 + .04
		],
		[
			w / 2 - .04,
			0,
			-d / 2 + .04
		],
		[
			-w / 2 + .04,
			0,
			d / 2 - .04
		],
		[
			w / 2 - .04,
			0,
			d / 2 - .04
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			.1,
			.91,
			-.02
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
			geometry: geo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
				color: "#d7c4a4",
				transparent: true,
				opacity: .72
			})
		}), posts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: p,
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.055,
				h,
				.055
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2c2822",
				metalness: .45,
				roughness: .48
			})]
		}, i))]
	});
}
function CaseTray({ compact }) {
	const w = compact ? 3.15 : 3.6;
	const d = compact ? 2.2 : 2.6;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			.1,
			0,
			-.02
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			receiveShadow: true,
			position: [
				0,
				.012,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				w,
				.024,
				d
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1a1c20",
				metalness: .55,
				roughness: .4
			})]
		}), [
			[-1, -1],
			[1, -1],
			[-1, 1],
			[1, 1]
		].map((sign, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				sign[0] * (w / 2 - .14),
				.006,
				sign[1] * (d / 2 - .14)
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.055,
				.07,
				.02,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#0e0d0b",
				roughness: .8
			})]
		}, i))]
	});
}
function Cable({ ax, ay, az, bx, by, bz, color }) {
	const geo = (0, import_react.useMemo)(() => {
		const start = new Vector3(ax, ay, az);
		const end = new Vector3(bx, by, bz);
		const mid = start.clone().lerp(end, .5);
		mid.y = Math.max(ay, by) + .42;
		const curve = new CatmullRomCurve3([
			start,
			mid,
			end
		]);
		return new TubeGeometry(curve, 22, .02, 6, false);
	}, [
		ax,
		ay,
		az,
		bx,
		by,
		bz
	]);
	(0, import_react.useEffect)(() => () => geo.dispose(), [geo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geo,
		castShadow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .55,
			metalness: .12
		})
	});
}
var BOARD = [
	.15,
	.06,
	-.15
];
function at(lx, y, lz) {
	return [
		BOARD[0] + lx,
		y,
		BOARD[2] + lz
	];
}
function BoardMarks({ ramIds, ramX }) {
	const marks = [
		{
			key: "cpu",
			text: "CPU",
			at: at(-.22, .36, -.62)
		},
		{
			key: "eps",
			text: "EPS",
			at: at(-.9, .3, -.48)
		},
		{
			key: "atx",
			text: "24 pines",
			at: at(.9, .3, .64)
		},
		{
			key: "pcie",
			text: "PCIe",
			at: at(.42, .28, .52)
		}
	];
	ramIds.forEach((id, i) => {
		marks.push({
			key: id,
			text: id.replace("ram-", "").toUpperCase(),
			at: at(ramX[i] ?? .4, .38, .24)
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: marks.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		text: m.text,
		position: m.at,
		scale: .46
	}, m.key)) });
}
function DesktopRig() {
	const slots = useLab((s) => s.desktop);
	const mobo = partById(slots.mobo);
	const ramIds = ramSlotsFor(mobo);
	const show = new Set(activeDesktopSlots(slots));
	const phase = useLab((s) => s.phase);
	const led = ledHex(phase, useLab((s) => s.boot));
	const ramX = ramIds.length === 4 ? [
		.26,
		.4,
		.54,
		.68
	] : [.36, .52];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		slots.case ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseTray, { compact: slots.case === "case-matx" }) : null,
		slots.case ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseShell, { compact: slots.case === "case-matx" }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "case",
			position: slots.case ? [
				-1.28,
				.05,
				.95
			] : [
				-2.05,
				.02,
				-1.15
			],
			size: [
				.4,
				.08,
				.22
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "psu",
			position: [
				-1.2,
				.34,
				.18
			],
			size: [
				.7,
				.48,
				.88
			]
		}),
		mobo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: BOARD,
			onClick: (e) => {
				e.stopPropagation();
				const s = useLab.getState();
				const picked = s.selectedId ? PARTS[s.selectedId] : void 0;
				const full = s.help === "pistas" || s.solved;
				const paso = s.help === "paso" && !s.solved;
				if (picked && picked.category !== "mobo") {
					s.setMessage(full ? "Tocá el zócalo ámbar de esa pieza, no el centro de la placa." : paso ? "Tocá el zócalo marcado, no el centro de la placa." : "Tocá el lugar de esa pieza, no el centro de la placa.");
					return;
				}
				s.place("mobo");
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Motherboard, { part: mobo }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					1.02,
					.08,
					-.82
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.04,
					16,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: led,
					emissive: led,
					emissiveIntensity: phase === "off" ? .2 : 1.1
				})]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "mobo",
			position: at(0, .02, 0),
			size: [
				2.25,
				.05,
				1.95
			]
		}),
		show.has("cpu") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "cpu",
			position: at(-.22, .1, -.32),
			size: [
				.4,
				.06,
				.4
			]
		}) : null,
		show.has("cooler") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "cooler",
			position: at(-.22, .16, -.32),
			size: [
				.5,
				.08,
				.5
			]
		}) : null,
		ramIds.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id,
			position: at(ramX[i] ?? .4, .1, -.22),
			size: [
				.07,
				.1,
				.76
			]
		}, id)),
		show.has("gpu") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "gpu",
			position: at(0, .12, .38),
			size: [
				.52,
				.08,
				.12
			]
		}) : null,
		show.has("m2-1") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "m2-1",
			position: at(-.55, .1, .08),
			size: [
				.7,
				.04,
				.2
			]
		}) : null,
		show.has("m2-2") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "m2-2",
			position: at(.2, .1, .72),
			size: [
				.7,
				.04,
				.2
			]
		}) : null,
		show.has("sata-1") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "sata-1",
			position: at(-.85, .12, .72),
			size: [
				.55,
				.08,
				.36
			]
		}) : null,
		show.has("cable-24") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "cable-24",
			position: at(.9, .1, .42),
			size: [
				.34,
				.08,
				.2
			]
		}) : null,
		show.has("cable-eps") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "cable-eps",
			position: at(-.9, .1, -.72),
			size: [
				.34,
				.08,
				.18
			]
		}) : null,
		show.has("cable-pcie") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
			id: "cable-pcie",
			position: at(.72, .22, .38),
			size: [
				.28,
				.08,
				.16
			]
		}) : null,
		mobo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardMarks, {
			ramIds,
			ramX
		}) : null,
		slots["cable-24"] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cable, {
			ax: -1.05,
			ay: .62,
			az: .05,
			bx: 1.05,
			by: .18,
			bz: .27,
			color: "#1a1612"
		}) : null,
		slots["cable-eps"] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cable, {
			ax: -1.05,
			ay: .62,
			az: .28,
			bx: -.75,
			by: .18,
			bz: -.87,
			color: "#1a1612"
		}) : null,
		slots["cable-pcie"] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cable, {
			ax: -1.05,
			ay: .62,
			az: .45,
			bx: .4,
			by: .26,
			bz: .27,
			color: "#2a2418"
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
			position: [
				2.28,
				.86,
				1.2
			],
			rotation: [
				-.28,
				.42,
				0
			]
		})
	] });
}
function ledHex(phase, boot) {
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
	const slots = useLab((s) => s.platform === "desktop" ? s.desktop : s.notebook);
	const holder = (0, import_react.useMemo)(() => {
		const c = document.createElement("canvas");
		c.width = 1024;
		c.height = 640;
		const t = new CanvasTexture(c);
		t.colorSpace = SRGBColorSpace;
		return {
			c,
			t
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const g = holder.c.getContext("2d");
		if (!g) return;
		g.clearRect(0, 0, 1024, 640);
		if (phase === "on" && boot === "os") paintDesktop(g, platform, model, slots);
		else if (!hints && phase !== "off" && phase !== "posting") paintNotice(g, "NO ARRANCÓ", "No llegó al sistema. El docente abre Resolver para ver la causa.", "#e15d45");
		else if (phase === "on" && boot === "no-disk") paintNotice(g, "NO HAY DISCO", "El hardware hizo POST. Falta un SSD o un HDD para entrar al sistema.", "#e2a23a");
		else if (phase === "on" && boot === "no-display") paintNotice(g, "SIN IMAGEN", "Los ventiladores giran, pero no hay señal de video.", "#e15d45");
		else if (phase === "off") {
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
	}, [
		post,
		shown,
		phase,
		boot,
		platform,
		model,
		slots,
		holder,
		hints
	]);
	(0, import_react.useEffect)(() => () => holder.t.dispose(), [holder]);
	return holder.t;
}
function paintNotice(g, title, body, color) {
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
function paintDesktop(g, platform, model, slots) {
	const report = diagnose({
		platform,
		model,
		slots
	});
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
	const stores = Object.values(slots).map((id) => partById(id)).filter((p) => Boolean(p && p.category === "storage"));
	const slow = stores.length > 0 && stores.every((s) => s.storageKind === "hdd");
	const cpu = Object.values(slots).map((id) => partById(id)).find((p) => p?.category === "cpu");
	const gpu = Object.values(slots).map((id) => partById(id)).find((p) => p?.category === "gpu");
	const lines = [];
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
	if (slow) lines.push({
		text: "Arranque lento: el sistema está en un disco mecánico",
		warn: true
	});
	if (!report.dualChannel) lines.push({
		text: "La memoria no está en dual channel",
		warn: true
	});
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
function wrapText(g, text, x, y, max, lh) {
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
function useScreenZoom(hx, hy, hz, rx, ry, rz, baseH) {
	const ref = (0, import_react.useRef)(null);
	const zoomed = (0, import_react.useRef)(false);
	const { camera, gl } = useThree();
	const home = (0, import_react.useMemo)(() => new Vector3(hx, hy, hz), [
		hx,
		hy,
		hz
	]);
	const homeQuat = (0, import_react.useMemo)(() => new Quaternion().setFromEuler(new Euler(rx, ry, rz)), [
		rx,
		ry,
		rz
	]);
	const dest = (0, import_react.useMemo)(() => new Vector3(), []);
	const dir = (0, import_react.useMemo)(() => new Vector3(), []);
	const parentQuat = (0, import_react.useMemo)(() => new Quaternion(), []);
	const face = (0, import_react.useMemo)(() => new Quaternion(), []);
	useFrame(() => {
		const g = ref.current;
		if (!g) return;
		if (zoomed.current) {
			camera.getWorldDirection(dir);
			dest.copy(camera.position).addScaledVector(dir, 1.45);
			if (g.parent) g.parent.worldToLocal(dest);
			g.position.lerp(dest, .18);
			if (g.parent) {
				g.parent.getWorldQuaternion(parentQuat);
				face.copy(parentQuat).invert().multiply(camera.quaternion);
			} else face.copy(camera.quaternion);
			g.quaternion.slerp(face, .18);
			const next = 2.9 * Math.tan((camera.fov ?? 42) * Math.PI / 360) * .82 / baseH;
			g.scale.setScalar(MathUtils.lerp(g.scale.x, next, .18));
		} else {
			g.position.lerp(home, .18);
			g.quaternion.slerp(homeQuat, .18);
			g.scale.setScalar(MathUtils.lerp(g.scale.x, 1, .18));
		}
	});
	return {
		ref,
		toggle: (e) => {
			e.stopPropagation();
			zoomed.current = !zoomed.current;
			gl.domElement.style.cursor = zoomed.current ? "zoom-out" : "zoom-in";
		},
		over: (e) => {
			e.stopPropagation();
			gl.domElement.style.cursor = zoomed.current ? "zoom-out" : "zoom-in";
		},
		out: () => {
			gl.domElement.style.cursor = "";
		}
	};
}
function Monitor({ position, rotation = [
	0,
	0,
	0
] }) {
	const map = useScreenTexture();
	const phase = useLab((s) => s.phase);
	const led = ledHex(phase, useLab((s) => s.boot));
	const zoom = useScreenZoom(position[0], position[1], position[2], rotation[0], rotation[1], rotation[2], .88);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.58,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.08,
				.28,
				.08
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a261f" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.74,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.42,
				.04,
				.26
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a261f" })]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: zoom.ref,
		position,
		rotation,
		onDoubleClick: zoom.toggle,
		onPointerOver: zoom.over,
		onPointerOut: zoom.out,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.45,
					.88,
					.06
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1c1914" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					.04
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.3, .74] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.62,
					-.38,
					.04
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.03,
					16,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: led,
					emissive: led,
					emissiveIntensity: phase === "off" ? .15 : 1
				})]
			})
		]
	})] });
}
function Keys() {
	const geo = (0, import_react.useMemo)(() => new BoxGeometry(.12, .035, .11), []);
	const mat = (0, import_react.useMemo)(() => new MeshStandardMaterial({
		color: "#2c2822",
		roughness: .7
	}), []);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const mesh = ref.current;
		if (!mesh) return;
		const m = new Matrix4();
		const q = new Quaternion();
		const s = new Vector3(1, 1, 1);
		const p = new Vector3();
		let i = 0;
		for (let row = 0; row < 5; row++) for (let col = 0; col < 11; col++) {
			p.set(-.78 + col * .15, .11, -.42 + row * .14);
			m.compose(p, q, s);
			mesh.setMatrixAt(i, m);
			i += 1;
		}
		mesh.instanceMatrix.needsUpdate = true;
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			geo.dispose();
			mat.dispose();
		};
	}, [geo, mat]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
		ref,
		args: [
			geo,
			mat,
			55
		],
		castShadow: true
	});
}
function NotebookRig() {
	const model = useLab((s) => s.model);
	const nb = NOTEBOOKS[model];
	const map = useScreenTexture();
	const phase = useLab((s) => s.phase);
	const led = ledHex(phase, useLab((s) => s.boot));
	const zoom = useScreenZoom(0, .82, 0, 0, 0, 0, 1.62);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			0,
			.15
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				receiveShadow: true,
				position: [
					0,
					.06,
					.05
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.7,
					.12,
					1.9
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3a3935",
					metalness: .35,
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keys, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.13,
					.62
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.7,
					.02,
					.42
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a2926" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.85,
					.14,
					.15
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.28,
					.03,
					.18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1d4a34" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				text: `${nb.ramSolderedGb} GB soldados`,
				position: [
					.85,
					.36,
					.15
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.15,
					.1,
					.78
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.15,
					.05,
					.28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2f3338" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				text: "batería",
				position: [
					.15,
					.32,
					.78
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
				id: "sodimm",
				position: [
					-.15,
					.14,
					.22
				],
				size: [
					.78,
					.05,
					.32
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				text: "SODIMM",
				position: [
					-.15,
					.36,
					.22
				],
				scale: .5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
				id: "nb-m2-1",
				position: [
					-.85,
					.14,
					.35
				],
				size: [
					.7,
					.04,
					.22
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				text: "M.2",
				position: [
					-.85,
					.36,
					.35
				],
				scale: .42
			}),
			nb.m2Slots === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hotspot, {
				id: "nb-m2-2",
				position: [
					-.85,
					.14,
					.68
				],
				size: [
					.7,
					.04,
					.22
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					.12,
					-.88
				],
				rotation: [
					.62,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					ref: zoom.ref,
					position: [
						0,
						.82,
						0
					],
					onDoubleClick: zoom.toggle,
					onPointerOver: zoom.over,
					onPointerOut: zoom.out,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							2.6,
							1.62,
							.07
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a2926" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							.04
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.4, 1.42] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map,
							toneMapped: false
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						1.15,
						.08,
						.04
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.03,
						12,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: led,
						emissive: led,
						emissiveIntensity: phase === "off" ? .15 : 1
					})]
				})]
			})
		]
	});
}
function Lamp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-2.55,
			0,
			-1.85
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.55,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.07,
					.09,
					1.1,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a241c" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.4,
					1.2,
					.15
				],
				rotation: [
					.2,
					0,
					-.7
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.035,
					.035,
					.85,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#3a3328" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					.85,
					1.25,
					.4
				],
				intensity: 18,
				distance: 8,
				color: "#ffc57a",
				decay: 2
			})
		]
	});
}
function StudioEnv({ bright }) {
	const { gl, scene } = useThree();
	(0, import_react.useEffect)(() => {
		const pmrem = new PMREMGenerator(gl);
		const room = new RoomEnvironment();
		const tex = pmrem.fromScene(room, .04).texture;
		scene.environment = tex;
		scene.environmentIntensity = bright ? .85 : .42;
		return () => {
			scene.environment = null;
			tex.dispose();
			pmrem.dispose();
		};
	}, [
		gl,
		scene,
		bright
	]);
	return null;
}
function Bench() {
	const platform = useLab((s) => s.platform);
	const bright = useLab((s) => s.theme) === "claro";
	const wood = (0, import_react.useMemo)(() => makeWood(), []);
	(0, import_react.useEffect)(() => () => wood.dispose(), [wood]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: [bright ? "#e6e0d4" : "#14120e"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioEnv, { bright }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			bright ? "#fff8ee" : "#f3ead7",
			bright ? "#c9bba6" : "#2a2118",
			bright ? .9 : .55
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: bright ? .42 : .22 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				5,
				9,
				4
			],
			intensity: bright ? 2.15 : 1.85,
			castShadow: true,
			"shadow-mapSize-width": 1024,
			"shadow-mapSize-height": 1024,
			"shadow-camera-near": 1,
			"shadow-camera-far": 24,
			"shadow-camera-left": -7,
			"shadow-camera-right": 7,
			"shadow-camera-top": 7,
			"shadow-camera-bottom": -7
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-4,
				3.5,
				5
			],
			intensity: bright ? .75 : .4,
			color: bright ? "#fff4e0" : "#f3ead7"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-.03,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [24, 24] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: bright ? "#d5ccbe" : "#2a2118",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-.02,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [4.6, 72] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: wood,
				roughness: .88,
				metalness: .02
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				0,
				0
			],
			opacity: .45,
			scale: 12,
			blur: 2.4,
			far: 4
		}),
		platform === "desktop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopRig, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RigControls, {})
	] });
}
function BenchCanvas() {
	const hover = useLab((s) => s.hoverSlot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `absolute inset-0 touch-none ${hover ? "cursor-pointer" : "cursor-grab"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			shadows: true,
			dpr: [1, 1.7],
			camera: {
				position: [
					3.15,
					2.55,
					3.35
				],
				fov: 42
			},
			gl: {
				antialias: true,
				toneMapping: 4
			},
			onCreated: ({ camera }) => {
				camera.lookAt(.05, .28, 0);
			},
			onPointerMissed: () => useLab.getState().selectPart(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bench, {})
		})
	});
}
//#endregion
export { BenchCanvas };
