export declare namespace Minecraft {
  export namespace Tag {
    /** See: https://minecraft.fandom.com/wiki/Tag#Java_Edition */
    export type Type =
      | "items"
      | "blocks"
      | "fluids"
      | "entity_types"
      | "game_events";
    export type OptionalValue = { id: string; required: false };
    export type Value = string | OptionalValue;
    export type Data = {
      replace?: boolean;
      values: Value[];
    };
  }

  export type ItemIngredient = { item: string };
  export type TagIngredient = { tag: string };
  export type Ingredient = ItemIngredient | TagIngredient;
  export type ItemStack = { item: string; count?: number };

  export type ShapedRecipe = {
    type: "crafting_shaped" | "minecraft:crafting_shaped";
    pattern: [string, string, string] | [string, string];
    key: Record<string, Ingredient>;
    result: ItemStack;
  };

  export type ShapelessRecipe = {
    type: "crafting_shapeless" | "minecraft:crafting_shapeless";
    ingredients: { item: string; data?: number }[];
    result: string;
  };

  export type RemovedRecipe = Record<string | number | symbol, never>;

  export type Recipe = ShapedRecipe | ShapelessRecipe | RemovedRecipe;
}
