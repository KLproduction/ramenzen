"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "./_components/Hero";
import ProductSlider from "./_components/ProductSlider/Productslider";
import About from "./_components/About";

export default function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Clean up on unmount
    };
  }, []);

  return (
    <div className="h-full w-full bg-white">
      <Hero />
      <div>
        <ProductSlider />
      </div>
      <div>
        <About />
      </div>
    </div>
  );
}
