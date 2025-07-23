import { z } from "zod";
import { getAllCategoryNames } from "./getAllCategoryNames";

export async function getCategoryNameType() {
  const names = await getAllCategoryNames();
  // Zod requires at least one value, so cast as [string, ...string[]]
  return z.enum(names as [string, ...string[]]);
}
