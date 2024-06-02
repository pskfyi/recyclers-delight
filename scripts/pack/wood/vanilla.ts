import { NAMESPACE } from "../../constants/mod.ts";
import { WOODS as VANILLA_WOODS } from "../../minecraft/mod.ts";
import { DataPack } from "../DataPack.ts";
import { generateWoodData, OMIT_ITEM } from "./generateWoodData.ts";

// Standard treatments
const birch = generateWoodData({ wood: "birch" });
const spruce = generateWoodData({ wood: "spruce" });
const jungle = generateWoodData({ wood: "jungle" });
const acacia = generateWoodData({ wood: "acacia" });
const dark_oak = generateWoodData({ wood: "dark_oak" });
const mangrove = generateWoodData({ wood: "mangrove" });
const cherry = generateWoodData({ wood: "cherry" });

// Special treatments
const oak = generateWoodData({
  wood: "oak",
  bookshelf: "bookshelf",
});
const bamboo = generateWoodData({
  wood: "bamboo",
  boat: "bamboo_raft",
  chest_boat: "bamboo_chest_raft",
  post: OMIT_ITEM, // Salvaged into 2 sticks
  stripped_post: OMIT_ITEM, // Salvaged into 2 sticks
});
const crimson = generateWoodData({
  wood: "crimson",
  boat: OMIT_ITEM, // Doesn't exist
  chest_boat: OMIT_ITEM, // Doesn't exist
});
const warped = generateWoodData({
  wood: "warped",
  boat: OMIT_ITEM, // Doesn't exist
  chest_boat: OMIT_ITEM, // Doesn't exist
});

const RECIPES: DataPack.RecipesByNamespace = {
  farmersdelight: {},
  [NAMESPACE]: {
    ...oak.recipes,
    ...birch.recipes,
    ...spruce.recipes,
    ...jungle.recipes,
    ...acacia.recipes,
    ...dark_oak.recipes,
    ...crimson.recipes,
    ...warped.recipes,
    ...mangrove.recipes,
    ...cherry.recipes,
    ...bamboo.recipes,
  },
};

const EXISTING_RECYCLING_RECIPE_FURNITURE_TYPES = [
  "door",
  "sign",
  "trapdoor",
  "hanging_sign",
];

VANILLA_WOODS.map((wood) => {
  EXISTING_RECYCLING_RECIPE_FURNITURE_TYPES.map((type) =>
    RECIPES.farmersdelight[`cutting/${wood}_${type}`] = {}
  );
});

const RECIPE_CONDITIONS = {};

const TAGS = {
  items: {
    ...oak.itemTags,
    ...birch.itemTags,
    ...spruce.itemTags,
    ...jungle.itemTags,
    ...acacia.itemTags,
    ...dark_oak.itemTags,
    ...crimson.itemTags,
    ...warped.itemTags,
    ...mangrove.itemTags,
    ...cherry.itemTags,
    ...bamboo.itemTags,
  },
};

TAGS.items.salvage_1_bamboo_planks.unshift(
  "bamboo_mosaic_stairs",
);

TAGS.items.salvage_4_oak_planks.unshift(
  "chest",
  "trapped_chest",
  "barrel",
);

export { RECIPE_CONDITIONS, RECIPES, TAGS };
