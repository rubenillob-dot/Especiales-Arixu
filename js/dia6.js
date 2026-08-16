document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. BASE DE DATOS: 20 RONDAS DE SONIDOS (FORTNITE CLÁSICO)
  // ========================================================================
  const SOUNDS_DATA = [
    {
      id: 1,
      titulo: "¿Qué sonido icónico de Fortnite estás escuchando?",
      categoria: "OBJETO / COFRE",
      audioSrc: "assets/sonidos dia6/apertura_cofre.mp3",
      fallbackSrc: "sonidos dia6/apertura_cofre.mp3",
      opciones: {
        A: "Apertura de Cofre Mítico / Legendario",
        B: "Suministro Aéreo Aterrizando",
        C: "Activación de Máquina Expendedora"
      },
      correcta: "A"
    },
    {
      id: 2,
      titulo: "¿A qué baile mítico de la taquilla pertenece esta melodía?",
      categoria: "GESTO / BAILE",
      audioSrc: "assets/sonidos dia6/baile_default.mp3",
      fallbackSrc: "sonidos dia6/baile_default.mp3",
      opciones: {
        A: "Baile Floss (Hilo Dental)",
        B: "Baile Default (Baila Paso a Paso)",
        C: "Baile Electro Shuffle"
      },
      correcta: "B"
    },
    {
      id: 3,
      titulo: "¿Qué mítica escopeta de combate está disparando?",
      categoria: "ARMA / ESCOPETA",
      audioSrc: "assets/sonidos dia6/Escopeta PUMP (SPAS).MP3",
      fallbackSrc: "sonidos dia6/Escopeta PUMP (SPAS).MP3",
      opciones: {
        A: "Escopeta de Corredera / SPAS",
        B: "Escopeta de Carga",
        C: "Escopeta de Doble Cañón"
      },
      correcta: "A"
    },
    {
      id: 4,
      titulo: "¿Qué escopeta de cadencia rápida suena en este disparo?",
      categoria: "ARMA / ESCOPETA",
      audioSrc: "assets/sonidos dia6/ESCOPETA TACTICA.MP3",
      fallbackSrc: "sonidos dia6/ESCOPETA TACTICA.MP3",
      opciones: {
        A: "Escopeta Pesada",
        B: "Escopeta de Tambor",
        C: "Escopeta Táctica"
      },
      correcta: "C"
    },
    {
      id: 5,
      titulo: "¿Qué consumible de supervivencia se está bebiendo?",
      categoria: "CONSUMIBLE / ESCUDO",
      audioSrc: "assets/sonidos dia6/escudo.mp3",
      fallbackSrc: "sonidos dia6/escudo.mp3",
      opciones: {
        A: "Poción de Escudo Grande (50 de Escudo)",
        B: "Salpicón Saludable (Chug Splash)",
        C: "Bidón de Plasma"
      },
      correcta: "A"
    },
    {
      id: 6,
      titulo: "¿Qué fusil especial produce este disparo de impacto explosivo?",
      categoria: "ARMA / FUSIL ESPECIAL",
      audioSrc: "assets/sonidos dia6/FUSIL DE REPETICION EXPLOSIVO.MP3",
      fallbackSrc: "sonidos dia6/FUSIL DE REPETICION EXPLOSIVO.MP3",
      opciones: {
        A: "Lanzagranadas Cuádruple",
        B: "Fusil de Repetición Explosivo",
        C: "Arco Explosivo de Dinamita"
      },
      correcta: "B"
    },
    {
      id: 7,
      titulo: "¿Qué fusil futurista de precisión estás oyendo?",
      categoria: "ARMA / FUSIL DE ASALTO",
      audioSrc: "assets/sonidos dia6/FUSIL HOLOTORNADO.MP3",
      fallbackSrc: "sonidos dia6/FUSIL HOLOTORNADO.MP3",
      opciones: {
        A: "Fusil Holotornado",
        B: "Fusil de Pulsos de la OI",
        C: "Fusil de Energía Stark"
      },
      correcta: "A"
    },
    {
      id: 8,
      titulo: "¿Qué objeto de movilidad legendario se acaba de disparar?",
      categoria: "MOVILIDAD / UTILIDAD",
      audioSrc: "assets/sonidos dia6/GANCHO.MP3",
      fallbackSrc: "sonidos dia6/GANCHO.MP3",
      opciones: {
        A: "Guantelete de Spider-Man",
        B: "Gancho Desplegable (Grappler)",
        C: "Espada Cinética"
      },
      correcta: "B"
    },
    {
      id: 9,
      titulo: "¿Qué variante exótica de fusil dispara con este sonido?",
      categoria: "ARMA / EXÓTICA",
      audioSrc: "assets/sonidos dia6/HOLOTORNADO EXOTICO.MP3",
      fallbackSrc: "sonidos dia6/HOLOTORNADO EXOTICO.MP3",
      opciones: {
        A: "Fusil Holotornado Exótico",
        B: "Fusil de Tirador Rastreador",
        C: "Fusil de Ráfaga de Asalto"
      },
      correcta: "A"
    },
    {
      id: 10,
      titulo: "¿Qué objeto de defensa táctica se despliega?",
      categoria: "DEFENSA / UTILIDAD",
      audioSrc: "assets/sonidos dia6/MINIESCUDO BURBUJA.MP3",
      fallbackSrc: "sonidos dia6/MINIESCUDO BURBUJA.MP3",
      opciones: {
        A: "Fuerte Portátil",
        B: "Miniescudo Burbuja (Burbuja Protectora)",
        C: "Grieta Portátil"
      },
      correcta: "B"
    },
    {
      id: 11,
      titulo: "¿Qué objeto de amortiguación y rebote se activa?",
      categoria: "MOVILIDAD / OBJETO",
      audioSrc: "assets/sonidos dia6/MINIPLATAFORMA DE IMPACTO.MP3",
      fallbackSrc: "sonidos dia6/MINIPLATAFORMA DE IMPACTO.MP3",
      opciones: {
        A: "Miniplataforma de Impacto (Crash Pad)",
        B: "Trampolín Elástico Clásico",
        C: "Granada de Choque"
      },
      correcta: "A"
    },
    {
      id: 12,
      titulo: "¿Qué suceso crucial de partida representa este sonido?",
      categoria: "SUCESO / COMBATE",
      audioSrc: "assets/sonidos dia6/muerte.mp3",
      fallbackSrc: "sonidos dia6/muerte.mp3",
      opciones: {
        A: "Reaparición en Autobús de Reinicio",
        B: "Jugador Derribado / Eliminación por Dron",
        C: "Activación de Baliza de Reanimación"
      },
      correcta: "B"
    },
    {
      id: 13,
      titulo: "¿Qué pistola de ráfaga y fuego rápido se escucha?",
      categoria: "ARMA / PISTOLA",
      audioSrc: "assets/sonidos dia6/PISTOLA ASALTADORA.MP3",
      fallbackSrc: "sonidos dia6/PISTOLA ASALTADORA.MP3",
      opciones: {
        A: "Cañón de Mano (Deagle)",
        B: "Pistola Asaltadora",
        C: "Pistola con Silenciador"
      },
      correcta: "B"
    },
    {
      id: 14,
      titulo: "¿Qué arma de disparo pesado y contundente es?",
      categoria: "ARMA / REVÓLVER",
      audioSrc: "assets/sonidos dia6/REVOLVER ASOLADOR.MP3",
      fallbackSrc: "sonidos dia6/REVOLVER ASOLADOR.MP3",
      opciones: {
        A: "Revólver Asolador",
        B: "Pistola de Mecha",
        C: "Revólver de Seis Balas"
      },
      correcta: "A"
    },
    {
      id: 15,
      titulo: "¿Qué fusil de asalto sigiloso está disparando?",
      categoria: "ARMA / FUSIL SIGILOSO",
      audioSrc: "assets/sonidos dia6/SCAR SILENCIADA.MP3",
      fallbackSrc: "sonidos dia6/SCAR SILENCIADA.MP3",
      opciones: {
        A: "Fusil de Asalto Silenciado (SCAR Silenciada)",
        B: "Subfusil con Silenciador",
        C: "Pistola de Rastreo Silenciosa"
      },
      correcta: "A"
    },
    {
      id: 16,
      titulo: "¿Qué fusil legendario de oro dispara con este sonido mítico?",
      categoria: "ARMA / FUSIL LEGENDARIO",
      audioSrc: "assets/sonidos dia6/SCAR.mp3",
      fallbackSrc: "sonidos dia6/SCAR.mp3",
      opciones: {
        A: "Fusil de Ráfaga FAMAS",
        B: "Fusil de Asalto M16 Clásico",
        C: "Fusil de Asalto SCAR Legendaria"
      },
      correcta: "C"
    },
    {
      id: 17,
      titulo: "¿Qué subfusil de cadencia adaptable está en combate?",
      categoria: "ARMA / SUBFUSIL",
      audioSrc: "assets/sonidos dia6/SUBFUSIL FLEXIBLE.MP3",
      fallbackSrc: "sonidos dia6/SUBFUSIL FLEXIBLE.MP3",
      opciones: {
        A: "Subfusil Flexible",
        B: "Subfusil de Ráfaga",
        C: "Subfusil Compacto P90"
      },
      correcta: "A"
    },
    {
      id: 18,
      titulo: "¿Qué arma mítica de la Agencia suena con este repiqueteo?",
      categoria: "ARMA / MÍTICA DE MIDAS",
      audioSrc: "assets/sonidos dia6/SUBFUSIL TAMBOR DE MIDAS.MP3",
      fallbackSrc: "sonidos dia6/SUBFUSIL TAMBOR DE MIDAS.MP3",
      opciones: {
        A: "Minigun Legendaria de Brutus",
        B: "Subfusil Tambor Mítico de Midas",
        C: "Fusil de Asalto Pesado de Meowscles"
      },
      correcta: "B"
    },
    {
      id: 19,
      titulo: "¿Qué peligro ambiental de la isla está aproximándose?",
      categoria: "EVENTO / TORMENTA",
      audioSrc: "assets/sonidos dia6/tormenta.mp3",
      fallbackSrc: "sonidos dia6/tormenta.mp3",
      opciones: {
        A: "Cierre / Daño de la Tormenta",
        B: "Zona de Gravedad Cero de Kevin",
        C: "Invasión de Platillo Volador"
      },
      correcta: "A"
    },
    {
      id: 20,
      titulo: "¿Qué momento culminante de partida desata este sonido triunfal?",
      categoria: "FINAL / VICTORIA",
      audioSrc: "assets/sonidos dia6/victoria_magistral.mp3",
      fallbackSrc: "sonidos dia6/victoria_magistral.mp3",
      opciones: {
        A: "Primera Sangre de la Partida",
        B: "Victoria Magistral (#1 Victory Royale)",
        C: "Misión Semanal Completada"
      },
      correcta: "B"
    }
  ];

  // ========================================================================
  // 2. ESTADO DEL JUEGO
  // ========================================================================
  const ROUND_DURATION_SEC = 20;
  let currentRoundIndex = 0;
  let isRoundActive = false;
  let isRevealed = false;
  let secondsRemaining = ROUND_DURATION_SEC;
  let timerInterval = null;
  let isAudioEnabled = true;
  let totalChatMessages = 0;

  // Votes in the CURRENT round: { A: Set(usernames), B: Set(usernames), C: Set(usernames) }
  let currentRoundVotes = { A: new Set(), B: new Set(), C: new Set() };
  let usersVotedInRound = new Map(); // username -> option

  // Cumulative Leaderboard: { [username]: { displayName, score, correctCount } }
  let userScores = {};

  // Audio Synthesizer
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  }

  function playSound(type) {
    if (!isAudioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;

      if (type === 'tick') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'warning') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(980, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      } else if (type === 'start') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.23);
      } else if (type === 'reveal') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.1, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.36);
        });
      }
    } catch (e) {}
  }

  // ========================================================================
  // 3. DOM ELEMENTS
  // ========================================================================
  const headerSoundNum = document.getElementById('headerSoundNum');
  const btnAudioToggle = document.getElementById('btnAudioToggle');
  const btnFullscreenToggle = document.getElementById('btnFullscreenToggle');

  // Meta & Stage
  const soundNumberBadge = document.getElementById('soundNumberBadge');
  const soundCategoryBadge = document.getElementById('soundCategoryBadge');
  const soundStatusBadge = document.getElementById('soundStatusBadge');
  const soundTitleText = document.getElementById('soundTitleText');
  const audioVisualizerBox = document.getElementById('audioVisualizerBox');
  const audioPlayTrigger = document.getElementById('audioPlayTrigger');
  const audioStateIcon = document.getElementById('audioStateIcon');
  const audioStateText = document.getElementById('audioStateText');
  const secretAudioPlayer = document.getElementById('secretAudioPlayer');
  const flashOverlay = document.getElementById('flashOverlay');
  const revealResultBanner = document.getElementById('revealResultBanner');
  const revealTitleText = document.getElementById('revealTitleText');
  const revealCorrectCount = document.getElementById('revealCorrectCount');
  const revealAnswerName = document.getElementById('revealAnswerName');

  // Timer
  const timerCircleProgress = document.getElementById('timerCircleProgress');
  const timerSecondsDisplay = document.getElementById('timerSecondsDisplay');
  const timerStatusLabel = document.getElementById('timerStatusLabel');

  // Options
  const optionCardA = document.getElementById('optionCardA');
  const optionCardB = document.getElementById('optionCardB');
  const optionCardC = document.getElementById('optionCardC');
  const optTextA = document.getElementById('optTextA');
  const optTextB = document.getElementById('optTextB');
  const optTextC = document.getElementById('optTextC');
  const optVotesA = document.getElementById('optVotesA');
  const optVotesB = document.getElementById('optVotesB');
  const optVotesC = document.getElementById('optVotesC');

  // Dock Buttons
  const btnStartRound = document.getElementById('btnStartRound');
  const btnRevealSound = document.getElementById('btnRevealSound');
  const btnPrevRound = document.getElementById('btnPrevRound');
  const btnNextRound = document.getElementById('btnNextRound');
  const btnResetRound = document.getElementById('btnResetRound');
  const btnShowPodium = document.getElementById('btnShowPodium');

  // Radar & Leaderboard
  const tabChatBtn = document.getElementById('tabChatBtn');
  const tabLeaderboardBtn = document.getElementById('tabLeaderboardBtn');
  const tabChatContent = document.getElementById('tabChatContent');
  const tabLeaderboardContent = document.getElementById('tabLeaderboardContent');
  const radarChatMessages = document.getElementById('radarChatMessages');
  const radarLeaderboardFeed = document.getElementById('radarLeaderboardFeed');
  const chatCountBadge = document.getElementById('chatCountBadge');
  const lbTotalUsers = document.getElementById('lbTotalUsers');
  const radarWsTag = document.getElementById('radarWsTag');
  const radarActiveRoundLabel = document.getElementById('radarActiveRoundLabel');
  const radarRoundHitsBadge = document.getElementById('radarRoundHitsBadge');

  // Podium Modal
  const podiumModalOverlay = document.getElementById('podiumModalOverlay');
  const btnClosePodiumModal = document.getElementById('btnClosePodiumModal');
  const btnModalDismiss = document.getElementById('btnModalDismiss');
  const btnDownloadTxtReport = document.getElementById('btnDownloadTxtReport');
  const btnRestartGame = document.getElementById('btnRestartGame');
  const podiumFirstUser = document.getElementById('podiumFirstUser');
  const podiumFirstPoints = document.getElementById('podiumFirstPoints');
  const podiumFirstAccuracy = document.getElementById('podiumFirstAccuracy');
  const podiumSecondUser = document.getElementById('podiumSecondUser');
  const podiumSecondPoints = document.getElementById('podiumSecondPoints');
  const podiumSecondAccuracy = document.getElementById('podiumSecondAccuracy');
  const podiumThirdUser = document.getElementById('podiumThirdUser');
  const podiumThirdPoints = document.getElementById('podiumThirdPoints');
  const podiumThirdAccuracy = document.getElementById('podiumThirdAccuracy');

  // Audio Fallback Handler
  if (secretAudioPlayer) {
    secretAudioPlayer.onerror = function() {
      const src = this.getAttribute('src');
      if (src && src.startsWith('assets/sonidos dia6/')) {
        this.src = src.replace('assets/sonidos dia6/', 'sonidos dia6/');
      } else if (src && src.startsWith('sonidos dia6/')) {
        this.src = 'assets/' + src;
      }
    };

    secretAudioPlayer.onended = function() {
      if (audioVisualizerBox) audioVisualizerBox.classList.remove('playing');
      if (audioStateText && isRoundActive) audioStateText.textContent = 'REPRODUCCIÓN COMPLETADA';
    };
  }

  // ========================================================================
  // 4. RENDER ROUND
  // ========================================================================
  function renderRound(index) {
    if (index < 0 || index >= SOUNDS_DATA.length) return;

    currentRoundIndex = index;
    isRoundActive = false;
    isRevealed = false;
    secondsRemaining = ROUND_DURATION_SEC;
    clearInterval(timerInterval);
    timerInterval = null;

    currentRoundVotes = { A: new Set(), B: new Set(), C: new Set() };
    usersVotedInRound.clear();

    const roundData = SOUNDS_DATA[index];

    // Header & Meta
    if (headerSoundNum) headerSoundNum.textContent = index + 1;
    if (soundNumberBadge) soundNumberBadge.textContent = `SONIDO #${index + 1} / ${SOUNDS_DATA.length}`;
    if (soundCategoryBadge) soundCategoryBadge.innerHTML = `<i class="fas fa-compact-disc"></i> CATEGORÍA: ${roundData.categoria}`;
    if (soundStatusBadge) {
      soundStatusBadge.innerHTML = `<span class="pulse-dot"></span> EN ESPERA`;
      soundStatusBadge.style.color = '#00E5FF';
      soundStatusBadge.style.borderColor = '#00E5FF';
    }
    if (soundTitleText) soundTitleText.textContent = `🎧 ${roundData.titulo}`;

    // Audio Visualizer Reset
    if (audioVisualizerBox) audioVisualizerBox.classList.remove('playing');
    if (audioStateText) audioStateText.textContent = 'LISTO PARA REPRODUCIR';
    if (secretAudioPlayer) {
      secretAudioPlayer.pause();
      secretAudioPlayer.currentTime = 0;
      secretAudioPlayer.src = roundData.audioSrc;
      secretAudioPlayer.load();
    }

    // Reveal Banner Reset
    if (revealResultBanner) revealResultBanner.classList.remove('active');

    // Options Reset
    [optionCardA, optionCardB, optionCardC].forEach(card => {
      if (card) {
        card.classList.remove('correct', 'incorrect');
      }
    });

    if (optTextA) optTextA.textContent = roundData.opciones.A;
    if (optTextB) optTextB.textContent = roundData.opciones.B;
    if (optTextC) optTextC.textContent = roundData.opciones.C;

    updateVoteCountsDisplay();

    // Timer visuals reset
    updateTimerVisuals(ROUND_DURATION_SEC);
    if (timerStatusLabel) timerStatusLabel.textContent = 'TIEMPO';

    // Controls
    if (btnStartRound) {
      btnStartRound.disabled = false;
      btnStartRound.innerHTML = `<i class="fas fa-play"></i> ▶️ Reproducir Sonido (${ROUND_DURATION_SEC}s)`;
    }
    if (btnRevealSound) {
      btnRevealSound.disabled = true;
    }

    // Radar stats
    if (radarActiveRoundLabel) {
      radarActiveRoundLabel.innerHTML = `Sonido: <strong>${index + 1} / ${SOUNDS_DATA.length}</strong>`;
    }
    if (radarRoundHitsBadge) {
      radarRoundHitsBadge.innerHTML = `🎯 Aciertos: <strong>0</strong>`;
    }

    appendRadarTerminalLine('SISTEMA', `📌 Sonido #${index + 1} cargado. Pulsa 'Reproducir Sonido' para abrir votaciones en el chat.`, 'sys');
    updateLiveLeaderboard();
  }

  function updateVoteCountsDisplay() {
    if (optVotesA) optVotesA.textContent = `${currentRoundVotes.A.size} votos`;
    if (optVotesB) optVotesB.textContent = `${currentRoundVotes.B.size} votos`;
    if (optVotesC) optVotesC.textContent = `${currentRoundVotes.C.size} votos`;
  }

  // ========================================================================
  // 5. TIMER ENGINE
  // ========================================================================
  function updateTimerVisuals(seconds) {
    const totalCircumference = 226;
    const fractionRemaining = Math.max(0, seconds / ROUND_DURATION_SEC);
    const strokeOffset = totalCircumference * (1 - fractionRemaining);

    if (timerCircleProgress) {
      timerCircleProgress.style.strokeDashoffset = strokeOffset;
      if (seconds <= 5 && isRoundActive) {
        timerCircleProgress.classList.add('danger');
      } else {
        timerCircleProgress.classList.remove('danger');
      }
    }

    if (timerSecondsDisplay) {
      timerSecondsDisplay.innerHTML = `${Math.ceil(seconds)}<span class="sec-unit">s</span>`;
      if (seconds <= 5 && isRoundActive) {
        timerSecondsDisplay.style.color = '#FF2A6D';
      } else {
        timerSecondsDisplay.style.color = '#FFFFFF';
      }
    }
  }

  function startRound() {
    if (isRoundActive) return;

    initAudio();
    isRoundActive = true;
    isRevealed = false;
    secondsRemaining = ROUND_DURATION_SEC;
    currentRoundVotes = { A: new Set(), B: new Set(), C: new Set() };
    usersVotedInRound.clear();
    updateVoteCountsDisplay();

    // Play secret audio clip
    if (secretAudioPlayer) {
      secretAudioPlayer.currentTime = 0;
      secretAudioPlayer.play().then(() => {
        if (audioVisualizerBox) audioVisualizerBox.classList.add('playing');
        if (audioStateText) audioStateText.textContent = 'REPRODUCIENDO SONIDO...';
      }).catch(() => {
        if (audioVisualizerBox) audioVisualizerBox.classList.add('playing');
        if (audioStateText) audioStateText.textContent = 'ESCUCHA EN DIRECTO';
      });
    }

    if (btnStartRound) {
      btnStartRound.disabled = true;
      btnStartRound.innerHTML = `<i class="fas fa-spinner fa-spin"></i> 🟢 Votación en Curso`;
    }
    if (btnRevealSound) {
      btnRevealSound.disabled = false;
    }

    if (soundStatusBadge) {
      soundStatusBadge.innerHTML = `<span class="pulse-dot" style="background:#00FA9A; box-shadow:0 0 8px #00FA9A;"></span> 🟢 VOTACIÓN EN DIRECTO`;
      soundStatusBadge.style.color = '#00FA9A';
      soundStatusBadge.style.borderColor = '#00FA9A';
    }

    if (timerStatusLabel) timerStatusLabel.textContent = 'VOTA: A, B o C';

    appendRadarTerminalLine('SISTEMA', `🚀 ¡AUDIO REPRODUCIÉNDOSE! Tienes ${ROUND_DURATION_SEC} segundos para votar A, B o C en el chat.`, 'sys');
    playSound('start');

    const startTime = performance.now();
    const durationMs = ROUND_DURATION_SEC * 1000;

    clearInterval(timerInterval);
    let lastPlayedSecond = ROUND_DURATION_SEC;

    timerInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const remainingMs = Math.max(0, durationMs - elapsed);
      secondsRemaining = remainingMs / 1000;

      updateTimerVisuals(secondsRemaining);

      const currentIntSecond = Math.ceil(secondsRemaining);
      if (currentIntSecond !== lastPlayedSecond) {
        lastPlayedSecond = currentIntSecond;
        if (currentIntSecond <= 5 && currentIntSecond > 0) {
          playSound('warning');
        } else if (currentIntSecond % 5 === 0 && currentIntSecond > 0) {
          playSound('tick');
        }
      }

      // Time Expired
      if (remainingMs <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        isRoundActive = false;
        secondsRemaining = 0;
        updateTimerVisuals(0);

        if (soundStatusBadge) {
          soundStatusBadge.innerHTML = `<span class="pulse-dot" style="background:#FFD600; box-shadow:0 0 8px #FFD600;"></span> ⏳ ESPERANDO REVELACIÓN`;
          soundStatusBadge.style.color = '#FFD600';
          soundStatusBadge.style.borderColor = '#FFD600';
        }

        if (timerStatusLabel) timerStatusLabel.textContent = 'TIEMPO AGOTADO';
        if (btnRevealSound) btnRevealSound.disabled = false;

        appendRadarTerminalLine('SISTEMA', '⏱️ ¡TIEMPO AGOTADO! Votaciones cerradas. Pulsa "👁️ Revelar Respuesta" para ver la opción correcta.', 'sys');
        playSound('warning');
      }
    }, 100);
  }

  // ========================================================================
  // 6. REVEAL ANSWER & SCORE CALCULATION
  // ========================================================================
  function revealAnswer() {
    if (isRevealed) return;

    clearInterval(timerInterval);
    timerInterval = null;
    isRoundActive = false;
    isRevealed = true;
    secondsRemaining = 0;
    updateTimerVisuals(0);

    const roundData = SOUNDS_DATA[currentRoundIndex];
    const correctLetter = roundData.correcta;
    const correctOptionName = roundData.opciones[correctLetter];
    const correctVoters = currentRoundVotes[correctLetter] || new Set();

    // Flash Overlay
    if (flashOverlay) {
      flashOverlay.classList.add('flash-active');
      setTimeout(() => flashOverlay.classList.remove('flash-active'), 120);
    }

    // Highlight Correct Card & Dim Incorrects
    const cards = { A: optionCardA, B: optionCardB, C: optionCardC };
    ['A', 'B', 'C'].forEach(letter => {
      const card = cards[letter];
      if (card) {
        if (letter === correctLetter) {
          card.classList.add('correct');
          card.classList.remove('incorrect');
        } else {
          card.classList.add('incorrect');
          card.classList.remove('correct');
        }
      }
    });

    // Score 1 point for each correct voter
    correctVoters.forEach(username => {
      if (!userScores[username]) {
        userScores[username] = { displayName: username, score: 0, correctCount: 0 };
      }
      userScores[username].score += 1;
      userScores[username].correctCount += 1;
    });

    // Show Reveal Banner
    if (revealTitleText) {
      revealTitleText.textContent = `🎉 ¡RESPUESTA CORRECTA: OPCIÓN ${correctLetter}!`;
    }
    if (revealCorrectCount) {
      revealCorrectCount.innerHTML = `<i class="fas fa-users"></i> Acertantes: <strong>${correctVoters.size}</strong>`;
    }
    if (revealAnswerName) {
      revealAnswerName.innerHTML = `<i class="fas fa-check-circle"></i> ${escapeHtml(correctOptionName)}`;
    }
    if (revealResultBanner) {
      revealResultBanner.classList.add('active');
    }

    if (soundStatusBadge) {
      soundStatusBadge.innerHTML = `<span class="pulse-dot" style="background:#00FA9A;"></span> 🎯 REVELADO`;
      soundStatusBadge.style.color = '#00FA9A';
      soundStatusBadge.style.borderColor = '#00FA9A';
    }

    if (btnStartRound) {
      btnStartRound.disabled = true;
      btnStartRound.innerHTML = `<i class="fas fa-check"></i> Ronda Finalizada`;
    }
    if (btnRevealSound) {
      btnRevealSound.disabled = true;
    }

    if (radarRoundHitsBadge) {
      radarRoundHitsBadge.innerHTML = `🎯 Aciertos: <strong>${correctVoters.size}</strong>`;
    }

    appendRadarTerminalLine('SISTEMA', `⭐ ¡SONIDO REVELADO! La respuesta era [${correctLetter}]: ${correctOptionName}. Acertantes: ${correctVoters.size}`, 'sys');
    playSound('reveal');
    updateLiveLeaderboard();

    // Auto open podium on round 20
    if (currentRoundIndex === SOUNDS_DATA.length - 1) {
      setTimeout(() => {
        openPodiumModal();
      }, 3500);
    }
  }

  // ========================================================================
  // 7. TWITCH CHAT RADAR & VOTE TRACKER
  // ========================================================================
  function processIncomingChatMessage(rawUser, rawMessage) {
    if (!rawUser || !rawMessage) return;
    const username = rawUser.trim();
    const userKey = username.toLowerCase();
    const message = rawMessage.trim();

    if (!isRoundActive || isRevealed) {
      appendRadarTerminalLine(username, message, 'chat');
      return;
    }

    // Check if user already voted in this round
    if (usersVotedInRound.has(userKey)) {
      appendRadarTerminalLine(username, message, 'chat');
      return;
    }

    // Check for Vote A, B or C
    const norm = message.toLowerCase().trim();
    let detectedVote = null;

    if (norm === 'a' || norm === '!a' || norm === '1' || norm.startsWith('opcion a') || norm.startsWith('opción a')) {
      detectedVote = 'A';
    } else if (norm === 'b' || norm === '!b' || norm === '2' || norm.startsWith('opcion b') || norm.startsWith('opción b')) {
      detectedVote = 'B';
    } else if (norm === 'c' || norm === '!c' || norm === '3' || norm.startsWith('opcion c') || norm.startsWith('opción c')) {
      detectedVote = 'C';
    } else {
      // Check partial match with option texts
      const roundData = SOUNDS_DATA[currentRoundIndex];
      const optA = roundData.opciones.A.toLowerCase();
      const optB = roundData.opciones.B.toLowerCase();
      const optC = roundData.opciones.C.toLowerCase();

      if (norm.length >= 4) {
        if (optA.includes(norm)) detectedVote = 'A';
        else if (optB.includes(norm)) detectedVote = 'B';
        else if (optC.includes(norm)) detectedVote = 'C';
      }
    }

    if (detectedVote) {
      usersVotedInRound.set(userKey, detectedVote);
      currentRoundVotes[detectedVote].add(username);
      updateVoteCountsDisplay();
      appendRadarTerminalLine(username, `Votó por la opción [${detectedVote}]`, 'vote', detectedVote);
    } else {
      appendRadarTerminalLine(username, message, 'chat');
    }
  }

  function appendRadarTerminalLine(user, text, type = 'chat', voteTag = null) {
    if (!radarChatMessages) return;

    totalChatMessages++;
    if (chatCountBadge) chatCountBadge.textContent = totalChatMessages;

    const row = document.createElement('div');
    row.className = `radar-log-msg ${type}-msg`;

    if (type === 'sys') {
      row.innerHTML = `<span class="log-badge-sys">[SISTEMA]</span> <span class="log-text">${escapeHtml(text)}</span>`;
    } else if (type === 'vote') {
      const tagClass = `vote-${voteTag.toLowerCase()}`;
      row.innerHTML = `<span class="log-user">${escapeHtml(user)}:</span> <span class="log-vote-tag ${tagClass}">Opción ${voteTag}</span>`;
    } else {
      row.innerHTML = `<span class="log-user">${escapeHtml(user)}:</span> <span>${escapeHtml(text)}</span>`;
    }

    radarChatMessages.appendChild(row);

    while (radarChatMessages.children.length > 70) {
      radarChatMessages.removeChild(radarChatMessages.firstChild);
    }
    radarChatMessages.scrollTop = radarChatMessages.scrollHeight;
  }

  // ========================================================================
  // 8. LIVE LEADERBOARD
  // ========================================================================
  function updateLiveLeaderboard() {
    if (!radarLeaderboardFeed) return;

    const sortedUsers = Object.values(userScores).sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.correctCount - a.correctCount;
    });

    if (lbTotalUsers) lbTotalUsers.textContent = sortedUsers.length;

    if (sortedUsers.length === 0) {
      radarLeaderboardFeed.innerHTML = `
        <div class="lb-empty-placeholder">
          <i class="fas fa-info-circle"></i> Vota en el chat durante los 20 segundos para aparecer en la clasificación en directo.
        </div>
      `;
      return;
    }

    radarLeaderboardFeed.innerHTML = '';
    sortedUsers.slice(0, 30).forEach((u, i) => {
      const rank = i + 1;
      const item = document.createElement('div');
      item.className = `lb-item rank-${rank <= 3 ? rank : 'other'}`;

      let medal = `#${rank}`;
      if (rank === 1) medal = '🥇';
      else if (rank === 2) medal = '🥈';
      else if (rank === 3) medal = '🥉';

      item.innerHTML = `
        <div class="lb-user-info">
          <span class="lb-rank-badge">${medal}</span>
          <span class="lb-username">${escapeHtml(u.displayName)}</span>
        </div>
        <span class="lb-score-pill">${u.score} pt${u.score === 1 ? 'o' : 's'}</span>
      `;
      radarLeaderboardFeed.appendChild(item);
    });
  }

  // ========================================================================
  // 9. TOP 3 PODIUM MODAL & TXT REPORT
  // ========================================================================
  function openPodiumModal() {
    if (!podiumModalOverlay) return;

    const sortedUsers = Object.values(userScores).sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.correctCount - a.correctCount;
    });

    const top1 = sortedUsers[0] || { displayName: 'Sin Ganador', score: 0, correctCount: 0 };
    const top2 = sortedUsers[1] || { displayName: 'Sin Ganador', score: 0, correctCount: 0 };
    const top3 = sortedUsers[2] || { displayName: 'Sin Ganador', score: 0, correctCount: 0 };

    if (podiumFirstUser) podiumFirstUser.textContent = top1.displayName;
    if (podiumFirstPoints) podiumFirstPoints.textContent = `${top1.score} PTS`;
    if (podiumFirstAccuracy) podiumFirstAccuracy.textContent = `${top1.correctCount}/${SOUNDS_DATA.length} aciertos`;

    if (podiumSecondUser) podiumSecondUser.textContent = top2.displayName;
    if (podiumSecondPoints) podiumSecondPoints.textContent = `${top2.score} PTS`;
    if (podiumSecondAccuracy) podiumSecondAccuracy.textContent = `${top2.correctCount}/${SOUNDS_DATA.length} aciertos`;

    if (podiumThirdUser) podiumThirdUser.textContent = top3.displayName;
    if (podiumThirdPoints) podiumThirdPoints.textContent = `${top3.score} PTS`;
    if (podiumThirdAccuracy) podiumThirdAccuracy.textContent = `${top3.correctCount}/${SOUNDS_DATA.length} aciertos`;

    podiumModalOverlay.classList.add('active');
    triggerConfetti();
    playSound('reveal');
  }

  function closePodiumModal() {
    if (podiumModalOverlay) podiumModalOverlay.classList.remove('active');
  }

  function downloadPodiumTxtReport() {
    const sortedUsers = Object.values(userScores).sort((a, b) => b.score - a.score);
    const dateStr = new Date().toLocaleString('es-ES');

    let report = `====================================================================\n`;
    report += `   ESPECIALES IMARIXU - DÍA 06: EL SONIDO DE LA BATALLA\n`;
    report += `   INFORME OFICIAL DE RESULTADOS Y CLASIFICACIÓN DEL CHAT\n`;
    report += `   Fecha: ${dateStr}\n`;
    report += `   Total de Rondas Auditivas: ${SOUNDS_DATA.length}\n`;
    report += `====================================================================\n\n`;

    report += `🏆 TOP 3 CAMPEONES DEL DIRECTO:\n`;
    report += `  🥇 1º PUESTO: ${sortedUsers[0]?.displayName || 'N/A'} - ${sortedUsers[0]?.score || 0} Puntos (${sortedUsers[0]?.correctCount || 0}/${SOUNDS_DATA.length} aciertos)\n`;
    report += `  🥈 2º PUESTO: ${sortedUsers[1]?.displayName || 'N/A'} - ${sortedUsers[1]?.score || 0} Puntos (${sortedUsers[1]?.correctCount || 0}/${SOUNDS_DATA.length} aciertos)\n`;
    report += `  🥉 3º PUESTO: ${sortedUsers[2]?.displayName || 'N/A'} - ${sortedUsers[2]?.score || 0} Puntos (${sortedUsers[2]?.correctCount || 0}/${SOUNDS_DATA.length} aciertos)\n\n`;

    report += `📋 CLASIFICACIÓN GENERAL COMPLETA:\n`;
    report += `Pos | Nombre de Usuario           | Puntos | Aciertos\n`;
    report += `--------------------------------------------------------------------\n`;

    sortedUsers.forEach((u, idx) => {
      const rank = String(idx + 1).padEnd(3);
      const name = String(u.displayName).padEnd(28);
      const pts = String(u.score).padStart(4);
      const hits = String(u.correctCount).padStart(4);
      report += `${rank} | ${name} | ${pts} pts | ${hits}/${SOUNDS_DATA.length}\n`;
    });

    report += `\n====================================================================\n`;
    report += `¡Gracias por participar en el Especial del Día 06 de ImArixu!\n`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `informe_dia06_sonido_imarixu_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ========================================================================
  // 10. CONFETTI EFFECT
  // ========================================================================
  function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#00E5FF', '#FFD600', '#FF2A6D', '#00FA9A', '#FFFFFF'];

    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 120 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleInc: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    let animationFrame;
    let counter = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();

        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.tilt = Math.sin(p.tiltAngle) * 15;
      });

      counter++;
      if (counter < 240) {
        animationFrame = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    draw();
  }

  // ========================================================================
  // 11. TWITCH WEBSOCKET IRC CONNECTION
  // ========================================================================
  function connectTwitchChat() {
    const channel = 'imarixu';
    const wsUrl = 'wss://irc-ws.chat.twitch.tv:443';

    try {
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
        socket.send(`NICK justinfan${Math.floor(Math.random() * 80000 + 10000)}`);
        socket.send(`JOIN #${channel}`);
        if (radarWsTag) {
          radarWsTag.textContent = 'IRC CONECTADO';
          radarWsTag.style.color = '#00FA9A';
        }
      };

      socket.onmessage = (event) => {
        const raw = event.data;
        if (raw.startsWith('PING')) {
          socket.send('PONG :tmi.twitch.tv');
          return;
        }

        const lines = raw.split('\r\n');
        lines.forEach(line => {
          if (!line) return;
          if (line.includes('PRIVMSG')) {
            const userMatch = line.match(/:([^!]+)!/);
            const msgIndex = line.indexOf(`PRIVMSG #${channel} :`);
            if (userMatch && msgIndex !== -1) {
              const username = userMatch[1];
              const msg = line.substring(msgIndex + `PRIVMSG #${channel} :`.length);
              processIncomingChatMessage(username, msg);
            }
          }
        });
      };

      socket.onerror = () => {
        if (radarWsTag) {
          radarWsTag.textContent = 'IRC RECONECTANDO';
          radarWsTag.style.color = '#FFD600';
        }
      };

      socket.onclose = () => {
        setTimeout(connectTwitchChat, 4000);
      };
    } catch (e) {}
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ========================================================================
  // 12. EVENT LISTENERS & CONTROLS
  // ========================================================================
  if (btnStartRound) {
    btnStartRound.addEventListener('click', startRound);
  }
  if (btnRevealSound) {
    btnRevealSound.addEventListener('click', revealAnswer);
  }
  if (audioPlayTrigger) {
    audioPlayTrigger.addEventListener('click', () => {
      if (!isRoundActive && !isRevealed) {
        startRound();
      } else if (secretAudioPlayer) {
        if (secretAudioPlayer.paused) {
          secretAudioPlayer.play().catch(() => {});
          if (audioVisualizerBox) audioVisualizerBox.classList.add('playing');
        } else {
          secretAudioPlayer.pause();
          if (audioVisualizerBox) audioVisualizerBox.classList.remove('playing');
        }
      }
    });
  }

  if (btnNextRound) {
    btnNextRound.addEventListener('click', () => {
      if (currentRoundIndex < SOUNDS_DATA.length - 1) {
        renderRound(currentRoundIndex + 1);
      } else {
        openPodiumModal();
      }
    });
  }

  if (btnPrevRound) {
    btnPrevRound.addEventListener('click', () => {
      if (currentRoundIndex > 0) {
        renderRound(currentRoundIndex - 1);
      }
    });
  }

  if (btnResetRound) {
    btnResetRound.addEventListener('click', () => {
      renderRound(currentRoundIndex);
    });
  }

  if (btnShowPodium) {
    btnShowPodium.addEventListener('click', openPodiumModal);
  }

  // Header Tools
  if (btnAudioToggle) {
    btnAudioToggle.addEventListener('click', () => {
      isAudioEnabled = !isAudioEnabled;
      btnAudioToggle.innerHTML = isAudioEnabled
        ? '<i class="fas fa-volume-up"></i> FX: ON'
        : '<i class="fas fa-volume-mute"></i> FX: OFF';
    });
  }

  if (btnFullscreenToggle) {
    btnFullscreenToggle.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // Tabs
  if (tabChatBtn && tabLeaderboardBtn) {
    tabChatBtn.addEventListener('click', () => {
      tabChatBtn.classList.add('active');
      tabLeaderboardBtn.classList.remove('active');
      if (tabChatContent) tabChatContent.classList.add('active');
      if (tabLeaderboardContent) tabLeaderboardContent.classList.remove('active');
    });

    tabLeaderboardBtn.addEventListener('click', () => {
      tabLeaderboardBtn.classList.add('active');
      tabChatBtn.classList.remove('active');
      if (tabLeaderboardContent) tabLeaderboardContent.classList.add('active');
      if (tabChatContent) tabChatContent.classList.remove('active');
    });
  }

  // Option Cards Manual Clicks (Streamer testing/interaction)
  [optionCardA, optionCardB, optionCardC].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        if (!isRoundActive) return;
        const opt = btn.getAttribute('data-option');
        processIncomingChatMessage('Streamer', opt);
      });
    }
  });

  // Modal Actions
  if (btnClosePodiumModal) btnClosePodiumModal.addEventListener('click', closePodiumModal);
  if (btnModalDismiss) btnModalDismiss.addEventListener('click', closePodiumModal);
  if (btnDownloadTxtReport) btnDownloadTxtReport.addEventListener('click', downloadPodiumTxtReport);
  if (btnRestartGame) {
    btnRestartGame.addEventListener('click', () => {
      userScores = {};
      closePodiumModal();
      renderRound(0);
    });
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) return;

    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      if (!isRoundActive && !isRevealed && secondsRemaining === ROUND_DURATION_SEC) {
        startRound();
      } else if (!isRevealed) {
        revealAnswer();
      }
    } else if (e.key === 'n' || e.key === 'N' || e.key === 'ArrowRight') {
      if (currentRoundIndex < SOUNDS_DATA.length - 1) {
        renderRound(currentRoundIndex + 1);
      }
    } else if (e.key === 'p' || e.key === 'P' || e.key === 'ArrowLeft') {
      if (currentRoundIndex > 0) {
        renderRound(currentRoundIndex - 1);
      }
    }
  });

  // ========================================================================
  // 13. INITIALIZATION
  // ========================================================================
  renderRound(0);
  connectTwitchChat();
});
