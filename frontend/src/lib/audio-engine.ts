/**
 * Shared Web Audio engine. All synthesis, no external assets, fully offline and
 * demo-safe. The AudioContext is created lazily on the first user gesture (the
 * sound toggle) to satisfy autoplay policy. Exposes an ambient pad plus two
 * event cues: a carbamate-cleavage swell (the bond snapping) and a soft UI tick.
 *
 * Cues no-op while sound is off, so the loop and story can call cleavage()
 * freely without guarding.
 */

type WindowWithWebkit = Window & { webkitAudioContext?: typeof AudioContext };

class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambient: { nodes: OscillatorNode[]; gain: GainNode } | null = null;
  private _on = false;

  get on() {
    return this._on;
  }

  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as WindowWithWebkit).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  /** Toggle sound. Returns the new on/off state. Call only from a user gesture. */
  toggle(): boolean {
    return this._on ? (this.disable(), false) : (this.enable(), true);
  }

  enable() {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    this._on = true;
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.6);
    this.startAmbient();
    this.tick();
  }

  disable() {
    this._on = false;
    const ctx = this.ctx;
    if (ctx && this.master) {
      this.master.gain.cancelScheduledValues(ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    }
  }

  private startAmbient() {
    const ctx = this.ctx;
    if (!ctx || !this.master || this.ambient) return;
    const gain = ctx.createGain();
    gain.gain.value = 0.05;
    gain.connect(this.master);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 360;
    lp.connect(gain);
    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.value = 110;
    o1.connect(lp);
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = 164.81; // a soft fifth
    o2.detune.value = 5;
    o2.connect(lp);
    // slow filter LFO so the pad breathes
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 120;
    lfo.connect(lfoGain);
    lfoGain.connect(lp.frequency);
    o1.start();
    o2.start();
    lfo.start();
    this.ambient = { nodes: [o1, o2, lfo], gain };
  }

  /** The carbamate-cleavage cue: a band-passed noise swell plus a falling tone. */
  cleavage(intensity = 1) {
    if (!this._on) return;
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const now = ctx.currentTime;
    const dur = 1.2;

    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(620, now);
    bp.frequency.linearRampToValueAtTime(180, now + dur);
    bp.Q.value = 0.7;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, now);
    ng.gain.linearRampToValueAtTime(0.18 * intensity, now + 0.06);
    ng.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    noise.connect(bp);
    bp.connect(ng);
    ng.connect(this.master);
    noise.start(now);
    noise.stop(now + dur);

    const tone = ctx.createOscillator();
    tone.type = "triangle";
    tone.frequency.setValueAtTime(330, now);
    tone.frequency.exponentialRampToValueAtTime(220, now + 0.9);
    const tg = ctx.createGain();
    tg.gain.setValueAtTime(0, now);
    tg.gain.linearRampToValueAtTime(0.12 * intensity, now + 0.1);
    tg.gain.exponentialRampToValueAtTime(0.0001, now + 1);
    tone.connect(tg);
    tg.connect(this.master);
    tone.start(now);
    tone.stop(now + 1);
  }

  /** A soft, short UI tick for navigation and confirmations. */
  tick() {
    if (!this._on) return;
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = 880;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.04, now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    o.connect(g);
    g.connect(this.master);
    o.start(now);
    o.stop(now + 0.12);
  }
}

export const audioEngine = new AudioEngine();
