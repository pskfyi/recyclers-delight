import { DIRS, NAMESPACE } from "./constants/mod.ts";
import { copy, exists, resolve } from "./_deps.ts";

const SOURCE_DIR = resolve(DIRS.PACK);
const TARGET_DIR = resolve(DIRS.INSTANCE_DATAPACKS, NAMESPACE);

if (await exists(TARGET_DIR)) {
  await Deno.remove(TARGET_DIR, { recursive: true });
}

await copy(SOURCE_DIR, TARGET_DIR, { overwrite: true });
