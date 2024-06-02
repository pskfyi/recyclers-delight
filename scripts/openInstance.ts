import { DIRS } from "./constants/mod.ts";

const command = new Deno.Command("code", {
  args: [DIRS.INSTANCE],
  stdin: "piped",
  stdout: "piped",
});

await command.spawn().status;
