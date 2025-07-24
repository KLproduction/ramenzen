import { useQuery } from "@tanstack/react-query"
import { getBlogPostBySlug } from "@/actions/blog"

export function useBlogPostBySlug(slug: string) {
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug,
  })
}
