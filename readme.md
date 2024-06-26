# Recycler's Delight

A Minecraft [data pack](https://minecraft.wiki/w/Data_pack) for [Farmer's Delight](https://www.curseforge.com/minecraft/mc-mods/farmers-delight) adding more recipes for the cutting board, focused on deconstructing items into useful constituent components. It uses tag-based recipes, making it easy to register new items without bloating JEI/REI/EMI.

This datapack has builtin compat for [Quark](https://www.curseforge.com/minecraft/mc-mods/quark), [Supplementaries](https://www.curseforge.com/minecraft/mc-mods/supplementaries), [Supplementaries Squared](https://www.curseforge.com/minecraft/mc-mods/supplementaries-squared), [Storage Drawers](https://www.curseforge.com/minecraft/mc-mods/storage-drawers), and [Create](https://www.curseforge.com/minecraft/mc-mods/create).

## Details

- Consolidated existing Farmer's Delight recipes which output planks, leather, and dyes.
- Many more wooden objects can be broken down into their corresponding planks.
- Larger items like chests yield as much as 4 planks.
- Ladders, wooden slabs, buttons, simple tools, and other items can be salvaged for sticks.
- Pry apart chest boats with a pickaxe.
- All items that produce dyes through crafting now produce dyes through cutting as well.
- Add these tags to your items to get them included in the corresponding recipes:
  - `#recyclersdelight:salvage_1_stick`
  - `#recyclersdelight:salvage_2_sticks`
  - `#recyclersdelight:salvage_1_leather`
  - `#recyclersdelight:salvage_1_WOOD_planks` (replace WOOD with a real wood name)
  - `#recyclersdelight:salvage_2_WOOD_planks`
  - `#recyclersdelight:salvage_4_WOOD_planks`
  - `#recyclersdelight:salvage_2_COLOR_dye` (replace COLOR with a real dye color name)

Note that Quark woods are also accounted for.

## Roadmap

<details>
<summary>Post-<code>1.0.0</code> Release</summary>

- [ ] Vanilla items
  - [ ] Minecarts and Rails
  - [ ] Non-Metal Tools and Weapons
  - [ ] Beds
  - [ ] Banners
  - [ ] Work stations: composter, smoker, furnace, etc.
  - [ ] Salvage string from stringy and textile items
  - [ ] Bricks items (ex. brick stairs)
  - [ ] Walls
  - [ ] Paintings and item frames
  - [ ] Prismarine, Sandstone, Red Sandstone items
  - [ ] Redstone gadgets like Hoppers, Droppers, Dispensers, etc.
  - [ ] Brick items to bricks
- [ ] [Supplementaries](https://www.curseforge.com/minecraft/mc-mods/supplementaries) and [Supplementaries Squared](https://www.curseforge.com/minecraft/mc-mods/supplementaries-squared) items
  - [ ] Flags
- [ ] [Create](https://www.curseforge.com/minecraft/mc-mods/create) items
  - [ ] Salvaging Shafts and Small Cogwheels

</details>

## FAQ

### Why does X item not have a recipe?

These types of items are not handled for the following reasons.

- **Raw materials** should be the _outputs_ of recycling, not the _inputs_.
- If an item already has a smelting recipe, such as **metal items** into nuggets, it was intentionally omitted.

## Development

This data pack is an experiment in using [TypeScript](https://www.typescriptlang.org/) and [Deno](https://deno.com/) to generate Minecraft data pack JSON files. To get started locally, you'll need to have Deno installed and you'll need to be familair with all 3 technologies. You'll also want to create an `.env` file with two variables:

```env
INSTANCE_DIR=example/path/to/minecraft/instance
INSTANCE_DATAPACKS_DIR=example/path/to/minecraft/instance/datapack/dir
```

The following tasks are available to ease development:

| Task                      | Description                                                 |
| :------------------------ | :---------------------------------------------------------- |
| `deno task gen`           | Re-generate the data pack.                                  |
| `deno task instance:open` | Convenience task to open the instance directory in VS Code. |
| `deno task instance:sync` | Copies the generated data pack into the instance.           |
| `deno task build`         | Runs `deno task gen` then `deno task instace:sync`.         |
