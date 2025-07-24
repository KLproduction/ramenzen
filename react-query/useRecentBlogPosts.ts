import { useQuery } from "@tanstack/react-query";
import { getRecentBlogPosts } from "@/actions/blog";

export function useRecentBlogPosts() {
  return useQuery({
    queryKey: ["recentBlogPosts"],
    queryFn: getRecentBlogPosts,
  });
}
