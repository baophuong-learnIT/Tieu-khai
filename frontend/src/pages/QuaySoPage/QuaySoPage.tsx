import { useEffect } from 'react';

import { ConfettiLayer } from '@/components/ConfettiLayer';
import { postSpin } from '@/lib/api';
import { useLotteryStore } from '@/stores/lotteryStore';

import { QuaySoAdminPanel } from './components/QuaySoAdminPanel';
import { QuaySoLoginPage } from './components/QuaySoLoginPage';
import { QuaySoMainPage } from './components/QuaySoMainPage';
import { QuaySoResultDialog } from './components/QuaySoResultDialog';
import { useAdminPanelDismiss } from './hooks/useAdminPanelDismiss';
import { useQuaySoPageRefs } from './hooks/useQuaySoPageRefs';

export function QuaySoPage() {
  const { wheelControlRef, adminPanelElementRef, adminToggleButtonRef } = useQuaySoPageRefs();

  useAdminPanelDismiss({
    panelRef: adminPanelElementRef,
    toggleRef: adminToggleButtonRef,
  });

  const bootstrap = useLotteryStore((state) => state.bootstrap);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  function handleLogoutRequest() {
    wheelControlRef.current?.reset();
    void useLotteryStore.getState().logout();
  }

  async function handleSpinRequest() {
    const storeSnapshot = useLotteryStore.getState();
    const token = storeSnapshot.authToken;
    const sessionUser = storeSnapshot.sessionUser;
    if (!token || !sessionUser || sessionUser.remaining <= 0) {
      window.alert('Bạn đã hết lượt quay!');
      return;
    }
    storeSnapshot.setSpinEnabled(false);
    try {
      const spinResult = await postSpin(token);
      useLotteryStore.setState({
        sessionUser: { ...sessionUser, remaining: spinResult.remaining },
        history: spinResult.history,
      });
      void useLotteryStore.getState().refreshAdminUsers();

      const spinStarted =
        wheelControlRef.current?.spinToIndex(spinResult.prizeIndex, () => {
          useLotteryStore.getState().applySpinAnimationDone({
            prize: spinResult.prize,
            isWin: spinResult.isWin,
          });
        }) ?? false;
      if (!spinStarted) {
        useLotteryStore.getState().setSpinEnabled(true);
        window.alert('Vòng quay chưa sẵn sàng.');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lỗi quay số';
      window.alert(message);
      useLotteryStore.getState().setSpinEnabled(true);
    }
  }

  const confettiEpoch = useLotteryStore((state) => state.confettiEpoch);

  return (
    <>
      <QuaySoLoginPage />
      <QuaySoMainPage
        wheelRef={wheelControlRef}
        onLogout={handleLogoutRequest}
        onSpin={() => {
          void handleSpinRequest();
        }}
      />
      <QuaySoResultDialog />
      <ConfettiLayer confettiEpoch={confettiEpoch} />
      <QuaySoAdminPanel panelRef={adminPanelElementRef} toggleRef={adminToggleButtonRef} />
    </>
  );
}
