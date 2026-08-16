document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. BASE DE DATOS: 17 CREADORES DE CONTENIDO (TWITCH x YOUTUBE)
  // ========================================================================
  const STREAMERS_DATA = [
    {
      id: 1,
      nombre: "SoyAche",
      pista: "GORRO DE LANA / LOOK",
      plataforma: "Twitch: @soyache | YouTube: @SoyAche",
      imgRecorte: "assets/streamers/Streamers Recortados/Ache.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/Ache.png",
      aliases: ["ache", "soyache", "soy ache", "achex", "hache", "el ache"]
    },
    {
      id: 2,
      nombre: "Anerius",
      pista: "TATUAJE EN EL BRAZO",
      plataforma: "Twitch: @anerius | YouTube: @Anerius",
      imgRecorte: "assets/streamers/Streamers Recortados/Anerius.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/Anerius.png",
      aliases: ["anerius", "ane", "aneriuss", "la ane"]
    },
    {
      id: 3,
      nombre: "AriGameplays",
      pista: "MAQUILLAJE / OJO ICÓNICO",
      plataforma: "Twitch: @arigameplays | YouTube: @AriGameplays",
      imgRecorte: "assets/streamers/Streamers Recortados/arigameplays.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/arigameplays.png",
      aliases: ["arigameplays", "ari gameplays", "arigameplay", "abril garza", "arigame"]
    },
    {
      id: 4,
      nombre: "AuronPlay",
      pista: "TATUAJE / RODOLFO",
      plataforma: "Twitch: @auronplay | YouTube: @AuronPlay",
      imgRecorte: "assets/streamers/Streamers Recortados/auronplay.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/auronplay.png",
      aliases: ["auron", "auronplay", "auron play", "raul alvarez", "abduzcan", "rodolfo"]
    },
    {
      id: 5,
      nombre: "Fernanfloo",
      pista: "GORRA VERDE CARACTERÍSTICA",
      plataforma: "YouTube: @Fernanfloo | Twitch: @fernanfloo",
      imgRecorte: "assets/streamers/Streamers Recortados/fernanfloo.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/fernanfloo.png",
      aliases: ["fernan", "fernanfloo", "fernanflo", "luis fernando", "curly"]
    },
    {
      id: 6,
      nombre: "TheGrefg",
      pista: "PEINADO / PELO ICÓNICO",
      plataforma: "Twitch: @thegrefg | YouTube: @TheGrefg",
      imgRecorte: "assets/streamers/Streamers Recortados/grefg.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/grefg.png",
      aliases: ["grefg", "thegrefg", "the grefg", "david canovas", "el grefg", "gref"]
    },
    {
      id: 7,
      nombre: "Jelty",
      pista: "TRAJE ESLAND",
      plataforma: "Twitch: @jelty | YouTube: @Jelty",
      imgRecorte: "assets/streamers/Streamers Recortados/jelty.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/jelty.png",
      aliases: ["jelty", "jesus navas", "el jelty", "jeltyy"]
    },
    {
      id: 8,
      nombre: "Lolito FDEZ",
      pista: "RASGO FACIAL / BARBA",
      plataforma: "Twitch: @lolitofdez | YouTube: @LOLiTOFDEZ",
      imgRecorte: "assets/streamers/Streamers Recortados/lolito.jpg",
      imgCompleto: "assets/streamers/Streamer Sin recortar/lolitofdz.png",
      aliases: ["lolito", "lolitofdez", "lolito fdez", "manuel fernandez", "el lolito"]
    },
    {
      id: 9,
      nombre: "Ninja",
      pista: "BANDANA AMARILLA / AZUL",
      plataforma: "Twitch: @ninja | YouTube: @Ninja",
      imgRecorte: "assets/streamers/Streamers Recortados/ninja.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/ninja.png",
      aliases: ["ninja", "tyler blevins", "tyler ninja", "el ninja"]
    },
    {
      id: 10,
      nombre: "Papivisen",
      pista: "MIRADA / OJOS",
      plataforma: "Twitch: @papivisen | YouTube: @Papivisen",
      imgRecorte: "assets/streamers/Streamers Recortados/Papivisen.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/Papivisen.png",
      aliases: ["papivisen", "papi visen", "visen", "papi gavi"]
    },
    {
      id: 11,
      nombre: "Rados",
      pista: "PLANTA / FONDO STREAM",
      plataforma: "Twitch: @radosss | YouTube: @Rados",
      imgRecorte: "assets/streamers/Streamers Recortados/rados.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/rados.png",
      aliases: ["rados", "radosss", "el rados", "rado"]
    },
    {
      id: 12,
      nombre: "Rivers GG",
      pista: "POLLITOS / ACCESORIO",
      plataforma: "Twitch: @rivers_gg | YouTube: @RiversGG",
      imgRecorte: "assets/streamers/Streamers Recortados/Riverss Mexico.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/Riverss Mexico.png",
      aliases: ["rivers", "riversgg", "rivers_gg", "samy rivers", "sammy rivers", "la rivers", "samy", "rivers mexico"]
    },
    {
      id: 13,
      nombre: "ElRubius",
      pista: "GAFAS & RASGO CARACTERÍSTICO",
      plataforma: "Twitch: @rubius | YouTube: @elrubiusOMG",
      imgRecorte: "assets/streamers/Streamers Recortados/rubius.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/rubius.jpg",
      aliases: ["rubius", "elrubius", "el rubius", "elrubiusomg", "ruben doblas", "rubendoblas"]
    },
    {
      id: 14,
      nombre: "Té Verde Con Limón",
      pista: "LOGOTIPO / AVATAR",
      plataforma: "Twitch: @teverdeconlimon",
      imgRecorte: "assets/streamers/Streamers Recortados/teverdeconlimon.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/teverdeconlimon.png",
      aliases: ["te verde con limon", "teverde", "te verde", "teverdeconlimon", "te con limon"]
    },
    {
      id: 15,
      nombre: "Willyrex",
      pista: "OJOS CARACTERÍSTICOS",
      plataforma: "YouTube: @Willyrex | Twitch: @willyrex",
      imgRecorte: "assets/streamers/Streamers Recortados/willy.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/willy.jpg",
      aliases: ["willy", "willyrex", "elwillyrex", "guillermo diaz", "el willy"]
    },
    {
      id: 16,
      nombre: "Hiper",
      pista: "MASCOTA / LOGO DEL CANAL",
      plataforma: "Twitch: @elhiper | YouTube: @Hiper",
      imgRecorte: "assets/streamers/Streamers Recortados/logohiper.jpg",
      imgCompleto: "assets/streamers/Streamer Sin recortar/hiper.jpg",
      aliases: ["hiper", "elhiper", "el hiper", "hiperop", "hiper_op"]
    },
    {
      id: 17,
      nombre: "DanielaRodbau",
      pista: "SOMBRERO / ESTILO ICÓNICO",
      plataforma: "TikTok / Twitch: @danielarodbau",
      imgRecorte: "assets/streamers/Streamers Recortados/sombrerodaniela.jpg",
      imgCompleto: "assets/streamers/Streamer Sin recortar/daniela.jpg",
      aliases: ["daniela", "danielarodbau", "daniela rodbau", "dani", "rodbau", "danielarod"]
    },
    {
      id: 18,
      nombre: "Dang3rclips",
      pista: "CLIPS / SETUP DE STREAMING",
      plataforma: "TikTok / Twitch: @dang3rclips",
      imgRecorte: "assets/streamers/Streamers Recortados/Dang3rclips.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/Dang3rclips.jpg",
      aliases: ["dang3rclips", "dangerclips", "danger clips", "dang3r clips", "danger", "dang3r"]
    },
    {
      id: 19,
      nombre: "Don Angelillo",
      pista: "BARBA / ESTILO ELEGANTE",
      plataforma: "Twitch: @donangelillo | YouTube: @DonAngelillo",
      imgRecorte: "assets/streamers/Streamers Recortados/Don Angelillo.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/Don Angelillo.jpg",
      aliases: ["don angelillo", "angelillo", "donangelillo", "don angel", "angel"]
    },
    {
      id: 20,
      nombre: "Happy happy Gal",
      pista: "AURICULARES / SONRISA CARACTERÍSTICA",
      plataforma: "Twitch: @happyhappygal | YouTube: @HappyHappyGal",
      imgRecorte: "assets/streamers/Streamers Recortados/Happy happy Gal.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/Happy happy Gal.jpg",
      aliases: ["happy happy gal", "happy happy", "happyhappygal", "happy gal", "happy"]
    },
    {
      id: 21,
      nombre: "Knooby",
      pista: "TATUAJE / ESTILO GAMER",
      plataforma: "Twitch: @knooby | YouTube: @Knooby",
      imgRecorte: "assets/streamers/Streamers Recortados/Knooby.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/Knooby.jpg",
      aliases: ["knooby", "knoby", "knoobyy", "el knooby", "knoob"]
    },
    {
      id: 22,
      nombre: "RecurdOp",
      pista: "LOOK / DETALLE CARACTERÍSTICO",
      plataforma: "Twitch: @recurdop | YouTube: @RecurdOp",
      imgRecorte: "assets/streamers/Streamers Recortados/RecurdOp.png",
      imgCompleto: "assets/streamers/Streamer Sin recortar/RecurdOp.jpg",
      aliases: ["recurdop", "recurd", "recurd op", "el recurd", "recurd_op"]
    },
    {
      id: 23,
      nombre: "ImArixu",
      pista: "👑 ¡LA ANFITRIONA DEL ESPECIAL!",
      plataforma: "Twitch: @imarixu | YouTube: @ImArixu",
      imgRecorte: "assets/streamers/Streamers Recortados/Ari.jpg",
      imgCompleto: "assets/streamers/Streamer Sin recortar/arixu.jpg",
      aliases: ["ari", "arixu", "imarixu", "im arixu", "arichu", "arixuu", "ari xu"]
    }
  ];

  // ========================================================================
  // 2. ESTADO DEL JUEGO
  // ========================================================================
  const ROUND_DURATION_SEC = 35;
  let currentStreamerIndex = 0;
  let isRoundActive = false;
  let isRevealed = false;
  let secondsRemaining = ROUND_DURATION_SEC;
  let timerInterval = null;
  let isAudioEnabled = true;
  let totalChatMessages = 0;

  // Set of viewers who have guessed correctly in the CURRENT round
  let roundHits = new Set();

  // Cumulative Leaderboard: { [username]: { displayName, totalScore, correctCount } }
  let userScores = {};

  // Web Audio Synthesizer
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSound(type) {
    if (!isAudioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;

      if (type === 'start') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.35);

      } else if (type === 'hit') {
        // High pleasant chime when viewer guesses
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(1320, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.25);

      } else if (type === 'tick') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.03);

      } else if (type === 'warning') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.06);

      } else if (type === 'reveal') {
        // Grand reveal triumph fanfare
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.2, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.65);
        });

      } else if (type === 'podium') {
        const chords = [440, 554.37, 659.25, 880, 1108.73];
        chords.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0.18, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 1.2);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 1.3);
        });
      }
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  function cleanString(str) {
    if (typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return String(str);
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ========================================================================
  // 3. DOM ELEMENTS
  // ========================================================================
  // Header
  const headerStreamerNum = document.getElementById('headerStreamerNum');
  const btnAudioToggle = document.getElementById('btnAudioToggle');
  const btnFullscreenToggle = document.getElementById('btnFullscreenToggle');

  // Meta & Stage
  const streamerNumberBadge = document.getElementById('streamerNumberBadge');
  const streamerHintBadge = document.getElementById('streamerHintBadge');
  const streamerStatusBadge = document.getElementById('streamerStatusBadge');
  const streamerTitleText = document.getElementById('streamerTitleText');
  const streamerMediaBox = document.getElementById('streamerMediaBox');
  const streamerImage = document.getElementById('streamerImage');
  if (streamerImage) {
    streamerImage.onerror = function() {
      const src = this.getAttribute('src');
      if (src && src.includes('assets/streamers/')) {
        this.src = src.replace('assets/streamers/', 'streamers/');
      } else if (src && src.startsWith('streamers/')) {
        this.src = 'assets/' + src;
      }
    };
  }
  const flashOverlay = document.getElementById('flashOverlay');
  const revealResultBanner = document.getElementById('revealResultBanner');
  const revealNameText = document.getElementById('revealNameText');
  const revealCorrectCount = document.getElementById('revealCorrectCount');
  const revealPlatformText = document.getElementById('revealPlatformText');

  // Timer
  const timerCircleProgress = document.getElementById('timerCircleProgress');
  const timerSecondsDisplay = document.getElementById('timerSecondsDisplay');
  const timerStatusLabel = document.getElementById('timerStatusLabel');

  // Streamer Dock Buttons
  const btnStartRound = document.getElementById('btnStartRound');
  const btnRevealStreamer = document.getElementById('btnRevealStreamer');
  const btnPrevStreamer = document.getElementById('btnPrevStreamer');
  const btnNextStreamer = document.getElementById('btnNextStreamer');
  const btnResetRound = document.getElementById('btnResetRound');
  const btnShowPodium = document.getElementById('btnShowPodium');

  // Radar & Leaderboard
  const tabChatBtn = document.getElementById('tabChatBtn');
  const tabLeaderboardBtn = document.getElementById('tabLeaderboardBtn');
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

  // ========================================================================
  // 4. RADAR TERMINAL LOGGER
  // ========================================================================
  function appendRadarTerminalLine(author, message, type = 'sys') {
    if (!radarChatMessages) return;

    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;

    if (type === 'sys') {
      line.innerHTML = `<span class="terminal-coord" style="color:#00FA9A;">[SISTEMA]</span> <span class="terminal-msg">${escapeHtml(message)}</span>`;
    } else if (type === 'hit') {
      line.innerHTML = `<span class="terminal-coord" style="color:#00FA9A; font-weight:900;">[¡ACIERTO! 🎯]</span> <span class="terminal-author">@${escapeHtml(author)}</span> adivinó: <strong>${escapeHtml(message)}</strong> (+1 pto)`;
    } else {
      line.innerHTML = `<span class="terminal-author">@${escapeHtml(author)}:</span> ${escapeHtml(message)}`;
    }

    radarChatMessages.appendChild(line);

    totalChatMessages++;
    if (chatCountBadge) chatCountBadge.textContent = totalChatMessages;

    radarChatMessages.scrollTo({
      top: radarChatMessages.scrollHeight,
      behavior: 'smooth'
    });

    if (radarChatMessages.children.length > 120) {
      radarChatMessages.removeChild(radarChatMessages.firstChild);
    }
  }

  // ========================================================================
  // 5. RENDER STREAMER FUNCTION
  // ========================================================================
  function renderStreamer(index) {
    if (index < 0 || index >= STREAMERS_DATA.length) return;
    currentStreamerIndex = index;
    const sData = STREAMERS_DATA[index];

    // Reset Round State
    isRoundActive = false;
    isRevealed = false;
    secondsRemaining = ROUND_DURATION_SEC;
    roundHits.clear();
    clearInterval(timerInterval);
    timerInterval = null;

    // Header updates
    if (headerStreamerNum) headerStreamerNum.textContent = `${index + 1}`;

    // Meta updates
    if (streamerNumberBadge) streamerNumberBadge.textContent = `STREAMER #${index + 1} / ${STREAMERS_DATA.length}`;
    if (streamerHintBadge) streamerHintBadge.innerHTML = `<i class="fas fa-search"></i> PISTA: ${sData.pista}`;
    if (streamerStatusBadge) {
      streamerStatusBadge.innerHTML = `<span class="pulse-dot"></span> EN ESPERA`;
      streamerStatusBadge.style.color = '#00FA9A';
      streamerStatusBadge.style.borderColor = '#00FA9A';
    }
    if (streamerTitleText) {
      streamerTitleText.textContent = `¿Quién es este Creador de Contenido? ¡Escribe su nombre en el chat!`;
    }

    // Media & Image updates
    if (streamerMediaBox) {
      streamerMediaBox.classList.remove('revealed');
    }
    if (streamerImage) {
      streamerImage.src = sData.imgRecorte;
    }
    if (revealResultBanner) {
      revealResultBanner.classList.remove('active');
    }

    // Timer reset
    updateTimerVisuals(ROUND_DURATION_SEC);
    if (timerStatusLabel) timerStatusLabel.textContent = 'TIEMPO EN ESPERA';

    // Buttons
    if (btnStartRound) {
      btnStartRound.disabled = false;
      btnStartRound.innerHTML = `<i class="fas fa-play"></i> ▶️ Iniciar Ronda (${ROUND_DURATION_SEC}s)`;
    }
    if (btnRevealStreamer) {
      btnRevealStreamer.disabled = true;
    }

    // Footer info
    if (radarActiveRoundLabel) {
      radarActiveRoundLabel.innerHTML = `Ronda: <strong>${index + 1} / ${STREAMERS_DATA.length}</strong>`;
    }
    if (radarRoundHitsBadge) {
      radarRoundHitsBadge.innerHTML = `🎯 Aciertos: <strong>0</strong>`;
    }

    appendRadarTerminalLine('SISTEMA', `📌 Streamer #${index + 1} cargado. Pulsa 'Iniciar Ronda' para abrir la adivinanza en el chat.`, 'sys');
    updateLiveLeaderboard();
  }

  // ========================================================================
  // 6. TIMER ENGINE
  // ========================================================================
  function updateTimerVisuals(seconds) {
    const totalCircumference = 232;
    const fractionRemaining = Math.max(0, seconds / ROUND_DURATION_SEC);
    const strokeOffset = totalCircumference * (1 - fractionRemaining);

    if (timerCircleProgress) {
      timerCircleProgress.style.strokeDashoffset = strokeOffset;
      if (seconds <= 10 && isRoundActive) {
        timerCircleProgress.classList.add('danger');
      } else {
        timerCircleProgress.classList.remove('danger');
      }
    }

    if (timerSecondsDisplay) {
      timerSecondsDisplay.innerHTML = `${Math.ceil(seconds)}<span class="sec-unit">s</span>`;
      if (seconds <= 10 && isRoundActive) {
        timerSecondsDisplay.style.color = '#FFCC00';
      } else {
        timerSecondsDisplay.style.color = '#FFFFFF';
      }
    }
  }

  function startRound() {
    if (isRoundActive) return;

    isRoundActive = true;
    isRevealed = false;
    secondsRemaining = ROUND_DURATION_SEC;
    roundHits.clear();

    if (btnStartRound) {
      btnStartRound.disabled = true;
      btnStartRound.innerHTML = `<i class="fas fa-spinner fa-spin"></i> 🟢 Ronda en Curso`;
    }
    if (btnRevealStreamer) {
      btnRevealStreamer.disabled = false;
    }

    if (streamerStatusBadge) {
      streamerStatusBadge.innerHTML = `<span class="pulse-dot" style="background:#FF0055; box-shadow:0 0 8px #FF0055;"></span> 🟢 ADIVINANZA EN CURSO`;
      streamerStatusBadge.style.color = '#FF0055';
      streamerStatusBadge.style.borderColor = '#FF0055';
    }

    if (timerStatusLabel) timerStatusLabel.textContent = '¡ESCRIBE EN EL CHAT!';

    appendRadarTerminalLine('SISTEMA', `🚀 ¡RONDA INICIADA! Tienes ${ROUND_DURATION_SEC} segundos para adivinar el streamer en el chat de Twitch.`, 'sys');
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

      if (remainingMs <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        isRoundActive = false;
        secondsRemaining = 0;
        updateTimerVisuals(0);

        if (streamerStatusBadge) {
          streamerStatusBadge.innerHTML = `<span class="pulse-dot" style="background:#FFD166; box-shadow:0 0 8px #FFD166;"></span> ⏳ ESPERANDO REVELACIÓN`;
          streamerStatusBadge.style.color = '#FFD166';
          streamerStatusBadge.style.borderColor = '#FFD166';
        }

        if (timerStatusLabel) {
          timerStatusLabel.textContent = 'TIEMPO AGOTADO - ESPERANDO REVELACIÓN';
        }

        if (btnRevealStreamer) {
          btnRevealStreamer.disabled = false;
        }

        appendRadarTerminalLine('SISTEMA', '⏱️ ¡TIEMPO AGOTADO! Votaciones del chat cerradas. Pulsa "👁️ Revelar Streamer" para mostrar la identidad.', 'sys');
        playSound('warning');
      }
    }, 100);
  }

  // ========================================================================
  // 7. REVEAL STREAMER FUNCTION
  // ========================================================================
  function revealStreamer() {
    if (isRevealed) return;

    clearInterval(timerInterval);
    timerInterval = null;
    isRoundActive = false;
    isRevealed = true;
    secondsRemaining = 0;
    updateTimerVisuals(0);

    const sData = STREAMERS_DATA[currentStreamerIndex];

    // White Flash Dramatic Effect
    if (flashOverlay) {
      flashOverlay.classList.add('flash-active');
      setTimeout(() => {
        flashOverlay.classList.remove('flash-active');
      }, 120);
    }

    // Swap Image to Complete
    if (streamerImage) {
      streamerImage.src = sData.imgCompleto;
    }
    if (streamerMediaBox) {
      streamerMediaBox.classList.add('revealed');
    }

    // Show Announcement Banner
    if (revealNameText) {
      revealNameText.textContent = `🎉 ¡ES ${sData.nombre.toUpperCase()}!`;
    }
    if (revealCorrectCount) {
      revealCorrectCount.innerHTML = `<i class="fas fa-users"></i> Acertantes: <strong>${roundHits.size}</strong>`;
    }
    if (revealPlatformText) {
      revealPlatformText.innerHTML = `<i class="fas fa-video"></i> ${escapeHtml(sData.plataforma)}`;
    }
    if (revealResultBanner) {
      revealResultBanner.classList.add('active');
    }

    if (streamerStatusBadge) {
      streamerStatusBadge.innerHTML = `<span class="pulse-dot" style="background:#00FA9A;"></span> 🎯 REVELADO`;
      streamerStatusBadge.style.color = '#00FA9A';
      streamerStatusBadge.style.borderColor = '#00FA9A';
    }

    if (btnStartRound) {
      btnStartRound.disabled = true;
      btnStartRound.innerHTML = `<i class="fas fa-check"></i> Ronda Finalizada`;
    }
    if (btnRevealStreamer) {
      btnRevealStreamer.disabled = true;
    }

    appendRadarTerminalLine('SISTEMA', `⭐ ¡STREAMER REVELADO! El creador es: ${sData.nombre}. Acertantes: ${roundHits.size}`, 'sys');
    playSound('reveal');

    // Auto open podium on last streamer
    if (currentStreamerIndex === STREAMERS_DATA.length - 1) {
      setTimeout(() => {
        openPodiumModal();
      }, 3000);
    }
  }

  // ========================================================================
  // 8. CHAT GUESS TRACKER & VALIDATION
  // ========================================================================
  function processIncomingChatMessage(rawUser, rawMessage) {
    if (!rawUser || !rawMessage) return;
    const username = rawUser.trim();
    const userKey = username.toLowerCase();
    const message = rawMessage.trim();

    // If round is not active, just log normally to terminal
    if (!isRoundActive || isRevealed) {
      appendRadarTerminalLine(username, message, 'chat');
      return;
    }

    const sData = STREAMERS_DATA[currentStreamerIndex];
    const cleanMsg = cleanString(message);

    // Check if the message matches any of the streamer's aliases
    const isHit = sData.aliases.some(alias => {
      const cleanAlias = cleanString(alias);
      return cleanMsg.includes(cleanAlias);
    });

    if (isHit) {
      // Check if user already got the point in this round
      if (!roundHits.has(userKey)) {
        roundHits.add(userKey);

        if (!userScores[userKey]) {
          userScores[userKey] = {
            displayName: username,
            totalScore: 0,
            correctCount: 0
          };
        }

        userScores[userKey].totalScore += 1;
        userScores[userKey].correctCount += 1;

        if (radarRoundHitsBadge) {
          radarRoundHitsBadge.innerHTML = `🎯 Aciertos: <strong>${roundHits.size}</strong>`;
        }

        appendRadarTerminalLine(username, sData.nombre, 'hit');
        playSound('hit');
        updateLiveLeaderboard();
      } else {
        appendRadarTerminalLine(username, message, 'chat');
      }
    } else {
      appendRadarTerminalLine(username, message, 'chat');
    }
  }

  // ========================================================================
  // 9. LIVE LEADERBOARD
  // ========================================================================
  function updateLiveLeaderboard() {
    if (!radarLeaderboardFeed) return;

    const ranked = Object.values(userScores).sort((a, b) => b.totalScore - a.totalScore);
    if (lbTotalUsers) lbTotalUsers.textContent = ranked.length;

    radarLeaderboardFeed.innerHTML = '';

    if (ranked.length === 0) {
      radarLeaderboardFeed.innerHTML = `
        <div class="leaderboard-empty-state">
          <i class="fas fa-medal"></i>
          <p>El ranking se actualizará en tiempo real cuando el chat adivine los streamers.</p>
        </div>
      `;
      return;
    }

    ranked.slice(0, 15).forEach((u, index) => {
      const row = document.createElement('div');
      const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : '';
      row.className = `leaderboard-row ${rankClass}`;

      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
      row.innerHTML = `
        <div class="lb-user-info">
          <span class="lb-rank">${medal}</span>
          <span class="lb-name" title="@${escapeHtml(u.displayName)}">@${escapeHtml(u.displayName)}</span>
        </div>
        <div style="text-align: right;">
          <span class="lb-score">${u.totalScore} pts</span>
          <div style="font-size: 0.65rem; color: #94A3B8;">${u.correctCount}/${STREAMERS_DATA.length} acertados</div>
        </div>
      `;
      radarLeaderboardFeed.appendChild(row);
    });
  }

  // Tab Toggle
  if (tabChatBtn && tabLeaderboardBtn && radarChatMessages && radarLeaderboardFeed) {
    tabChatBtn.addEventListener('click', () => {
      tabChatBtn.classList.add('active');
      tabLeaderboardBtn.classList.remove('active');
      radarChatMessages.style.display = 'flex';
      radarLeaderboardFeed.classList.remove('active');
    });

    tabLeaderboardBtn.addEventListener('click', () => {
      tabLeaderboardBtn.classList.add('active');
      tabChatBtn.classList.remove('active');
      radarChatMessages.style.display = 'none';
      radarLeaderboardFeed.classList.add('active');
      updateLiveLeaderboard();
    });
  }

  // ========================================================================
  // 10. TOP 3 PODIUM & TXT REPORT
  // ========================================================================
  function openPodiumModal() {
    const ranked = Object.values(userScores).sort((a, b) => b.totalScore - a.totalScore);
    const totalS = STREAMERS_DATA.length;

    // 1st Place
    if (ranked[0]) {
      if (podiumFirstUser) podiumFirstUser.textContent = `@${ranked[0].displayName}`;
      if (podiumFirstPoints) podiumFirstPoints.textContent = `${ranked[0].totalScore} PTS`;
      if (podiumFirstAccuracy) podiumFirstAccuracy.textContent = `${ranked[0].correctCount}/${totalS} aciertos (${((ranked[0].correctCount/totalS)*100).toFixed(0)}%)`;
    } else {
      if (podiumFirstUser) podiumFirstUser.textContent = 'Sin participantes';
      if (podiumFirstPoints) podiumFirstPoints.textContent = '0 PTS';
      if (podiumFirstAccuracy) podiumFirstAccuracy.textContent = `0/${totalS}`;
    }

    // 2nd Place
    if (ranked[1]) {
      if (podiumSecondUser) podiumSecondUser.textContent = `@${ranked[1].displayName}`;
      if (podiumSecondPoints) podiumSecondPoints.textContent = `${ranked[1].totalScore} PTS`;
      if (podiumSecondAccuracy) podiumSecondAccuracy.textContent = `${ranked[1].correctCount}/${totalS} aciertos (${((ranked[1].correctCount/totalS)*100).toFixed(0)}%)`;
    } else {
      if (podiumSecondUser) podiumSecondUser.textContent = '---';
      if (podiumSecondPoints) podiumSecondPoints.textContent = '0 PTS';
      if (podiumSecondAccuracy) podiumSecondAccuracy.textContent = `0/${totalS}`;
    }

    // 3rd Place
    if (ranked[2]) {
      if (podiumThirdUser) podiumThirdUser.textContent = `@${ranked[2].displayName}`;
      if (podiumThirdPoints) podiumThirdPoints.textContent = `${ranked[2].totalScore} PTS`;
      if (podiumThirdAccuracy) podiumThirdAccuracy.textContent = `${ranked[2].correctCount}/${totalS} aciertos (${((ranked[2].correctCount/totalS)*100).toFixed(0)}%)`;
    } else {
      if (podiumThirdUser) podiumThirdUser.textContent = '---';
      if (podiumThirdPoints) podiumThirdPoints.textContent = '0 PTS';
      if (podiumThirdAccuracy) podiumThirdAccuracy.textContent = `0/${totalS}`;
    }

    if (podiumModalOverlay) {
      podiumModalOverlay.classList.add('active');
    }

    playSound('podium');
    triggerConfetti(5000);
  }

  function closePodiumModal() {
    if (podiumModalOverlay) {
      podiumModalOverlay.classList.remove('active');
    }
  }

  function downloadPodiumTxtReport() {
    const ranked = Object.values(userScores).sort((a, b) => b.totalScore - a.totalScore);
    const dateStr = new Date().toLocaleString('es-ES');
    const totalS = STREAMERS_DATA.length;

    let report = `=================================================================\n`;
    report += `🏆 ESPECIALES IMARIXU - DÍA 6: ¿QUIÉN ES ESE STREAMER?\n`;
    report += `=================================================================\n`;
    report += `Fecha del Evento: ${dateStr}\n`;
    report += `Canal Oficial: Twitch.tv/imarixu\n`;
    report += `Total de Streamers Jugados: ${totalS}\n`;
    report += `Total de Participantes Registrados: ${ranked.length}\n\n`;

    report += `🎉 PODIO FINAL - TOP 3 DETECTIVES DEL CHAT:\n`;
    if (ranked[0]) report += `  🥇 1er Puesto: @${ranked[0].displayName} -> ${ranked[0].totalScore} Puntos (${ranked[0].correctCount}/${totalS} aciertos)\n`;
    if (ranked[1]) report += `  🥈 2do Puesto: @${ranked[1].displayName} -> ${ranked[1].totalScore} Puntos (${ranked[1].correctCount}/${totalS} aciertos)\n`;
    if (ranked[2]) report += `  🥉 3er Puesto: @${ranked[2].displayName} -> ${ranked[2].totalScore} Puntos (${ranked[2].correctCount}/${totalS} aciertos)\n`;

    report += `\n-----------------------------------------------------------------\n`;
    report += `📊 TABLA CLASIFICATORIA GENERAL COMPLETA:\n`;
    ranked.forEach((u, idx) => {
      const pos = (idx + 1).toString().padStart(2, '0');
      const user = u.displayName.padEnd(22, ' ');
      const pts = `${u.totalScore} pts`.padStart(8, ' ');
      const acc = `${u.correctCount}/${totalS}`.padStart(6, ' ');
      const pct = ((u.correctCount / totalS) * 100).toFixed(1);
      report += `  ${pos}. @${user} | ${pts} | Aciertos: ${acc} (${pct}%)\n`;
    });

    report += `\n=================================================================\n`;
    report += `Especiales ImArixu • Sistema Oficial Multiplataforma Twitch x YouTube\n`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Adivina_El_Streamer_Informe_Dia6_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ========================================================================
  // 11. TWITCH IRC WEBSOCKET CONNECTION
  // ========================================================================
  function initTwitchWebSocket() {
    const wsUrl = 'wss://irc-ws.chat.twitch.tv:443';
    let socket;

    try {
      socket = new WebSocket(wsUrl);
    } catch (err) {
      console.warn('No se pudo abrir WebSocket con Twitch:', err);
      if (radarWsTag) {
        radarWsTag.textContent = '🟠 MODO SIMULADO';
        radarWsTag.style.color = '#FFB703';
      }
      return;
    }

    socket.onopen = () => {
      socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
      socket.send('PASS oauth:anonymous_guest_user');
      socket.send(`NICK justinfan${Math.floor(Math.random() * 80000 + 10000)}`);
      socket.send('JOIN #imarixu');

      if (radarWsTag) {
        radarWsTag.textContent = '🟢 EN VIVO (#imarixu)';
        radarWsTag.style.color = '#00FA9A';
      }
      appendRadarTerminalLine('SISTEMA', '📡 Conectado con éxito al chat en vivo de Twitch (#imarixu).', 'sys');
    };

    socket.onmessage = (event) => {
      const lines = event.data.split('\r\n');
      lines.forEach(line => {
        if (!line) return;

        if (line.startsWith('PING')) {
          socket.send('PONG :tmi.twitch.tv');
          return;
        }

        if (line.includes('PRIVMSG')) {
          parseTwitchPrivmsg(line);
        }
      });
    };

    socket.onerror = () => {
      if (radarWsTag) {
        radarWsTag.textContent = '🔴 ERROR WS';
        radarWsTag.style.color = '#FF3366';
      }
    };

    socket.onclose = () => {
      if (radarWsTag) {
        radarWsTag.textContent = '🟡 RECONECTANDO...';
        radarWsTag.style.color = '#FFD166';
      }
      setTimeout(initTwitchWebSocket, 5000);
    };

    function parseTwitchPrivmsg(rawIrcLine) {
      let displayName = '';
      let message = '';

      const matchTags = rawIrcLine.match(/display-name=([^;]+)/);
      if (matchTags && matchTags[1]) {
        displayName = matchTags[1];
      }

      if (!displayName) {
        const matchUser = rawIrcLine.match(/:([a-zA-Z0-9_]+)!/);
        if (matchUser && matchUser[1]) {
          displayName = matchUser[1];
        }
      }

      const msgIndex = rawIrcLine.indexOf('PRIVMSG');
      if (msgIndex !== -1) {
        const colonIndex = rawIrcLine.indexOf(' :', msgIndex);
        if (colonIndex !== -1) {
          message = rawIrcLine.substring(colonIndex + 2);
        }
      }

      if (displayName && message) {
        processIncomingChatMessage(displayName, message);
      }
    }
  }

  // ========================================================================
  // 12. GALA BACKGROUND ICONS CANVAS
  // ========================================================================
  function initGalaCanvas() {
    const canvas = document.getElementById('galaCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const icons = ['play', 'mic', 'monitor', 'chat', 'youtube', 'twitch'];
    const colors = ['rgba(145, 70, 255, 0.18)', 'rgba(255, 0, 0, 0.16)', 'rgba(255, 215, 0, 0.14)', 'rgba(0, 245, 212, 0.14)'];

    const particleCount = 36;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        size: Math.random() * 16 + 12,
        speedY: -(Math.random() * 0.4 + 0.2),
        ampX: Math.random() * 30 + 10,
        freqX: Math.random() * 0.01 + 0.004,
        phase: Math.random() * Math.PI * 2,
        type: icons[Math.floor(Math.random() * icons.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015
      });
    }

    let frame = 0;

    function render() {
      ctx.clearRect(0, 0, width, height);
      frame++;

      particles.forEach(p => {
        p.y += p.speedY;
        p.x = p.baseX + Math.sin(frame * p.freqX + p.phase) * p.ampX;
        p.rotation += p.rotSpeed;

        if (p.y < -40) {
          p.y = height + 40;
          p.baseX = Math.random() * width;
          p.x = p.baseX;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = p.alpha;

        const s = p.size;

        if (p.type === 'play') {
          // Play Triangle
          ctx.beginPath();
          ctx.moveTo(-s * 0.5, -s * 0.6);
          ctx.lineTo(s * 0.6, 0);
          ctx.lineTo(-s * 0.5, s * 0.6);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === 'monitor') {
          // Screen Outline
          ctx.strokeRect(-s * 0.7, -s * 0.5, s * 1.4, s);
          ctx.beginPath();
          ctx.moveTo(-s * 0.3, s * 0.5);
          ctx.lineTo(s * 0.3, s * 0.5);
          ctx.stroke();
        } else if (p.type === 'chat') {
          // Chat Bubble
          ctx.beginPath();
          ctx.arc(0, -s * 0.1, s * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Glowing Diamond Glyph
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.7);
          ctx.lineTo(s * 0.7, 0);
          ctx.lineTo(0, s * 0.7);
          ctx.lineTo(-s * 0.7, 0);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // ========================================================================
  // 13. CANVAS CONFETTI EFFECT
  // ========================================================================
  function triggerConfetti(duration = 4000) {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FF0055', '#9146FF', '#FFD700', '#00FA9A', '#FFFFFF', '#FF3333'];
    const confettiCount = 130;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        velX: (Math.random() - 0.5) * 4,
        velY: Math.random() * 4 + 3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8
      });
    }

    const startTime = performance.now();

    function render(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = now - startTime;

      confetti.forEach(p => {
        p.x += p.velX;
        p.y += p.velY;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (elapsed < duration) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    requestAnimationFrame(render);
  }

  // ========================================================================
  // 14. EVENT LISTENERS & CONTROLS
  // ========================================================================
  if (btnStartRound) {
    btnStartRound.addEventListener('click', startRound);
  }

  if (btnRevealStreamer) {
    btnRevealStreamer.addEventListener('click', revealStreamer);
  }

  if (btnNextStreamer) {
    btnNextStreamer.addEventListener('click', () => {
      if (currentStreamerIndex < STREAMERS_DATA.length - 1) {
        renderStreamer(currentStreamerIndex + 1);
      } else {
        openPodiumModal();
      }
    });
  }

  if (btnPrevStreamer) {
    btnPrevStreamer.addEventListener('click', () => {
      if (currentStreamerIndex > 0) {
        renderStreamer(currentStreamerIndex - 1);
      }
    });
  }

  if (btnResetRound) {
    btnResetRound.addEventListener('click', () => {
      renderStreamer(currentStreamerIndex);
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
        ? '<i class="fas fa-volume-up"></i> Audio: ON'
        : '<i class="fas fa-volume-mute"></i> Audio: OFF';
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

  // Podium Modal Actions
  if (btnClosePodiumModal) btnClosePodiumModal.addEventListener('click', closePodiumModal);
  if (btnModalDismiss) btnModalDismiss.addEventListener('click', closePodiumModal);
  if (btnDownloadTxtReport) btnDownloadTxtReport.addEventListener('click', downloadPodiumTxtReport);
  if (btnRestartGame) {
    btnRestartGame.addEventListener('click', () => {
      userScores = {};
      closePodiumModal();
      renderStreamer(0);
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
        revealStreamer();
      }
    } else if (e.key === 'n' || e.key === 'N' || e.key === 'ArrowRight') {
      if (currentStreamerIndex < STREAMERS_DATA.length - 1) {
        renderStreamer(currentStreamerIndex + 1);
      }
    } else if (e.key === 'p' || e.key === 'P' || e.key === 'ArrowLeft') {
      if (currentStreamerIndex > 0) {
        renderStreamer(currentStreamerIndex - 1);
      }
    }
  });

  // Handle Resize for Confetti
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

  // ========================================================================
  // 16. INITIALIZATION
  // ========================================================================
  initGalaCanvas();
  renderStreamer(0);
  initTwitchWebSocket();
  console.log('⚡ Especiales ImArixu - Día 6: ¿Quién es ese Streamer? Initialized');
});
