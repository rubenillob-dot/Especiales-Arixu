/* ==========================================================================
   RULETA DE LA SUERTE - ENGINE & CANVAS WHEEL SYSTEM
   Features:
   1. Dynamic Textarea parsing (1 participant per line)
   2. Canvas 2D Vector Wheel with Twitch & Fortnite vibrant palette
   3. Realistic rotational physics & easeOutCubic deceleration
   4. Procedural Web Audio ticks during spin + Victory Fanfare
   5. Confetti Celebration Modal & Winner Removal functionality
   ========================================================================== */

class SpinWheelApp {
  constructor() {
    // Participants State
    this.participants = [];
    
    // Rotation & Physics State
    this.currentAngle = 0; // in radians
    this.isSpinning = false;
    this.spinStartTime = null;
    this.spinDuration = 6000; // ms
    this.startAngle = 0;
    this.targetAngle = 0;
    this.lastTickSlice = -1;

    // Audio State
    this.isMuted = false;
    this.audioCtx = null;

    // Canvas Elements
    this.wheelCanvas = document.getElementById('wheelCanvas');
    this.wheelCtx = this.wheelCanvas ? this.wheelCanvas.getContext('2d') : null;
    
    this.confettiCanvas = document.getElementById('confettiCanvas');
    this.confettiCtx = this.confettiCanvas ? this.confettiCanvas.getContext('2d') : null;
    this.confettiParticles = [];

    // Color Palette for Wheel Slices
    this.sliceColors = [
      '#9146FF', // Twitch Purple
      '#00F5D4', // Neon Cyan
      '#FF0055', // Raspberry Pink
      '#FFD166', // Neon Yellow
      '#00E5FF', // Electric Blue
      '#9D00FF', // Deep Purple
      '#FF6B00', // Vibrant Orange
      '#00FF66', // Bright Green
      '#FF007A', // Magenta
      '#00C6FF'  // Sky Blue
    ];

    // DOM References
    this.participantsInput = document.getElementById('participantsInput');
    this.btnUpdateWheel = document.getElementById('btnUpdateWheel');
    this.btnSpinWheel = document.getElementById('btnSpinWheel');
    this.participantCountBadge = document.getElementById('participantCountBadge');
    this.spinDurationSelect = document.getElementById('spinDurationSelect');
    
    this.winnerModalOverlay = document.getElementById('winnerModalOverlay');
    this.winnerNameDisplay = document.getElementById('winnerNameDisplay');
    this.btnRemoveWinnerAndSpin = document.getElementById('btnRemoveWinnerAndSpin');
    this.btnCloseWinnerModal = document.getElementById('btnCloseWinnerModal');
    
    this.toastNotification = document.getElementById('toastNotification');
    this.btnAudioToggle = document.getElementById('btnAudioToggle');

    this.init();
  }

  init() {
    this.initAudioContext();
    this.bindEvents();

    // Set initial default participants if input is empty
    if (!this.participantsInput.value.trim()) {
      this.participantsInput.value = [
        "ImArixu",
        "EriickWhiite",
        "SimbaGamer",
        "Xeno_Mod",
        "Piyuyin6",
        "Arixu_Fan_01",
        "TwitchLegend",
        "FortnitePro_99"
      ].join('\n');
    }

    this.updateParticipantsFromInput();
    this.resizeCanvases();
    window.addEventListener('resize', () => {
      this.resizeCanvases();
      this.drawWheel();
    });

    this.drawWheel();
  }

  /* ==========================================================================
     AUDIO SYNTHESIZER ENGINE (Web Audio API)
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

  playTickSound() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650 + Math.random() * 100, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) { console.error(e); }
  }

  playVictoryFanfare() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(this.audioCtx.currentTime + idx * 0.1);
        osc.stop(this.audioCtx.currentTime + idx * 0.1 + 0.4);
      });
    } catch (e) { console.error(e); }
  }

  /* ==========================================================================
     PARTICIPANTS & STATE MANAGEMENT
     ========================================================================== */
  updateParticipantsFromInput() {
    const rawText = this.participantsInput.value;
    const lines = rawText.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    this.participants = lines;
    const count = this.participants.length;

    if (this.participantCountBadge) {
      this.participantCountBadge.textContent = `${count}`;
    }

    if (this.btnSpinWheel) {
      this.btnSpinWheel.disabled = count === 0 || this.isSpinning;
    }

    this.drawWheel();
  }

