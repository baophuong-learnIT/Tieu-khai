import type { ReactNode, RefObject } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/shadcn/button';
import { WheelCanvas, type WheelCanvasRef } from '@/components/WheelCanvas';
import { useLotteryStore } from '@/stores/lotteryStore';

type QuaySoWheelSectionProps = {
  wheelRef: RefObject<WheelCanvasRef | null>;
  onSpin: () => void;
};

export function QuaySoWheelSection({ wheelRef, onSpin }: QuaySoWheelSectionProps) {
  const { view, spinEnabled, prizeList } = useLotteryStore(
    useShallow((state) => ({
      view: state.view,
      spinEnabled: state.spinEnabled,
      prizeList: state.prizes,
    })),
  );

  let wheelCanvasSlot: ReactNode = null;
  if (view === 'main' && prizeList.length > 0) {
    wheelCanvasSlot = <WheelCanvas ref={wheelRef} prizes={prizeList} />;
  }

  return (
    <div className="wheel-section">
      <div className="wheel-outer">
        <div className="wheel-pointer" />
        {wheelCanvasSlot}
        <Button
          type="button"
          variant="lottery"
          id="hubBtn"
          className="wheel-hub"
          onClick={onSpin}
        >
          <span>
            QUAY
            <br />
            SỐ
          </span>
        </Button>
      </div>
      <Button
        type="button"
        variant="lottery"
        id="btnSpin"
        className="btn-gold btn-spin"
        disabled={!spinEnabled}
        onClick={onSpin}
      >
        Quay ngay
      </Button>
    </div>
  );
}
