import { useState, useEffect } from 'react';

export function useAnimatedNumber(targetValue: number, duration: number = 600): number {
  const [currentValue, setCurrentValue] = useState(targetValue);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = currentValue;
    const diff = targetValue - startValue;

    if (diff === 0) return;

    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(Math.round(startValue + diff * ease));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue, duration]);

  return currentValue;
}