  /* ==========================================================================
     CANVAS 2D VECTOR WHEEL RENDERING
     ========================================================================== */
  resizeCanvases() {
    if (this.wheelCanvas) {
      // High-DPI screen sharp rendering
      const dpr = window.devicePixelRatio || 1;
      const rect = this.wheelCanvas.parentElement.getBoundingClientRect();
      const size = Math.min(rect.width, 540);
      
      this.wheelCanvas.width = size * dpr;
      this.wheelCanvas.height = size * dpr;
      this.wheelCtx.scale(dpr, dpr);
      this.wheelSize = size;
    }

    if (this.confettiCanvas) {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    }
  }

  drawWheel() {
    if (!this.wheelCtx || !this.wheelCanvas) return;

    const ctx = this.wheelCtx;
    const size = this.wheelSize || 520;
    const center = size / 2;
    const radius = center - 12;

    ctx.clearRect(0, 0, size, size);

    const numSlices = this.participants.length;

    if (numSlices === 0) {
      // Empty Wheel Placeholder
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#14141E';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#9146FF';
      ctx.stroke();

      ctx.fillStyle = '#ADADB8';
      ctx.font = '900 16px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Añade participantes para comenzar', center, center);
      ctx.restore();
      return;
    }

    const sliceAngle = (Math.PI * 2) / numSlices;

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(this.currentAngle);

    // Draw Slices
    for (let i = 0; i < numSlices; i++) {
      const start = i * sliceAngle;
      const end = start + sliceAngle;
      const color = this.sliceColors[i % this.sliceColors.length];

      // Slice sector
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Subtle slice border overlay
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(10, 10, 16, 0.4)';
      ctx.stroke();

      // Slice Text Label
      ctx.save();
      ctx.rotate(start + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // Pick contrasting text color
      ctx.fillStyle = (color === '#FFD166' || color === '#00F5D4' || color === '#00FF66') ? '#08080C' : '#FFFFFF';
      
      // Calculate font size according to number of slices
      let fontSize = Math.max(11, Math.min(18, Math.floor(260 / Math.sqrt(numSlices))));
      ctx.font = `900 ${fontSize}px Outfit, sans-serif`;

      const textMargin = radius - 24;
      let text = this.participants[i];
      // Truncate text if too long
      if (text.length > 18) {
        text = text.substring(0, 16) + '...';
      }

      ctx.fillText(text, textMargin, 0);
      ctx.restore();
    }

    ctx.restore(); // Restore angle rotation

    // Outer Glow Ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#9146FF';
    ctx.stroke();

    // Outer Edge Dots / Pegs
    const pegCount = Math.max(12, numSlices);
    for (let i = 0; i < pegCount; i++) {
      const angle = (Math.PI * 2 / pegCount) * i;
      const px = center + Math.cos(angle) * (radius - 3);
      const py = center + Math.sin(angle) * (radius - 3);

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#00F5D4';
      ctx.shadowBlur = 6;
      ctx.fill();
    }
    ctx.restore();

    // Center Cap Hub
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, 42, 0, Math.PI * 2);
    ctx.fillStyle = '#0E0E14';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#00F5D4';
    ctx.shadowColor = '#00F5D4';
    ctx.shadowBlur = 12;
    ctx.stroke();

