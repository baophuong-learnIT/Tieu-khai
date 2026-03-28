import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

import { buildConfettiPieces, type ConfettiPieceModel } from '@/lib/confettiPieces';

type ConfettiLayerProps = {
  confettiEpoch: number;
};

export function ConfettiLayer({ confettiEpoch }: ConfettiLayerProps) {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPieceModel[]>([]);

  useEffect(() => {
    if (confettiEpoch === 0) return;
    setConfettiPieces(buildConfettiPieces());
    const clearTimer = window.setTimeout(() => setConfettiPieces([]), 5500);
    return () => window.clearTimeout(clearTimer);
  }, [confettiEpoch]);

  return (
    <div className="confetti-layer" id="confetti">
      {confettiPieces.map((confettiPiece) => (
        <div
          key={confettiPiece.pieceKey}
          className="c-piece"
          style={
            {
              left: `${confettiPiece.leftPercent}%`,
              width: `${confettiPiece.widthPx}px`,
              height: `${confettiPiece.heightPx}px`,
              background: confettiPiece.colorHex,
              borderRadius: confettiPiece.borderRadius,
              '--fall-delay': `${confettiPiece.delaySeconds}s`,
              '--fall-dur': `${confettiPiece.durationSeconds}s`,
              '--spin': `${confettiPiece.spinDegrees}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
