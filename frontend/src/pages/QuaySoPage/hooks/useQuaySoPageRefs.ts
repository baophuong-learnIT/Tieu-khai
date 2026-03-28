import { useRef } from 'react';

import type { WheelCanvasRef } from '@/components/WheelCanvas';

export function useQuaySoPageRefs() {
  const wheelControlRef = useRef<WheelCanvasRef | null>(null);
  const adminPanelElementRef = useRef<HTMLDivElement | null>(null);
  const adminToggleButtonRef = useRef<HTMLButtonElement | null>(null);

  return {
    wheelControlRef,
    adminPanelElementRef,
    adminToggleButtonRef,
  };
}
