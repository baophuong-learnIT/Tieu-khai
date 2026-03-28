import type { ResultModalState } from '@/stores/lotteryStore';

export type ResultPresentation = {
  icon: string;
  label: string;
  prizeName: string;
  prizeDescription: string;
};

export function getResultPresentation(modal: ResultModalState): ResultPresentation {
  if (modal === null) {
    return { icon: '🎉', label: '', prizeName: '', prizeDescription: '' };
  }
  if (modal.isWin) {
    return {
      icon: '🎉',
      label: 'Chúc mừng bạn đã trúng!',
      prizeName: modal.prize.name,
      prizeDescription: modal.prize.desc,
    };
  }
  return {
    icon: '🍀',
    label: 'Tiếc quá!',
    prizeName: modal.prize.name,
    prizeDescription: modal.prize.desc,
  };
}
