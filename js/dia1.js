/* ==========================================================================
   DÍA 1: LA BOMBA DE TIEMPO COOPERATIVA - ENGINE & TWITCH WEBSOCKET ENGINE
   Features:
   1. Real-time Twitch IRC WebSocket (wss://irc-ws.chat.twitch.tv:443) -> #imarixu
   2. 10-Minute Countdown & 05:00 Heartbeat Red Warning Alert
   3. 10 Official Community Riddles
   4. SEQUENTIAL DECRYPTION REVEAL SYSTEM (Cable #01 Active, Cables #02..#10 Encrypted,
      3.0s Dramatic Keyframe Transition with Cyber Scan Sound)
   5. Restrictive Validation: ONLY validates the currently active cable!
   6. Random RNG Victory Reward System & Defusers Squad Roster
   ========================================================================== */

class BombGameEngine {
  constructor() {
    // Timer Configuration (7 minutes = 420 seconds)
    this.totalTime = 420; 
    this.remainingTime = 420;
    this.timerInterval = null;
    this.isRunning = false;
    this.isMuted = false;
    this.warningAlertTriggered = false;

    // Requirement 3: Active Cable Index (0 to 9)
    this.activeModuleIndex = 0;
    this.isDecrypting = false;

    // Array of Reactor Cables / Riddles (16 Sequential Modules)
    // Initially Cable #01 is 'activo', remaining cables are 'encriptado'
    this.modulos = [
      { id: 1,  cableNum: "CABLE #01", pregunta: "¿Cómo se llama el perro de Ari?", respuestas: ["simba"], estado: "activo", defuser: null, defuserKeyword: null },
      { id: 2,  cableNum: "CABLE #02", pregunta: "¿Cuál es el código para la tienda de Fortnite / Epic?", respuestas: ["arixu"], estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 3,  cableNum: "CABLE #03", pregunta: "¿Cuál es el número del cumpleaños de Ari?", respuestas: ["2"], estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 4,  cableNum: "CABLE #04", pregunta: "Género que NO le gusta a Ari (Romántico, Anime, Histórico, Fantasía):", respuestas: ["anime"], estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 5,  cableNum: "CABLE #05", pregunta: "¿Cómo se llama el máximo donador del canal?", respuestas: ["erick", "eriickwhiite"], estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 6,  cableNum: "CABLE #06", pregunta: "¿Qué VIP fue expulsado por tocar los huevos?", respuestas: ["xeno", "el_xenomorfo_"], estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 7,  cableNum: "CABLE #07", pregunta: "¿Qué es lo más picante que se ha comido Ari en directo?", respuestas: ["habanero"], estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 8,  cableNum: "CABLE #08", pregunta: "Palabra exacta para decir que dejas la view de fondo:", respuestas: ["lurk"], estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 9,  cableNum: "CABLE #09", pregunta: "¿A quién tuvimos que perdonar en un directo de Ari?", respuestas: ["piyu", "piyuyin6"], estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 10, cableNum: "CABLE #10", pregunta: "¿Cuál es el número total de moderadores que hay en Twitch?", respuestas: ["3"], estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 11, cableNum: "CABLE #11", pregunta: "¿Qué skin gorda y monstruosa de Fortnite canjeaban los subs para trollear a Ari?", respuestas: ["godzilla"], respuesta_principal: "Godzilla", estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 12, cableNum: "CABLE #12", pregunta: "¿Qué raza de perro es Simba?", respuestas: ["teckel"], respuesta_principal: "Teckel", estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 13, cableNum: "CABLE #13", pregunta: "¿De qué se disfraza Ari si canjeas 2000 bits?", respuestas: ["fresita", "fresa"], respuestas_validas: ["fresita", "fresa"], respuesta_principal: "Fresita", estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 14, cableNum: "CABLE #14", pregunta: "Si spameas en el chat, ¿cuál es tu castigo? (Palabra de 3 letras)", respuestas: ["ban"], respuesta_principal: "ban", estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 15, cableNum: "CABLE #15", pregunta: "¿Cuál es el número de puntos del canal necesarios para canjear una canción?", respuestas: ["1500"], respuesta_principal: "1500", estado: "encriptado", defuser: null, defuserKeyword: null },
      { id: 16, cableNum: "CABLE #16", pregunta: "¿Qué baile teníamos como canje de puntos para que lo hiciera Ari?", respuestas: ["griddy"], respuesta_principal: "griddy", estado: "encriptado", defuser: null, defuserKeyword: null }
    ];

    // Ensure all modules have default properties (cableNum, estado, defuser, defuserKeyword)
    this.modulos.forEach((mod, idx) => {
      if (!mod.cableNum) mod.cableNum = `CABLE #${String(idx + 1).padStart(2, '0')}`;
      if (!mod.estado) mod.estado = (idx === 0) ? 'activo' : 'encriptado';
      if (mod.defuser === undefined) mod.defuser = null;
      if (mod.defuserKeyword === undefined) mod.defuserKeyword = null;
    });

    window.bombModules = this.modulos;

    // Array of Heroes (Users who cut cables)
    this.heroesArray = [];

    // Random RNG Victory Reward Options
    this.rewardOptions = [
      {
        id: 1,
        tag: "🎁 RECOMPENSA ALEATORIA: TICKET DORADO",
        text: "🎁 Recompensa: ¡Todos los acertantes entran en una ruleta para ganar 1 participación extra para el Ticket Dorado del futuro!"
      },
      {
        id: 2,
        tag: "👻 RECOMPENSA ALEATORIA: REGALO DE ESPÍRITU",
        text: "👻 Recompensa: ¡Ruleta de acertantes! El ganador elegirá un espíritu que Ari no tenga para regalárselo."
      },
      {
        id: 3,
        tag: "🛡️ RECOMPENSA ALEATORIA: SALVACIÓN DE ARI",
        text: "🛡️ Recompensa: ¡Salvación! Ari se libra del castigo de hoy gracias a la comunidad."
      }
    ];

    // Twitch IRC WebSocket State
    this.ws = null;
    this.channelName = "imarixu";
    this.wsMsgCount = 0;

    // DOM Elements
    this.timerDigits = document.getElementById('timerDigits');
    this.timerStatus = document.getElementById('timerStatus');
    this.timerHudCard = document.getElementById('timerHudCard');
    this.statusPill = document.getElementById('statusPill');
    this.statusPillText = document.getElementById('statusPillText');
    this.cablesGrid = document.getElementById('cablesGrid');
    this.completedCablesCount = document.getElementById('completedCablesCount');
    this.defuseInput = document.getElementById('defuseInput');
    this.defuseForm = document.getElementById('defuseForm');
    this.liveChatMessages = document.getElementById('liveChatMessages');
    this.wsStatusBadge = document.getElementById('wsStatusBadge');
    this.monitorLed = document.getElementById('monitorLed');
    this.wsMsgCounter = document.getElementById('wsMsgCounter');
    this.terminalStatusText = document.getElementById('terminalStatusText');
    this.boomOverlay = document.getElementById('boomOverlay');
    this.successOverlay = document.getElementById('successOverlay');
    this.penaltyText = document.getElementById('penaltyText');
    this.rngRewardTag = document.getElementById('rngRewardTag');
    this.rngRewardText = document.getElementById('rngRewardText');
    this.heroesSquadList = document.getElementById('heroesSquadList');

    // Canvas Particles
    this.canvas = document.getElementById('particleCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];

    // Web Audio Synthesizer
    this.audioCtx = null;

    // Streamer Penalties List
    this.penalties = [
      "¡BOOOM! ImArixu debe tirar TODO su inventario actual en el juego.",
      "¡BOOOM! ImArixu debe jugar los próximos 15 minutos SIN SONIDO en los cascos.",
      "¡BOOOM! ImArixu debe comer una cucharada de salsa picante / chuche ácida en directo.",
      "¡BOOOM! ImArixu debe hacer 20 sentadillas / flexiones inmediatamente.",
      "¡BOOOM! ImArixu debe regalar 5 suscripciones a la comunidad de Twitch.",
      "¡BOOOM! ImArixu debe hablar en modo ASMR (susurros) durante los próximos 10 minutos.",
      "¡BOOOM! ImArixu debe jugar la siguiente partida con la mano cambiada / controles invertidos."
    ];

    this.init();
  }

  init() {
    this.initAudioContext();
    this.initCanvas();
    this.renderCablesGrid();
    this.initTwitchWebSocket();
    this.bindEvents();
    this.updateHUD();
    console.log('💣 Bomb Core Engine with Sequential Decryption initialized!');
  }

  /* ==========================================================================
     TWITCH WEBSOCKET CONNECTION (wss://irc-ws.chat.twitch.tv:443)
     ========================================================================== */
  initTwitchWebSocket() {
    try {
      this.addTerminalLine("Conectando con WebSocket IRC de Twitch (wss://irc-ws.chat.twitch.tv:443)...", "sys");
      this.ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

      this.ws.onopen = () => {
        const anonymousNick = `justinfan${Math.floor(10000 + Math.random() * 90000)}`;
        this.ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
        this.ws.send(`NICK ${anonymousNick}`);
        this.ws.send(`JOIN #${this.channelName}`);

        if (this.wsStatusBadge) {
          this.wsStatusBadge.textContent = "● CONECTADO #imarixu";
          this.wsStatusBadge.classList.add('connected');
        }
        if (this.monitorLed) {
          this.monitorLed.classList.add('connected');
        }

        this.addTerminalLine(`✔ Conectado exitosamente al chat en directo de #${this.channelName}. Escuchando mensajes...`, "sys");
      };

      this.ws.onmessage = (event) => {
        const data = event.data;

        if (data.startsWith('PING')) {
          this.ws.send('PONG :tmi.twitch.tv');
          return;
        }

        const lines = data.split('\r\n');
        lines.forEach(line => {
          if (line.includes('PRIVMSG')) {
            this.parseTwitchPrivmsg(line);
          }
        });
      };

      this.ws.onerror = (err) => {
        console.error('Twitch WS Error:', err);
        this.addTerminalLine("⚠️ Error de conexión con el WebSocket de Twitch.", "sys");
        if (this.wsStatusBadge) this.wsStatusBadge.textContent = "🔴 ERROR WS";
      };

      this.ws.onclose = () => {
        this.addTerminalLine("Desconectado de Twitch IRC. Reintentando en 5s...", "sys");
        if (this.wsStatusBadge) {
          this.wsStatusBadge.textContent = "🔴 DESCONECTADO";
          this.wsStatusBadge.classList.remove('connected');
        }
        if (this.monitorLed) this.monitorLed.classList.remove('connected');
        setTimeout(() => this.initTwitchWebSocket(), 5000);
      };

    } catch (e) {
      console.error(e);
      this.addTerminalLine("No se pudo iniciar el WebSocket de Twitch.", "sys");
    }
  }

  parseTwitchPrivmsg(rawLine) {
    let username = 'Anónimo';
    let message = '';

    const displayNameMatch = rawLine.match(/display-name=([^;]+)/);
    if (displayNameMatch && displayNameMatch[1]) {
      username = displayNameMatch[1];
    } else {
      const userMatch = rawLine.match(/:([^!]+)!/);
      if (userMatch && userMatch[1]) {
        username = userMatch[1];
      }
    }

    const msgIndex = rawLine.indexOf(' PRIVMSG ');
    if (msgIndex !== -1) {
      const colonIndex = rawLine.indexOf(' :', msgIndex);
      if (colonIndex !== -1) {
        message = rawLine.substring(colonIndex + 2).trim();
      }
    }

    if (!message) return;

    this.wsMsgCount++;
    if (this.wsMsgCounter) this.wsMsgCounter.textContent = `${this.wsMsgCount} MSGS`;

    this.addTerminalLine(`[${username}]: ${message}`, "user", username);

    // ONLY PROCESS IF TIMER IS RUNNING AND NOT DECRYPTING NEXT CABLE
    if (this.isRunning && !this.isDecrypting) {
      this.processInputWord(message, username, false);
    }
  }

  addTerminalLine(text, type = "user", username = "") {
    if (!this.liveChatMessages) return;

    const lineEl = document.createElement('div');
    lineEl.className = `terminal-line ${type}`;

    if (type === 'sys') {
      lineEl.innerHTML = text;
    } else {
      lineEl.innerHTML = `<span class="terminal-user">[${username}]:</span> <span class="terminal-text">${this.escapeHtml(text.replace(`[${username}]: `, ''))}</span>`;
    }

    this.liveChatMessages.appendChild(lineEl);
    this.liveChatMessages.scrollTop = this.liveChatMessages.scrollHeight;

    if (this.liveChatMessages.children.length > 80) {
      this.liveChatMessages.removeChild(this.liveChatMessages.firstChild);
    }
  }

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ==========================================================================
     WEB AUDIO PROCEDURAL SOUND FX (INCLUDING CYBER DECRYPTION SCAN)
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

  playTickSound(frequency = 520, duration = 0.06) {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) { console.error(e); }
  }

