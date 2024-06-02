import {
  ITEMS_NOT_SUPPORTED_BY_VERSION as VANILLA_ITEMS_NOT_SUPPORTED_BY_VERSION,
  SupportedVersion,
  WOODS as VANILLA_WOODS,
} from "../minecraft/mod.ts";
import { WOODS as QUARK_WOODS } from "../quark/mod.ts";

export const ITEMS_NOT_SUPPORTED_BY_VERSION: Record<
  SupportedVersion,
  string[]
> = {
  "1.20.1": [
    ...VANILLA_ITEMS_NOT_SUPPORTED_BY_VERSION["1.20.1"],
    ...VANILLA_WOODS.map((wood) => `supplementaries:hanging_sign_${wood}`),
    ...QUARK_WOODS.map((wood) => `supplementaries:quark/hanging_sign_${wood}`),
  ],
  "1.19.2": [
    ...VANILLA_ITEMS_NOT_SUPPORTED_BY_VERSION["1.19.2"],
  ],
};

export const ITEMS_NOT_SUPPORTED_IN_ALL_VERSIONS: string[] =
  ITEMS_NOT_SUPPORTED_BY_VERSION["1.19.2"]
    .concat(ITEMS_NOT_SUPPORTED_BY_VERSION["1.20.1"]);
