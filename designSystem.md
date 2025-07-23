# RamenZen Design System

## Overview

The RamenZen Design System is a set of reusable components, styles, and guidelines that ensure a consistent, accessible, and modern user experience across the application. It is built with Next.js, React, Tailwind CSS, and Radix UI primitives, and is designed for scalability and maintainability.

---

## Core Principles

- **Consistency:** Shared UI components and styles for a unified look and feel.
- **Reusability:** Modular components for rapid development and easy maintenance.
- **Accessibility:** Semantic HTML, keyboard navigation, and ARIA support.
- **Responsiveness:** Mobile-first layouts and adaptive design.
- **Theming:** Support for light/dark modes and custom themes.

---

## Technologies Used

- **Next.js:** App router, server/client components, API routes.
- **React:** Component-based architecture.
- **Tailwind CSS:** Utility-first styling, custom theme configuration.
- **Radix UI:** Accessible primitives for dialogs, menus, and more.
- **Lucide/Tabler Icons:** Consistent iconography.

---

## Component Library Structure

- **Global UI:** Buttons, modals, forms, containers, navigation bars.
- **Menu System:**
  - `MenuSection`: Main menu section wrapper.
  - `FeaturedMenu`: Highlights featured dishes.
  - `HighlightedDishes`: Displays signature or popular items.
  - `Category`: Renders menu categories.
- **Blog/Event System:**
  - Carousel for blog/event highlights.
  - Blog listing and detail pages.
- **Map Integration:** Google Maps components for location and directions.

---

## Styling & Theming

- **Tailwind CSS:**
  - Default colors: `text-yellow-400` for text and `bg-zinc-900` for backgrounds are used throughout the design system for a consistent brand look.
  - Heading fonts use the custom class `caption2` for a distinctive style, as seen in menu/category headings.
  - Custom colors, spacing, typography in `tailwind.config.ts`.
  - Responsive breakpoints for mobile/tablet/desktop.
  - Utility classes for rapid prototyping.
- **Theme Support:**
  - Light/dark mode via `next-themes`.
  - Easily extendable for brand colors.

---

## Accessibility

- **Radix UI:** Ensures dialogs, menus, and other interactive elements are accessible.
- **Semantic HTML:** Used throughout for screen reader support.
- **Keyboard Navigation:** All interactive components are keyboard-friendly.

---

## Usage Guidelines

- **Component Reuse:** Import from `src/components` or feature folders.
- **Customization:** Use Tailwind utility classes and extend via config.
- **Icons:** Use Lucide or Tabler for consistent iconography.
- **Forms:** Use React Hook Form for validation and error handling.

---

## Extending the System

- Add new components to `src/components` or feature folders.
- Update `tailwind.config.ts` for new colors, fonts, or breakpoints.
- Follow accessibility best practices for new UI elements.

---

## Example: Category Component

```tsx
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import React, { useRef } from "react";

const categories = [
  {
    title: "Soup & Ramen",
    subtitle: "拉麵",
    image: "/1.png",
    bgColor: "bg-stone-800",
    textColor: "text-yellow-400",
    href: "/1.png",
  },
  // ...other categories...
];

export default function Category() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      className="relative hidden h-[150vh] overflow-hidden bg-yellow-400 py-10 md:block"
      ref={targetRef}
    >
      <motion.img
        src="/inShop2.PNG"
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-75"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-yellow-400 via-yellow-400/0 to-yellow-400" />
      <motion.div
        className="absolute top-[20%] w-full text-center"
        style={{ scale: 2 }}
      >
        <h4 className="text-9xl font-bold text-yellow-400 opacity-70">MENU</h4>
      </motion.div>
      <div className="z-20 flex h-full flex-col items-center justify-center">
        <div className="flex h-full w-full items-center justify-center">
          <motion.div className="grid max-w-[80%] grid-cols-1 gap-6 md:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ rotate: [0, 0, 0, 0, 0], opacity: [0, 1] }}
                transition={{
                  duration: 0.5 * (i + 0.5),
                  ease: [0.65, 0, 0.35, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Link
                  href={cat.href}
                  className={`relative flex flex-col justify-between bg-black/75 p-12 backdrop-blur-sm ${
                    cat.textColor || "text-yellow-400"
                  } group min-h-[500px] w-auto overflow-hidden rounded-2xl shadow-xl brightness-100 transition-transform hover:z-50 hover:scale-105 hover:brightness-110`}
                >
                  <div>
                    <p className="mb-3 text-lg font-bold">{cat.subtitle}</p>
                    <h2 className="caption2 font-serif text-6xl leading-tight">
                      {cat.title}
                    </h2>
                    <div className="opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
                      <span className="mr-3"> See More</span>
                      <span className="mt-6 inline-block -rotate-45 text-xl">
                        →
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-[70%] left-1/2 right-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:-bottom-[80%]">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      layout="fill"
                      objectFit="contain"
                      className="group-hover:animate-slow-spin"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Next.js Documentation](https://nextjs.org/docs)

---

For questions or contributions, see the project README or contact the maintainers.
