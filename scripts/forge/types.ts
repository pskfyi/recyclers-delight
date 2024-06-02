import { Minecraft } from "../minecraft/mod.ts";

export declare namespace Forge {
  export type Condition = Record<string, unknown>; // TODO: better typedef
  export type ConditionalRecipeData<TRecipe = Minecraft.Recipe> = {
    type: "forge:conditional";
    "recipes": Array<{
      conditions: Condition[];
      recipe: TRecipe;
    }>;
  };
}
