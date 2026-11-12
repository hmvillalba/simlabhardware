import { cpSync, existsSync } from "node:fs";

const from = ".vercel/output/static";
if (!existsSync(`${from}/index.html`)) {
  console.error("[mirror] falta index.html en el build de Vercel");
  process.exit(1);
}
cpSync(from, "dist", { recursive: true });
console.log("[mirror] dist/index.html listo para publicar");
