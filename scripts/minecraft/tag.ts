import { Minecraft } from "./types.ts";

export function optionalValue(
  value: Minecraft.Tag.Value,
): Minecraft.Tag.OptionalValue {
  const id = typeof value === "object" ? value.id : value;

  return { id, required: false };
}
