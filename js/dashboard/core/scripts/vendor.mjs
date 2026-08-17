// Vendor @instantly-ai/sdk + @instantly-ai/ops into ./vendor — only needed to
// deploy THIS folder outside the monorepo. The committed default depends on the
// siblings (file:../../sdk, file:../../ops), so you don't need this for a normal
// clone. For a standalone-folder deploy: run `npm run vendor`, then point the two
// @instantly-ai/* deps in package.json at file:vendor/ops / file:vendor/sdk.
// ./vendor is gitignored; the copied package.json has no prepare script, so the
// host's `npm install` never rebuilds them.
import { execSync } from "node:child_process"
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const core = resolve(here, "..") // js/dashboard/core
const jsRoot = resolve(core, "..", "..") // js/
const vendor = resolve(core, "vendor")

const PKGS = [
  {
    name: "@instantly-ai/sdk",
    src: resolve(jsRoot, "sdk"),
    dest: resolve(vendor, "sdk"),
    pkg: {
      name: "@instantly-ai/sdk", version: "0.1.0", type: "module",
      main: "./dist/index.js", module: "./dist/index.js", types: "./dist/index.d.ts",
      exports: { ".": { types: "./dist/index.d.ts", import: "./dist/index.js" } },
      sideEffects: false,
    },
  },
  {
    name: "@instantly-ai/ops",
    src: resolve(jsRoot, "ops"),
    dest: resolve(vendor, "ops"),
    pkg: {
      name: "@instantly-ai/ops", version: "0.1.0", type: "module",
      main: "dist/index.js", types: "dist/index.d.ts",
      exports: { ".": { types: "./dist/index.d.ts", default: "./dist/index.js" } },
      dependencies: { "@instantly-ai/sdk": "file:../sdk" },
    },
  },
]

rmSync(vendor, { recursive: true, force: true })
for (const p of PKGS) {
  console.log(`building ${p.name} …`)
  execSync("npm run build", { cwd: p.src, stdio: "inherit" })
  mkdirSync(p.dest, { recursive: true })
  cpSync(resolve(p.src, "dist"), resolve(p.dest, "dist"), { recursive: true })
  // trimmed package.json: prebuilt dist, no scripts/devDeps → no build-on-install
  writeFileSync(resolve(p.dest, "package.json"), JSON.stringify(p.pkg, null, 2) + "\n")
  console.log(`vendored ${p.name} → vendor/${p.name.split("/")[1]}`)
}
console.log("done. commit ./vendor and deploy the folder standalone.")
