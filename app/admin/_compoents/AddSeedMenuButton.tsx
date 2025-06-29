"use client";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { MenuItem } from "@/data/type";

import {
  ramenMenu,
  starterMenu,
  mainCourseMenu,
  dessertMenu,
  chineseDishesMenu,
  starterSaltPepperMenu,
  blackBeanSauceMenu,
  stirFryMenu,
} from "@/data/menu";
import { addSeedMenuAction } from "@/actions/seedMenu";

export default function AddSeedMenuButton() {
  const [result, setResult] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSeedMenu() {
    setResult(null);
    startTransition(async () => {
      try {
        const allMenus: MenuItem[] = [
          ...ramenMenu,
          ...starterMenu,
          ...mainCourseMenu,
          ...dessertMenu,
          ...chineseDishesMenu,
          ...starterSaltPepperMenu,
          ...blackBeanSauceMenu,
          ...stirFryMenu,
        ];
        const data = await addSeedMenuAction(allMenus);
        if (data.success) {
          setResult("Menu seeded successfully!");
        } else {
          setResult("Failed to seed menu.");
        }
      } catch (e) {
        setResult("Error seeding menu.");
      }
    });
  }

  return (
    <div>
      <Button
        className="rounded px-4 py-2 text-white disabled:opacity-50"
        onClick={handleSeedMenu}
        disabled={isPending}
      >
        {isPending ? "Seeding..." : "Seed Menu"}
      </Button>
      {result && <p className="mt-4">{result}</p>}
    </div>
  );
}
