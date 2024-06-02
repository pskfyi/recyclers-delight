import { NAMESPACE } from "../constants/mod.ts";
import { recipes } from "../farmersdelight/mod.ts";
import { Forge } from "../forge/mod.ts";
import { ARMOR_TYPES, item, tag } from "../minecraft/mod.ts";
import { DataPack } from "./DataPack.ts";
import { namespaced, tagsByType } from "./utils.ts";

const TAGS = tagsByType({
  items: {
    "salvage_1_leather": ARMOR_TYPES.map((type) => `leather_${type}`),
  },
});

const RECIPES: DataPack.RecipesByNamespace = {
  farmersdelight: {},
  [NAMESPACE]: {
    salvage_1_leather: recipes.cutting(
      recipes.cutting.TOOL.SHEARS,
      tag(namespaced("salvage_1_leather")),
      [item("leather", 1)],
    ),
  },
};

ARMOR_TYPES.map((armorType) => {
  RECIPES.farmersdelight[`cutting/leather_${armorType}`] = {};
});

const RECIPE_CONDITIONS: Record<string, Forge.Condition[]> = {};

export { RECIPE_CONDITIONS, RECIPES, TAGS };
