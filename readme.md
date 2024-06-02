# Recycler's Delight

A Minecraft datapack for [Farmer's Delight](https://www.curseforge.com/minecraft/mc-mods/farmers-delight) adding more recipes for the cutting board, focused on deconstructing items into useful constituent components. It uses tag-based recipes, making it easy to register new items without bloating JEI/REI/EMI.

This datapack has builtin compat for [Quark](https://www.curseforge.com/minecraft/mc-mods/quark), [Supplementaries](https://www.curseforge.com/minecraft/mc-mods/supplementaries), [Supplementaries Squared](https://www.curseforge.com/minecraft/mc-mods/supplementaries-squared), [Storage Drawers](https://www.curseforge.com/minecraft/mc-mods/storage-drawers), and [Create](https://www.curseforge.com/minecraft/mc-mods/create).

## Details

- Consolidated existing Farmer's Delight recipes which output planks, leather, and dyes.
- Many more wooden objects can be broken down into their corresponding planks.
- Ladders and wooden slabs can be salvaged for sticks.
- All items that produce dyes through crafting now produce dyes through cutting as well.
- Add these tags to your items to get them included in the corresponding recipes:
  - `#recyclersdelight:salvage_1_stick`
  - `#recyclersdelight:salvage_2_sticks`
  - `#recyclersdelight:salvage_1_leather`
  - `#recyclersdelight:salvage_1_WOOD_planks` (replace WOOD with a real wood name)
  - `#recyclersdelight:salvage_2_WOOD_planks`
  - `#recyclersdelight:salvage_4_WOOD_planks`
  - `#recyclersdelight:salvage_2_COLOR_dye` (replace COLOR with a real dye color name)

## Roadmap

<details>
<summary><code>1.0.0</code> Release</summary>

- [x] Use tag-based recipes to collapse existing recipes that have identical outputs
  - [x] All wood types
  - [x] Leather armor
  - [x] Dyes
- [x] Vanilla items
  - [x] Vanilla dye items that weren't covered
  - [x] Ladder
  - [x] Buttons
  - [x] Wooden Slabs
  - [x] Chests and Trapped Chests
  - [x] Barrel
  - [x] Boats and Chest Boats
  - [x] Wood and Stone Tools and Swords
- [x] [Quark](https://www.curseforge.com/minecraft/mc-mods/quark) items
  - [x] Variant Ladders
  - [x] Variant Chests and Trapped Chests
  - [x] Posts and Stripped Posts
- [x] [Storage Drawers](https://www.curseforge.com/minecraft/mc-mods/storage-drawers)
  - [x] Trims
- [x] [Supplementaries](https://www.curseforge.com/minecraft/mc-mods/supplementaries) and [Supplementaries Squared](https://www.curseforge.com/minecraft/mc-mods/supplementaries-squared) items
  - [x] Item Shelves
  - [x] Sign Posts
- [x] [Create](https://www.curseforge.com/minecraft/mc-mods/create) items
  - [x] Windows

</details>

<br/>

<details>
<summary>Post-<code>1.0.0</code> Release</summary>

### Post-`1.0.0` Release

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
