import { WOODS } from "./constants.ts";

export const SUPPORTED_VERSIONS = ["1.20.1", "1.19.2"] as const;

export type SupportedVersion = typeof SUPPORTED_VERSIONS[number];

export const ITEMS_NOT_SUPPORTED_BY_VERSION: Record<
  SupportedVersion,
  string[]
> = {
  "1.20.1": [],
  "1.19.2": [
    "warped_hanging_sign",
    "warped_boat",
    "warped_chest_boat",
    "crimson_hanging_sign",
    "crimson_boat",
    "crimson_chest_boat",
    "bamboo_raft",
    "bamboo_chest_raft",
    "bamboo_mosaic_slab",
    "bamboo_mosaic_stairs",
    ...WOODS.map((wood) => `${wood}_hanging_sign`),
  ],
};

export const ITEMS_NOT_SUPPORTED_IN_ALL_VERSIONS: string[] =
  ITEMS_NOT_SUPPORTED_BY_VERSION["1.19.2"]
    .concat(ITEMS_NOT_SUPPORTED_BY_VERSION["1.20.1"]);
