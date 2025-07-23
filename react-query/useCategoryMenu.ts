"use client";

import { useQuery } from "@tanstack/react-query";
import getCategoryMenu from "@/actions/getCategoryMenu";

export function useCategoryMenu(categoryName: string, take: number = 5) {
  return useQuery({
    queryKey: ["categoryMenu", categoryName, take],
    queryFn: async () => await getCategoryMenu(categoryName, take),
    enabled: !!categoryName,
  });
}
