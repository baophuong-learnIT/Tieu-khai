import type { ReactNode } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cn } from '@/lib/utils';
import { useLotteryStore } from '@/stores/lotteryStore';

export function QuaySoHistoryList() {
  const { historyRecords } = useLotteryStore(
    useShallow((state) => ({
      historyRecords: state.history,
    })),
  );

  let historyBody: ReactNode;
  if (!historyRecords.length) {
    historyBody = <div className="h-empty">Chưa có giải thưởng nào</div>;
  } else {
    historyBody = historyRecords.map((historyRecord, historyIndex) => (
      <div
        key={`${historyRecord.time}-${historyIndex}`}
        className={cn('h-item', historyRecord.won ? 'h-item--won' : undefined)}
      >
        <div>
          <div className="h-prize">{historyRecord.prize}</div>
          <div className="h-desc">{historyRecord.desc}</div>
        </div>
        <div className="h-time">{historyRecord.time}</div>
      </div>
    ));
  }

  return (
    <div className="history-section">
      <h3>Lịch sử trúng thưởng</h3>
      <div className="history-box" id="historyBox">
        {historyBody}
      </div>
    </div>
  );
}
