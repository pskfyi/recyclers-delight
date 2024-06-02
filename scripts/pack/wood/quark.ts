import { condition } from "../../forge/mod.ts";
import { DataPack } from "../DataPack.ts";
import { generateWoodData } from "./generateWoodData.ts";

const mod = "quark";

const ancient = generateWoodData({ wood: "ancient", mod });
const azalea = generateWoodData({ wood: "azalea", mod });
const blossom = generateWoodData({ wood: "blossom", mod });

export const RECIPES = {
  ...ancient.recipes,
  ...azalea.recipes,
  ...blossom.recipes,
};

export const TAGS = {
  items: {
    ...ancient.itemTags,
    ...azalea.itemTags,
    ...blossom.itemTags,
  },
};

const QUARK_IS_LOADED = condition.modLoaded(mod);

export const RECIPE_CONDITIONS: DataPack.RecipeConditions[string] = {
  "salvage_1_ancient_planks": [QUARK_IS_LOADED],
  "salvage_1_azalea_planks": [QUARK_IS_LOADED],
  "salvage_1_blossom_planks": [QUARK_IS_LOADED],
  "salvage_4_ancient_planks": [QUARK_IS_LOADED],
  "salvage_4_azalea_planks": [QUARK_IS_LOADED],
  "salvage_4_blossom_planks": [QUARK_IS_LOADED],
};
