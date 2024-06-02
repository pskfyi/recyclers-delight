import { NAMESPACE } from "../constants/mod.ts";
import { recipes } from "../farmersdelight/mod.ts";
import { condition } from "../forge/mod.ts";
import { DataPack } from "./DataPack.ts";
import * as tag from "./tag.ts";

const RECIPES: DataPack.RecipesByNamespace = {
  farmersdelight: {},
  [NAMESPACE]: {},
};

function removeRecipe(recipeName: string) {
  RECIPES.farmersdelight[recipeName] = {};
}

removeRecipe("cutting/lily_of_the_valley");
removeRecipe("cutting/orange_tulip");
removeRecipe("cutting/allium");
removeRecipe("cutting/blue_orchid");
removeRecipe("cutting/dandelion");
removeRecipe("cutting/pink_tulip");
removeRecipe("cutting/white_tulip");
removeRecipe("cutting/oxeye_daisy");
removeRecipe("cutting/azure_bluet");
removeRecipe("cutting/cornflower");
removeRecipe("cutting/poppy");
removeRecipe("cutting/red_tulip");
removeRecipe("cutting/wither_rose");
removeRecipe("cutting/ink_sac");

const TAGS = tag.byType({
  items: {
    "salvage_2_white_dye": ["lily_of_the_valley"],
    "salvage_2_orange_dye": ["orange_tulip"],
    "salvage_2_magenta_dye": ["allium"],
    "salvage_2_light_blue_dye": ["blue_orchid"],
    "salvage_2_yellow_dye": ["dandelion"],
    "salvage_2_lime_dye": [],
    "salvage_2_pink_dye": ["pink_tulip"],
    "salvage_2_gray_dye": [],
    "salvage_2_light_gray_dye": ["white_tulip", "oxeye_daisy", "azure_bluet"],
    "salvage_2_cyan_dye": ["pitcher_plant"],
    "salvage_2_purple_dye": [],
    "salvage_2_blue_dye": ["cornflower", "lapis_lazuli"],
    "salvage_2_brown_dye": ["cocoa_beans"],
    "salvage_2_green_dye": [],
    "salvage_2_red_dye": ["beetroot", "poppy", "red_tulip", "rose_bush"],
    "salvage_2_black_dye": ["wither_rose", "ink_sac"],
  },
});

const RECIPE_CONDITIONS: DataPack.RecipeConditions[string] = {
  // Pitcher plant is not in 1.19.2
  salvage_2_cyan_dye: [condition.tagNotEmpty("salvage_2_cyan_dye")],
};

Object.entries(TAGS.items).map(([name, values]) => {
  if (values.length === 0) {
    RECIPE_CONDITIONS[name] = [condition.tagNotEmpty(name)];
  }
});

Object.keys(TAGS.items).map((tagName) => {
  const [_, amount, ...rest] = tagName.split("_");
  const item = rest.join("_");
  const recipeName = tagName;

  RECIPES[NAMESPACE][recipeName] = recipes.cutting(
    recipes.cutting.TOOL.KNIFE,
    { tag: `${NAMESPACE}:${tagName}` },
    [{ item, count: parseInt(amount) }],
  );
});

export { RECIPE_CONDITIONS, RECIPES, TAGS };
