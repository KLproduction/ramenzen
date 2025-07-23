import { HighlightedDishes } from "./HighlightedDishes";
import { FeaturedMenu } from "./FeaturedMenu";
import Category from "@/app/(ladning)/_components/Category/Category";
import CategoryNav from "@/app/(ladning)/_components/Category/CategoryNav";

export default function MenuSection() {
  return (
    <section className="relative h-full w-full">
      <CategoryNav />
    </section>
  );
}
