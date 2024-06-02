import { Minecraft } from "../minecraft/mod.ts";
import { FarmersDelight } from "./types.ts";

export function cutting(
  tool: FarmersDelight.CuttingRecipe["tool"],
  ingredient: Minecraft.Ingredient,
  result: Minecraft.ItemStack[],
): FarmersDelight.CuttingRecipe {
  return {
    type: "farmersdelight:cutting",
    tool,
    ingredients: [ingredient],
    result,
  };
}

cutting.TOOL = {
  AXE: { type: "farmersdelight:tool_action", action: "axe_dig" },
  KNIFE: { tag: "forge:tools/knives" },
  SHEARS: { tag: "forge:shears" },
  SHOVEL: { type: "farmersdelight:tool_action", action: "shovel_dig" },
  PICKAXE: { type: "farmersdelight:tool_action", action: "pickaxe_dig" },
} as const;
