/* ==========================================================================
   ESPECIALES ARIXU - DÍA 3: QUÉ PREFIERES (DUELO DE DECISIONES) ENGINE
   Features:
   1. 20 Iconic Polarized Dilemmas structured in 3 Pillars (Fortnite, Streamer Life, Salseo Sano)
   2. 75% Confined Game-Area Split Duel with Territory Expansion Hover (65% vs 35%)
   3. 25% Twitch Communications Terminal (#imarixu live feed, vote logger & radar)
   4. Real-time Twitch IRC Chat Voting & Anti-Duplicate Vote Tracker
   5. High-Impact Animated Percentage Reveals & Winner Crowning
   6. Procedural Web Audio API Sound Synthesizer & Canvas Confetti Generator
   7. Full Streamer Controls & Keyboard Shortcuts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. DATA: 35 DILEMAS: FORTNITE x STREAMER LIFE (1-35)
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
  // 2. STATE MANAGEMENT
  // ========================================================================
  let currentDilemmaIndex = 0;
  let isVotingOpen = true;
  let isRevealed = false;
  let isAudioEnabled = true;
  let totalVoteMessagesReceived = 0;

  // Votes Storage for Current Dilemma
  let votesA = 0;
  let votesB = 0;
  const votedUsers = new Set(); // 1 vote per Twitch user per dilemma

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
  const btnToggleVoting = document.getElementById('btnToggleVoting');
  const btnToggleVotingText = document.getElementById('btnToggleVotingText');
  const btnRevealResults = document.getElementById('btnRevealResults');
  const btnNextDilemma = document.getElementById('btnNextDilemma');
  const btnPrevDilemma = document.getElementById('btnPrevDilemma');
  const btnResetRound = document.getElementById('btnResetRound');
  const btnTestVoteA = document.getElementById('btnTestVoteA');
  const btnTestVoteB = document.getElementById('btnTestVoteB');
  const btnSimulateVotes = document.getElementById('btnSimulateVotes');

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
  // 5. RENDER DILEMMA FUNCTION
  // ========================================================================
  function renderDilemma(index) {
    if (index < 0 || index >= DILEMAS_DATA.length) return;
    currentDilemmaIndex = index;
    const item = DILEMAS_DATA[index];

    // Reset votes & state
    votesA = 0;
    votesB = 0;
    votedUsers.clear();
    isRevealed = false;
    isVotingOpen = true;

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
    winnerCrownA.style.display = 'none';
    winnerCrownB.style.display = 'none';

    // Reset Stats Blocks to Hidden
    votingStatsA.classList.add('is-hidden-results');
    votingStatsB.classList.add('is-hidden-results');
    percentageNumA.textContent = '--%';
    percentageNumB.textContent = '--%';
    voteCountA.innerHTML = '<strong>0</strong> votos';
    voteCountB.innerHTML = '<strong>0</strong> votos';
    voteProgressFillA.style.width = '0%';
    voteProgressFillB.style.width = '0%';

    // Reset Dock Button Text
    if (btnToggleVotingText) btnToggleVotingText.textContent = 'Cerrar Votación';

    // Reset Hover Expansion to 50/50
    if (optionCardA && optionCardB && centralDivider) {
      optionCardA.classList.remove('is-hovered', 'is-pushed');
      optionCardB.classList.remove('is-hovered', 'is-pushed');
      centralDivider.style.left = '50%';
    }

    appendRadarTerminalLine('SISTEMA', `Dilema #${item.id} (${item.categoria}) cargado. Votación abierta en #imarixu...`, 'sys');
    playSound('transition');
  }

  // ========================================================================
  // 6. VOTE PROCESSING LOGIC
  // ========================================================================
  function castVote(option, username = 'Anonimo') {
    if (!isVotingOpen) return;
    if (votedUsers.has(username.toLowerCase())) return;

    votedUsers.add(username.toLowerCase());
    totalVoteMessagesReceived++;

    if (radarMsgCount) {
      radarMsgCount.innerHTML = `<strong>${totalVoteMessagesReceived}</strong> VOTOS_RECV`;
    }

    if (option === 'A') {
      votesA++;
      appendRadarTerminalLine(username, 'A', 'vote-a');
    } else if (option === 'B') {
      votesB++;
      appendRadarTerminalLine(username, 'B', 'vote-b');
    }

    // Update Live Count Labels
    if (voteCountA) voteCountA.innerHTML = `<strong>${votesA}</strong> votos`;
    if (voteCountB) voteCountB.innerHTML = `<strong>${votesB}</strong> votos`;

    // If already revealed, update percentages live
    if (isRevealed) {
      calculateAndDisplayPercentages(false);
    }

    playSound('vote');
  }

  // ========================================================================
  // 7. PERCENTAGE CALCULATION & REVEAL ANIMATION
  // ========================================================================
  function revealResults() {
    isRevealed = true;
    isVotingOpen = false;

    if (btnToggleVotingText) btnToggleVotingText.textContent = 'Reabrir Votación';

    votingStatsA.classList.remove('is-hidden-results');
    votingStatsB.classList.remove('is-hidden-results');

    calculateAndDisplayPercentages(true);
    appendRadarTerminalLine('SISTEMA', `Resultados revelados para el Dilema #${currentDilemmaIndex + 1}.`, 'sys');
    playSound('reveal');
  }

  function calculateAndDisplayPercentages(animate = true) {
    const total = votesA + votesB;
    let pctA = 50;
    let pctB = 50;

    if (total > 0) {
      pctA = Math.round((votesA / total) * 100);
      pctB = 100 - pctA;
    }

    // Winner Crown
    winnerCrownA.style.display = 'none';
    winnerCrownB.style.display = 'none';

    if (votesA > votesB) {
      winnerCrownA.style.display = 'inline-flex';
      triggerConfetti();
    } else if (votesB > votesA) {
      winnerCrownB.style.display = 'inline-flex';
      triggerConfetti();
    }

    // Progress Bar Fills
    voteProgressFillA.style.width = `${pctA}%`;
    voteProgressFillB.style.width = `${pctB}%`;

    if (animate) {
      animateCounter(percentageNumA, pctA);
      animateCounter(percentageNumB, pctB);
    } else {
      percentageNumA.textContent = `${pctA}%`;
      percentageNumB.textContent = `${pctB}%`;
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
  // 8. CONFINED HOVER TERRITORY EXPANSION (65% vs 35% INSIDE GAME-AREA)
  // ========================================================================
  if (optionCardA && optionCardB && centralDivider) {
    // Side A Hover (65% left, 35% right)
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

    // Side B Hover (35% left, 65% right)
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
  // 9. TWITCH IRC WEBSOCKET INTEGRATION (wss://irc-ws.chat.twitch.tv:443)
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
          radarWsBadge.textContent = '● RECEPTOR ACTIVO';
          radarWsBadge.style.color = '#00FA9A';
          radarWsBadge.style.borderColor = '#00FA9A';
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
          // Normal chat log
          appendRadarTerminalLine(username, message, 'user');
        }
      } else {
        appendRadarTerminalLine(username, message, 'user');
      }
    }
  }

  // ========================================================================
  // 10. CONFETTI CELEBRATION ENGINE
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
  // 11. SIMULATED VOTING GENERATOR (FOR OFFLINE / TEST SESSIONS)
  // ========================================================================
  function simulateAudienceVotes() {
    const totalSimulated = Math.floor(Math.random() * 40) + 25; // 25-65 votes
    const names = [
      'RubenDev', 'AriGamer', 'TwitchViewer', 'FortnitePro', 'SalseoFan', 
      'VicRoyale', 'LootMaster', 'ChatLover', 'ArixuSub', 'ClipGod',
      'Builder99', 'NoBuildKing', 'SniperGhost', 'TiltedResident', 'ZeusFan'
    ];

    for (let i = 0; i < totalSimulated; i++) {
      const randomName = `${names[Math.floor(Math.random() * names.length)]}_${Math.floor(Math.random() * 999)}`;
      const randomOption = Math.random() > 0.48 ? 'A' : 'B';
      castVote(randomOption, randomName);
    }
  }

  // ========================================================================
  // 12. STREAMER DOCK & INTERACTIVE EVENT LISTENERS
  // ========================================================================
  
  // Click on Option Cards to Vote / Select
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

  // Toggle Voting Button
  if (btnToggleVoting) {
    btnToggleVoting.addEventListener('click', () => {
      isVotingOpen = !isVotingOpen;
      if (btnToggleVotingText) {
        btnToggleVotingText.textContent = isVotingOpen ? 'Cerrar Votación' : 'Abrir Votación';
      }
      appendRadarTerminalLine('SISTEMA', isVotingOpen ? 'Votación reabierta por el streamer.' : 'Votación cerrada por el streamer.', 'sys');
      playSound('vote');
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
        alert('🎉 ¡Has completado los 35 dilemas de Qué Prefieres: Edición ImArixu!');
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

  // Manual Test Buttons
  if (btnTestVoteA) {
    btnTestVoteA.addEventListener('click', () => {
      castVote('A', `Tester_${Math.floor(Math.random() * 1000)}`);
    });
  }

  if (btnTestVoteB) {
    btnTestVoteB.addEventListener('click', () => {
      castVote('B', `Tester_${Math.floor(Math.random() * 1000)}`);
    });
  }

  // Simulate Audience
  if (btnSimulateVotes) {
    btnSimulateVotes.addEventListener('click', () => {
      simulateAudienceVotes();
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
    }
  });

  // ========================================================================
  // 13. INITIALIZATION
  // ========================================================================
  renderDilemma(0);
  initTwitchWebSocket();
  console.log('⚔️ Duelo de Decisiones (75% Game / 25% Chat) iniciado.');
});
