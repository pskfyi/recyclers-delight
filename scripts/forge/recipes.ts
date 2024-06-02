import { Minecraft } from "../minecraft/mod.ts";
import { Condition } from "./condition.ts";

export type ConditionalRecipeData<TRecipe = Minecraft.Recipe> = {
  type: "forge:conditional";
  "recipes": Array<{
    conditions: Condition.Type[];
    recipe: TRecipe;
  }>;
};

export function conditional<TRecipe = Minecraft.Recipe>(
  recipe: TRecipe,
  conditions: Condition.Type[],
): ConditionalRecipeData<TRecipe> {
  return {
    type: "forge:conditional",
    recipes: [{ conditions, recipe }],
  };
}
