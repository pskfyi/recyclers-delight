import { NAMESPACE } from "../constants/mod.ts";

export function namespaced(id: string): string {
  return `${NAMESPACE}:${id}`;
}
