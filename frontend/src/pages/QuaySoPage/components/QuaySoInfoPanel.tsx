import { useLotteryStore } from '@/stores/lotteryStore';

export function QuaySoInfoPanel() {
  const spinsRemaining = useLotteryStore((state) => state.sessionUser?.remaining ?? 0);

  return (
    <div className="info-panel">
      <h2>Khai Lộc Đầu Xuân</h2>
      <h1>Nhân Đôi May Mắn</h1>
      <div className="spins-pill">
        Lượt quay còn lại: <strong id="spinsLeft">{spinsRemaining}</strong>
      </div>
    </div>
  );
}
