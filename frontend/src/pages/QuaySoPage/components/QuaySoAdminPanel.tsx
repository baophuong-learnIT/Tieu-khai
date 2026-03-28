import type { RefObject } from 'react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/shadcn/button';
import { cn } from '@/lib/utils';
import { useLotteryStore } from '@/stores/lotteryStore';

import { QuaySoAdminTableRow } from './QuaySoAdminTableRow';

type QuaySoAdminPanelProps = {
  panelRef: RefObject<HTMLDivElement | null>;
  toggleRef: RefObject<HTMLButtonElement | null>;
};

export function QuaySoAdminPanel({ panelRef, toggleRef }: QuaySoAdminPanelProps) {
  const { adminOpen, toggleAdminPanel, adminUsers, refreshAdminUsers } = useLotteryStore(
    useShallow((state) => ({
      adminOpen: state.adminOpen,
      toggleAdminPanel: state.toggleAdminPanel,
      adminUsers: state.adminUsers,
      refreshAdminUsers: state.refreshAdminUsers,
    })),
  );

  useEffect(() => {
    if (adminOpen) {
      void refreshAdminUsers();
    }
  }, [adminOpen, refreshAdminUsers]);

  return (
    <>
      <Button
        ref={toggleRef}
        type="button"
        variant="lottery"
        id="adminToggle"
        className="admin-toggle"
        onClick={() => toggleAdminPanel()}
      >
        👤 DS Tài khoản
      </Button>
      <div
        ref={panelRef}
        id="adminPanel"
        className={cn('admin-panel', adminOpen && 'show')}
      >
        <h4>Danh sách tài khoản (79 Sales)</h4>
        <p className="admin-panel-hint text-muted-foreground text-xs mb-2">
          User = Password. Ví dụ: angiang1 / angiang1
        </p>
        <table id="adminTable">
          <thead>
            <tr>
              <th>Khu vực</th>
              <th>Địa bàn</th>
              <th>User</th>
              <th>Quay</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((adminRow) => (
              <QuaySoAdminTableRow key={adminRow.u} row={adminRow} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
