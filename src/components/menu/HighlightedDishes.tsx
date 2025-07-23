import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const dishes = [
  {
    image: "/images/kura-roll.jpg", // Replace with your static asset path
    name: "Kura Roll",
    desc: "Feugiat letius tempor efficitur libero etiam fames conubia lobortis dignissim",
  },
  {
    image: "/images/seafood-dish.jpg",
    name: "Seafood Dish",
    desc: "Feugiat letius tempor efficitur libero etiam fames conubia lobortis dignissim",
  },
  {
    image: "/images/miso-ramen.jpg",
    name: "Miso Ramen",
    desc: "Feugiat letius tempor efficitur libero etiam fames conubia lobortis dignissim",
  },
];

export function HighlightedDishes() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {dishes.map((dish, i) => (
        <motion.div
          key={dish.name}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12 }}
        >
          <Card className="relative overflow-hidden p-0">
            <img
              src={dish.image}
              alt={dish.name}
              className="h-72 w-full object-cover"
            />
            <CardContent className="absolute bottom-0 left-0 w-full bg-white/90 p-6">
              <h3 className="mb-2 text-2xl font-semibold text-rose-700">
                {dish.name}
              </h3>
              <p className="text-sm text-gray-700">{dish.desc}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
