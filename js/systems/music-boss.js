export function playBossMusic(ctx, masterGain, nodes, scheduleLoop) {
  const distortion = ctx.createWaveShaper();
  const distCurve = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    const x = (i * 2) / 256 - 1;
    distCurve[i] = (Math.PI + 4) * x / (Math.PI + 4 * Math.abs(x));
  }
  distortion.curve = distCurve;
  const distGain = ctx.createGain();
  distGain.gain.value = 0.6;
  distortion.connect(distGain);
  distGain.connect(masterGain);
  nodes.push(distortion, distGain);

  const subFilter = ctx.createBiquadFilter();
  subFilter.type = 'lowpass';
  subFilter.frequency.value = 300;
  subFilter.Q.value = 5;
  const subGain = ctx.createGain();
  subGain.gain.value = 0.8;
  subFilter.connect(subGain);
  subGain.connect(masterGain);
  nodes.push(subFilter, subGain);

  const melody = [146.83, 155.56, 174.61, 164.81, 146.83, 130.81, 123.47, 116.54,
                  130.81, 146.83, 155.56, 174.61, 196.00, 185.00, 174.61, 155.56];
  const bassLine = [36.71, 41.20, 43.65, 49.00, 55.00, 49.00, 43.65, 41.20];
  const alarm = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];
  let step = 0;

  scheduleLoop(ctx, masterGain, (ctx, mg) => {
    const now = ctx.currentTime;
    const m = ctx.createOscillator();
    const mGain = ctx.createGain();
    m.type = 'sawtooth';
    m.frequency.setValueAtTime(melody[step % melody.length], now);
    mGain.gain.setValueAtTime(0.22, now);
    mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    m.connect(mGain);
    mGain.connect(distortion);
    m.start(now);
    m.stop(now + 0.25);
    nodes.push(m, mGain);

    if (step % 2 === 0) {
      const b = ctx.createOscillator();
      const bGain = ctx.createGain();
      b.type = 'square';
      b.frequency.setValueAtTime(bassLine[(step / 2 | 0) % bassLine.length], now);
      bGain.gain.setValueAtTime(0.3, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      b.connect(bGain);
      bGain.connect(subFilter);
      b.start(now);
      b.stop(now + 0.4);
      nodes.push(b, bGain);
    }

    if (step % 4 === 0) {
      const sub = ctx.createOscillator();
      const subG = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(bassLine[(step / 4 | 0) % bassLine.length] / 2, now);
      subG.gain.setValueAtTime(0.4, now);
      subG.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      sub.connect(subG);
      subG.connect(mg);
      sub.start(now);
      sub.stop(now + 0.5);
      nodes.push(sub, subG);
    }

    if (step % 8 === 0) {
      const impact = ctx.createOscillator();
      const iGain = ctx.createGain();
      impact.type = 'sine';
      impact.frequency.setValueAtTime(80, now);
      impact.frequency.exponentialRampToValueAtTime(20, now + 0.3);
      iGain.gain.setValueAtTime(0.5, now);
      iGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      impact.connect(iGain);
      iGain.connect(mg);
      impact.start(now);
      impact.stop(now + 0.35);
      nodes.push(impact, iGain);
    }

    if (step % 8 === 4) {
      const snare = ctx.createOscillator();
      const sGain = ctx.createGain();
      snare.type = 'triangle';
      snare.frequency.setValueAtTime(300, now);
      snare.frequency.exponentialRampToValueAtTime(100, now + 0.06);
      sGain.gain.setValueAtTime(0.2, now);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      snare.connect(sGain);
      sGain.connect(distortion);
      snare.start(now);
      snare.stop(now + 0.08);
      nodes.push(snare, sGain);
    }

    if (alarm[step % alarm.length]) {
      const a = ctx.createOscillator();
      const aGain = ctx.createGain();
      a.type = 'square';
      a.frequency.setValueAtTime(880, now);
      a.frequency.setValueAtTime(660, now + 0.05);
      aGain.gain.setValueAtTime(0.08, now);
      aGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      a.connect(aGain);
      aGain.connect(distortion);
      a.start(now);
      a.stop(now + 0.1);
      nodes.push(a, aGain);
    }

    if (step % 16 === 0) {
      const choir = ctx.createOscillator();
      const cGain = ctx.createGain();
      choir.type = 'sine';
      choir.frequency.setValueAtTime(melody[step % melody.length] * 0.5, now);
      choir.frequency.linearRampToValueAtTime(melody[step % melody.length] * 0.75, now + 2);
      cGain.gain.setValueAtTime(0.12, now);
      cGain.gain.exponentialRampToValueAtTime(0.001, now + 2);
      choir.connect(cGain);
      cGain.connect(mg);
      choir.start(now);
      choir.stop(now + 2);
      nodes.push(choir, cGain);
    }
    step++;
  }, 150);
}
