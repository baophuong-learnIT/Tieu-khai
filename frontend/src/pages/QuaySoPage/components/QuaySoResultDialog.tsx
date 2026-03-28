import { useShallow } from 'zustand/react/shallow';

import { Button } from '@/components/shadcn/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/shadcn/dialog';
import { useLotteryStore } from '@/stores/lotteryStore';

import { getResultPresentation } from '../resultDialogPresentation';

export function QuaySoResultDialog() {
  const { modal, clearModal } = useLotteryStore(
    useShallow((state) => ({
      modal: state.modal,
      clearModal: state.clearModal,
    })),
  );

  const presentation = getResultPresentation(modal);

  function handleDialogOpenChange(nextOpen: boolean) {
    if (!nextOpen) clearModal();
  }

  return (
    <Dialog open={modal !== null} onOpenChange={handleDialogOpenChange}>
      <DialogContent
        overlayClassName="lottery-dialog-overlay"
        className="lottery-dialog-surface modal-box"
      >
        <DialogTitle className="sr-only">Kết quả quay số</DialogTitle>
        <div className="m-icon">{presentation.icon}</div>
        <div className="m-label">{presentation.label}</div>
        <div className="m-prize">{presentation.prizeName}</div>
        <div className="m-desc">{presentation.prizeDescription}</div>
        <Button
          type="button"
          variant="lottery"
          className="btn-gold m-close"
          onClick={clearModal}
        >
          Đóng
        </Button>
      </DialogContent>
    </Dialog>
  );
}
