import { Minecraft } from "./types.ts";

export function item(id: string, count?: never): Minecraft.ItemIngredient;
export function item(id: string, count: number): Minecraft.ItemStack;
export function item(id: string, count?: number): Minecraft.ItemStack {
  const itemStack: Minecraft.ItemStack = { item: id };

  if (count) itemStack.count = count;

  return itemStack;
}

export function tag(id: string): Minecraft.TagIngredient {
  return { tag: id };
}
