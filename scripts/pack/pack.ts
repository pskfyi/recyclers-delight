import { DataPack } from "./DataPack.ts";
import { DIRS, NAMESPACE } from "../constants/mod.ts";
import * as leather from "./leather.ts";
import * as wood from "./wood/mod.ts";
import * as dye from "./dye.ts";

const DATAPACK = new DataPack(DIRS.ROOT, NAMESPACE);

DATAPACK.description =
  "More recycling recipes for Farmer's Delight cutting board.";

DATAPACK.requiredNamespaces = ["farmersdelight", NAMESPACE];

DATAPACK.tags = {
  [NAMESPACE]: {
    items: {
      ...dye.TAGS.items,
      ...leather.TAGS.items,
      ...wood.TAGS.items,
    },
  },
};

DATAPACK.recipes = {
  farmersdelight: {
    ...dye.RECIPES.farmersdelight,
    ...leather.RECIPES.farmersdelight,
    ...wood.RECIPES.farmersdelight,
  },
  [NAMESPACE]: {
    ...dye.RECIPES[NAMESPACE],
    ...leather.RECIPES[NAMESPACE],
    ...wood.RECIPES[NAMESPACE],
  },
};

DATAPACK.recipeConditions = {
  [NAMESPACE]: {
    ...dye.RECIPE_CONDITIONS,
    ...leather.RECIPE_CONDITIONS,
    ...wood.RECIPE_CONDITIONS,
  },
};

export { DATAPACK };
