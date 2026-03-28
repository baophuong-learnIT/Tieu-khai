/**
 * WHEEL MODULE
 * Canvas wheel drawing; spin animation driven by server prize index
 */
import type { PrizeDefinition } from '@/types/domain';
import { gameAudio } from './audio';

export function createWheel(canvas: HTMLCanvasElement, prizeList: PrizeDefinition[]) {
  const PRIZES = prizeList;
  let ctx: CanvasRenderingContext2D | null = null;
  let rotation = 0;
  let spinning = false;

  function draw() {
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = centerX - 8;
    const segmentCount = PRIZES.length;
    const sliceAngle = (2 * Math.PI) / segmentCount;

    ctx.clearRect(0, 0, width, height);

    for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex++) {
      const angleStart = segmentIndex * sliceAngle;
      const angleEnd = angleStart + sliceAngle;
      const prize: PrizeDefinition = PRIZES[segmentIndex]!;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angleStart, angleEnd);
      ctx.closePath();
      ctx.fillStyle = prize.color;
      ctx.fill();

      const grad = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius);
      grad.addColorStop(0, 'rgba(0,0,0,0.12)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angleStart + sliceAngle / 2);
      ctx.fillStyle = prize.text;
      ctx.font = 'bold 24px "Be Vietnam Pro", sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(prize.name, radius - 30, 0);

      ctx.font = '28px sans-serif';
      const nameWidth = ctx.measureText(prize.name).width;
      ctx.fillText(prize.icon, radius - 30 - nameWidth - 14, 0);
      ctx.restore();
    }

    for (let dotIndex = 0; dotIndex < segmentCount; dotIndex++) {
      const angle = dotIndex * sliceAngle;
      ctx.beginPath();
      ctx.arc(
        centerX + Math.cos(angle) * (radius - 6),
        centerY + Math.sin(angle) * (radius - 6),
        4,
        0,
        2 * Math.PI,
      );
      ctx.fillStyle = '#FFD700';
      ctx.fill();
    }
  }

  function spinToIndex(prizeIndex: number, onComplete: (prize: PrizeDefinition) => void) {
    if (spinning) return false;
    spinning = true;

    const sliceDegrees = 360 / PRIZES.length;
    const targetAngle = 360 - (prizeIndex * sliceDegrees + sliceDegrees / 2);
    const extraSpins = 5 + Math.floor(Math.random() * 4);
    const totalRotation = rotation + extraSpins * 360 + targetAngle - (rotation % 360);

    canvas.style.transition = 'transform 4.5s cubic-bezier(0.15, 0.7, 0.08, 1)';
    canvas.style.transform = `rotate(${totalRotation}deg)`;
    rotation = totalRotation;

    gameAudio.playTickSequence();

    const landedPrize = PRIZES[prizeIndex]!;

    setTimeout(() => {
      spinning = false;
      onComplete(landedPrize);
    }, 4700);

    return true;
  }

  function reset() {
    canvas.style.transition = 'none';
    canvas.style.transform = 'rotate(0deg)';
    rotation = 0;
  }

  function init() {
    ctx = canvas.getContext('2d');
    draw();
  }

  return { init, draw, spinToIndex, reset };
}

export type WheelApi = ReturnType<typeof createWheel>;

export type WheelImperativeHandle = Pick<WheelApi, 'spinToIndex' | 'reset' | 'draw'>;
