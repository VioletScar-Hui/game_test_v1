export function playMenuMusic(ctx, masterGain, nodes, scheduleLoop) {
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800;
  filter.Q.value = 2;
  const filterGain = ctx.createGain();
  filterGain.gain.value = 0.7;
  filter.connect(filterGain);
  filterGain.connect(masterGain);
  nodes.push(filter, filterGain);

  const melody = [196.00, 220.00, 233.08, 261.63, 293.66, 261.63, 233.08, 220.00,
                  196.00, 174.61, 164.81, 146.83, 130.81, 146.83, 164.81, 174.61];
  const bassLine = [98.00, 110.00, 116.54, 130.81, 146.83, 130.81, 116.54, 110.00];
  const waltz = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
  let step = 0;

  scheduleLoop(ctx, masterGain, (ctx, mg) => {
    const now = ctx.currentTime;
    const m = ctx.createOscillator();
    const mGain = ctx.createGain();
    m.type = 'sine';
    m.frequency.setValueAtTime(melody[step % melody.length], now);
    mGain.gain.setValueAtTime(0.3, now);
    mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    m.connect(mGain);
    mGain.connect(mg);
    m.start(now);
    m.stop(now + 0.6);
    nodes.push(m, mGain);

    if (step % 2 === 0) {
      const b = ctx.createOscillator();
      const bGain = ctx.createGain();
      b.type = 'triangle';
      b.frequency.setValueAtTime(bassLine[(step / 2 | 0) % bassLine.length], now);
      bGain.gain.setValueAtTime(0.22, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      b.connect(bGain);
      bGain.connect(mg);
      b.start(now);
      b.stop(now + 0.8);
      nodes.push(b, bGain);
    }

    if (waltz[step % waltz.length]) {
      const perc = ctx.createOscillator();
      const pGain = ctx.createGain();
      perc.type = 'square';
      perc.frequency.setValueAtTime(80, now);
      pGain.gain.setValueAtTime(0.12, now);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      perc.connect(pGain);
      pGain.connect(filter);
      perc.start(now);
      perc.stop(now + 0.08);
      nodes.push(perc, pGain);
    }

    if (step % 8 === 0) {
      const harm = ctx.createOscillator();
      const hGain = ctx.createGain();
      harm.type = 'sine';
      harm.frequency.setValueAtTime(melody[step % melody.length] * 1.5, now);
      hGain.gain.setValueAtTime(0.1, now);
      hGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      harm.connect(hGain);
      hGain.connect(mg);
      harm.start(now);
      harm.stop(now + 1.5);
      nodes.push(harm, hGain);
    }
    step++;
  }, 400);
}
