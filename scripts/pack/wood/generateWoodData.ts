import { DataPack } from "../DataPack.ts";
import * as tag from "../tag.ts";
import { FarmersDelight, recipes } from "../../farmersdelight/mod.ts";
import { ingredient } from "../../minecraft/mod.ts";
import { namespaced } from "../utils.ts";
import { condition, Forge, recipes as forgeRecipe } from "../../forge/mod.ts";

export const OMIT_ITEM = Symbol("omit");
export type OmitSymbol = typeof OMIT_ITEM;
export type GenerateWoodDataValue = string | OmitSymbol;

export type GenerateWoodDataOptions = {
  wood: string;
  mod?: string;
  // Vanilla items
  planks?: GenerateWoodDataValue;
  boat?: GenerateWoodDataValue;
  chest_boat?: GenerateWoodDataValue;
  stairs?: GenerateWoodDataValue;
  fence?: GenerateWoodDataValue;
  fence_gate?: GenerateWoodDataValue;
  door?: GenerateWoodDataValue;
  trapdoor?: GenerateWoodDataValue;
  pressure_plate?: GenerateWoodDataValue;
  sign?: GenerateWoodDataValue;
  hanging_sign?: GenerateWoodDataValue;
  // Farmers Delight items
  cabinet?: GenerateWoodDataValue;
  // Quark items
  bookshelf?: GenerateWoodDataValue; // wood-specific variants are from Quark
  post?: GenerateWoodDataValue;
  stripped_post?: GenerateWoodDataValue;
  chest?: GenerateWoodDataValue;
  trapped_chest?: GenerateWoodDataValue;
  // Supplementaries items
  /** Sign posts can be salvaged into 2 sticks. */
  sign_post?: never;
  // Create items
  window?: GenerateWoodDataValue;
  // Storage Drawers items
  full_drawers_1?: GenerateWoodDataValue;
  full_drawers_2?: GenerateWoodDataValue;
  full_drawers_4?: GenerateWoodDataValue;
  half_drawers_1?: GenerateWoodDataValue;
  half_drawers_2?: GenerateWoodDataValue;
  half_drawers_4?: GenerateWoodDataValue;
  trim?: GenerateWoodDataValue;
};

export type WoodData = {
  recipes: DataPack.RecipesByName;
  itemTags: DataPack.TagsByType["items"];
};

/** Use `variant.default` to set a special default ID. Otherwise the ID will
 * fall back to `${options.wood}_${itemType}` for vanilla items or
 * `${options.mod}:${options.wood}_${itemType}` for modded items. */
function _format(
  itemType: keyof GenerateWoodDataOptions,
  options: GenerateWoodDataOptions,
  variants: { [ModID: string]: string } = {},
): string {
  const explicitID = options[itemType];

  if (explicitID === OMIT_ITEM) return "";
  if (explicitID) return explicitID;

  const mod = options.mod;
  if (mod && mod in variants) return variants[mod];

  if ("default" in variants) return variants.default;

  const wood = options.wood;
  return mod ? `${mod}:${wood}_${itemType}` : `${wood}_${itemType}`;
}

// All recipes
const RECIPES = {
  salvage1Planks(wood: string, planksID: string) {
    return recipes.cutting(
      recipes.cutting.TOOL.AXE,
      ingredient.tag(namespaced(`salvage_1_${wood}_planks`)),
      [ingredient.item(planksID)],
    );
  },
  salvage4Planks(wood: string, planksID: string) {
    return recipes.cutting(
      recipes.cutting.TOOL.AXE,
      ingredient.tag(namespaced(`salvage_4_${wood}_planks`)),
      [ingredient.item(planksID, 4)],
    );
  },
  salvageBookshelf(
    bookshelfID: string,
    planksID: string,
  ) {
    return recipes.cutting(
      recipes.cutting.TOOL.AXE,
      ingredient.item(bookshelfID),
      [ingredient.item(planksID, 4), ingredient.item("book", 3)],
    );
  },
  salvageChestBoat(
    chestBoatID: string,
    boatID: string,
  ) {
    return recipes.cutting(
      recipes.cutting.TOOL.PICKAXE,
      ingredient.item(chestBoatID),
      [ingredient.item(boatID), ingredient.item("chest")],
    );
  },
};

type ConfigKeys = keyof Omit<GenerateWoodDataOptions, "mod" | "sign_post">;
type Config = Record<ConfigKeys, string> & { mod?: string };

