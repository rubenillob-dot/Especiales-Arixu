/* ==========================================================================
   ESPECIALES ARIXU - DÍA 3: QUÉ PREFIERES (DUELO DE DECISIONES) ENGINE
   Features:
   1. 35 Iconic Polarized Dilemmas structured in Pillars (Fortnite x Twitch, Streamer Life, Salseo)
   2. 75% Confined Game-Area Split Duel with Territory Expansion Hover (65% vs 35%)
   3. 25% Twitch Communications Terminal (#imarixu live feed, vote logger & radar)
   4. Real-time Twitch IRC Chat Voting & Anti-Duplicate Vote Tracker
   5. Flow Control: "Abrir Votación" & "Cerrar Votación"
   6. Hive Mind Scoring Tracker: global user accuracy across 35 rounds
   7. Extraction of the 3 Chosen Winners (filtered >= 60% accuracy) + Modal & TXT Export
   8. Procedural Web Audio API Sound Synthesizer & Canvas Confetti Generator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. DATA: 35 DILEMAS (1-35)
  // ========================================================================
  const DILEMAS_DATA = [
    { id: 1, categoria: 'Fortnite x Twitch', opcionA: 'Caer en Pisos Picados, morir rápido y que el chat te llame manco', opcionB: 'Caer en los bordes, ganar la partida, pero que el chat se duerma de aburrimiento' },
    { id: 2, categoria: 'Fortnite x Twitch', opcionA: 'Hacer una jugada épica de 200 IQ a 0 viewers', opcionB: 'Morir por daño de caída de la forma más tonta frente a una raid de 10.000 personas' },
    { id: 3, categoria: 'Fortnite x Twitch', opcionA: 'Que se caiga tu stream justo en el clímax del Evento Final', opcionB: 'Hacer un directo de 24h mirando el Agujero Negro sin que pase absolutamente nada' },
    { id: 4, categoria: 'Fortnite x Twitch', opcionA: 'Tener aimbot pero que todo Twitch te acuse de hacer trampas', opcionB: 'Tener una puntería terrible pero que tus fallos se hagan virales en TikTok todos los días' },
    { id: 5, categoria: 'Fortnite x Twitch', opcionA: 'Jugar un torneo importante con 300 de ping frente a tu comunidad', opcionB: 'Jugar a 0 de ping pero con el micrófono roto sin poder hablar con el chat' },
    { id: 6, categoria: 'Fortnite x Twitch', opcionA: 'Hacer un subathon donde solo puedes usar armas grises', opcionB: 'Hacer un subathon donde el chat te obliga a jugar sin escudos' },
    { id: 7, categoria: 'Fortnite x Twitch', opcionA: 'Ser stream-snipeado constantemente por pros que te destrozan', opcionB: 'Ser stream-snipeado por trolls que solo bailan la conga y arruinan tu sigilo' },
    { id: 8, categoria: 'Fortnite x Twitch', opcionA: 'Que Epic Games te patrocine pero solo te deje usar la skin por defecto en directo', opcionB: 'No tener patrocinio pero poder presumir de tus skins exclusivas' },
    { id: 9, categoria: 'Fortnite x Twitch', opcionA: 'Hacer dúo y pasaros todo el stream discutiendo a gritos por el loot', opcionB: 'Hacer dúo con un streamer gigante que te roba el loot y te ignora' },
    { id: 10, categoria: 'Fortnite x Twitch', opcionA: 'Filtrar tu IP en directo jugando la final de la FNCS', opcionB: 'Filtrar tu cuenta bancaria justo después de ganar una partida de Arena' },
    { id: 11, categoria: 'Fortnite x Twitch', opcionA: 'Perder un 1vs1 de construcción contra un viewer muy tóxico en directo', opcionB: 'Ganarle al viewer pero que todo el chat diga que usaste macros' },
    { id: 12, categoria: 'Fortnite x Twitch', opcionA: 'Jugar todo el stream con la pantalla invertida y marearte', opcionB: 'Jugar a Fortnite en directo usando un volante de Mario Kart' },
    { id: 13, categoria: 'Fortnite x Twitch', opcionA: 'Olvidarte de mutearte mientras te quejas de los servidores de Fortnite', opcionB: 'Mutearte sin querer durante los últimos 5 minutos de una Victoria Magistral épica' },
    { id: 14, categoria: 'Fortnite x Twitch', opcionA: 'Que un parche del juego borre tu isla creativa favorita en pleno directo', opcionB: 'Que un bug de Twitch borre todos tus clips de Fortnite de la historia' },
    { id: 15, categoria: 'Fortnite x Twitch', opcionA: 'Prometer regalar 50 subs si pierdes y morir nada más aterrizar', opcionB: 'Prometer 50 subs si ganas y hacerte una racha de 10 victorias seguidas' },
    { id: 16, categoria: 'Fortnite x Twitch', opcionA: 'Que el chat decida siempre tu skin y te ponga la más grande y visible', opcionB: 'Que el chat decida siempre tu ruta de aterrizaje y te mande al mar' },
    { id: 17, categoria: 'Fortnite x Twitch', opcionA: 'Hacer partidas personalizadas y que los 99 viewers te hagan focus', opcionB: 'Hacer personalizadas y que nadie aterrice en tu ciudad por miedo a ti' },
    { id: 18, categoria: 'Fortnite x Twitch', opcionA: 'Jugar con un delay en el chat de 3 minutos para evitar snipers', opcionB: 'Jugar sin delay pero que te estén esperando en cada arbusto de la isla' },
    { id: 19, categoria: 'Fortnite x Twitch', opcionA: 'Llegar a la liga de Campeones pero que tu cámara de stream esté pixelada', opcionB: 'Estar en bronce pero tener la mejor calidad de cámara de todo Twitch' },
    { id: 20, categoria: 'Fortnite x Twitch', opcionA: 'Leer una donación insultando tu forma de construir y desconcentrarte', opcionB: 'Ignorar sin querer la donación más grande de tu vida por estar peleando' },
    { id: 21, categoria: 'Fortnite x Twitch', opcionA: 'Que se te apague el PC quedando en el Top 2 de un torneo', opcionB: 'Ganar el torneo pero olvidarte de darle al botón de Iniciar Transmisión' },
    { id: 22, categoria: 'Fortnite x Twitch', opcionA: 'Jugar todo un directo con la música de la sala de Fortnite al máximo volumen', opcionB: 'Jugar sin audio del juego pero escuchando a 3 viewers cantando en Discord' },
    { id: 23, categoria: 'Fortnite x Twitch', opcionA: 'Descubrir un Easter Egg exclusivo pero no tener activado el guardado de clips', opcionB: 'Grabar el Easter Egg perfecto pero que tu cámara tape justo lo importante' },
    { id: 24, categoria: 'Fortnite x Twitch', opcionA: 'Que un hater te done 1000 bits solo para decir que tu skin es fea', opcionB: 'Que tu moderador de confianza te banee sin querer por 24 horas en medio de una partida' },
    { id: 25, categoria: 'Fortnite x Twitch', opcionA: 'Hacer un stream donde el chat controla tus teclas de construcción mediante comandos', opcionB: 'Hacer un stream donde la sensibilidad de tu ratón cambia al azar cada minuto' },
    { id: 26, categoria: 'Fortnite x Twitch', opcionA: 'Ganar una partida mítica pero que Twitch silencie todo el VOD por copyright', opcionB: 'Perder de forma humillante y que el clip sea lo más visto de tu canal este año' },
    { id: 27, categoria: 'Fortnite x Twitch', opcionA: 'Que Epic Games te mande un paquete misterioso pero te prohíba abrirlo en directo', opcionB: 'Abrirlo en directo con 5000 viewers y que solo contenga merchandising defectuoso' },
    { id: 28, categoria: 'Fortnite x Twitch', opcionA: 'Tener que hacer cosplay de Banano (Peely) en pleno agosto durante 8 horas', opcionB: 'Hacer cosplay de Midas pero no poder tocar el teclado porque lo manchas de pintura dorada' },
    { id: 29, categoria: 'Fortnite x Twitch', opcionA: 'Que el chat te obligue a hablar con acento francés cada vez que te echas minis', opcionB: 'Que el chat te obligue a hacer 10 flexiones cada vez que fallas un tiro de escopeta' },
    { id: 30, categoria: 'Fortnite x Twitch', opcionA: 'Encontrar una Llama mítica dorada pero que un bug te devuelva al lobby', opcionB: 'Que un viewer te regale 50 subs a cambio de que te dejes eliminar por un bot de la IA' },
    { id: 31, categoria: 'Fortnite x Twitch', opcionA: 'Jugar con un pro player que te carrea a la victoria pero te ignora todo el directo', opcionB: 'Jugar con un viewer muy simpático que destruye tus coberturas sin querer' },
    { id: 32, categoria: 'Fortnite x Twitch', opcionA: 'Que se filtren las notas del parche confidencial en tu pantalla y Epic te llame la atención', opcionB: 'Hacer un stream de 4 horas prediciendo el evento final y fallar en absolutamente todo' },
    { id: 33, categoria: 'Fortnite x Twitch', opcionA: 'Hacer la colaboración de Fortnite de tus sueños pero tener 500 de ping constantes', opcionB: 'Tener conexión perfecta pero jugar con un streamer invitado que no para de gritar' },
    { id: 34, categoria: 'Fortnite x Twitch', opcionA: 'Que el chat canjee un premio para que sueltes el teclado en pleno combate final', opcionB: 'Que te canjeen cambiar tus controles por defecto en medio de una rotación' },
    { id: 35, categoria: 'Fortnite x Twitch', opcionA: 'Ser reconocido mundialmente por un clip donde un coche te atropella volando por el mapa', opcionB: 'Hacer la mejor jugada de francotirador de tu vida y que absolutamente nadie esté grabando' }
  ];

  // ========================================================================
  // 2. STATE MANAGEMENT & SCORING TRACKER
  // ========================================================================
  let currentDilemmaIndex = 0;
  let isVotingOpen = false; // Closed by default until streamer opens it
  let isRevealed = false;
  let isAudioEnabled = true;
  let totalVoteMessagesReceived = 0;

  // Global Hive Mind User Score Tracker (accumulated across all 35 rounds)
  let puntuacionUsuarios = {};

  // Sets for unique voters in the current active dilemma
  let roundVotersA = new Set();
  let roundVotersB = new Set();

  const porcentajeMinimo = 0.60; // 60% accuracy filter
  const totalRondas = 35;
  let lastExtractedWinners = [];

  // Audio Context Synthesizer
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

      if (type === 'vote') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(820, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.08);

      } else if (type === 'reveal') {
        const freqs = [349.23, 440, 523.25, 659.25, 880];
        freqs.forEach((f, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + idx * 0.05);
          gain.gain.setValueAtTime(0.16, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.65);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.7);
        });

      } else if (type === 'transition') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.16);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.16);

      } else if (type === 'hover') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(340, now + 0.06);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      }
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return String(str);
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ========================================================================
  // 3. DOM ELEMENTS
  // ========================================================================
  const categoryThemeBadge = document.getElementById('categoryThemeBadge');
  const categoryIcon = document.getElementById('categoryIcon');
  const categoryLabel = document.getElementById('categoryLabel');
  const stickyRoundNum = document.getElementById('stickyRoundNum');
  const btnAudioToggle = document.getElementById('btnAudioToggle');
  const btnFullscreenToggle = document.getElementById('btnFullscreenToggle');

  // Split Stage Elements (Game Area)
  const duelSplitStage = document.getElementById('duelSplitStage');
  const optionCardA = document.getElementById('optionCardA');
  const optionCardB = document.getElementById('optionCardB');
  const optionTextA = document.getElementById('optionTextA');
  const optionTextB = document.getElementById('optionTextB');
  const winnerCrownA = document.getElementById('winnerCrownA');
  const winnerCrownB = document.getElementById('winnerCrownB');
  const votingStatsA = document.getElementById('votingStatsA');
  const votingStatsB = document.getElementById('votingStatsB');
  const percentageNumA = document.getElementById('percentageNumA');
  const percentageNumB = document.getElementById('percentageNumB');
  const voteCountA = document.getElementById('voteCountA');
  const voteCountB = document.getElementById('voteCountB');
  const voteProgressFillA = document.getElementById('voteProgressFillA');
  const voteProgressFillB = document.getElementById('voteProgressFillB');
  const centralDivider = document.getElementById('centralDivider');

  // Chat Radar Terminal Elements (Chat Area)
  const radarChatMessages = document.getElementById('radarChatMessages');
  const radarWsBadge = document.getElementById('radarWsBadge');
  const radarMsgCount = document.getElementById('radarMsgCount');
  const radarTargetText = document.getElementById('radarTargetText');

  // Streamer Dock Buttons
  const btnOpenVoting = document.getElementById('btnOpenVoting');
  const btnCloseVoting = document.getElementById('btnCloseVoting');
  const btnRevealResults = document.getElementById('btnRevealResults');
  const btnNextDilemma = document.getElementById('btnNextDilemma');
  const btnPrevDilemma = document.getElementById('btnPrevDilemma');
  const btnResetRound = document.getElementById('btnResetRound');
  const btnExtractWinners = document.getElementById('btnExtractWinners');
  const btnTestVoteA = document.getElementById('btnTestVoteA');
  const btnTestVoteB = document.getElementById('btnTestVoteB');
  const btnSimulateVotes = document.getElementById('btnSimulateVotes');

  // Winners Modal Elements
  const winnersModalOverlay = document.getElementById('winnersModalOverlay');
  const btnCloseWinnersModal = document.getElementById('btnCloseWinnersModal');
  const btnConfirmCloseModal = document.getElementById('btnConfirmCloseModal');
  const btnDownloadTxtAgain = document.getElementById('btnDownloadTxtAgain');
  const winnersPodiumList = document.getElementById('winnersPodiumList');
  const winnersStatsSummary = document.getElementById('winnersStatsSummary');

  // ========================================================================
  // 4. RADAR & CHAT TERMINAL LOGGER
  // ========================================================================
  function appendRadarTerminalLine(author, message, type = 'user') {
    if (!radarChatMessages) return;

    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;

    if (type === 'sys') {
      line.innerHTML = `<span class="terminal-coord">[SYS_STATUS]</span> <span class="terminal-msg">${escapeHtml(message)}</span>`;
    } else if (type === 'vote-a') {
      line.innerHTML = `<span class="terminal-coord" style="color: #FF007A;">[VOTO_A]</span> <span class="terminal-author">@${escapeHtml(author)}:</span> votó por <strong style="color: #FF80BF;">OPCIÓN A</strong>`;
    } else if (type === 'vote-b') {
      line.innerHTML = `<span class="terminal-coord" style="color: #00D2FF;">[VOTO_B]</span> <span class="terminal-author">@${escapeHtml(author)}:</span> votó por <strong style="color: #80E5FF;">OPCIÓN B</strong>`;
    } else {
      line.innerHTML = `<span class="terminal-coord">[VOTO_RECV]</span> <span class="terminal-author">@${escapeHtml(author)}:</span> ${escapeHtml(message)}`;
    }

    radarChatMessages.appendChild(line);

    radarChatMessages.scrollTo({
      top: radarChatMessages.scrollHeight,
      behavior: 'smooth'
    });

    if (radarChatMessages.children.length > 90) {
      radarChatMessages.removeChild(radarChatMessages.firstChild);
    }
  }

  // ========================================================================
  // 5. VOTING FLOW CONTROL (OPEN / CLOSE)
  // ========================================================================
  function openVoting() {
    isVotingOpen = true;
    if (btnOpenVoting) btnOpenVoting.classList.add('is-active');
    if (btnCloseVoting) btnCloseVoting.classList.remove('is-active');

    if (radarWsBadge) {
      radarWsBadge.textContent = '🟢 VOTACIÓN ABIERTA';
      radarWsBadge.style.color = '#00FA9A';
      radarWsBadge.style.borderColor = '#00FA9A';
    }

    appendRadarTerminalLine('SISTEMA', `🟢 Votación ABIERTA para el Dilema #${currentDilemmaIndex + 1}. ¡El chat ya puede votar!`, 'sys');
    playSound('vote');
  }

  function closeVoting() {
    isVotingOpen = false;
    if (btnCloseVoting) btnCloseVoting.classList.add('is-active');
    if (btnOpenVoting) btnOpenVoting.classList.remove('is-active');

    if (radarWsBadge) {
      radarWsBadge.textContent = '🔴 VOTACIÓN CERRADA';
      radarWsBadge.style.color = '#FF3366';
      radarWsBadge.style.borderColor = '#FF3366';
    }

    appendRadarTerminalLine('SISTEMA', `🔴 Votación CERRADA para el Dilema #${currentDilemmaIndex + 1}.`, 'sys');
    playSound('vote');
  }

  // ========================================================================
  // 6. RENDER DILEMMA FUNCTION
  // ========================================================================
  function renderDilemma(index) {
    if (index < 0 || index >= DILEMAS_DATA.length) return;
    currentDilemmaIndex = index;
    const item = DILEMAS_DATA[index];

    // Reset round sets & state
    roundVotersA.clear();
    roundVotersB.clear();
    isRevealed = false;

    // Reset flow: closed until streamer clicks "Abrir Votación"
    closeVoting();

    // Check if we are at Round 35 (Index 34)
    if (btnExtractWinners) {
      if (index === DILEMAS_DATA.length - 1) {
        btnExtractWinners.style.display = 'inline-flex';
      } else {
        btnExtractWinners.style.display = 'none';
      }
    }

    // Update Top Counter & Active Target
    if (stickyRoundNum) stickyRoundNum.textContent = index + 1;
    if (radarTargetText) {
      radarTargetText.innerHTML = `<span class="radar-ping-dot"></span> DILEMA ACTUAL: <strong>#${(index + 1).toString().padStart(2, '0')}</strong> // ${item.categoria.toUpperCase()}`;
    }

    // Update Category Theme Badge
    if (categoryThemeBadge) {
      categoryThemeBadge.className = 'category-theme-badge';
      if (item.categoria.includes('Fortnite') || item.categoria.includes('Twitch')) {
        categoryThemeBadge.classList.add('cat-fortnite');
        if (categoryIcon) categoryIcon.className = 'fas fa-gamepad';
        if (categoryLabel) categoryLabel.textContent = 'FORTNITE x TWITCH';
      } else if (item.categoria === 'Streamer Life') {
        categoryThemeBadge.classList.add('cat-streamer');
        if (categoryIcon) categoryIcon.className = 'fas fa-tv';
        if (categoryLabel) categoryLabel.textContent = 'TEMÁTICA: VIDA DE STREAMER';
      } else {
        categoryThemeBadge.classList.add('cat-salseo');
        if (categoryIcon) categoryIcon.className = 'fas fa-fire';
        if (categoryLabel) categoryLabel.textContent = 'TEMÁTICA: SALSEO SANO';
      }
    }

    // Update Option Texts
    if (optionTextA) optionTextA.textContent = item.opcionA;
    if (optionTextB) optionTextB.textContent = item.opcionB;

    // Reset Visual & Winning States
    if (winnerCrownA) winnerCrownA.style.display = 'none';
    if (winnerCrownB) winnerCrownB.style.display = 'none';

    // Reset Stats Blocks to Hidden
    if (votingStatsA) votingStatsA.classList.add('is-hidden-results');
    if (votingStatsB) votingStatsB.classList.add('is-hidden-results');
    if (percentageNumA) percentageNumA.textContent = '--%';
    if (percentageNumB) percentageNumB.textContent = '--%';
    if (voteCountA) voteCountA.innerHTML = '<strong>0</strong> votos';
    if (voteCountB) voteCountB.innerHTML = '<strong>0</strong> votos';
    if (voteProgressFillA) voteProgressFillA.style.width = '0%';
    if (voteProgressFillB) voteProgressFillB.style.width = '0%';

    // Reset Hover Expansion to 50/50
    if (optionCardA && optionCardB && centralDivider) {
      optionCardA.classList.remove('is-hovered', 'is-pushed');
      optionCardB.classList.remove('is-hovered', 'is-pushed');
      centralDivider.style.left = '50%';
    }

    appendRadarTerminalLine('SISTEMA', `Dilema #${item.id} (${item.categoria}) cargado. Pulsa "🟢 Abrir Votación" para comenzar.`, 'sys');
    playSound('transition');
  }

  // ========================================================================
  // 7. VOTE PROCESSING LOGIC (ANTI-DUPLICATE & LIVE FEED)
  // ========================================================================
  function castVote(option, username = 'Anonimo') {
    if (!isVotingOpen) return;
    const cleanUser = username.trim();
    const userKey = cleanUser.toLowerCase();

    // Prevent duplicate votes per user in current dilemma
    if (roundVotersA.has(userKey) || roundVotersB.has(userKey)) return;

    totalVoteMessagesReceived++;

    if (radarMsgCount) {
      radarMsgCount.innerHTML = `<strong>${totalVoteMessagesReceived}</strong> VOTOS_RECV`;
    }

    if (option === 'A') {
      roundVotersA.add(userKey);
      appendRadarTerminalLine(cleanUser, 'A', 'vote-a');
    } else if (option === 'B') {
      roundVotersB.add(userKey);
      appendRadarTerminalLine(cleanUser, 'B', 'vote-b');
    }

    // Update Live Count Labels
    if (voteCountA) voteCountA.innerHTML = `<strong>${roundVotersA.size}</strong> votos`;
    if (voteCountB) voteCountB.innerHTML = `<strong>${roundVotersB.size}</strong> votos`;

    // If already revealed, update percentages live
    if (isRevealed) {
      calculateAndDisplayPercentages(false);
    }

    playSound('vote');
  }

  // ========================================================================
  // 8. PERCENTAGE CALCULATION & HIVE MIND SCORING
  // ========================================================================
  function revealResults() {
    isRevealed = true;
    closeVoting(); // Lock inputs automatically upon reveal

    if (votingStatsA) votingStatsA.classList.remove('is-hidden-results');
    if (votingStatsB) votingStatsB.classList.remove('is-hidden-results');

    const countA = roundVotersA.size;
    const countB = roundVotersB.size;

    // Award +1 point to all voters of the winning option (Hive Mind Logic)
    if (countA > countB) {
      roundVotersA.forEach(u => {
        puntuacionUsuarios[u] = (puntuacionUsuarios[u] || 0) + 1;
      });
      appendRadarTerminalLine('PUNTUACIÓN', `👑 Opción A ganadora (${countA} vs ${countB}). +1 punto para los ${countA} acertantes.`, 'sys');
    } else if (countB > countA) {
      roundVotersB.forEach(u => {
        puntuacionUsuarios[u] = (puntuacionUsuarios[u] || 0) + 1;
      });
      appendRadarTerminalLine('PUNTUACIÓN', `👑 Opción B ganadora (${countB} vs ${countA}). +1 punto para los ${countB} acertantes.`, 'sys');
    } else if (countA === countB && countA > 0) {
      roundVotersA.forEach(u => {
        puntuacionUsuarios[u] = (puntuacionUsuarios[u] || 0) + 1;
      });
      roundVotersB.forEach(u => {
        puntuacionUsuarios[u] = (puntuacionUsuarios[u] || 0) + 1;
      });
      appendRadarTerminalLine('PUNTUACIÓN', `🤝 ¡Empate! +1 punto para todos los participantes (${countA + countB}).`, 'sys');
    }

    // If on last dilemma (round 35), ensure the final button is visible
    if (currentDilemmaIndex === DILEMAS_DATA.length - 1 && btnExtractWinners) {
      btnExtractWinners.style.display = 'inline-flex';
    }

    calculateAndDisplayPercentages(true);
    playSound('reveal');
  }

  function calculateAndDisplayPercentages(animate = true) {
    const countA = roundVotersA.size;
    const countB = roundVotersB.size;
    const total = countA + countB;
    let pctA = 50;
    let pctB = 50;

    if (total > 0) {
      pctA = Math.round((countA / total) * 100);
      pctB = 100 - pctA;
    }

    // Winner Crown
    if (winnerCrownA) winnerCrownA.style.display = 'none';
    if (winnerCrownB) winnerCrownB.style.display = 'none';

    if (countA > countB) {
      if (winnerCrownA) winnerCrownA.style.display = 'inline-flex';
      triggerConfetti();
    } else if (countB > countA) {
      if (winnerCrownB) winnerCrownB.style.display = 'inline-flex';
      triggerConfetti();
    }

    // Progress Bar Fills
    if (voteProgressFillA) voteProgressFillA.style.width = `${pctA}%`;
    if (voteProgressFillB) voteProgressFillB.style.width = `${pctB}%`;

    if (animate) {
      if (percentageNumA) animateCounter(percentageNumA, pctA);
      if (percentageNumB) animateCounter(percentageNumB, pctB);
    } else {
      if (percentageNumA) percentageNumA.textContent = `${pctA}%`;
      if (percentageNumB) percentageNumB.textContent = `${pctB}%`;
    }
  }

  function animateCounter(el, targetValue) {
    let startVal = 0;
    const duration = 1000;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(startVal + (targetValue - startVal) * easeProgress);
      el.textContent = `${current}%`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${targetValue}%`;
      }
    }
    requestAnimationFrame(step);
  }

  // ========================================================================
  // 9. EXTRACCIÓN DE LOS 3 ELEGIDOS & INFORME TXT
  // ========================================================================
  function extractThreeWinners() {
    const allUsers = Object.keys(puntuacionUsuarios);
    if (allUsers.length === 0) {
      alert('⚠️ Aún no se han registrado votos puntuados en ningún dilema.');
      return;
    }

    const minRequiredPoints = Math.ceil(totalRondas * porcentajeMinimo); // 21 puntos para el 60%
    
    // Filter users with accuracy >= 60%
    const qualifiedUsers = allUsers.filter(u => (puntuacionUsuarios[u] / totalRondas) >= porcentajeMinimo);

    // If less than 3 qualified, fallback gracefully to top scorers
    let candidatePool = qualifiedUsers;
    let usedFallback = false;

    if (candidatePool.length < 3) {
      usedFallback = true;
      candidatePool = allUsers.sort((a, b) => puntuacionUsuarios[b] - puntuacionUsuarios[a]);
    }

    // Random selection of 3 winners from candidate pool
    const shuffled = [...candidatePool].sort(() => 0.5 - Math.random());
    const winners = shuffled.slice(0, Math.min(3, shuffled.length));
    lastExtractedWinners = winners;

    // Render winners in Modal
    if (winnersPodiumList) {
      winnersPodiumList.innerHTML = '';
      winners.forEach((winner, idx) => {
        const points = puntuacionUsuarios[winner] || 0;
        const accuracyPct = ((points / totalRondas) * 100).toFixed(1);
        const card = document.createElement('div');
        card.className = `winner-podium-card winner-rank-${idx + 1}`;
        card.innerHTML = `
          <div class="winner-rank-badge">${idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</div>
          <div class="winner-card-name">@${escapeHtml(winner)}</div>
          <div class="winner-card-score">${points} / ${totalRondas} aciertos (${accuracyPct}%)</div>
        `;
        winnersPodiumList.appendChild(card);
      });
    }

    if (winnersStatsSummary) {
      const qualifiedCount = qualifiedUsers.length;
      const totalParticipants = allUsers.length;
      winnersStatsSummary.innerHTML = `
        Total de participantes registrados: <strong>${totalParticipants}</strong> | 
        Clasificados con ≥60% (${minRequiredPoints}+ aciertos): <strong>${qualifiedCount}</strong>
        ${usedFallback ? '<br><span style="color: #FFD166;">*Se incluyeron mejores puntuaciones generales para completar el podio de 3 ganadores.</span>' : ''}
      `;
    }

    // Open Modal
    if (winnersModalOverlay) {
      winnersModalOverlay.classList.add('active');
    }

    // Trigger celebration & audio
    triggerConfetti();
    playSound('reveal');

    // Automatically trigger TXT download
    downloadWinnersTxtReport(winners, qualifiedUsers);
  }

  function downloadWinnersTxtReport(winners, qualifiedUsers) {
    const minRequiredPoints = Math.ceil(totalRondas * porcentajeMinimo);
    const dateStr = new Date().toLocaleString('es-ES');

    let content = `=================================================================\n`;
    content += `🏆 ESPECIALES IMARIXU - DÍA 3: QUÉ PREFIERES (MENTE COLMENA)\n`;
    content += `=================================================================\n`;
    content += `Fecha del sorteo: ${dateStr}\n`;
    content += `Canal oficial: Twitch.tv/imarixu\n`;
    content += `Total de Dilemas / Rondas: ${totalRondas}\n`;
    content += `Criterio de clasificación: >= ${Math.round(porcentajeMinimo * 100)}% de acierto (${minRequiredPoints}+ aciertos)\n\n`;

    content += `🎉 LOS 3 ELEGIDOS GANADORES DEL DÍA 3 (SORTEO FINAL):\n`;
    winners.forEach((w, idx) => {
      const pts = puntuacionUsuarios[w] || 0;
      const pct = ((pts / totalRondas) * 100).toFixed(1);
      content += `  ${idx + 1}. @${w} -> ${pts}/${totalRondas} aciertos (${pct}%)\n`;
    });

    content += `\n-----------------------------------------------------------------\n`;
    content += `📊 USUARIOS CLASIFICADOS CON >= 60% DE ACIERTOS (${qualifiedUsers.length} usuarios):\n`;
    if (qualifiedUsers.length > 0) {
      qualifiedUsers
        .sort((a, b) => puntuacionUsuarios[b] - puntuacionUsuarios[a])
        .forEach((u, i) => {
          const pts = puntuacionUsuarios[u];
          const pct = ((pts / totalRondas) * 100).toFixed(1);
          content += `  ${(i + 1).toString().padStart(2, '0')}. @${u.padEnd(20, ' ')} : ${pts}/${totalRondas} (${pct}%)\n`;
        });
    } else {
      content += `  Ningún usuario alcanzó el 60% exacto.\n`;
    }

    content += `\n-----------------------------------------------------------------\n`;
    content += `📜 RANKING GLOBAL COMPLETO DE PARTICIPANTES (${Object.keys(puntuacionUsuarios).length} usuarios):\n`;
    Object.keys(puntuacionUsuarios)
      .sort((a, b) => puntuacionUsuarios[b] - puntuacionUsuarios[a])
      .forEach((u, i) => {
        const pts = puntuacionUsuarios[u];
        const pct = ((pts / totalRondas) * 100).toFixed(1);
        content += `  ${(i + 1).toString().padStart(2, '0')}. @${u.padEnd(20, ' ')} : ${pts}/${totalRondas} (${pct}%)\n`;
      });
    content += `=================================================================\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ganadores_dia3_mente_colmena_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ========================================================================
  // 10. CONFINED HOVER TERRITORY EXPANSION (65% vs 35% INSIDE GAME-AREA)
  // ========================================================================
  if (optionCardA && optionCardB && centralDivider) {
    optionCardA.addEventListener('mouseenter', () => {
      optionCardA.classList.add('is-hovered');
      optionCardB.classList.add('is-pushed');
      centralDivider.style.left = '65%';
      playSound('hover');
    });
    optionCardA.addEventListener('mouseleave', () => {
      optionCardA.classList.remove('is-hovered');
      optionCardB.classList.remove('is-pushed');
      centralDivider.style.left = '50%';
    });

    optionCardB.addEventListener('mouseenter', () => {
      optionCardB.classList.add('is-hovered');
      optionCardA.classList.add('is-pushed');
      centralDivider.style.left = '35%';
      playSound('hover');
    });
    optionCardB.addEventListener('mouseleave', () => {
      optionCardB.classList.remove('is-hovered');
      optionCardA.classList.remove('is-pushed');
      centralDivider.style.left = '50%';
    });
  }

  // ========================================================================
  // 11. TWITCH IRC WEBSOCKET INTEGRATION (wss://irc-ws.chat.twitch.tv:443)
  // ========================================================================
  let ws = null;
  const channelName = "imarixu";

  function initTwitchWebSocket() {
    try {
      ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

      ws.onopen = () => {
        const anonymousNick = `justinfan${Math.floor(10000 + Math.random() * 90000)}`;
        ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
        ws.send(`NICK ${anonymousNick}`);
        ws.send(`JOIN #${channelName}`);

        if (radarWsBadge) {
          radarWsBadge.textContent = isVotingOpen ? '🟢 VOTACIÓN ABIERTA' : '🔴 VOTACIÓN CERRADA';
          radarWsBadge.style.color = isVotingOpen ? '#00FA9A' : '#FF3366';
          radarWsBadge.style.borderColor = isVotingOpen ? '#00FA9A' : '#FF3366';
        }
        appendRadarTerminalLine('SISTEMA', `✔ Enlace con Twitch IRC conectado en #${channelName}. A la escucha...`, 'sys');
      };

      ws.onmessage = (event) => {
        const data = event.data;
        if (data.startsWith('PING')) {
          ws.send('PONG :tmi.twitch.tv');
          return;
        }

        const lines = data.split('\r\n');
        lines.forEach(line => {
          if (line.includes('PRIVMSG')) {
            parseTwitchVote(line);
          }
        });
      };

      ws.onerror = (err) => {
        console.warn('Twitch WS error:', err);
        if (radarWsBadge) {
          radarWsBadge.textContent = '🔴 ERROR ENLACE';
          radarWsBadge.style.color = '#FF3366';
        }
      };

      ws.onclose = () => {
        if (radarWsBadge) {
          radarWsBadge.textContent = '🔴 RECONECTANDO...';
          radarWsBadge.style.color = '#FFB703';
        }
        setTimeout(() => initTwitchWebSocket(), 4000);
      };
    } catch (e) {
      console.warn('Twitch WS init failed:', e);
    }
  }

  function parseTwitchVote(rawLine) {
    let username = 'Espectador';
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
        message = rawLine.substring(colonIndex + 2).trim().toLowerCase();
      }
    }

    if (message) {
      if (isVotingOpen) {
        if (
          message === 'a' || 
          message === '1' || 
          message.startsWith('opcion a') || 
          message.startsWith('opción a') || 
          message === '!a' || 
          message === 'rojo' || 
          message === 'morado' ||
          message === 'izquierda'
        ) {
          castVote('A', username);
        } else if (
          message === 'b' || 
          message === '2' || 
          message.startsWith('opcion b') || 
          message.startsWith('opción b') || 
          message === '!b' || 
          message === 'azul' || 
          message === 'cyan' || 
          message === 'derecha'
        ) {
          castVote('B', username);
        } else {
          appendRadarTerminalLine(username, message, 'user');
        }
      } else {
        appendRadarTerminalLine(username, message, 'user');
      }
    }
  }

  // ========================================================================
  // 12. CONFETTI CELEBRATION ENGINE
  // ========================================================================
  const confettiCanvas = document.getElementById('confettiCanvas');
  let confettiCtx = null;
  let particles = [];
  let confettiAnimId = null;

  if (confettiCanvas) {
    confettiCtx = confettiCanvas.getContext('2d');
    function resizeConfetti() {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeConfetti);
    resizeConfetti();
  }

  function triggerConfetti() {
    if (!confettiCtx) return;
    particles = [];
    const colors = ['#FF007A', '#00D2FF', '#9146FF', '#FFD166', '#00FA9A', '#FFFFFF'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: confettiCanvas.width * 0.38 + (Math.random() - 0.5) * 400,
        y: confettiCanvas.height * 0.4,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.9) * 13,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        gravity: 0.28,
        opacity: 1
      });
    }

    if (!confettiAnimId) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    if (!confettiCtx) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.012;

      if (p.opacity <= 0 || p.y > confettiCanvas.height) {
        particles.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = p.opacity;
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      confettiCtx.restore();
    }

    if (particles.length > 0) {
      confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
      confettiAnimId = null;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // ========================================================================
  // 13. SIMULATED VOTING GENERATOR (FOR OFFLINE / TEST SESSIONS)
  // ========================================================================
  function simulateAudienceVotes() {
    if (!isVotingOpen) {
      openVoting();
    }
    const totalSimulated = Math.floor(Math.random() * 35) + 20; // 20-55 votes
    const names = [
      'RubenDev', 'AriGamer', 'TwitchViewer', 'FortnitePro', 'SalseoFan', 
      'VicRoyale', 'LootMaster', 'ChatLover', 'ArixuSub', 'ClipGod',
      'Builder99', 'NoBuildKing', 'SniperGhost', 'TiltedResident', 'ZeusFan',
      'PedroGamer', 'LauraTwitch', 'CarlosFN', 'MartaArixu', 'NicoPro',
      'SitoGamerz', 'NeusArtist', 'Jaratos', 'TwitchGod', 'FortniteQueen'
    ];

    for (let i = 0; i < totalSimulated; i++) {
      const randomName = `${names[Math.floor(Math.random() * names.length)]}_${Math.floor(Math.random() * 99)}`;
      const randomOption = Math.random() > 0.48 ? 'A' : 'B';
      castVote(randomOption, randomName);
    }
  }

  // ========================================================================
  // 14. STREAMER DOCK & EVENT LISTENERS
  // ========================================================================
  
  // Click on Option Cards to Vote
  if (optionCardA) {
    optionCardA.addEventListener('click', () => {
      castVote('A', 'ImArixu (Streamer)');
    });
  }

  if (optionCardB) {
    optionCardB.addEventListener('click', () => {
      castVote('B', 'ImArixu (Streamer)');
    });
  }

  // Open Voting Button
  if (btnOpenVoting) {
    btnOpenVoting.addEventListener('click', () => {
      openVoting();
    });
  }

  // Close Voting Button
  if (btnCloseVoting) {
    btnCloseVoting.addEventListener('click', () => {
      closeVoting();
    });
  }

  // Reveal Percentages Button
  if (btnRevealResults) {
    btnRevealResults.addEventListener('click', () => {
      revealResults();
    });
  }

  // Next Dilemma
  if (btnNextDilemma) {
    btnNextDilemma.addEventListener('click', () => {
      if (currentDilemmaIndex < DILEMAS_DATA.length - 1) {
        renderDilemma(currentDilemmaIndex + 1);
      } else {
        alert('🎉 ¡Has completado los 35 dilemas de Qué Prefieres: Edición ImArixu! Pulsa "🏆 Extraer 3 Elegidos" para el sorteo final.');
      }
    });
  }

  // Previous Dilemma
  if (btnPrevDilemma) {
    btnPrevDilemma.addEventListener('click', () => {
      if (currentDilemmaIndex > 0) {
        renderDilemma(currentDilemmaIndex - 1);
      }
    });
  }

  // Reset Round
  if (btnResetRound) {
    btnResetRound.addEventListener('click', () => {
      renderDilemma(currentDilemmaIndex);
    });
  }

  // Extraer 3 Elegidos Button
  if (btnExtractWinners) {
    btnExtractWinners.addEventListener('click', () => {
      extractThreeWinners();
    });
  }

  // Manual Test Buttons
  if (btnTestVoteA) {
    btnTestVoteA.addEventListener('click', () => {
      if (!isVotingOpen) openVoting();
      castVote('A', `Tester_${Math.floor(Math.random() * 1000)}`);
    });
  }

  if (btnTestVoteB) {
    btnTestVoteB.addEventListener('click', () => {
      if (!isVotingOpen) openVoting();
      castVote('B', `Tester_${Math.floor(Math.random() * 1000)}`);
    });
  }

  // Simulate Audience
  if (btnSimulateVotes) {
    btnSimulateVotes.addEventListener('click', () => {
      simulateAudienceVotes();
    });
  }

  // Modal Close Listeners
  if (btnCloseWinnersModal) {
    btnCloseWinnersModal.addEventListener('click', () => {
      if (winnersModalOverlay) winnersModalOverlay.classList.remove('active');
    });
  }

  if (btnConfirmCloseModal) {
    btnConfirmCloseModal.addEventListener('click', () => {
      if (winnersModalOverlay) winnersModalOverlay.classList.remove('active');
    });
  }

  if (winnersModalOverlay) {
    winnersModalOverlay.addEventListener('click', (e) => {
      if (e.target === winnersModalOverlay) {
        winnersModalOverlay.classList.remove('active');
      }
    });
  }

  if (btnDownloadTxtAgain) {
    btnDownloadTxtAgain.addEventListener('click', () => {
      if (lastExtractedWinners.length > 0) {
        const qualifiedUsers = Object.keys(puntuacionUsuarios).filter(u => (puntuacionUsuarios[u] / totalRondas) >= porcentajeMinimo);
        downloadWinnersTxtReport(lastExtractedWinners, qualifiedUsers);
      }
    });
  }

  // Audio Toggle
  if (btnAudioToggle) {
    btnAudioToggle.addEventListener('click', () => {
      isAudioEnabled = !isAudioEnabled;
      btnAudioToggle.innerHTML = isAudioEnabled
        ? '<i class="fas fa-volume-up"></i> Audio: ON'
        : '<i class="fas fa-volume-mute"></i> Audio: OFF';
      btnAudioToggle.classList.toggle('active', isAudioEnabled);
    });
  }

  // Fullscreen Toggle
  if (btnFullscreenToggle) {
    btnFullscreenToggle.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => console.warn(e));
      } else {
        document.exitFullscreen();
      }
    });
  }

  // Keyboard Shortcuts for Streamer
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key.toLowerCase();
    if (key === '1' || key === 'a') {
      castVote('A', 'ImArixu (Teclado)');
    } else if (key === '2' || key === 'b') {
      castVote('B', 'ImArixu (Teclado)');
    } else if (key === 'o') {
      openVoting();
    } else if (key === 'c') {
      closeVoting();
    } else if (e.code === 'Space') {
      e.preventDefault();
      revealResults();
    } else if (key === 'n' || e.code === 'ArrowRight') {
      e.preventDefault();
      if (currentDilemmaIndex < DILEMAS_DATA.length - 1) {
        renderDilemma(currentDilemmaIndex + 1);
      }
    } else if (key === 'p' || e.code === 'ArrowLeft') {
      e.preventDefault();
      if (currentDilemmaIndex > 0) {
        renderDilemma(currentDilemmaIndex - 1);
      }
    } else if (key === 'r') {
      renderDilemma(currentDilemmaIndex);
    } else if (key === 's') {
      simulateAudienceVotes();
    } else if (key === 'e' && currentDilemmaIndex === DILEMAS_DATA.length - 1) {
      extractThreeWinners();
    }
  });

  // ========================================================================
  // 15. INITIALIZATION
  // ========================================================================
  renderDilemma(0);
  initTwitchWebSocket();
  console.log('⚔️ Duelo de Decisiones (75% Game / 25% Chat) con Mente Colmena iniciado.');
});
