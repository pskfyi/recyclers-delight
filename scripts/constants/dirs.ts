import { assert, join, loadEnv, resolve } from "../_deps.ts";
import { NAMESPACE } from "./namespace.ts";

const DIRNAME = import.meta.dirname;
assert(DIRNAME, "dirname is not defined; This script must be run as a module.");

export const ENV = await loadEnv();
assert(
  ENV.INSTANCE_DIR,
  "enviroment variable INSTANCE_DIR is not defined.",
);
assert(
  ENV.INSTANCE_DATAPACKS_DIR,
  "enviroment variable INSTANCE_DATAPACKS_DIR is not defined.",
);

export const ROOT = resolve(DIRNAME, "../..");
export const PACK = join(ROOT, NAMESPACE);

export const INSTANCE = ENV.INSTANCE_DIR;
export const INSTANCE_DATAPACKS = ENV.INSTANCE_DATAPACKS_DIR;
export const INSTANCE_PACK = join(ENV.INSTANCE_DATAPACKS_DIR, NAMESPACE);
