import { copy, dirname, exists } from "../_deps.ts";
import { FarmersDelight } from "../farmersdelight/types.ts";
import { Forge } from "../forge/mod.ts";
import { conditional } from "../forge/recipes.ts";
import { Minecraft } from "../minecraft/mod.ts";

async function writeJsonFile(path: string, data: unknown) {
  await Deno.writeTextFile(path, JSON.stringify(data, null, 2));
}

declare namespace DataPack {
  export type TagsByType<T extends Minecraft.Tag.Type = Minecraft.Tag.Type> = {
    [Type in T]: {
      [TagName: string]: Minecraft.Tag.Value[];
    };
  };

  export type TagsByNamespace = {
    [Namespace: string]: Partial<TagsByType>;
  };

  export type TagEntry = [
    Namespace: string,
    Type: Minecraft.Tag.Type,
    TagName: string,
    Values: Minecraft.Tag.Value[],
  ];

  export type Recipe =
    | Minecraft.Recipe
    | FarmersDelight.Recipe
    | Forge.ConditionalRecipeData<
      | Minecraft.Recipe
      | FarmersDelight.Recipe
    >;

  export type RecipesByName = {
    [RecipeName: string]: Recipe;
  };

  export type RecipesByNamespace = {
    [Namespace: string]: RecipesByName;
  };

  export type RecipeConditions = {
    [Namespace: string]: {
      [RecipeName: string]: Forge.Condition.Type[];
    };
  };

  export type RecipeEntry = [
    Namespace: string,
    RecipeName: string,
    Recipe: Recipe,
  ];
}

class DataPack {
  /**
   * @param parentDir path to a directory where the data pack will be generated
   * @param namespace example: `"farmersdelight"`
   */
  constructor(
    public parentDir: string,
    public namespace: string,
    public packFormat = 9, // 1.18.2
  ) {
    this.dir = `${parentDir}/${namespace}`;
    if (!namespace) throw new Error("Non-blank namespace is required");
  }

  dir: string;
  description = "";

  get meta() {
    return {
      pack: { description: this.description, pack_format: this.packFormat },
    };
  }

  /** When references are made to a resource location not in these namespaces,
   * the data pack entries with those references will be marked as optional.
   * Example: tag values.
   *
   * The `"minecraft"` namespace is implicit and cannot be omitted. */
  requiredNamespaces: string[] = [];

  get #requiredNamespaces() {
    return this.requiredNamespaces.concat("minecraft");
  }

  /** @param resourceLocation example `"quark:pipe"` */
  hasRequiredNamespace(resourceLocation: string) {
    return !resourceLocation.includes(":") ||
      this.#requiredNamespaces.find((ns) =>
        RegExp(`^\#?${ns}`).test(resourceLocation)
      );
  }

  /** @param resourceLocation example `"quark:pipe"` */
  hasOptionalNamespace(resourceLocation: string) {
    return !this.hasRequiredNamespace(resourceLocation);
  }

  tags: DataPack.TagsByNamespace = {};

  forEachTag(
    callback: (
      namespace: string,
      type: Minecraft.Tag.Type,
      tag: string,
      values: Minecraft.Tag.Value[],
    ) => void,
  ) {
    for (const namespace in this.tags) {
      for (const _type in this.tags[namespace]) {
        const type = _type as Minecraft.Tag.Type;
        for (const tag in this.tags[namespace]![type as Minecraft.Tag.Type]) {
          const values = this.tags[namespace]![type]![tag];
          callback(namespace, type, tag, values);
        }
      }
    }
  }

  tagEntries(): DataPack.TagEntry[] {
    const entries: DataPack.TagEntry[] = [];

    this.forEachTag((namespace, type, tagName, values) => {
      entries.push([namespace, type, tagName, values]);
    });

    return entries;
  }

  recipes = {} as DataPack.RecipesByNamespace;
  recipeConditions = {} as DataPack.RecipeConditions;

  forEachRecipe(
    callback: (
      namespace: string,
      recipeName: string,
      recipe: DataPack.Recipe,
    ) => void,
  ) {
    for (const namespace in this.recipes) {
      for (const recipeName in this.recipes[namespace]) {
        const recipe = this.recipes[namespace][recipeName];
        callback(namespace, recipeName, recipe);
      }
    }
  }

  recipeEntries(): [string, string, DataPack.Recipe][] {
    const entries: DataPack.RecipeEntry[] = [];

    this.forEachRecipe((namespace, recipeName, recipe) => {
      entries.push([namespace, recipeName, recipe]);
    });

    return entries;
  }

  /** Create the data pack's  */
  async init() {
    await Deno.mkdir(this.dir, { recursive: true });
    await writeJsonFile(`${this.dir}/pack.mcmeta`, this.meta);
  }

  /**
   * @param namespace example: `"minecraft"`
   * @param tagName example: `"tools/axes"`
   */
  async writeTagFile(
    namespace: string,
    type: Minecraft.Tag.Type,
    tagName: string,
    data: Minecraft.Tag.Data,
  ) {
    const path = `${this.dir}/data/${namespace}/tags/${type}/${tagName}.json`;

    await Deno.mkdir(dirname(path), { recursive: true });
    await writeJsonFile(path, data);
  }

  async writeAllTagFiles() {
    await Promise.all(
      this.tagEntries().map(async ([namespace, type, tagName, values]) =>
        await this.writeTagFile(namespace, type, tagName, { values })
      ),
    );
  }

  /**
   * @param namespace example: `"minecraft"`
   * @param recipeName example: `"stick"`
   */
  async writeRecipeFile(
    namespace: string,
    recipeName: string,
    recipe: DataPack.Recipe,
  ) {
    const conditions = namespace in this.recipeConditions &&
        recipeName in this.recipeConditions[namespace]
      ? this.recipeConditions[namespace][recipeName]
      : undefined;

    const data = conditions
      ? conditional<DataPack.Recipe>(recipe, conditions)
      : recipe;

    const path = `${this.dir}/data/${namespace}/recipes/${recipeName}.json`;
    await Deno.mkdir(dirname(path), { recursive: true });
    await writeJsonFile(path, data);
  }

  async writeAllRecipeFiles() {
    await Promise.all(
      this.recipeEntries().map(async ([namespace, recipeName, recipe]) =>
        await this.writeRecipeFile(namespace, recipeName, recipe)
      ),
    );
  }

  async generate() {
    if (await exists(this.dir)) {
      await Deno.remove(this.dir, { recursive: true });
    }

    await this.init();
    await this.writeAllTagFiles();
    await this.writeAllRecipeFiles();
  }

  async install(targetDir: string) {
    if (!targetDir) throw new Error("Target directory is required");

    const targetPath = `${targetDir}/${this.namespace}`;

    if (await exists(targetPath)) {
      await Deno.remove(targetPath, { recursive: true });
    }

    await copy(this.dir, `${targetDir}/${this.namespace}`, {
      overwrite: true,
    });
  }
}

export { DataPack };
