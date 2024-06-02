import * as quark from "./quark.ts";
import * as vanilla from "./vanilla.ts";
import * as sticks from "./sticks.ts";
import { NAMESPACE } from "../../constants/mod.ts";
import { DataPack } from "../DataPack.ts";

export { quark, sticks, vanilla };

export const TAGS = {
  items: {
    ...quark.TAGS.items,
    ...vanilla.TAGS.items,
    ...sticks.TAGS.items,
  },
};

export const RECIPE_CONDITIONS = {
  ...quark.RECIPE_CONDITIONS,
  ...vanilla.RECIPE_CONDITIONS,
  ...sticks.RECIPE_CONDITIONS,
};

const RECIPES: DataPack.RecipesByNamespace = {
  farmersdelight: {
    ...vanilla.RECIPES.farmersdelight,
  },
  [NAMESPACE]: {
    ...quark.RECIPES,
    ...vanilla.RECIPES[NAMESPACE],
    ...sticks.RECIPES,
  },
};

export { RECIPES };
