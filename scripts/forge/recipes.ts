import { Minecraft } from "../minecraft/mod.ts";
import { Forge } from "./types.ts";

export function conditional<TRecipe = Minecraft.Recipe>(
  recipe: TRecipe,
  conditions: Forge.Condition[],
): Forge.ConditionalRecipeData<TRecipe> {
  return {
    type: "forge:conditional",
    recipes: [{ conditions, recipe }],
  };
}
