import { NAMESPACE } from "../constants/mod.ts";
import { recipes } from "../farmersdelight/mod.ts";
import { ARMOR_TYPES, ingredient } from "../minecraft/mod.ts";
import { DataPack } from "./DataPack.ts";
import { namespaced } from "./utils.ts";
import * as tag from "./tag.ts";

const TAGS = tag.byType({
  items: {
    "salvage_1_leather": ARMOR_TYPES.map((type) => `leather_${type}`),
  },
});

const RECIPES: DataPack.RecipesByNamespace = {
  farmersdelight: {},
  [NAMESPACE]: {
    salvage_1_leather: recipes.cutting(
      recipes.cutting.TOOL.SHEARS,
      ingredient.tag(namespaced("salvage_1_leather")),
      [ingredient.item("leather", 1)],
    ),
  },
};

ARMOR_TYPES.map((armorType) => {
  RECIPES.farmersdelight[`cutting/leather_${armorType}`] = {};
});

const RECIPE_CONDITIONS: DataPack.RecipeConditions[string] = {};

export { RECIPE_CONDITIONS, RECIPES, TAGS };
