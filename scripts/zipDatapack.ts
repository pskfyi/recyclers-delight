import { DIRS } from "./constants/mod.ts";
import { NAMESPACE } from "./constants/namespace.ts";
import { VERSION } from "./pack/constants.ts";
import { exists, join } from "./_deps.ts";

const FILENAME = `${NAMESPACE}-${VERSION}.zip`;
const FILEPATH = join(DIRS.ROOT, FILENAME);

if (await exists(FILEPATH)) Deno.remove(FILEPATH);

const command = new Deno.Command("zip", {
  cwd: DIRS.PACK,
  args: ["-r", FILEPATH, `./`],
  stdin: "piped",
  stdout: "piped",
});

await command.spawn().status;
