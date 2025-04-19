"use client";

import { useEffect, useState } from "react";

export const useCountUp = (
  end: number,
  shouldStart: boolean,
  duration = 2000,
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start = 0;
    const incrementTime = Math.floor(duration / end);
    const interval = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(interval);
    }, incrementTime);

    return () => clearInterval(interval);
  }, [shouldStart, end, duration]);

  return count;
};
