const CONFETTI_PALETTE = [
  '#FFD700',
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#FF9FF3',
  '#C41E1E',
  '#1B5E20',
] as const;

export type ConfettiPieceModel = {
  pieceKey: string;
  leftPercent: number;
  widthPx: number;
  heightPx: number;
  delaySeconds: number;
  durationSeconds: number;
  spinDegrees: number;
  borderRadius: string;
  colorHex: string;
};

export function buildConfettiPieces(): ConfettiPieceModel[] {
  const pieces: ConfettiPieceModel[] = [];
  for (let pieceIndex = 0; pieceIndex < 100; pieceIndex++) {
    const colorHex = CONFETTI_PALETTE[Math.floor(Math.random() * CONFETTI_PALETTE.length)]!;
    pieces.push({
      pieceKey: `${pieceIndex}-${Date.now()}`,
      leftPercent: Math.random() * 100,
      widthPx: 6 + Math.random() * 10,
      heightPx: 6 + Math.random() * 10,
      delaySeconds: Math.random() * 2.5,
      durationSeconds: 2.5 + Math.random() * 2,
      spinDegrees: 400 + Math.random() * 800,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      colorHex,
    });
  }
  return pieces;
}