  playCableCutSound() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const notes = [659.25, 880.00, 1174.66];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.05);
        gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.05 + 0.25);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(this.audioCtx.currentTime + idx * 0.05);
        osc.stop(this.audioCtx.currentTime + idx * 0.05 + 0.25);
      });
    } catch (e) { console.error(e); }
  }

  playDecryptionScanSound() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      // Futuristic cyber sweep sound lasting ~2.5s
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.audioCtx.currentTime + 1.2);
      osc.frequency.exponentialRampToValueAtTime(600, this.audioCtx.currentTime + 2.5);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.audioCtx.currentTime + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 2.8);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 2.8);
    } catch (e) { console.error(e); }
  }

  playWarningSiren() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(900, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, this.audioCtx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.22, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.4);
    } catch (e) { console.error(e); }
  }

  playVictoryFanfare() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, index) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + index * 0.12);
        gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime + index * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + index * 0.12 + 0.5);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(this.audioCtx.currentTime + index * 0.12);
        osc.stop(this.audioCtx.currentTime + index * 0.12 + 0.5);
      });
    } catch (e) { console.error(e); }
  }

  playExplosionSound() {
    if (this.isMuted || !this.audioCtx) return;
    try {
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
      filter.frequency.linearRampToValueAtTime(40, this.audioCtx.currentTime + 1.5);
      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.9, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 1.5);
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);
      whiteNoise.start();
      whiteNoise.stop(this.audioCtx.currentTime + 1.5);
    } catch (e) { console.error(e); }
  }

  /* ==========================================================================
     REQUIREMENT 1: SEQUENTIAL GRID RENDERING (ENCRYPTED VS ACTIVE VS COMPLETED)
     ========================================================================== */
  /* ==========================================================================
     HELPER METHODS: ANSWER EXTRACTION & NORMALIZATION
     ========================================================================== */
  getValidAnswers(mod) {
    if (!mod) return [];
    if (Array.isArray(mod.respuestas_validas) && mod.respuestas_validas.length > 0) {
      return mod.respuestas_validas;
    }
    if (Array.isArray(mod.respuestas) && mod.respuestas.length > 0) {
      return mod.respuestas;
    }
    if (mod.respuesta_principal) {
      return [mod.respuesta_principal];
    }
    return [];
  }

  getPrimaryAnswer(mod) {
    if (!mod) return "";
    if (mod.defuserKeyword) return mod.defuserKeyword;
    if (mod.respuesta_principal) return mod.respuesta_principal;
    if (Array.isArray(mod.respuestas_validas) && mod.respuestas_validas.length > 0) {
      return mod.respuestas_validas[0];
    }
    if (Array.isArray(mod.respuestas) && mod.respuestas.length > 0) {
      return mod.respuestas[0];
    }
    return "";
  }

  /* ==========================================================================
     REQUIREMENT 1: SEQUENTIAL GRID RENDERING (ENCRYPTED VS ACTIVE VS COMPLETED)
     ========================================================================== */
  renderCablesGrid() {
    if (!this.cablesGrid) return;
    this.cablesGrid.innerHTML = '';

    this.modulos.forEach((mod, idx) => {
      const card = document.createElement('div');
      card.id = `cable-card-${mod.id}`;

      const isCompleted = mod.estado === 'completado';
      const isActive = mod.estado === 'activo';
      const isDecrypting = mod.estado === 'desencriptando';
      const isEncrypted = mod.estado === 'encriptado';

      if (isCompleted) {
        card.className = 'cable-card solved';
        const primaryAnswer = (mod.defuserKeyword || this.getPrimaryAnswer(mod)).toUpperCase();
        card.innerHTML = `
          <div class="cable-card-header">
            <span class="cable-num-tag">${mod.cableNum}</span>
            <span class="cable-status-led" id="cable-status-${mod.id}">
              <span class="led-dot green"></span> CORTADO
            </span>
          </div>
          <div class="cable-wire-graphic"><div class="wire-line"></div></div>
          <div class="cable-riddle-text">${mod.pregunta}</div>
          <div class="cable-answer-hint" id="cable-hint-${mod.id}">Clave: ${primaryAnswer}</div>
          ${mod.defuser ? `
            <div class="cable-hero-badge">
              <span class="hero-badge-title"><i class="fas fa-shield-cat"></i> Desactivado por:</span>
              <strong class="hero-name" title="${this.escapeHtml(mod.defuser)}">${this.escapeHtml(mod.defuser)}</strong>
            </div>
          ` : ''}
        `;
      } else if (isActive) {
        card.className = 'cable-card active-cable';
        card.innerHTML = `
          <div class="cable-card-header">
            <span class="cable-num-tag">${mod.cableNum}</span>
            <span class="cable-status-led" id="cable-status-${mod.id}">
              <span class="led-dot yellow"></span> EN CURSO
            </span>
          </div>
          <div class="cable-wire-graphic"><div class="wire-line"></div></div>
          <div class="cable-riddle-text">${mod.pregunta}</div>
          <div class="cable-answer-hint" id="cable-hint-${mod.id}">Clave: ??? (¡Escribid en chat!)</div>
        `;
      } else if (isDecrypting) {
        card.className = 'cable-card decrypt-reveal';
        card.innerHTML = `
          <div class="decrypting-overlay">
            <div class="decrypt-scanner-line"></div>
            <div class="decrypt-status-title"><i class="fas fa-microchip fa-spin"></i> DESENCRIPTANDO NÚCLEO...</div>
            <div class="decrypt-progress-track"><div class="decrypt-progress-fill"></div></div>
            <div class="decrypt-subtext">PROCESANDO ${mod.cableNum}</div>
          </div>
        `;
      } else {
        // Encriptado (Dynamic previous cable reference)
        const prevCableNum = idx > 0 ? String(idx).padStart(2, '0') : '01';
        card.className = 'cable-card encrypted-card';
        card.innerHTML = `
          <div class="encrypted-overlay">
            <div class="encrypted-glitch-text"><i class="fas fa-lock"></i> 🔒 MÓDULO ENCRIPTADO</div>
            <div class="encrypted-sub">Esperando resolución de Cable #${prevCableNum}</div>
          </div>
          <div class="cable-card-header">
            <span class="cable-num-tag">${mod.cableNum}</span>
            <span class="cable-status-led"><span class="led-dot red"></span> BLOQUEADO</span>
          </div>
          <div class="cable-wire-graphic"><div class="wire-line"></div></div>
          <div class="cable-riddle-text">${mod.pregunta}</div>
          <div class="cable-answer-hint">Clave: ???</div>
        `;
      }

      this.cablesGrid.appendChild(card);
    });

    this.updateCompletedCounter();
  }

  updateCompletedCounter() {
    const completedCount = this.modulos.filter(m => m.estado === 'completado').length;
    if (this.completedCablesCount) {
      this.completedCablesCount.textContent = completedCount;
    }
  }

  /* ==========================================================================
     TIMER ENGINE & 05:00 ALERT VISUAL
     ========================================================================== */
  startTimer() {
    this.ensureAudioStarted();
    if (this.isRunning) return;
    this.isRunning = true;

    if (this.statusPillText) {
      this.statusPillText.textContent = "DESACTIVACIÓN EN PROGRESO (07:00)";
    }
    if (this.terminalStatusText) {
      this.terminalStatusText.textContent = "🟢 TEMPORIZADOR ACTIVO: Escuchando respuestas para " + this.modulos[this.activeModuleIndex].cableNum + "...";
      this.terminalStatusText.style.color = "#00E676";
    }

    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateHUD();

        if (this.remainingTime <= 300) {
          if (this.remainingTime % 2 === 0) {
            this.playTickSound(800, 0.08);
          }
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
    if (this.timerStatus) this.timerStatus.textContent = "CUENTA REGRESIVA PAUSADA";
    if (this.terminalStatusText) {
      this.terminalStatusText.textContent = "⚠️ Temporizador pausado. Inicia para activar la auto-lectura.";
      this.terminalStatusText.style.color = "#FFD166";
    }
  }

  resetGame(seconds = 420) {
    this.pauseTimer();
    this.totalTime = seconds;
    this.remainingTime = seconds;
    this.warningAlertTriggered = false;
    this.activeModuleIndex = 0;
    this.isDecrypting = false;

    // Reset all modules: Cable #01 active, remaining encrypted
    this.modulos.forEach((mod, idx) => {
      mod.estado = (idx === 0) ? 'activo' : 'encriptado';
      mod.defuser = null;
      mod.defuserKeyword = null;
    });
    this.heroesArray = [];

    document.body.classList.remove('alarm-active');
    if (this.timerDigits) this.timerDigits.classList.remove('warning-alert');
    if (this.timerHudCard) this.timerHudCard.classList.remove('warning-card-border');
    if (this.statusPill) this.statusPill.classList.remove('danger');
    if (this.statusPillText) this.statusPillText.textContent = "SISTEMA NÚCLEO PREPARADO (07:00)";

    this.boomOverlay?.classList.remove('active');
    this.successOverlay?.classList.remove('active');

    this.renderCablesGrid();
    this.updateHUD();
    this.addTerminalLine(`🔒 Sistema reiniciado. ${this.modulos[0].cableNum} ACTIVO. Resto de módulos encriptados.`, "sys");
  }

  updateHUD() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (this.timerDigits) {
      this.timerDigits.textContent = formatted;
    }

    if (this.remainingTime <= 300 && this.remainingTime > 0) {
      if (this.timerDigits && !this.timerDigits.classList.contains('warning-alert')) {
        this.timerDigits.classList.add('warning-alert');
      }
      if (this.timerHudCard && !this.timerHudCard.classList.contains('warning-card-border')) {
        this.timerHudCard.classList.add('warning-card-border');
      }
      if (this.statusPill && !this.statusPill.classList.contains('danger')) {
        this.statusPill.classList.add('danger');
        if (this.statusPillText) {
          this.statusPillText.textContent = "⚠️ ALERTA: REACTOR EN ALERTA ROJA (≤ 05:00)";
        }
      }
      document.body.classList.add('alarm-active');

      if (!this.warningAlertTriggered) {
        this.warningAlertTriggered = true;
        this.playWarningSiren();
        this.addTerminalLine("¡ATENCIÓN! Tiempo restante menor a 05:00. El reactor entra en ALERTA ROJA.", "sys");
      }

      if (this.timerStatus) {
        this.timerStatus.textContent = "⚠️ ALERTA ROJA: COLAPSO INMINENTE";
      }
    } else if (this.isRunning) {
      if (this.timerStatus) {
        const activeMod = this.modulos[this.activeModuleIndex];
        this.timerStatus.textContent = `ESCUCHANDO RESPUESTAS EN CHAT PARA ${activeMod ? activeMod.cableNum : 'REACTOR'}...`;
      }
    } else {
      if (this.timerStatus) {
        this.timerStatus.textContent = "PRESIONA INICIAR PARA COMENZAR LA CUENTA REGRESIVA";
      }
    }
  }

  /* ==========================================================================
     REQUIREMENT 3: RESTRICTIVE SEQUENTIAL VALIDATION & 3.0s DRAMATIC REVEAL
     ========================================================================== */
  processInputWord(messageText, username = "ImArixu", isManualUser = false) {
    if (!messageText || this.isDecrypting) return;

    // RESTRICTIVE CHECK: Only validate against current active cable!
    const currentActiveModule = this.modulos[this.activeModuleIndex];
    if (!currentActiveModule || currentActiveModule.estado !== 'activo') return;

    // Helper to normalize string (lowercase & remove diacritics/accents)
    const normalize = (str) =>
      String(str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    // 1. Normalize full message text
    const normalizedText = normalize(messageText);

    // 2. Extract individual word/number tokens (including underscores e.g. "el_xenomorfo_")
    const words = normalizedText.match(/[\p{L}\p{N}_]+/gu) || [];

    // 3. Get all valid answer strings for the active module (handles respuestas_validas, respuesta_principal, respuestas)
    const validAnswers = this.getValidAnswers(currentActiveModule);

    let isMatch = false;
    let foundAnswerKeyword = "";

    // 4. Compare incoming message against candidate valid answers
    for (const resp of validAnswers) {
      const respClean = normalize(resp);
      if (!respClean) continue;

      // Check token match, exact string match, or substring inclusion for multi-word or compound messages
      const wordMatch = words.some(w => w === respClean);
      const includesMatch = normalizedText.includes(respClean);

      if (wordMatch || includesMatch) {
        isMatch = true;
        foundAnswerKeyword = resp.toUpperCase();
        break;
      }
    }

    if (isMatch) {
      // 1. Mark active module as completed & save defuser
      currentActiveModule.estado = 'completado';
      currentActiveModule.defuser = username;
      currentActiveModule.defuserKeyword = foundAnswerKeyword;

      // 2. Save hero into Array
      this.heroesArray.push({
        cableId: currentActiveModule.id,
        cableNum: currentActiveModule.cableNum,
        username: username,
        keyword: foundAnswerKeyword
      });

      // 3. Play sound & spark explosion
      this.playCableCutSound();
      this.createSparkExplosion(40);
      this.updateCompletedCounter();

      // 4. Update card UI to solved
      this.renderCablesGrid();

      // 5. Terminal log
      this.addTerminalLine(`⚡ ¡${username} ha cortado el ${currentActiveModule.cableNum}! Clave: ${foundAnswerKeyword}`, "sys");

      // 6. Check Win Condition or Trigger Sequential Reveal of next cable
      if (this.activeModuleIndex >= this.modulos.length - 1) {
        this.triggerDefusalSuccess();
      } else {
        this.revealNextCableSequentially();
      }
    }
  }

  /* REQUIREMENT 2 & 3: SEQUENTIAL DECRYPTION REVEAL SYSTEM (3.0s DRAMATIC ANIMATION) */
  revealNextCableSequentially() {
    this.isDecrypting = true;
    this.activeModuleIndex++;

    const nextModule = this.modulos[this.activeModuleIndex];
    if (!nextModule) return;

    nextModule.estado = 'desencriptando';
    this.renderCablesGrid();

    // Play cyber decryption sweep sound effect
    this.playDecryptionScanSound();
    this.addTerminalLine(`🔓 Iniciando desencriptación del ${nextModule.cableNum}... (3.0s)`, "sys");

    if (this.terminalStatusText) {
      this.terminalStatusText.textContent = `⏳ Desencriptando ${nextModule.cableNum}...`;
      this.terminalStatusText.style.color = "#FFD166";
    }

    // 3.0 Seconds Dramatic Transition
    setTimeout(() => {
      nextModule.estado = 'activo';
      this.isDecrypting = false;
      this.renderCablesGrid();
      this.playTickSound(1100, 0.15);

      this.addTerminalLine(`✅ ¡${nextModule.cableNum} DESENCRIPTADO! Acertijo activo para el chat.`, "sys");

      if (this.terminalStatusText) {
        this.terminalStatusText.textContent = `🟢 ESCUCHANDO RESPUESTAS PARA ${nextModule.cableNum}...`;
        this.terminalStatusText.style.color = "#00E676";
      }
    }, 3000);
  }

  cutNextPendingCable(username = "StreamerMod") {
    if (this.isDecrypting) return;
    const currentActive = this.modulos[this.activeModuleIndex];
    if (currentActive && currentActive.estado === 'activo') {
      const firstAnswer = this.getPrimaryAnswer(currentActive);
      this.processInputWord(firstAnswer, username, true);
    }
  }

  simulateWin() {
    this.modulos.forEach((m, idx) => {
      const dummyUser = `Héroe_${idx + 1}`;
      const key = this.getPrimaryAnswer(m).toUpperCase();
      m.estado = 'completado';
      m.defuser = dummyUser;
      m.defuserKeyword = key;
      if (!this.heroesArray.find(h => h.cableId === m.id)) {
        this.heroesArray.push({
          cableId: m.id,
          cableNum: m.cableNum,
          username: dummyUser,
          keyword: key
        });
      }
    });
    this.activeModuleIndex = this.modulos.length - 1;
    this.isDecrypting = false;
    this.renderCablesGrid();
    this.triggerDefusalSuccess();
  }

  /* ==========================================================================
     RANDOM RNG REWARD SYSTEM & HEROES SQUAD ROSTER
     ========================================================================== */
  triggerDefusalSuccess() {
    this.pauseTimer();
    this.playVictoryFanfare();
    this.createVictoryConfetti();

    const randomIndex = Math.floor(Math.random() * this.rewardOptions.length);
    const selectedReward = this.rewardOptions[randomIndex];

    if (this.rngRewardTag) {
      this.rngRewardTag.innerHTML = `<i class="fas fa-dice"></i> ${selectedReward.tag}`;
    }
    if (this.rngRewardText) {
      this.rngRewardText.textContent = selectedReward.text;
    }

    if (this.heroesSquadList) {
      this.heroesSquadList.innerHTML = '';

      if (this.heroesArray.length > 0) {
        this.heroesArray.forEach(hero => {
          const chip = document.createElement('div');
          chip.className = 'hero-chip';
          chip.innerHTML = `<span class="hero-cable">#${hero.cableId}</span> <strong class="hero-name">${this.escapeHtml(hero.username)}</strong> (${hero.keyword})`;
          this.heroesSquadList.appendChild(chip);
        });
      } else {
        this.heroesSquadList.innerHTML = `<span style="color: var(--text-muted); font-size: 0.85rem;">Escuadrón completo de la comunidad</span>`;
      }
    }

    if (this.successOverlay) {
      this.successOverlay.classList.add('active');
    }
    if (this.statusPillText) {
      this.statusPillText.textContent = "✔ ¡BOMBA DESACTIVADA! (10/10 CABLES)";
    }

    this.addTerminalLine("🎉 ¡BOMBA DESACTIVADA! Los 10 cables cortados por el escuadrón.", "sys");
  }

  triggerBoomFailure() {
    this.pauseTimer();
    document.body.classList.remove('alarm-active');
    this.playExplosionSound();
    this.createSparkExplosion(90);

    const randomPenalty = this.penalties[Math.floor(Math.random() * this.penalties.length)];
    if (this.penaltyText) {
      this.penaltyText.textContent = randomPenalty;
    }

    if (this.boomOverlay) {
      this.boomOverlay.classList.add('active');
    }
    if (this.statusPill) {
      this.statusPill.classList.add('danger');
    }
    if (this.statusPillText) {
      this.statusPillText.textContent = "💀 BOOOM! REACTOR COLAPSADO";
    }

    this.addTerminalLine("💥 ¡BOOOM! El tiempo llegó a 00:00. Penalización activada.", "sys");
  }

  /* ==========================================================================
     CANVAS ANIMATION & PARTICLES
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
      const speed = Math.random() * 7 + 2;
      this.particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3.5 + 1.5,
        color: Math.random() > 0.4 ? '#00E676' : (Math.random() > 0.5 ? '#9146FF' : '#FFD166'),
        alpha: 1,
        decay: Math.random() * 0.03 + 0.015
      });
    }
  }

  createVictoryConfetti() {
    if (!this.canvas) return;
    for (let i = 0; i < 90; i++) {
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
     EVENT LISTENERS & BINDINGS
     ========================================================================== */
  bindEvents() {
    if (this.defuseForm) {
      this.defuseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.ensureAudioStarted();
        const val = this.defuseInput.value;
        if (!val) return;

        this.processInputWord(val, "TÚ (Manual)", true);
        this.defuseInput.value = '';
      });
    }

    const audioToggleBtn = document.getElementById('btnAudioToggle');
    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        this.isMuted = !this.isMuted;
        audioToggleBtn.innerHTML = this.isMuted 
          ? `<i class="fas fa-volume-mute"></i> Audio: OFF`
          : `<i class="fas fa-volume-up"></i> Audio: ON`;
      });
    }

    document.getElementById('btnStartTimer')?.addEventListener('click', () => this.startTimer());
    document.getElementById('btnPauseTimer')?.addEventListener('click', () => this.pauseTimer());
    document.getElementById('btnResetTimer')?.addEventListener('click', () => this.resetGame(420));
    document.getElementById('btnCutNext')?.addEventListener('click', () => {
      this.ensureAudioStarted();
      this.cutNextPendingCable("StreamerMod");
    });
    document.getElementById('btnSimulateWin')?.addEventListener('click', () => {
      this.ensureAudioStarted();
      this.simulateWin();
    });
    document.getElementById('btnSimulateBoom')?.addEventListener('click', () => {
      this.ensureAudioStarted();
      this.triggerBoomFailure();
    });

    document.getElementById('btnRerollPenalty')?.addEventListener('click', () => {
      const randomPenalty = this.penalties[Math.floor(Math.random() * this.penalties.length)];
      if (this.penaltyText) this.penaltyText.textContent = randomPenalty;
    });

    document.getElementById('btnResetFromBoom')?.addEventListener('click', () => this.resetGame(420));
    document.getElementById('btnResetFromSuccess')?.addEventListener('click', () => this.resetGame(420));

    // HERO EXTRACTION BUTTON LISTENERS
    document.getElementById('btnCopyHeroesPanel')?.addEventListener('click', () => this.copyHeroesList());
    document.getElementById('btnCopyHeroesOverlay')?.addEventListener('click', () => this.copyHeroesList());

    // HERO DOWNLOAD TXT LISTENERS
    document.getElementById('btnDownloadHeroesPanel')?.addEventListener('click', () => this.downloadHeroesTXT());
    document.getElementById('btnDownloadHeroesOverlay')?.addEventListener('click', () => this.downloadHeroesTXT());
  }

  /* ==========================================================================
     HEROES EXTRACTION & TOAST NOTIFICATION LOGIC
     ========================================================================== */
  downloadHeroesTXT() {
    const names = [];

    // 1. Gather unique defuser usernames from heroesArray
    if (this.heroesArray && this.heroesArray.length > 0) {
      this.heroesArray.forEach(h => {
        if (h.username && !names.includes(h.username)) {
          names.push(h.username);
        }
      });
    }

    // 2. Fallback / check modulos array
    this.modulos.forEach(mod => {
      if (mod.defuser && !names.includes(mod.defuser)) {
        names.push(mod.defuser);
      }
    });

    if (names.length === 0) {
      this.showToast("⚠️ No hay nombres de héroes registrados aún.");
      return;
    }

    // Formatted list separated by newline (\n)
    const formattedText = names.join("\n");

    // Generate plain text Blob
    const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);

    // Dynamically create <a> anchor element to trigger download
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = "heroes_escuadron.txt";
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);

    // Toast Notification
    this.showToast("✅ ¡Archivo descargado con éxito!");
  }
  copyHeroesList() {
    const names = [];

    // 1. Gather unique defuser usernames from heroesArray
    if (this.heroesArray && this.heroesArray.length > 0) {
      this.heroesArray.forEach(h => {
        if (h.username && !names.includes(h.username)) {
          names.push(h.username);
        }
      });
    }

    // 2. Fallback / check modulos array
    this.modulos.forEach(mod => {
      if (mod.defuser && !names.includes(mod.defuser)) {
        names.push(mod.defuser);
      }
    });

    if (names.length === 0) {
      this.showToast("⚠️ No hay nombres de héroes registrados aún.");
      return;
    }

    // Formatted as comma-separated list
    const formattedList = names.join(", ");

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formattedList).then(() => {
        this.showToast("¡Nombres copiados con éxito!");
      }).catch(err => {
        console.warn("Clipboard API writeText failed, using fallback:", err);
        this.fallbackCopyTextToClipboard(formattedList);
      });
    } else {
      this.fallbackCopyTextToClipboard(formattedList);
    }
  }

  fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.showToast("¡Nombres copiados con éxito!");
      } else {
        this.showToast("❌ Error al copiar al portapapeles.");
      }
    } catch (err) {
      console.error('Fallback copy error:', err);
      this.showToast("❌ Error al copiar al portapapeles.");
    }
    document.body.removeChild(textArea);
  }

  showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${this.escapeHtml(message)}`;
    toast.classList.add('show');

    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

// Instantiate Engine on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.bombGame = new BombGameEngine();
});
