/**
 * AUDIO MODULE
 * Web Audio API sound effects (no external files)
 */
type AudioContextCtor = typeof AudioContext;

export const gameAudio = {
  ctx: null as AudioContext | null,

  _getCtx() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext || (window as Window & { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    return this.ctx;
  },

  playTick(freq = 800, dur = 0.05) {
    try {
      const audioContext = this._getCtx();
      if (!audioContext) return;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.08, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + dur);
      osc.start();
      osc.stop(audioContext.currentTime + dur);
    } catch {
      // ignore if AudioContext is blocked
    }
  },

  playTickSequence() {
    let delay = 0;
    for (let stepIndex = 0; stepIndex < 40; stepIndex++) {
      const gap = 30 + stepIndex * stepIndex * 1.8;
      delay += gap;
      if (delay > 4200) break;
      setTimeout(() => this.playTick(600 + Math.random() * 400, 0.03), delay);
    }
  },

  playWin() {
    [0, 150, 300].forEach((delayMs, harmonicIndex) => {
      setTimeout(() => this.playTick(1200 + harmonicIndex * 200, 0.12), delayMs);
    });
  },
};
