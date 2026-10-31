// js/audioSimulator.js
// Web Audio API를 활용한 실제 자동차 고장 소음 합성 시뮬레이터

class CarAudioSimulator {
  constructor() {
    this.audioCtx = null;
    this.currentSourceNodes = [];
    this.isPlaying = false;
    this.currentType = null;
    this.analyser = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  stop() {
    if (this.currentSourceNodes && this.currentSourceNodes.length > 0) {
      this.currentSourceNodes.forEach(node => {
        try {
          if (node.stop) node.stop();
          if (node.disconnect) node.disconnect();
        } catch (e) {
          // ignore
        }
      });
      this.currentSourceNodes = [];
    }
    this.isPlaying = false;
    this.currentType = null;
  }

  play(type) {
    this.init();
    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;
    this.currentType = type;

    switch (type) {
      case "brake_squeal":
        this._playBrakeSqueal();
        break;
      case "wheel_bearing":
        this._playWheelBearing();
        break;
      case "belt_screech":
        this._playBeltScreech();
        break;
      case "cv_joint":
        this._playCvJoint();
        break;
      case "engine_knock":
        this._playEngineKnock();
        break;
      default:
        console.warn("Unknown sound type:", type);
        this.stop();
    }
  }

  // 1. 브레이크 패드 마모 쇳소리 (2800Hz 고주파 마찰음 + 노이즈)
  _playBrakeSqueal() {
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // FM 변조로 날카로운 쇳소리 질감 생성
    osc.type = "sine";
    osc.frequency.setValueAtTime(3200, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(3100, ctx.currentTime + 1.5);
    osc.frequency.linearRampToValueAtTime(3300, ctx.currentTime + 3.0);

    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(3250, ctx.currentTime);

    // 노이즈 버퍼 추가
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 3200;
    noiseFilter.Q.value = 8;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.08;

    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.3);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(gainNode);

    osc.connect(gainNode);
    osc2.connect(gainNode);

    gainNode.connect(this.analyser);
    this.analyser.connect(ctx.destination);

    osc.start();
    osc2.start();
    whiteNoise.start();

    this.currentSourceNodes.push(osc, osc2, whiteNoise, gainNode);
  }

  // 2. 허브 베어링 손상 (저주파 웅웅거리는 헬리콥터 비행 공명음)
  _playWheelBearing() {
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(115, ctx.currentTime);

    // LFO로 회전 주기 맥동 효과 (바퀴 회전 속도에 비례)
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(9.5, ctx.currentTime); // 초당 9회 회전

    lfoGain.gain.setValueAtTime(25, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.4);

    osc.connect(gainNode);
    gainNode.connect(this.analyser);
    this.analyser.connect(ctx.destination);

    osc.start();
    lfo.start();

    this.currentSourceNodes.push(osc, lfo, gainNode);
  }

  // 3. 겉벨트 슬립음 (끼이익 날카로운 벨트 미끄러짐)
  _playBeltScreech() {
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gainNode = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(1850, ctx.currentTime);

    lfo.type = "sine";
    lfo.frequency.setValueAtTime(22, ctx.currentTime); // 고속 진동

    lfoGain.gain.setValueAtTime(180, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.2);

    osc.connect(gainNode);
    gainNode.connect(this.analyser);
    this.analyser.connect(ctx.destination);

    osc.start();
    lfo.start();

    this.currentSourceNodes.push(osc, lfo, gainNode);
  }

  // 4. 등속조인트 딱딱딱 소음 (회전에 따른 주기적 금속 노크)
  _playCvJoint() {
    const ctx = this.audioCtx;
    const intervalTime = 0.18; // 180ms 마다 1회 타격

    const playClick = () => {
      if (!this.isPlaying) return;
      const osc = ctx.createOscillator();
      const clickGain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.04);

      clickGain.gain.setValueAtTime(0.28, ctx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(clickGain);
      clickGain.connect(this.analyser);
      this.analyser.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);

      this.timerId = setTimeout(playClick, intervalTime * 1000);
    };

    playClick();
  }

  // 5. 엔진 노킹음 (연소실 불규칙 까르륵 금속 타격)
  _playEngineKnock() {
    const ctx = this.audioCtx;

    const playKnockBurst = () => {
      if (!this.isPlaying) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = 1600 + Math.random() * 300;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.analyser);
      this.analyser.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);

      const nextInterval = 40 + Math.random() * 50; // 불규칙한 노킹 특성
      this.timerId = setTimeout(playKnockBurst, nextInterval);
    };

    playKnockBurst();
  }
}

export const carAudio = new CarAudioSimulator();
