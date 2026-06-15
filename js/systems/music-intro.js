export function playIntroMusic(ctx, masterGain, nodes, scheduleLoop) {
  const reverb = ctx.createConvolver();
  const reverbLen = ctx.sampleRate * 2;
  const reverbBuf = ctx.createBuffer(2, reverbLen, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = reverbBuf.getChannelData(ch);
    for (let i = 0; i < reverbLen; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLen, 2.5);
  }
  reverb.buffer = reverbBuf;
  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.4;
  reverb.connect(reverbGain);
  reverbGain.connect(masterGain);
  nodes.push(reverb, reverbGain);

  const melody = [130.81, 146.83, 155.56, 174.61, 196.00, 207.65, 233.08, 261.63,
                  233.08, 207.65, 196.00, 174.61, 155.56, 146.83, 130.81, 116.54];
  const bass = [65.41, 73.42, 77.78, 87.31, 98.00, 103.83, 116.54, 130.81];
  let step = 0;

  scheduleLoop(ctx, masterGain, (ctx, mg) => {
    const now = ctx.currentTime;
    const pad = ctx.createOscillator();
    const padGain = ctx.createGain();
    pad.type = 'sine';
    pad.frequency.setValueAtTime(melody[step % melody.length], now);
    padGain.gain.setValueAtTime(0.35, now);
    padGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    pad.connect(padGain);
    padGain.connect(mg);
    padGain.connect(reverb);
    pad.start(now);
    pad.stop(now + 1.8);
    nodes.push(pad, padGain);

    if (step % 2 === 0) {
      const b = ctx.createOscillator();
      const bGain = ctx.createGain();
      b.type = 'triangle';
      b.frequency.setValueAtTime(bass[(step / 2 | 0) % bass.length], now);
      bGain.gain.setValueAtTime(0.28, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      b.connect(bGain);
      bGain.connect(mg);
      b.start(now);
      b.stop(now + 2.5);
      nodes.push(b, bGain);
    }

    if (step % 4 === 0) {
      const choir = ctx.createOscillator();
      const choirGain = ctx.createGain();
      choir.type = 'sine';
      choir.frequency.setValueAtTime(melody[step % melody.length] * 2, now);
      choir.frequency.linearRampToValueAtTime(melody[step % melody.length] * 1.5, now + 2);
      choirGain.gain.setValueAtTime(0.15, now);
      choirGain.gain.exponentialRampToValueAtTime(0.001, now + 2);
      choir.connect(choirGain);
      choirGain.connect(reverb);
      choir.start(now);
      choir.stop(now + 2);
      nodes.push(choir, choirGain);
    }
    step++;
  }, 1200);
}
