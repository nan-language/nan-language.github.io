import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { specDir, specPath, specRepository } from "./source.ts";

const clone = mkdtempSync(join(tmpdir(), "nan-spec-"));
const git = (...args: string[]) =>
  execFileSync("git", args, { encoding: "utf8" }).trim();

try {
  git(
    "clone",
    "--quiet",
    "--depth=1",
    "--filter=blob:none",
    "--sparse",
    `${specRepository}.git`,
    clone,
  );
  git("-C", clone, "sparse-checkout", "set", specPath);
  const commit = git("-C", clone, "rev-parse", "HEAD");
  rmSync(specDir, { recursive: true, force: true });
  cpSync(join(clone, specPath), specDir, { recursive: true });
  writeFileSync(join(specDir, "commit"), `${commit}\n`);
  console.log(`spec ${specRepository}@${commit.slice(0, 7)} in ${specDir}`);
} finally {
  rmSync(clone, { recursive: true, force: true });
}
