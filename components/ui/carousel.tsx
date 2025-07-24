"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useId, useEffect } from "react";

// Match Prisma BlogPost schema
interface SlideData {
  id: string | number;
  title: string;
  content: string;
  image: string;
  slug: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  category?: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  // Use database schema fields
  const { id, image, content, title, category, createdAt } = slide;

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const maxLength = isMobile ? 80 : 150;
  const previewContent =
    content.length > maxLength ? content.slice(0, maxLength) + "..." : content;

  return (
    <div className="cursor-pointer [perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="relative z-10 mx-[4vmin] flex h-[70vmin] w-[70vmin] flex-1 flex-col items-center justify-center text-center text-white opacity-100 transition-all duration-300 ease-in-out"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-[1%] bg-yellow-700 transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="duration-600 absolute inset-0 h-[120%] w-[120%] object-cover opacity-100 transition-opacity ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={title}
            src={image}
            onLoad={imageLoaded}
            loading="lazy"
            decoding="async"
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <h2 className="relative text-lg font-semibold md:text-2xl lg:text-4xl">
            {title}
          </h2>
          <div className="flex justify-center">
            <p className="mx-auto mt-8 line-clamp-3 h-24 max-w-md overflow-hidden text-ellipsis rounded-2xl border border-transparent bg-white/10 p-1 text-left text-sm leading-relaxed text-white hover:shadow-lg">
              {previewContent}
            </p>
          </div>
          {category && (
            <div className="mt-4 text-xs text-yellow-200">
              Category: {category}
            </div>
          )}
          {createdAt && (
            <div className="mt-1 text-xs text-yellow-100">
              {typeof createdAt === "string"
                ? new Date(createdAt).toLocaleDateString()
                : createdAt.toLocaleDateString()}
            </div>
          )}
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`border-3 mx-2 flex h-10 w-10 items-center justify-center rounded-full border-transparent bg-neutral-200 transition duration-200 hover:-translate-y-0.5 focus:border-[#6D64F7] focus:outline-none active:translate-y-0.5 dark:bg-neutral-800 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const route = useRouter();
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };
  // const handleSlideClick = (index: number) => {
  //   if (current !== index) {
  //     setCurrent(index);
  //   } else {
  //     // Navigate to blog post using slug
  //     const slug = slides[index].slug;
  //     console.log("Navigating to blog post with slug:", slug);
  //     if (slug) {
  //       route.push(`/blog/${slug}`);
  //     }
  //   }
  // };

  const id = useId();

  return (
    <div
      className="relative mx-auto h-[70vmin] w-[70vmin]"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute mx-[-4vmin] flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute top-[calc(100%+1rem)] flex w-full justify-center">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
