import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { createWheel, type WheelImperativeHandle } from '@/lib/wheel';
import type { PrizeDefinition } from '@/types/domain';

export type WheelCanvasRef = WheelImperativeHandle;

type WheelCanvasProps = {
  prizes: PrizeDefinition[];
};

export const WheelCanvas = forwardRef<WheelImperativeHandle, WheelCanvasProps>(function WheelCanvas(
  { prizes },
  forwardedRef,
) {
  const canvasElementRef = useRef<HTMLCanvasElement>(null);
  const wheelApiRef = useRef<ReturnType<typeof createWheel> | null>(null);

  useEffect(() => {
    const canvasElement = canvasElementRef.current;
    if (!canvasElement || prizes.length === 0) return;
    const wheelApi = createWheel(canvasElement, prizes);
    wheelApi.init();
    wheelApiRef.current = wheelApi;
    return () => {
      wheelApiRef.current = null;
    };
  }, [prizes]);

  useImperativeHandle(forwardedRef, () => ({
    spinToIndex: (prizeIndex, onComplete) => wheelApiRef.current?.spinToIndex(prizeIndex, onComplete) ?? false,
    reset: () => wheelApiRef.current?.reset(),
    draw: () => wheelApiRef.current?.draw(),
  }));

  return <canvas ref={canvasElementRef} id="wheel" width={760} height={760} />;
});
