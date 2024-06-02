import { NAMESPACE } from "../constants/mod.ts";
import { Minecraft } from "../minecraft/mod.ts";
import { DataPack } from "./DataPack.ts";
import { REQUIRED_NAMESPACES } from "./constants.ts";

export function optional(value: string): Minecraft.Tag.OptionalValue {
  return { id: value, required: false };
}

export function namespaced(id: string): string {
  return `${NAMESPACE}:${id}`;
}

const _NAMESPACE_PATTERNS = REQUIRED_NAMESPACES
  .map((namespace) => new RegExp(`\#?${namespace}:`));

function _hasRequiredNamespace(value: string): boolean {
  return _NAMESPACE_PATTERNS.some((pattern) => pattern.test(value));
}

/** Ensures that tag entries not in the `minecraft` or `farmersdelight`
 * namespaces are marked optional.
 *
 * Empty IDs are also filtered. This allows upstream code to return an empty
 * string to omit an ID. */
export function safeTagValues(
  values: Minecraft.Tag.Value[],
): Minecraft.Tag.Value[] {
  return values
    .filter(Boolean)
    .map((value) => {
      if (typeof value === "object") return value;

      const hasNamespace = value.includes(":");
      if (!hasNamespace) return value; // assumed to be a vanilla id, ex. "torch"

      if (_hasRequiredNamespace(value)) return value;

      return optional(value);
    });
}

export function tagsByType<T extends Minecraft.Tag.Type = Minecraft.Tag.Type>(
  input: DataPack.TagsByType<T>,
): DataPack.TagsByType<T> {
  const output: Partial<DataPack.TagsByType<T>> = {};

  for (const _type in input) {
    const type = _type as T;
    const tags = input[type];

    if (tags === undefined) continue;
    output[type] = {};
    const outputTags = output[type]!;

    for (const tagName in tags) {
      const values = tags[tagName];
      outputTags[tagName] = safeTagValues(values);
    }
  }

  return output as DataPack.TagsByType<T>;
}
