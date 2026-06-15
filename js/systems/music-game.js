export function playGameMusic(ctx, masterGain, nodes, scheduleLoop) {
  const compFilter = ctx.createBiquadFilter();
  compFilter.type = 'lowpass';
  compFilter.frequency.value = 1200;
  compFilter.Q.value = 1;
  const compGain = ctx.createGain();
  compGain.gain.value = 0.5;
  compFilter.connect(compGain);
  compGain.connect(masterGain);
  nodes.push(compFilter, compGain);

  const melody = [329.63, 349.23, 392.00, 440.00, 493.88, 440.00, 392.00, 349.23,
                  329.63, 293.66, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00];
  const bassLine = [82.41, 87.31, 98.00, 110.00, 123.47, 110.00, 98.00, 87.31];
  const arp = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0];
  let step = 0;

  scheduleLoop(ctx, masterGain, (ctx, mg) => {
    const now = ctx.currentTime;
    const m = ctx.createOscillator();
    const mGain = ctx.createGain();
    m.type = 'sawtooth';
    m.frequency.setValueAtTime(melody[step % melody.length], now);
    mGain.gain.setValueAtTime(0.16, now);
    mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    m.connect(mGain);
    mGain.connect(compFilter);
    m.start(now);
    m.stop(now + 0.35);
    nodes.push(m, mGain);

    if (step % 4 === 0) {
      const b = ctx.createOscillator();
      const bGain = ctx.createGain();
      b.type = 'square';
      b.frequency.setValueAtTime(bassLine[(step / 4 | 0) % bassLine.length], now);
      bGain.gain.setValueAtTime(0.18, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      b.connect(bGain);
      bGain.connect(mg);
      b.start(now);
      b.stop(now + 0.3);
      nodes.push(b, bGain);
    }

    if (arp[step % arp.length]) {
      const a = ctx.createOscillator();
      const aGain = ctx.createGain();
      a.type = 'square';
      a.frequency.setValueAtTime(melody[step % melody.length] * 2, now);
      aGain.gain.setValueAtTime(0.1, now);
      aGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      a.connect(aGain);
      aGain.connect(compFilter);
      a.start(now);
      a.stop(now + 0.1);
      nodes.push(a, aGain);
    }

    if (step % 8 === 0) {
      const kick = ctx.createOscillator();
      const kGain = ctx.createGain();
      kick.type = 'sine';
      kick.frequency.setValueAtTime(150, now);
      kick.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      kGain.gain.setValueAtTime(0.35, now);
      kGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      kick.connect(kGain);
      kGain.connect(mg);
      kick.start(now);
      kick.stop(now + 0.15);
      nodes.push(kick, kGain);
    }

    if (step % 8 === 4) {
      const snare = ctx.createOscillator();
      const sGain = ctx.createGain();
      snare.type = 'triangle';
      snare.frequency.setValueAtTime(200, now);
      sGain.gain.setValueAtTime(0.14, now);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      snare.connect(sGain);
      sGain.connect(compFilter);
      snare.start(now);
      snare.stop(now + 0.08);
      nodes.push(snare, sGain);
    }
    step++;
  }, 200);
}
