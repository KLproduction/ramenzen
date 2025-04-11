import { useEffect, useRef, useState } from "react";
import "./product-slider.css";
import { Button } from "@/components/ui/button";

type Props = {};

const ProductSlider = (props: Props) => {
  const [active, setActive] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<NodeListOf<HTMLDivElement>>();
  const circleRef = useRef<HTMLDivElement>(null);
  const [widthItem, setWidthItem] = useState(0);

  const count = 5;

  useEffect(() => {
    if (listRef.current) {
      itemsRef.current = listRef.current.querySelectorAll(".item");
      const width = itemsRef.current?.[active]?.offsetWidth || 0;
      setWidthItem(width);
    }
  }, [active]);

  const runCarousel = () => {
    if (itemsRef.current) {
      itemsRef.current.forEach((item, index) => {
        item.classList.toggle("active", index === active);
      });

      const leftTransform = widthItem * (active - 1) * -1;
      if (listRef.current) {
        listRef.current.style.transform = `translateX(${leftTransform}px)`;
      }
    }
  };

  useEffect(() => {
    runCarousel();
  }, [active, widthItem]);

  const handleNext = () => {
    setActive((prev) => (prev >= count - 1 ? count - 1 : prev + 1));
  };

  const handlePrev = () => {
    setActive((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  useEffect(() => {
    if (circleRef.current) {
      const text = circleRef.current.innerText.split("");
      circleRef.current.innerText = "";
      text.forEach((char, index) => {
        const span = document.createElement("span");
        span.innerText = char;
        const rotate = (360 / text.length) * (index + 1);
        span.style.setProperty("--rotate", `${rotate}deg`);
        circleRef.current?.appendChild(span);
      });
    }
  }, []);

  return (
    <div className="slider bg-yellow-400">
      <div className="list" ref={listRef}>
        <div className="item">
          <img src="1.png" />
        </div>
        <div className="item active">
          <img src="2.png" />
        </div>
        <div className="item">
          <img src="3.png" />
        </div>
        <div className="item">
          <img src="4.png" />
        </div>
        <div className="item">
          <img src="5.png" />
        </div>
      </div>
      <div className="circle" ref={circleRef}>
        Discover the true taste of Japan in the heart of Bristol. At Ramen Zen
      </div>
      <div className="content">
        <h1 className="caption text-4xl text-zinc-800 sm:text-8xl">
          RAMEN ZEN
        </h1>
        <Button className="bg-zinc-800" size={"lg"}>
          <h4 className="text-zinc-50">See More</h4>
        </Button>
      </div>
      <div className="arow">
        <button id="prev" onClick={handlePrev}>
          {"<"}
        </button>
        <button id="next" onClick={handleNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
