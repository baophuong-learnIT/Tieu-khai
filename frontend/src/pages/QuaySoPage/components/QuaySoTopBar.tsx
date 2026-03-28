import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/shadcn/button';
import { useLotteryStore } from '@/stores/lotteryStore';

type QuaySoTopBarProps = {
  onLogout: () => void;
};

export function QuaySoTopBar({ onLogout }: QuaySoTopBarProps) {
  const { sessionUser } = useLotteryStore(
    useShallow((state) => ({
      sessionUser: state.sessionUser,
    })),
  );

  const avatarLetter = sessionUser?.a.charAt(0) ?? '';

  return (
    <div className="top-bar">
      <div className="logo">
        <div className="logo-icon">🧪</div>
        <div className="logo-text-group">
          <div className="logo-text logo-text--compact">hợp trí</div>
          <div className="logo-sub logo-sub--compact">summit</div>
        </div>
      </div>
      <div className="user-badge">
        <div className="avatar" id="userAvatar">
          {avatarLetter}
        </div>
        <div className="info">
          <div className="name" id="userName">
            {sessionUser?.a ?? ''}
          </div>
          <div className="region" id="userRegion">
            {sessionUser?.r ?? ''}
          </div>
        </div>
        <Button
          type="button"
          variant="lottery"
          id="btnLogout"
          className="btn-logout"
          onClick={onLogout}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