function _makeConfig(options: GenerateWoodDataOptions): Config {
  const wood = options.wood;
  const fmt = (key: ConfigKeys, variants: Record<string, string> = {}) =>
    _format(key, options, variants);
  const fmtDrawer = (style: "full" | "half", num: 1 | 2 | 4) =>
    fmt(`${style}_drawers_${num}`, {
      default: `storagedrawers:${wood}_${style}_drawers_${num}`,
      quark: `everycomp:sd/quark/${wood}_${style}_drawers_${num}`,
    });

  return {
    wood,
    mod: options.mod,
    // Vanilla items
    planks: fmt("planks"),
    stairs: fmt("stairs", { quark: `quark:${wood}_planks_stairs` }),
    fence: fmt("fence"),
    fence_gate: fmt("fence_gate"),
    door: fmt("door"),
    trapdoor: fmt("trapdoor"),
    pressure_plate: fmt("pressure_plate"),
    sign: fmt("sign"),
    hanging_sign: fmt("hanging_sign"),
    boat: fmt("boat"),
    chest_boat: fmt("chest_boat"),
    // Farmers Delight items
    cabinet: fmt("cabinet", {
      default: `farmersdelight:${wood}_cabinet`,
      quark: `everycomp:fd/quark/${wood}_cabinet`,
    }),
    // Quark items
    bookshelf: fmt("bookshelf", { default: `quark:${wood}_bookshelf` }),
    post: fmt("post", { default: `quark:${wood}_post` }),
    stripped_post: fmt("stripped_post", {
      default: `quark:stripped_${wood}_post`,
    }),
    chest: fmt("chest", { default: `quark:${wood}_chest` }),
    trapped_chest: fmt("trapped_chest", {
      default: `quark:${wood}_trapped_chest`,
    }),
    // Create items
    window: fmt("window", {
      default: `create:${wood}_window`,
      quark: `everycomp:c/quark/${wood}_window`,
    }),
    // Storage Drawers items
    full_drawers_1: fmtDrawer("full", 1),
    full_drawers_2: fmtDrawer("full", 2),
    full_drawers_4: fmtDrawer("full", 4),
    half_drawers_1: fmtDrawer("half", 1),
    half_drawers_2: fmtDrawer("half", 2),
    half_drawers_4: fmtDrawer("half", 4),
    trim: fmt("trim", {
      default: `storagedrawers:${wood}_trim`,
      quark: `everycomp:sd/quark/${wood}_trim`,
    }),
  };
}

const WOODS_WITHOUT_BOATS_BEFORE_1_20_1 = [
  "warped",
  "crimson",
];

function makePlanksRecipe(config: Config, amount: 1 | 4) {
  const wood = config.wood;
  const planks = config.planks;
  const recipeKey = `salvage${amount}Planks` as const;

  if (wood !== "bamboo") return RECIPES[recipeKey](wood, planks);

  return {
    type: "forge:conditional",
    recipes: [
      {
        recipe: RECIPES[recipeKey]("bamboo", "bamboo_planks"),
        conditions: [condition.itemExists("bamboo_planks")],
      },
      {
        recipe: RECIPES[recipeKey](wood, `quark:bamboo_planks`),
        conditions: [condition.itemExists("quark:bamboo_planks")],
      },
    ],
  } as Forge.ConditionalRecipeData<FarmersDelight.Recipe>;
}

function makeBookshelfRecipe(config: Config) {
  const wood = config.wood;
  const planks = config.planks;
  const bookshelf = config.bookshelf;

  if (wood !== "bamboo") return RECIPES.salvageBookshelf(bookshelf, planks);

  return {
    type: "forge:conditional",
    recipes: [
      {
        recipe: RECIPES.salvageBookshelf(bookshelf, "bamboo_planks"),
        conditions: [condition.itemExists("bamboo_planks")],
      },
      {
        recipe: RECIPES.salvageBookshelf(bookshelf, `quark:bamboo_planks`),
        conditions: [condition.itemExists("quark:bamboo_planks")],
      },
    ],
  } as Forge.ConditionalRecipeData<FarmersDelight.Recipe>;
}

function makeChestBoatRecipe(
  config: Config,
) {
  const wood = config.wood;
  const chestBoatID = config.chest_boat;
  const boatID = config.boat;
  const recipe = RECIPES.salvageChestBoat(chestBoatID, boatID);

  return WOODS_WITHOUT_BOATS_BEFORE_1_20_1.includes(wood)
    ? forgeRecipe
      .conditional(recipe, [condition.itemExists(`${wood}_chest_boat`)])
    : recipe;
}

function suppHangingSign(config: Config) {
  const wood = config.wood;
  const mod = config.mod;
  const id = config.hanging_sign;

  if (id === "") return "";
  if (mod === "quark") return `supplementaries:quark/hanging_sign_${wood}`;
  if (mod) return "";

  return `supplementaries:hanging_sign_${wood}`;
}

export function generateWoodData(options: GenerateWoodDataOptions): WoodData {
  const _config = _makeConfig(options);
  const wood = _config.wood;

  const salvage1Planks = `salvage_1_${wood}_planks`;
  const salvage4Planks = `salvage_4_${wood}_planks`;
  const salvageChestBoat = wood === "bamboo"
    ? "salvage_bamboo_chest_raft"
    : `salvage_${wood}_chest_boat`;

  return {
    recipes: {
      [salvage1Planks]: makePlanksRecipe(_config, 1),
      [salvage4Planks]: makePlanksRecipe(_config, 4),
      [`salvage_${wood}_bookshelf`]: makeBookshelfRecipe(_config),
      [salvageChestBoat]: makeChestBoatRecipe(_config),
    },
    itemTags: tag.byType({
      items: {
        [salvage1Planks]: [
          _config.stairs,
          _config.fence,
          _config.fence_gate,
          _config.door,
          _config.trapdoor,
          _config.pressure_plate,
          _config.sign,
          _config.hanging_sign,
          suppHangingSign(_config),
          _config.post,
          _config.stripped_post,
          _config.window,
          _config.trim,
        ],
        [salvage4Planks]: [
          _config.boat,
          _config.cabinet,
          _config.chest,
          _config.trapped_chest,
          _config.full_drawers_1,
          _config.full_drawers_2,
          _config.full_drawers_4,
          _config.half_drawers_1,
          _config.half_drawers_2,
          _config.half_drawers_4,
        ],
      },
    }).items,
  };
}
