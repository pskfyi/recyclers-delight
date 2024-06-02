import { Minecraft, tag } from "../minecraft/mod.ts";
import { ITEMS_NOT_SUPPORTED_IN_ALL_VERSIONS } from "./minecraftVersions.ts";
import { REQUIRED_NAMESPACES } from "./constants.ts";
import { DataPack } from "./DataPack.ts";

const _NAMESPACE_PATTERNS = REQUIRED_NAMESPACES
  .map((namespace) => new RegExp(`\#?${namespace}:`));

function _shouldBeOptional(id: string): boolean {
  if (ITEMS_NOT_SUPPORTED_IN_ALL_VERSIONS.includes(id)) return true;

  if (id.includes(":")) {
    const hasRequiredNamespace = _NAMESPACE_PATTERNS
      .some((pattern) => pattern.test(id));

    return !hasRequiredNamespace;
  }

  return false;
}

/** Ensures that possible-unavailable tag values are marked as optional.  */
export function sanitizeValue(value: Minecraft.Tag.Value): Minecraft.Tag.Value {
  if (typeof value === "object") return value;

  return _shouldBeOptional(value) ? tag.optionalValue(value) : value;
}

/** Executes `sanitizeValue` on each value in the array.
 *
 * Empty IDs are also filtered. This allows upstream code to return an empty
 * string to omit an ID. */
export function sanitizeValues(
  values: Minecraft.Tag.Value[],
): Minecraft.Tag.Value[] {
  return values
    .filter(Boolean)
    .map(sanitizeValue);
}

export function byType<T extends Minecraft.Tag.Type = Minecraft.Tag.Type>(
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
      outputTags[tagName] = sanitizeValues(values);
    }
  }

  return output as DataPack.TagsByType<T>;
}
