import { getMenuItems } from "@/actions/menu";
import Image from "next/image";

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  // Group menu items by category name
  const itemsByCategory = menuItems.reduce(
    (acc, item) => {
      const cat = item.category?.name || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {} as Record<string, typeof menuItems>,
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Menu</h1>
      {Object.entries(itemsByCategory).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-blue-700">
            {category}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border p-6 shadow transition hover:shadow-lg"
              >
                {item.image && (
                  <div className="relative mb-4 h-48 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                )}
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <span className="text-lg font-bold text-green-600">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                {item.tag && (
                  <span className="mr-2 inline-block rounded bg-gray-200 px-2 py-1 text-xs">
                    {item.tag}
                  </span>
                )}
                {item.spicyLevel !== null && item.spicyLevel !== undefined && (
                  <span className="mr-2 inline-block rounded bg-red-100 px-2 py-1 text-xs">
                    Spicy: {item.spicyLevel}
                  </span>
                )}
                <p className="mt-2 text-gray-700">{item.description}</p>
                {item.ingredients && item.ingredients.length > 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    Ingredients: {item.ingredients.join(", ")}
                  </p>
                )}
                {item.allergens && item.allergens.length > 0 && (
                  <p className="mt-2 text-sm text-red-400">
                    Allergens: {item.allergens.join(", ")}
                  </p>
                )}
                {!item.isAvailable && (
                  <span className="mt-2 inline-block rounded bg-gray-400 px-2 py-1 text-xs text-white">
                    Not Available
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
