import type { CSSProperties } from 'react';
import { useMemo } from 'react';

type SparkleItem = {
  sparkleId: number;
  leftPercent: number;
  topPercent: number;
  delaySeconds: number;
  durationSeconds: number;
};

export function Sparkles() {
  const sparkleItems = useMemo((): SparkleItem[] => {
    return Array.from({ length: 35 }, (_unused, sparkleIndex) => ({
      sparkleId: sparkleIndex,
      leftPercent: Math.random() * 100,
      topPercent: Math.random() * 100,
      delaySeconds: Math.random() * 4,
      durationSeconds: 1.5 + Math.random() * 2.5,
    }));
  }, []);

  return (
    <div className="sparkles">
      {sparkleItems.map((sparkleItem) => (
        <div
          key={sparkleItem.sparkleId}
          className="sparkle"
          style={
            {
              left: `${sparkleItem.leftPercent}%`,
              top: `${sparkleItem.topPercent}%`,
              '--delay': `${sparkleItem.delaySeconds}s`,
              '--dur': `${sparkleItem.durationSeconds}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
