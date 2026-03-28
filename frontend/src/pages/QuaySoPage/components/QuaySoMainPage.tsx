import type { RefObject } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Sparkles } from '@/components/Sparkles';
import type { WheelCanvasRef } from '@/components/WheelCanvas';
import { cn } from '@/lib/utils';
import { useLotteryStore } from '@/stores/lotteryStore';

import { MaiBranchTrMain } from './MaiBranchTrMain';
import { QuaySoHistoryList } from './QuaySoHistoryList';
import { QuaySoInfoPanel } from './QuaySoInfoPanel';
import { QuaySoTopBar } from './QuaySoTopBar';
import { QuaySoWheelSection } from './QuaySoWheelSection';

type QuaySoMainPageProps = {
  wheelRef: RefObject<WheelCanvasRef | null>;
  onLogout: () => void;
  onSpin: () => void;
};

export function QuaySoMainPage({ wheelRef, onLogout, onSpin }: QuaySoMainPageProps) {
  const { view } = useLotteryStore(
    useShallow((state) => ({
      view: state.view,
    })),
  );

  return (
    <div className={cn('page', 'main-page', view === 'main' && 'active')}>
      <div className="bg-gradient" />
      <div className="bg-grain" />
      <Sparkles />
      <MaiBranchTrMain />
      <div className="content-wrap">
        <QuaySoTopBar onLogout={onLogout} />
        <QuaySoInfoPanel />
        <QuaySoWheelSection wheelRef={wheelRef} onSpin={onSpin} />
        <QuaySoHistoryList />
      </div>
    </div>
  );
}
