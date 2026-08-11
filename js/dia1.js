/* ==========================================================================
   DÍA 1: LA BOMBA DE TIEMPO COOPERATIVA - ENGINE & AUDIO FX
   ========================================================================== */

class BombGameEngine {
  constructor() {
    // Game State Config
    this.totalTime = 60; // Default 60 seconds
    this.remainingTime = 60;
    this.targetDefuses = 50;
    this.currentDefuses = 0;
    this.timerInterval = null;
    this.isRunning = false;
    this.isMuted = false;
    this.isMathMode = false;
    this.currentMathAnswer = null;

    // Canvas Particles
    this.canvas = document.getElementById('particleCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];

    // DOM Elements
    this.timerDigits = document.getElementById('timerDigits');
    this.timerStatus = document.getElementById('timerStatus');
    this.defuseProgressFill = document.getElementById('defuseProgressFill');
    this.defuseCountText = document.getElementById('defuseCountText');
    this.defuseInput = document.getElementById('defuseInput');
    this.defuseForm = document.getElementById('defuseForm');
    this.chatMessages = document.getElementById('chatMessagesContainer');
    this.boomOverlay = document.getElementById('boomOverlay');
    this.successOverlay = document.getElementById('successOverlay');
    this.penaltyText = document.getElementById('penaltyText');
    this.statusPill = document.getElementById('statusPill');
    this.challengeDesc = document.getElementById('challengeDesc');
    this.targetText = document.getElementById('targetText');

    // Audio Context (Web Audio API for real-time procedural sound effects)
    this.audioCtx = null;

    // Sample Chat Users & Emotes for Twitch Simulation
    this.chatUsers = [
      { name: "ArixuFan99", color: "#9146FF", badge: "SUB" },
      { name: "GamerPro_ES", color: "#00F5D4", badge: "VIP" },
      { name: "PogChamp_Bot", color: "#FF007A", badge: "MOD" },
      { name: "RubiusFan", color: "#FFD166", badge: "SUB" },
      { name: "TwitchLover_22", color: "#00E676", badge: "VIEWER" },
      { name: "KnekroVibes", color: "#E1306C", badge: "SUB" },
      { name: "ArixuArmy_Official", color: "#9146FF", badge: "VIP" },
      { name: "StreamHero", color: "#00F5D4", badge: "SUB" }
    ];

    this.emotes = ["Pog", "DEFUSE!", "ArixuLove", "KEKW", "MonkaS", "Kappa", "ArixuHype"];

    this.penalties = [
      "¡BOOOM! ImArixu debe tirar TODO su inventario actual en el juego.",
      "¡BOOOM! ImArixu debe jugar los próximos 20 minutos SIN SONIDO en los cascos.",
      "¡BOOOM! ImArixu debe comer una cucharada de salsa picante / chuche ácida en directo.",
      "¡BOOOM! ImArixu debe realizar 20 flexiones / sentadillas inmediatamente.",
      "¡BOOOM! ImArixu debe regalar 5 suscripciones a la comunidad de Twitch.",
      "¡BOOOM! ImArixu debe hablar en modo ASMR (susurros) durante los próximos 15 minutos."
    ];

    this.init();
  }

  init() {
    this.initAudioContext();
    this.initCanvas();
    this.bindEvents();
    this.startChatSimulation();
    this.updateHUD();
    console.log('💣 Bomb Core Engine initialized successfully!');
  }

  /* ==========================================================================
     WEB AUDIO API SYNTHESIZER (PROCEDURAL SOUND FX)
     ========================================================================== */
  initAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.audioCtx = new AudioContext();
    }
  }

  ensureAudioStarted() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTickSound(frequency = 600, duration = 0.08) {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.error(e);
    }
  }

  playWarningSiren() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.3);
    } catch (e) {
      console.error(e);
    }
  }

  playVictoryFanfare() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.12);

        gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime + index * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + index * 0.12 + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + index * 0.12);
        osc.stop(this.audioCtx.currentTime + index * 0.12 + 0.4);
      });
    } catch (e) {
      console.error(e);
    }
  }

  playExplosionSound() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      // Noise buffer for explosion rumble
      const bufferSize = this.audioCtx.sampleRate * 1.5;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      filter.frequency.linearRampToValueAtTime(50, this.audioCtx.currentTime + 1.5);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.8, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 1.5);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.audioCtx.currentTime + 1.5);
    } catch (e) {
      console.error(e);
    }
  }

  /* ==========================================================================
     TIMER ENGINE & CONTROLS
     ========================================================================== */
  startTimer() {
    this.ensureAudioStarted();
    if (this.isRunning) return;
    this.isRunning = true;

    if (this.statusPill) {
      this.statusPill.innerHTML = `<span>●</span> REFACTOR EN CURSO`;
      this.statusPill.classList.remove('danger');
    }

    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateHUD();

        // Audio cues based on remaining time
        if (this.remainingTime <= 15 && this.remainingTime > 0) {
          document.body.classList.add('alarm-active');
          this.timerDigits.classList.add('critical');
          this.playWarningSiren();
        } else {
          this.playTickSound(600 + (60 - this.remainingTime) * 10, 0.08);
        }
      } else {
        this.triggerBoomFailure();
      }
    }, 1000);
  }

  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    document.body.classList.remove('alarm-active');
    if (this.timerStatus) this.timerStatus.textContent = "CONTRARRELOJ PAUSADO";
  }

  resetGame(newSeconds = 60) {
    this.pauseTimer();
    this.totalTime = newSeconds;
    this.remainingTime = newSeconds;
    this.currentDefuses = 0;
    document.body.classList.remove('alarm-active');
    this.timerDigits.classList.remove('critical');
    this.boomOverlay.classList.remove('active');
    this.successOverlay.classList.remove('active');

    if (this.statusPill) {
      this.statusPill.innerHTML = `<span>⚡</span> SISTEMA NÚCLEO PREPARADO`;
      this.statusPill.classList.remove('danger');
    }

    this.updateHUD();
    this.addChatMessage("Sistema", "Núcleo reiniciado. ¡Uníos para desactivarlo!", "#00F5D4", "SYS");
  }

  addTime(seconds) {
    this.remainingTime += seconds;
    if (this.remainingTime > 15) {
      document.body.classList.remove('alarm-active');
      this.timerDigits.classList.remove('critical');
    }
    this.updateHUD();
    this.addChatMessage("EventBot", `¡+${seconds}s añadidos al temporizador!`, "#FFD166", "EVENT");
  }

  updateHUD() {
    // Format mm:ss
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (this.timerDigits) {
      this.timerDigits.textContent = formatted;
    }

    // Progress Bar Update
    const percentage = Math.min(100, Math.round((this.currentDefuses / this.targetDefuses) * 100));
    if (this.defuseProgressFill) {
      this.defuseProgressFill.style.width = `${percentage}%`;
    }
    if (this.defuseCountText) {
      this.defuseCountText.textContent = `${this.currentDefuses} / ${this.targetDefuses} (${percentage}%)`;
    }

    if (this.remainingTime <= 15 && this.remainingTime > 0) {
      if (this.timerStatus) this.timerStatus.textContent = "⚠️ ¡ESTABILIDAD CRÍTICA - APURAD!";
    } else if (this.isRunning) {
      if (this.timerStatus) this.timerStatus.textContent = "DESACTIVACIÓN EN PROGRESO...";
    } else {
      if (this.timerStatus) this.timerStatus.textContent = "PRESIONA INICIAR PARA COMENZAR";
    }
  }

  /* ==========================================================================
     DEFUSE & CHAT CHALLENGE SYSTEM
     ========================================================================== */
  registerDefuse(amount = 1, username = "ImArixu", isUserAction = false) {
    if (!this.isRunning && !isUserAction) return;

    this.currentDefuses += amount;
    this.createSparkExplosion();

    if (isUserAction) {
      this.playTickSound(1200, 0.12);
    }

    this.updateHUD();

    // Check Victory Condition
    if (this.currentDefuses >= this.targetDefuses) {
      this.triggerDefusalSuccess();
    }
  }

  toggleMathMode() {
    this.isMathMode = !this.isMathMode;
    if (this.isMathMode) {
      this.generateNewMathProblem();
      this.challengeDesc.textContent = "¡Modo Acertijo Activado! Resuelve la ecuación en la entrada de comandos para inyectar un súper defuse (+10).";
    } else {
      this.challengeDesc.textContent = "Lograd que el chat o tú escriban la palabra clave 'DEFUSE' para desactivar la bomba antes de que expire el tiempo.";
      this.targetText.textContent = "PALABRA CLAVE: DEFUSE";
    }
  }

  generateNewMathProblem() {
    const num1 = Math.floor(Math.random() * 30) + 12;
    const num2 = Math.floor(Math.random() * 25) + 8;
    this.currentMathAnswer = num1 + num2;
    if (this.targetText) {
      this.targetText.textContent = `ACERTIJO: ¿Cuánto es ${num1} + ${num2}?`;
    }
  }

  /* ==========================================================================
     OUTCOME EVENTS (SUCCESS vs BOOOM)
     ========================================================================== */
  triggerDefusalSuccess() {
    this.pauseTimer();
    this.playVictoryFanfare();
    this.createVictoryConfetti();

    if (this.successOverlay) {
      this.successOverlay.classList.add('active');
    }
    if (this.statusPill) {
      this.statusPill.innerHTML = `<span>✔</span> ¡BOMBA DESACTIVADA!`;
      this.statusPill.className = "dia1-status-pill";
      this.statusPill.style.borderColor = "var(--twitch-green)";
      this.statusPill.style.color = "var(--twitch-green)";
    }

    this.addChatMessage("SISTEMA", "¡BOMBA DESACTIVADA! El stream está a salvo. MVP: La Comunidad.", "#00E676", "VICTORY");
  }

  triggerBoomFailure() {
    this.pauseTimer();
    document.body.classList.remove('alarm-active');
    this.playExplosionSound();
    this.createSparkExplosion(80);

    // Pick random penalty
    const randomPenalty = this.penalties[Math.floor(Math.random() * this.penalties.length)];
    if (this.penaltyText) {
      this.penaltyText.textContent = randomPenalty;
    }

    if (this.boomOverlay) {
      this.boomOverlay.classList.add('active');
    }
    if (this.statusPill) {
      this.statusPill.innerHTML = `<span>💀</span> COLLAPSE TOTAL: BOOOM`;
      this.statusPill.className = "dia1-status-pill danger";
    }

    this.addChatMessage("SISTEMA", "¡BOOOM! La bomba ha explotado. Penalización activada.", "#FF3366", "BOOM");
  }

  /* ==========================================================================
     TWITCH CHAT SIMULATOR
     ========================================================================== */
  startChatSimulation() {
    setInterval(() => {
      if (!this.isRunning) return;

      const randomUser = this.chatUsers[Math.floor(Math.random() * this.chatUsers.length)];
      const isDefuseMsg = Math.random() > 0.35;
      const emote = this.emotes[Math.floor(Math.random() * this.emotes.length)];
      const msgContent = isDefuseMsg ? `DEFUSE ${emote}` : `¡Vamos ImArixu! ${emote} Pog`;

      this.addChatMessage(randomUser.name, msgContent, randomUser.color, randomUser.badge);

      if (isDefuseMsg) {
        this.registerDefuse(1, randomUser.name, false);
      }
    }, 1800);
  }

  addChatMessage(username, message, color = "#9146FF", badge = "VIEWER") {
    if (!this.chatMessages) return;

    const msgLine = document.createElement('div');
    msgLine.className = 'chat-msg-line';
    msgLine.style.setProperty('--msg-color', color);

    msgLine.innerHTML = `
      <span class="chat-badge-icon">${badge}</span>
      <span class="chat-username" style="color: ${color};">${username}:</span>
      <span class="chat-text">${message}</span>
    `;

    this.chatMessages.appendChild(msgLine);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

    // Limit chat lines to 40
    if (this.chatMessages.children.length > 40) {
      this.chatMessages.removeChild(this.chatMessages.firstChild);
    }
  }

  /* ==========================================================================
     CANVAS ANIMATION & PARTICLE PARTICLES
     ========================================================================== */
  initCanvas() {
    if (!this.canvas || !this.ctx) return;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.renderCanvas();
  }

  resizeCanvas() {
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.clientWidth;
      this.canvas.height = parent.clientHeight;
    }
  }

  createSparkExplosion(count = 35) {
    if (!this.canvas) return;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3.5 + 1.5,
        color: Math.random() > 0.5 ? '#9146FF' : (Math.random() > 0.5 ? '#00F5D4' : '#FF007A'),
        alpha: 1,
        decay: Math.random() * 0.03 + 0.015
      });
    }
  }

  createVictoryConfetti() {
    if (!this.canvas) return;
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 2,
        radius: Math.random() * 5 + 3,
        color: ['#00E676', '#00F5D4', '#FFD166', '#9146FF'][Math.floor(Math.random() * 4)],
        alpha: 1,
        decay: 0.008
      });
    }
  }

  renderCanvas() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.renderCanvas());
  }

  /* ==========================================================================
     EVENT LISTENERS & USER INPUT BINDINGS
     ========================================================================== */
  bindEvents() {
    // Form Submit
    if (this.defuseForm) {
      this.defuseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.ensureAudioStarted();
        const val = this.defuseInput.value.trim();
        if (!val) return;

        if (this.isMathMode) {
          if (parseInt(val, 10) === this.currentMathAnswer) {
            this.addChatMessage("TÚ", `¡Respuesta Correcta (${val})! +10 DEFUSES`, "#00F5D4", "HERO");
            this.registerDefuse(10, "TÚ", true);
            this.generateNewMathProblem();
          } else {
            this.addChatMessage("TÚ", `Respuesta incorrecta (${val})... ¡Inténtalo de nuevo!`, "#FF3366", "USER");
          }
        } else {
          if (val.toUpperCase() === 'DEFUSE') {
            this.addChatMessage("TÚ", `DEFUSE!`, "#00F5D4", "YOU");
            this.registerDefuse(1, "TÚ", true);
          } else {
            this.addChatMessage("TÚ", val, "#FFFFFF", "YOU");
          }
        }

        this.defuseInput.value = '';
      });
    }

    // Audio Toggle Button
    const audioToggleBtn = document.getElementById('btnAudioToggle');
    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        this.isMuted = !this.isMuted;
        audioToggleBtn.innerHTML = this.isMuted 
          ? `<i class="fas fa-volume-mute"></i> Audio: OFF`
          : `<i class="fas fa-volume-up"></i> Audio: ON`;
      });
    }

    // Mod Controls
    document.getElementById('btnStartTimer')?.addEventListener('click', () => this.startTimer());
    document.getElementById('btnPauseTimer')?.addEventListener('click', () => this.pauseTimer());
    document.getElementById('btnResetTimer')?.addEventListener('click', () => this.resetGame(60));
    document.getElementById('btnAddTime')?.addEventListener('click', () => this.addTime(15));
    document.getElementById('btnSpamChat')?.addEventListener('click', () => {
      this.ensureAudioStarted();
      this.registerDefuse(10, "SimulatedSpam", true);
      this.addChatMessage("MOD_BOOST", "¡SPAM DE CHAT ACTIVADO! +10 DEFUSES", "#FFD166", "MOD");
    });
    document.getElementById('btnToggleMath')?.addEventListener('click', () => this.toggleMathMode());

    // Modal Action Buttons
    document.getElementById('btnRerollPenalty')?.addEventListener('click', () => {
      const randomPenalty = this.penalties[Math.floor(Math.random() * this.penalties.length)];
      if (this.penaltyText) this.penaltyText.textContent = randomPenalty;
    });

    document.getElementById('btnResetFromBoom')?.addEventListener('click', () => this.resetGame(60));
    document.getElementById('btnResetFromSuccess')?.addEventListener('click', () => this.resetGame(60));
  }
}

// Global Engine Instance
window.addEventListener('DOMContentLoaded', () => {
  window.bombGame = new BombGameEngine();
});
