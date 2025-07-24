import { useQuery } from "@tanstack/react-query";
import { getAllBlogCategories } from "@/actions/blog";

export function useAllBlogCategories() {
  return useQuery({
    queryKey: ["allBlogCategories"],
    queryFn: getAllBlogCategories,
  });
}
