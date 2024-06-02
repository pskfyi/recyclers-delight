import { NAMESPACE } from "../../constants/mod.ts";
import { condition } from "../../forge/mod.ts";
import { tag, WOODS as VANILLA_WOODS } from "../../minecraft/mod.ts";
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

TAGS.items.salvage_1_bamboo_planks = [
  ...TAGS.items.salvage_1_bamboo_planks,
  "quark:bamboo_planks_stairs",
  "quark:bamboo_fence",
  "quark:bamboo_fence_gate",
  "quark:bamboo_door",
  "quark:bamboo_trapdoor",
  "quark:bamboo_pressure_plate",
].map(tag.optionalValue);

TAGS.items.salvage_4_bamboo_planks = [
  ...TAGS.items.salvage_4_bamboo_planks, // FD cabinet is not in 1.19.2
  "everycomp:sd/quark/bamboo_trim",
  "everycomp:sd/quark/bamboo_half_drawers_1",
  "everycomp:sd/quark/bamboo_half_drawers_2",
  "everycomp:sd/quark/bamboo_half_drawers_4",
  "everycomp:sd/quark/bamboo_full_drawers_1",
  "everycomp:sd/quark/bamboo_full_drawers_2",
  "everycomp:sd/quark/bamboo_full_drawers_4",
  "everycomp:fd/quark/bamboo_cabinet",
].map(tag.optionalValue);

const RECIPE_CONDITIONS: DataPack.RecipeConditions[string] = {
  // No cherry before 1.20.1 in our versions
  salvage_1_cherry_planks: [condition.tagNotEmpty("salvage_1_cherry_planks")],
  salvage_4_cherry_planks: [condition.tagNotEmpty("salvage_4_cherry_planks")],
  salvage_cherry_bookshelf: [condition.itemExists("cherry_bookshelf")],
  salvage_cherry_chest_boat: [condition.itemExists("cherry_chest_boat")],
  // No bamboo rafts before 1.20.1 in our versions
  salvage_bamboo_chest_raft: [condition.itemExists("bamboo_chest_raft")],
};

export { RECIPE_CONDITIONS, RECIPES, TAGS };
