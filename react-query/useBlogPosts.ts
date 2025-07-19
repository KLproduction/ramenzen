import { useQuery } from "@tanstack/react-query";
import { getBlogPosts } from "../actions/blog";

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      return await getBlogPosts();
    },
  });
}
