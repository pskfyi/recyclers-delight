import { DataPack } from "../DataPack.ts";
import { namespaced } from "../utils.ts";
import * as tag from "../tag.ts";
import { NAMESPACE } from "../../constants/namespace.ts";
import { recipes } from "../../farmersdelight/mod.ts";
import { ingredient } from "../../minecraft/mod.ts";

const salvage1Stick = "salvage_1_stick";
const salvage2Sticks = "salvage_2_sticks";

export const RECIPES: DataPack.RecipesByName = {
  [salvage1Stick]: recipes.cutting(
    recipes.cutting.TOOL.AXE,
    { tag: namespaced(salvage1Stick) },
    [ingredient.item("stick")],
  ),
  [salvage2Sticks]: recipes.cutting(
    recipes.cutting.TOOL.AXE,
    { tag: namespaced(salvage2Sticks) },
    [ingredient.item("stick", 2)],
  ),
};

export const RECIPE_CONDITIONS = {};

export const TAGS = tag.byType({
  items: {
    ladders: [
      "ladder",
      "quark:ancient_ladder",
      "quark:azalea_ladder",
      "quark:blossom_ladder",
      "quark:spruce_ladder",
      "quark:birch_ladder",
      "quark:jungle_ladder",
      "quark:acacia_ladder",
      "quark:dark_oak_ladder",
      "quark:crimson_ladder",
      "quark:warped_ladder",
      "quark:mangrove_ladder",
      "quark:bamboo_ladder",
      "quark:cherry_ladder",
    ],
    [salvage1Stick]: [
      "wooden_sword",
      "stone_sword",
      "#wooden_buttons",
    ],
    [salvage2Sticks]: [
      "wooden_axe",
      "wooden_hoe",
      "wooden_pickaxe",
      "wooden_shovel",
      "stone_axe",
      "stone_hoe",
      "stone_pickaxe",
      "stone_shovel",
      `#${NAMESPACE}:ladders`,
      "bamboo_mosaic_slab",
      "quark:bamboo_mosaic_vertical_slab",
      "quark:bamboo_post",
      "quark:stripped_bamboo_post",
      "supplementaries:bamboo_spikes",
      "supplementaries:bamboo_spikes_tipped",
      "#wooden_slabs",
      "#quark:wooden_vertical_slabs",
      `#supplementaries:sign_posts`,
      `#suppsquared:item_shelves`,
    ],
  },
});
