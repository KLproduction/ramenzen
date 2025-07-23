"use client";

import { MenuItem } from "@/data/type";
import { useCategoryMenu } from "@/react-query/useCategoryMenu";

export function FeaturedMenu() {
  // Use valid category names from the database
  // These should match exactly with the names in your DB
  const ramenCategory = "Ramen";
  const stirFryCategory = "Main Course";
  const {
    data: ramenMenu = [],
    isLoading: ramenLoading,
    error: ramenError,
  } = useCategoryMenu(ramenCategory, 5);
  const {
    data: stirFryMenu = [],
    isLoading: stirFryLoading,
    error: stirFryError,
  } = useCategoryMenu(stirFryCategory, 5);

  return (
    <section className="py-20">
      <div className="mb-10 text-center">
        <h2 className="caption2 mb-2 text-5xl font-bold text-yellow-400">
          Featured Menu
        </h2>
        <p className="mx-auto max-w-2xl text-zinc-400">
          Discover our chef's highlights and premium selections, crafted for an
          unforgettable experience.
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-1">
        {[
          { menu: ramenMenu, loading: ramenLoading, error: ramenError },
          { menu: stirFryMenu, loading: stirFryLoading, error: stirFryError },
        ].map((col, idx) => (
          <ul key={idx} className="relative rounded-xl p-8 shadow">
            <img
              src="menuSVG1.svg"
              alt=""
              className="absolute bottom-0 right-0 z-0 opacity-10"
            />
            {col.loading ? (
              <li className="text-center text-zinc-400">Loading...</li>
            ) : col.error ? (
              <li className="text-center text-red-500">
                {col.error.message.includes("Invalid enum value")
                  ? "Invalid category name. Please check your database for valid category names."
                  : col.error.message}
              </li>
            ) : col.menu.length === 0 ? (
              <li className="text-center text-zinc-400">No items found.</li>
            ) : (
              col.menu.map((item) => {
                // Ensure order and spicyLevel are never null
                const safeItem = {
                  ...item,
                  order: item.order ?? 0,
                  spicyLevel: item.spicyLevel ?? 0,
                };
                return (
                  <li key={safeItem.name} className="mb-8 last:mb-0">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="caption2 text-lg font-bold text-yellow-400">
                        {safeItem.name}
                      </span>
                      <span className="text-xl font-bold text-rose-500">
                        ${safeItem.price}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300">
                      {safeItem.description}
                    </p>
                  </li>
                );
              })
            )}
          </ul>
        ))}
      </div>
    </section>
  );
}
