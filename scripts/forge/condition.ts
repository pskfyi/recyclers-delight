export declare namespace Condition {
  export type ItemExists = {
    type: "forge:item_exists";
    item: string;
  };

  export type ModLoaded = {
    type: "forge:mod_loaded";
    modid: string;
  };

  export type TagEmpty = {
    type: "forge:tag_empty";
    tag: string;
  };

  export type Not = {
    type: "forge:not";
    value: Type;
  };

  export type And = {
    type: "forge:and";
    values: Type[];
  };

  export type Or = {
    type: "forge:or";
    values: Type[];
  };

  export type Type = ItemExists | ModLoaded | TagEmpty | Not | And | Or;
}

export function itemExists(id: string): Condition.ItemExists {
  return {
    type: "forge:item_exists",
    item: id,
  };
}

export function modLoaded(id: string): Condition.ModLoaded {
  return {
    type: "forge:mod_loaded",
    modid: id,
  };
}

export function tagEmpty(id: string): Condition.TagEmpty {
  return {
    type: "forge:tag_empty",
    tag: id,
  };
}

export function not(condition: Condition.Type): Condition.Not {
  return {
    type: "forge:not",
    value: condition,
  };
}

export function and(...conditions: Condition.Type[]): Condition.And {
  return {
    type: "forge:and",
    values: conditions,
  };
}

export function or(...conditions: Condition.Type[]): Condition.Or {
  return {
    type: "forge:or",
    values: conditions,
  };
}

export function tagNotEmpty(id: string) {
  return not(tagEmpty(id));
}
