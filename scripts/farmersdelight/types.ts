import { Minecraft } from "../minecraft/mod.ts";

export declare namespace FarmersDelight {
  export type CuttingRecipe = {
    type: "farmersdelight:cutting";
    ingredients: [Minecraft.Ingredient];
    result: Minecraft.ItemStack[];
    tool: Minecraft.Ingredient | {
      type: "farmersdelight:tool_action";
      action: "pickaxe_dig" | "axe_dig" | "axe:strip" | "shovel_dig";
    };
    sound?: string;
  };

  export type Recipe = CuttingRecipe;
}
