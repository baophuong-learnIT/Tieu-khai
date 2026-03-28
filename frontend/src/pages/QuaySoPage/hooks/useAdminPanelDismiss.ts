import { useEffect, type RefObject } from 'react';

import { useLotteryStore } from '@/stores/lotteryStore';

type AdminPanelDismissParams = {
  panelRef: RefObject<HTMLElement | null>;
  toggleRef: RefObject<HTMLElement | null>;
};

export function useAdminPanelDismiss({ panelRef, toggleRef }: AdminPanelDismissParams) {
  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const panelElement = panelRef.current;
      const toggleElement = toggleRef.current;
      const targetNode = event.target as Node;
      if (!panelElement || !toggleElement) return;
      if (!panelElement.contains(targetNode) && targetNode !== toggleElement) {
        useLotteryStore.getState().setAdminPanelOpen(false);
      }
    }
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [panelRef, toggleRef]);
}