    // Center Cap Logo/Text
    ctx.fillStyle = '#FFF';
    ctx.font = '900 13px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ARIXU', center, center - 2);
    ctx.restore();
  }

  /* ==========================================================================
     SPIN PHYSICS & EASING ANIMATION
     ========================================================================== */
  spinWheel() {
    if (this.isSpinning || this.participants.length === 0) return;
    
    this.ensureAudioStarted();
    this.isSpinning = true;
    if (this.btnSpinWheel) this.btnSpinWheel.disabled = true;

    const duration = parseInt(this.spinDurationSelect ? this.spinDurationSelect.value : '6', 10) * 1000;
    this.spinDuration = duration;
    this.spinStartTime = performance.now();
    this.startAngle = this.currentAngle;

    // Calculate random extra full rotations (5 to 8 full laps) plus random target slice angle
    const extraLaps = 5 + Math.floor(Math.random() * 4);
    const randomOffset = Math.random() * Math.PI * 2;
    this.targetAngle = this.startAngle + (Math.PI * 2 * extraLaps) + randomOffset;

    this.lastTickSlice = -1;
    this.animateSpin();
  }

  animateSpin() {
    const now = performance.now();
    const elapsed = now - this.spinStartTime;
    const progress = Math.min(1, elapsed / this.spinDuration);

    // Ease Out Cubic function: decelerates smoothly at the end
    const easeOut = 1 - Math.pow(1 - progress, 3.5);

    this.currentAngle = this.startAngle + (this.targetAngle - this.startAngle) * easeOut;

    // Check for tick sounds when slice passes pointer at top (-Math.PI / 2 or 1.5 * Math.PI)
    const numSlices = this.participants.length;
    const sliceAngle = (Math.PI * 2) / numSlices;
    
    // Normalized current angle relative to 12 o'clock pointer
    const currentSliceIndex = Math.floor(((this.currentAngle % (Math.PI * 2)) + Math.PI * 2) / sliceAngle);

    if (currentSliceIndex !== this.lastTickSlice) {
      this.playTickSound();
      this.lastTickSlice = currentSliceIndex;
    }

    this.drawWheel();

    if (progress < 1) {
      requestAnimationFrame(() => this.animateSpin());
    } else {
      this.onSpinComplete();
    }
  }

  onSpinComplete() {
    this.isSpinning = false;
    if (this.btnSpinWheel) this.btnSpinWheel.disabled = false;

    // Calculate Winning Participant
    const numSlices = this.participants.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    // Top Pointer is fixed at 12 o'clock (-Math.PI/2 or 270 deg)
    // Wheel rotated by currentAngle clockwise. So slice angle at top pointer:
    const normalizedAngle = (this.currentAngle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    
    // Pointer is at 1.5 * Math.PI (3*PI/2)
    let effectiveAngle = (1.5 * Math.PI - normalizedAngle) % (Math.PI * 2);
    if (effectiveAngle < 0) effectiveAngle += Math.PI * 2;

    const winningIndex = Math.floor(effectiveAngle / sliceAngle) % numSlices;
    const winnerName = this.participants[winningIndex];

    this.lastWinnerIndex = winningIndex;
    this.lastWinnerName = winnerName;

    this.playVictoryFanfare();
    this.showWinnerModal(winnerName);
  }

  /* ==========================================================================
     WINNER CELEBRATION MODAL & CONFETTI
     ========================================================================== */
  showWinnerModal(winnerName) {
    if (this.winnerNameDisplay) {
      this.winnerNameDisplay.textContent = winnerName;
    }

    if (this.winnerModalOverlay) {
      this.winnerModalOverlay.classList.add('active');
    }

    this.triggerConfetti();
  }

  hideWinnerModal() {
    if (this.winnerModalOverlay) {
      this.winnerModalOverlay.classList.remove('active');
    }
    this.stopConfetti();
  }

  removeWinnerAndSpinAgain() {
    if (this.lastWinnerName) {
      // Remove winner from participants list
      const index = this.participants.indexOf(this.lastWinnerName);
      if (index !== -1) {
        this.participants.splice(index, 1);
        this.participantsInput.value = this.participants.join('\n');
        this.updateParticipantsFromInput();
        this.showToast(`¡${this.lastWinnerName} eliminado de la ruleta!`);
      }
    }

    this.hideWinnerModal();

    setTimeout(() => {
      if (this.participants.length > 0) {
        this.spinWheel();
      }
    }, 400);
  }

  triggerConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    
    this.confettiParticles = [];
    const count = 120;
    const colors = ['#00F5D4', '#9146FF', '#FF0055', '#FFD166', '#00E5FF'];

    for (let i = 0; i < count; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.confettiCanvas.width,
        y: Math.random() * this.confettiCanvas.height - this.confettiCanvas.height,
        vx: (Math.random() - 0.5) * 5,
        vy: Math.random() * 5 + 3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }

    this.animatingConfetti = true;
    this.renderConfetti();
  }

  renderConfetti() {
    if (!this.animatingConfetti || !this.confettiCtx) return;

    const ctx = this.confettiCtx;
    ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    for (let i = 0; i < this.confettiParticles.length; i++) {
      const p = this.confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      if (p.y > this.confettiCanvas.height) {
        p.y = -20;
        p.x = Math.random() * this.confettiCanvas.width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    requestAnimationFrame(() => this.renderConfetti());
  }

  stopConfetti() {
    this.animatingConfetti = false;
    if (this.confettiCtx && this.confettiCanvas) {
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }

  showToast(msg) {
    if (!this.toastNotification) return;
    this.toastNotification.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    this.toastNotification.classList.add('show');
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastNotification.classList.remove('show');
    }, 3000);
  }

  /* ==========================================================================
     EVENT BINDINGS
     ========================================================================== */
  bindEvents() {
    // Update wheel button & input change
    if (this.btnUpdateWheel) {
      this.btnUpdateWheel.addEventListener('click', () => {
        this.updateParticipantsFromInput();
        this.showToast("¡Ruleta actualizada correctamente!");
      });
    }

    if (this.participantsInput) {
      this.participantsInput.addEventListener('input', () => {
        this.updateParticipantsFromInput();
      });
    }

    // Spin wheel main button
    if (this.btnSpinWheel) {
      this.btnSpinWheel.addEventListener('click', () => {
        this.spinWheel();
      });
    }

    // Modal Actions
    if (this.btnCloseWinnerModal) {
      this.btnCloseWinnerModal.addEventListener('click', () => {
        this.hideWinnerModal();
      });
    }

    if (this.btnRemoveWinnerAndSpin) {
      this.btnRemoveWinnerAndSpin.addEventListener('click', () => {
        this.removeWinnerAndSpinAgain();
      });
    }

    // Audio Toggle
    if (this.btnAudioToggle) {
      this.btnAudioToggle.addEventListener('click', () => {
        this.isMuted = !this.isMuted;
        this.btnAudioToggle.innerHTML = this.isMuted
          ? `<i class="fas fa-volume-mute"></i> Audio: OFF`
          : `<i class="fas fa-volume-up"></i> Audio: ON`;
      });
    }

    // Presets Buttons
    document.getElementById('btnPresetDemo')?.addEventListener('click', () => {
      this.participantsInput.value = [
        "ImArixu",
        "EriickWhiite",
        "SimbaGamer",
        "Xeno_Mod",
        "Piyuyin6",
        "El_Xenomorfo",
        "Arixu_Fan_1",
        "TwitchViewer_99"
      ].join('\n');
      this.updateParticipantsFromInput();
      this.showToast("Cargada lista de demo comunidad.");
    });

    document.getElementById('btnPresetPenalties')?.addEventListener('click', () => {
      this.participantsInput.value = [
        "Tirar todo el inventario",
        "Jugar 15m sin sonido",
        "Comer salsa picante",
        "20 sentadillas en directo",
        "Regalar 5 subs",
        "Hablar en ASMR 10m",
        "Jugar con controles invertidos"
      ].join('\n');
      this.updateParticipantsFromInput();
      this.showToast("Cargada lista de castigos.");
    });

    document.getElementById('btnClearList')?.addEventListener('click', () => {
      this.participantsInput.value = '';
      this.updateParticipantsFromInput();
      this.showToast("Lista vaciada.");
    });
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.ruletaApp = new SpinWheelApp();
});
