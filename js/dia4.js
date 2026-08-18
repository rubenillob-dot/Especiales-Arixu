/* ==========================================================================
   ESPECIALES ARIXU - DÍA 4: TRIVIAL HISTORIA DE FORTNITE (KAHOOT ENGINE)
   Features:
   1. 30 Historically accurate questions covering Events, Mythics, Vehicles & Lore.
   2. Kahoot Speed Scoring Formula: Puntos = Round( 1000 * (SegundosRestantes / 20) ).
   3. Real-time Twitch IRC Chat integration (#imarixu) with first-vote filtering.
   4. High-precision 20s Circular & Linear Countdown Timer.
   5. Dynamic 2x2 Answer Grid with Reveal highlights and dimming.
   6. Live Top 10 Leaderboard & Top 3 Epic Podium Transition.
   7. Web Audio API Synthesizer & Canvas Confetti Engine.
   8. Full TXT Report generation for all participants.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. BASE DE DATOS DE PREGUNTAS (30 PREGUNTAS SOBRE LORE DE FORTNITE)
  // ========================================================================
  const PREGUNTAS_TRIVIAL = [
    {
      id: 1,
      categoria: "EVENTOS EN VIVO",
      pregunta: "¿Qué objeto impactó contra Polvorín Polvoriento (Dusty Depot) al inicio de la Temporada 4 del Capítulo 1?",
      opciones: {
        A: "Un misil",
        B: "Un meteorito",
        C: "Un cubo morado",
        D: "Un ovni"
      },
      correcta: "B"
    },
    {
      id: 2,
      categoria: "VEHÍCULOS CLÁSICOS",
      pregunta: "¿Cuál fue el PRIMER vehículo introducido en la historia del Battle Royale de Fortnite (Temporada 4)?",
      opciones: {
        A: "El Carrito de Golf (ATK)",
        B: "El Boloncho (Baller)",
        C: "El Carrito de la Compra",
        D: "El Quadtaclismo"
      },
      correcta: "C"
    },
    {
      id: 3,
      categoria: "LORE & SECRETOS",
      pregunta: "¿Qué nombre cariñoso le puso la comunidad de Fortnite al misterioso cubo morado gigante de la Temporada 5?",
      opciones: {
        A: "Kevin",
        B: "Beto",
        C: "Bob",
        D: "Gláber"
      },
      correcta: "A"
    },
    {
      id: 4,
      categoria: "EVENTOS EN VIVO",
      pregunta: "¿Quién construyó y lanzó el primer Cohete espacial desde la base de la montaña en la Temporada 4?",
      opciones: {
        A: "El Rey Helado",
        B: "El Visitante (Los Siete)",
        C: "Doctora Slone",
        D: "Midas"
      },
      correcta: "B"
    },
    {
      id: 5,
      categoria: "CONCIERTOS EN VIVO",
      pregunta: "¿Qué famoso artista protagonizó el primer concierto masivo en vivo dentro de Fortnite en Parque Placentero (2019)?",
      opciones: {
        A: "Travis Scott",
        B: "Ariana Grande",
        C: "Marshmello",
        D: "Eminem"
      },
      correcta: "C"
    },
    {
      id: 6,
      categoria: "ARMAS MÍTICAS",
      pregunta: "¿Qué mítica arma cuerpo a cuerpo fue añadida en Pico Polar (T7) y retirada a los pocos días por su poder desmedido?",
      opciones: {
        A: "El Martillo de Thor",
        B: "La Espada del Infinito (Infinity Blade)",
        C: "La Guadaña Sombría",
        D: "La Katana Cinética"
      },
      correcta: "B"
    },
    {
      id: 7,
      categoria: "EVENTOS EN VIVO",
      pregunta: "¿Qué evento puso fin al Capítulo 1 dejando el juego completamente inaccesible durante casi dos días?",
      opciones: {
        A: "La Invasión Alienígena",
        B: "El Agujero Negro (El Fin)",
        C: "El Gran Tsunami",
        D: "La Erupción del Volcán"
      },
      correcta: "B"
    },
    {
      id: 8,
      categoria: "EVENTOS EN VIVO",
      pregunta: "¿Cómo se llamaba el robot gigante construido en Planta de Presión para luchar contra el Monstruo Cattus en la Temporada 9?",
      opciones: {
        A: "Mecha Doggus",
        B: "Titán Omega",
        C: "Gundam Prime",
        D: "Optimus Bot"
      },
      correcta: "A"
    },
    {
      id: 9,
      categoria: "LORE & HISTORIA",
      pregunta: "¿Qué intentó hacer Midas con su 'Dispositivo' en la Temporada 2 del Capítulo 2?",
      opciones: {
        A: "Destruir el Punto Cero",
        B: "Romper y repeler la Tormenta",
        C: "Convertir toda la isla en oro",
        D: "Invocar a Galactus"
      },
      correcta: "B"
    },
    {
      id: 10,
      categoria: "ARMAS ELIMINADAS",
      pregunta: "¿Qué arma de energía legendaria (añadida por error en 2017) fue eliminada en menos de 24 horas?",
      opciones: {
        A: "El Rayo Zapatrón (Zapatron)",
        B: "El Fusil de Riel",
        C: "El Cañón de Plasma",
        D: "El Fusil Térmico con Mira"
      },
      correcta: "A"
    },
    {
      id: 11,
      categoria: "VEHÍCULOS POLÉMICOS",
      pregunta: "¿Qué vehículo biplaza armado con misiles y escudos causó enorme polémica en la Temporada X (10)?",
      opciones: {
        A: "El Tanque Titán",
        B: "El B.R.U.T.O. (Mecha)",
        C: "El Avión Alatormenta X-4",
        D: "El Choppa Artillero"
      },
      correcta: "B"
    },
    {
      id: 12,
      categoria: "LORE PRINCIPAL",
      pregunta: "¿Qué orbe de energía pura es la fuente del bucle temporal y el corazón de la realidad en Fortnite?",
      opciones: {
        A: "El Núcleo Sombra",
        B: "El Orbe del Vacío",
        C: "El Punto Cero (Zero Point)",
        D: "La Esfera de Midas"
      },
      correcta: "C"
    },
    {
      id: 13,
      categoria: "PERSONAJES & LORE",
      pregunta: "¿Qué actor famoso de Hollywood dio voz y rostro al líder de Los Siete, 'El Fundador' (The Foundation)?",
      opciones: {
        A: "Keanu Reeves",
        B: "Dwayne 'The Rock' Johnson",
        C: "Ryan Reynolds",
        D: "Vin Diesel"
      },
      correcta: "B"
    },
    {
      id: 14,
      categoria: "CONCIERTOS EN VIVO",
      pregunta: "¿En qué temporada del Capítulo 2 se celebró el legendario evento musical 'Astronomical' de Travis Scott?",
      opciones: {
        A: "Capítulo 2 - Temporada 1",
        B: "Capítulo 2 - Temporada 2",
        C: "Capítulo 2 - Temporada 4",
        D: "Capítulo 2 - Temporada 5"
      },
      correcta: "B"
    },
    {
      id: 15,
      categoria: "EVENTOS COMUNITARIOS",
      pregunta: "¿Qué arma votó masivamente la comunidad para 'desvaultar' en el evento de la Bóveda en Balsa Botín (T8)?",
      opciones: {
        A: "El Subfusil de Tambor (Drum Gun)",
        B: "El Misil Teledirigido",
        C: "La Escopeta Táctica",
        D: "El Fusil de Caza"
      },
      correcta: "A"
    },
    {
      id: 16,
      categoria: "HISTORIA DEL JUEGO",
      pregunta: "¿En qué temporada se lanzó oficialmente el revolucionario modo 'Cero Construcción' (Zero Build)?",
      opciones: {
        A: "Capítulo 3 - Temporada 2",
        B: "Capítulo 2 - Temporada 7",
        C: "Capítulo 1 - Temporada 8",
        D: "Capítulo 4 - Temporada 1"
      },
      correcta: "A"
    },
    {
      id: 17,
      categoria: "EVENTOS MARVEL",
      pregunta: "¿Con qué vehículos modificados con bombas guiadas atacamos a Galactus en el evento del C2S4?",
      opciones: {
        A: "Aviones Alatormenta",
        B: "Autobuses de Batalla conducidos por jugadores",
        C: "Carritos de Golf voladores",
        D: "Lanchas motoras con turbo"
      },
      correcta: "B"
    },
    {
      id: 18,
      categoria: "LORE & VILLANOS",
      pregunta: "¿Qué estructura dorada construyó la Reina del Cubo en el centro del mapa durante el C2S8?",
      opciones: {
        A: "La Fortaleza Carmesí",
        B: "La Pirámide / La Convergencia",
        C: "El Obelisco del Juicio",
        D: "El Trono de Hielo"
      },
      correcta: "B"
    },
    {
      id: 19,
      categoria: "MAPAS & CIUDADES",
      pregunta: "¿Qué icónica ciudad repleta de rascacielos y acción fue introducida en la Temporada 2 del Capítulo 1?",
      opciones: {
        A: "Parque Placentero",
        B: "Pisos Picados (Tilted Towers)",
        C: "Señorío de la Sal",
        D: "Ciudad Comercio"
      },
      correcta: "B"
    },
    {
      id: 20,
      categoria: "LORE & FACCIONES",
      pregunta: "¿Cómo se llama la tiránica organización enemiga que controlaba la isla y el Bucle temporal?",
      opciones: {
        A: "La Orden Imaginada (IO)",
        B: "La Flota Oscura",
        C: "El Gremio del Bucle",
        D: "Sector Cero"
      },
      correcta: "A"
    },
    {
      id: 21,
      categoria: "EVENTOS DE MAPA",
      pregunta: "¿Qué orbe congelado flotaba sobre Pico Polar antes de desatar la tormenta invernal en la Temporada 7?",
      opciones: {
        A: "La Esfera de Hielo del Rey Helado",
        B: "El Ojo de Tormenta",
        C: "El Cristal Polar",
        D: "El Huevo del Dragón"
      },
      correcta: "A"
    },
    {
      id: 22,
      categoria: "MODOS TEMPORALES",
      pregunta: "¿Qué objeto caía del cielo en el primer modo de los Vengadores (2018) para transformarte en Thanos?",
      opciones: {
        A: "El Ojo de Agamotto",
        B: "El Guantelete del Infinito",
        C: "El Escudo de Capitán América",
        D: "El Rompetormentas"
      },
      correcta: "B"
    },
    {
      id: 23,
      categoria: "OBJETOS CLÁSICOS",
      pregunta: "¿Cuánto tiempo tardaba en beberse el legendario 'Bidón de Plasma' (Chug Jug) para curar 100 de vida y 100 de escudo?",
      opciones: {
        A: "10 segundos",
        B: "15 segundos",
        C: "20 segundos",
        D: "12 segundos"
      },
      correcta: "B"
    },
    {
      id: 24,
      categoria: "VEHÍCULOS AÉREOS",
      pregunta: "¿Cómo se llamaba el avión biplano de 5 plazas equipado con ametralladora introducido en la Temporada 7?",
      opciones: {
        A: "Alatormenta X-4 (X-4 Stormwing)",
        B: "Choppa Veloce",
        C: "Halcón de Combate",
        D: "Spitfire Ártico"
      },
      correcta: "A"
    },
    {
      id: 25,
      categoria: "LORE ELEMENTAL",
      pregunta: "¿Qué prisionero elemental escapó de las mazmorras de Pico Polar y creó el gigantesco Volcán en la Temporada 8?",
      opciones: {
        A: "El Prisionero (El Rey de Fuego)",
        B: "Ragnarok",
        C: "Ruin",
        D: "Maligno"
      },
      correcta: "A"
    },
    {
      id: 26,
      categoria: "MOVILIDAD MÍTICA",
      pregunta: "¿Qué consumible introducido en la Temporada 5 te permitía teletransportarte hacia el cielo y redesplegar el ala delta?",
      opciones: {
        A: "La Grieta Portátil (Rift-To-Go)",
        B: "La Bomba Sombra",
        C: "El Lanzador de Impulso",
        D: "El Trampolín de Salto"
      },
      correcta: "A"
    },
    {
      id: 27,
      categoria: "FORTNITE OG",
      pregunta: "¿En qué año y mes volvió el mapa original del Capítulo 1 batiendo el récord de más de 44 millones de jugadores en un día?",
      opciones: {
        A: "Noviembre de 2023",
        B: "Julio de 2022",
        C: "Enero de 2024",
        D: "Octubre de 2021"
      },
      correcta: "A"
    },
    {
      id: 28,
      categoria: "HISTORIA & LORE",
      pregunta: "¿Qué traición cometió la Doctora Slone contra los jugadores al final de 'Operación Cielo en Llamas' (C2S7)?",
      opciones: {
        A: "Nos abandonó en la Nave Nodriza para que explotáramos con las bombas",
        B: "Se alió con los alienígenas",
        C: "Robó el Punto Cero y huyó",
        D: "Destruyó a Los Siete"
      },
      correcta: "A"
    },
    {
      id: 29,
      categoria: "PASES DE BATALLA",
      pregunta: "¿Cuál fue la primera skin legendaria de Nivel 100 de la historia del Pase de Batalla (Temporada 3)?",
      opciones: {
        A: "Omega",
        B: "El Segador (The Reaper / 'John Wick')",
        C: "Caballero Negro (Black Knight)",
        D: "Ragnarok"
      },
      correcta: "B"
    },
    {
      id: 30,
      categoria: "EVENTOS FINALES",
      pregunta: "¿Qué maniobra colosal hicieron Los Siete con toda la isla para escapar de la Reina del Cubo en 'The End' (C2S8)?",
      opciones: {
        A: "Teletransportaron la isla a otra galaxia",
        B: "Dieron la vuelta y voltearon la isla entera 180 grados (The Flip)",
        C: "Sumergieron la isla bajo una cúpula submarina",
        D: "La fragmentaron en 7 islas flotantes"
      },
      correcta: "B"
    },
    {
      id: 31,
      categoria: "MUERTE SÚBITA - EXPERTO",
      pregunta: "¿Qué número exacto de daño hacía el primer modelo de la Trampa de Pinchos (Spike Trap) cuando se introdujo originalmente?",
      opciones: {
        A: "100",
        B: "125",
        C: "150",
        D: "75"
      },
      correcta: "B"
    },
    {
      id: 32,
      categoria: "MUERTE SÚBITA - EXPERTO",
      pregunta: "¿Cuál fue el primer vehículo terrestre con motor introducido en Fortnite Battle Royale (antes que los coches normales)?",
      opciones: {
        A: "El Boloncho",
        B: "El Quadtaclismo",
        C: "El Carrito de Golf (Cártel Todo Terreno)",
        D: "La Tabla de Surf"
      },
      correcta: "C"
    },
    {
      id: 33,
      categoria: "MUERTE SÚBITA - EXPERTO",
      pregunta: "En la pantalla de televisión que anunciaba la llegada del meteorito en la Temporada 3 (Capítulo 1), ¿qué código de emergencia sonaba de fondo?",
      opciones: {
        A: "Un código Morse que deletreaba SOS D5",
        B: "La sirena de la purga",
        C: "La risa de un gnomo",
        D: "Números aleatorios"
      },
      correcta: "A"
    },
    {
      id: 34,
      categoria: "MUERTE SÚBITA - EXPERTO",
      pregunta: "¿Cómo se llama oficialmente el 'cubo' morado en los archivos internos de Epic Games, antes de que la comunidad lo bautizara como Kevin?",
      opciones: {
        A: "The Artifact",
        B: "Cube_Zero",
        C: "The Rune",
        D: "Athena_Cube"
      },
      correcta: "D"
    },
    {
      id: 35,
      categoria: "MUERTE SÚBITA - EXPERTO",
      pregunta: "Durante el evento 'El Dispositivo' de Midas (Temporada 2, Cap 2), ¿en qué ubicación del mundo real apareció el Agente Jonesy al otro lado de la simulación?",
      opciones: {
        A: "Una base militar secreta",
        B: "Una oficina de la Orden Imaginada",
        C: "Una estación de metro",
        D: "Un búnker subterráneo"
      },
      correcta: "B"
    }
  ];

  // ========================================================================
  // 2. ESTADO DEL JUEGO & PUNTUACIÓN KAHOOT
  // ========================================================================
  const ROUND_DURATION_SEC = 20;
  let currentQuestionIndex = 0;
  let isRoundActive = false;
  let isRevealed = false;
  let secondsRemaining = ROUND_DURATION_SEC;
  let timerInterval = null;
  let isAudioEnabled = true;
  let totalTwitchMessages = 0;

  // Trackers for current round: Map of userId -> { username, option, secondsLeft, pointsEarned, isCorrect }
  let roundVotes = new Map();

  // Cumulative Leaderboard for all users: { [username]: { totalScore, correctCount, totalRounds } }
  let userScores = {};

  // Procedural Sound Synthesizer (Web Audio API)
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
        // Cyber whoosh / start gong
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.4);

      } else if (type === 'tick') {
        // Subtle clock tick
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.04);

      } else if (type === 'warning') {
        // Danger alert tick (< 10 seconds)
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.08);

      } else if (type === 'vote') {
        // Vote received blip
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.06);

      } else if (type === 'reveal-success') {
        // Glorious Kahoot reveal fanfare
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.2, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.65);
        });

      } else if (type === 'podium') {
        // Epic Grand Champion Fanfare
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

  function escapeHtml(str) {
    if (typeof str !== 'string') return String(str);
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ========================================================================
  // 3. DOM ELEMENTS SELECTION
  // ========================================================================
  // Header Elements
  const headerQuestionNum = document.getElementById('headerQuestionNum');
  const headerCategoryTag = document.getElementById('headerCategoryTag');
  const headerCategoryText = document.getElementById('headerCategoryText');
  const btnAudioToggle = document.getElementById('btnAudioToggle');
  const btnFullscreenToggle = document.getElementById('btnFullscreenToggle');
  // Game Area Elements
  const trivialQuestionContainer = document.getElementById('trivialQuestionContainer');
  const bannerMuerteSubita = document.getElementById('bannerMuerteSubita');
  const questionNumberBadge = document.getElementById('questionNumberBadge');
  const questionCategoryBadge = document.getElementById('questionCategoryBadge');
  const questionText = document.getElementById('questionText');

  // Timer & Meter Elements
  const timerCircleProgress = document.getElementById('timerCircleProgress');
  const timerSecondsDisplay = document.getElementById('timerSecondsDisplay');
  const meterBarFill = document.getElementById('meterBarFill');
  const meterStatusText = document.getElementById('meterStatusText');
  const meterVotesCounter = document.getElementById('meterVotesCounter');
  const roundResultBanner = document.getElementById('roundResultBanner');
  const resultCorrectText = document.getElementById('resultCorrectText');
  const resultAcertantesCount = document.getElementById('resultAcertantesCount');

  // 4 Option Cards
  const optionCards = {
    A: document.getElementById('optionCardA'),
    B: document.getElementById('optionCardB'),
    C: document.getElementById('optionCardC'),
    D: document.getElementById('optionCardD')
  };

  const optionTexts = {
    A: document.getElementById('optionTextA'),
    B: document.getElementById('optionTextB'),
    C: document.getElementById('optionTextC'),
    D: document.getElementById('optionTextD')
  };

  const optionStatsRows = {
    A: document.getElementById('optionStatsA'),
    B: document.getElementById('optionStatsB'),
    C: document.getElementById('optionStatsC'),
    D: document.getElementById('optionStatsD')
  };

  const optionVotesCounts = {
    A: document.getElementById('optionVotesA'),
    B: document.getElementById('optionVotesB'),
    C: document.getElementById('optionVotesC'),
    D: document.getElementById('optionVotesD')
  };

  const optionPcts = {
    A: document.getElementById('optionPctA'),
    B: document.getElementById('optionPctB'),
    C: document.getElementById('optionPctC'),
    D: document.getElementById('optionPctD')
  };

  // Chat Radar & Leaderboard Elements
  const radarChatMessages = document.getElementById('radarChatMessages');
  const radarLeaderboardFeed = document.getElementById('radarLeaderboardFeed');
  const radarWsBadge = document.getElementById('radarWsBadge');
  const radarTotalVotesBadge = document.getElementById('radarTotalVotesBadge');
  const radarActiveTargetText = document.getElementById('radarActiveTargetText');
  const tabChatBtn = document.getElementById('tabChatBtn');
  const tabLeaderboardBtn = document.getElementById('tabLeaderboardBtn');

  // Streamer Dock Buttons
  const btnStartRound = document.getElementById('btnStartRound');
  const btnCloseRound = document.getElementById('btnCloseRound');
  const btnNextQuestion = document.getElementById('btnNextQuestion');
  const btnPrevQuestion = document.getElementById('btnPrevQuestion');
  const btnResetRound = document.getElementById('btnResetRound');
  const btnShowPodium = document.getElementById('btnShowPodium');
  const btnSimulateVotes = document.getElementById('btnSimulateVotes');

  // Epic Podium Modal Elements
  const podiumModalOverlay = document.getElementById('podiumModalOverlay');
  const btnClosePodiumModal = document.getElementById('btnClosePodiumModal');
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
  // 4. RADAR & CHAT TERMINAL LOGGER
  // ========================================================================
  function appendRadarTerminalLine(author, message, type = 'sys') {
    if (!radarChatMessages) return;

    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;

    if (type === 'sys') {
      line.innerHTML = `<span class="terminal-coord">[SISTEMA]</span> <span class="terminal-msg">${escapeHtml(message)}</span>`;
    } else if (type === 'vote-a') {
      line.innerHTML = `<span class="terminal-coord" style="color: #E21B3C;">[VOTO_A]</span> <span class="terminal-author">@${escapeHtml(author)}:</span> eligió <strong style="color: #FF8099;">A</strong> (${message})`;
    } else if (type === 'vote-b') {
      line.innerHTML = `<span class="terminal-coord" style="color: #1368CE;">[VOTO_B]</span> <span class="terminal-author">@${escapeHtml(author)}:</span> eligió <strong style="color: #80BFFF;">B</strong> (${message})`;
    } else if (type === 'vote-c') {
      line.innerHTML = `<span class="terminal-coord" style="color: #D89E00;">[VOTO_C]</span> <span class="terminal-author">@${escapeHtml(author)}:</span> eligió <strong style="color: #FFD166;">C</strong> (${message})`;
    } else if (type === 'vote-d') {
      line.innerHTML = `<span class="terminal-coord" style="color: #26890C;">[VOTO_D]</span> <span class="terminal-author">@${escapeHtml(author)}:</span> eligió <strong style="color: #80E580;">D</strong> (${message})`;
    } else {
      line.innerHTML = `<span class="terminal-coord">[CHAT]</span> <span class="terminal-author">@${escapeHtml(author)}:</span> ${escapeHtml(message)}`;
    }

    radarChatMessages.appendChild(line);

    // Auto-scroll to bottom
    radarChatMessages.scrollTo({
      top: radarChatMessages.scrollHeight,
      behavior: 'smooth'
    });

    if (radarChatMessages.children.length > 100) {
      radarChatMessages.removeChild(radarChatMessages.firstChild);
    }
  }

  // ========================================================================
  // 5. RENDER QUESTION FUNCTION
  // ========================================================================
  function renderQuestion(index) {
    if (index < 0 || index >= PREGUNTAS_TRIVIAL.length) return;
    currentQuestionIndex = index;
    const qData = PREGUNTAS_TRIVIAL[index];
    const isFaseX2 = (index + 1 >= 31);

    // Reset round state
    isRoundActive = false;
    isRevealed = false;
    secondsRemaining = ROUND_DURATION_SEC;
    roundVotes.clear();
    clearInterval(timerInterval);
    timerInterval = null;

    // Phase X2 visual updates
    if (trivialQuestionContainer) {
      if (isFaseX2) {
        trivialQuestionContainer.classList.add('fase-x2');
      } else {
        trivialQuestionContainer.classList.remove('fase-x2');
      }
    }
    if (bannerMuerteSubita) {
      bannerMuerteSubita.style.display = isFaseX2 ? 'inline-flex' : 'none';
    }

    // Header updates
    if (headerQuestionNum) headerQuestionNum.textContent = `${index + 1}`;
    if (headerCategoryText) headerCategoryText.textContent = qData.categoria;

    // Question area updates
    if (questionNumberBadge) questionNumberBadge.textContent = `PREGUNTA #${index + 1} / ${PREGUNTAS_TRIVIAL.length}`;
    if (questionCategoryBadge) {
      questionCategoryBadge.textContent = qData.categoria;
      if (isFaseX2) {
        questionCategoryBadge.style.background = 'rgba(255, 69, 0, 0.25)';
        questionCategoryBadge.style.borderColor = '#FF4500';
        questionCategoryBadge.style.color = '#FFD700';
      } else {
        questionCategoryBadge.style.background = '';
        questionCategoryBadge.style.borderColor = '';
        questionCategoryBadge.style.color = '';
      }
    }
    if (questionText) questionText.textContent = qData.pregunta;

    // Timer and Meter reset
    updateTimerVisuals(ROUND_DURATION_SEC);
    if (meterStatusText) {
      meterStatusText.innerHTML = isFaseX2
        ? '<span class="status-dot" style="background:#FF4500;"></span> 🔥 MUERTE SÚBITA (PUNTOS X2) EN ESPERA'
        : '<span class="status-dot"></span> EN ESPERA DEL STREAMER';
    }
    if (meterVotesCounter) meterVotesCounter.innerHTML = '<strong>0</strong> VOTOS';
    if (roundResultBanner) roundResultBanner.classList.remove('active');

    // Reset option cards
    ['A', 'B', 'C', 'D'].forEach(opt => {
      const card = optionCards[opt];
      const textEl = optionTexts[opt];
      const statsRow = optionStatsRows[opt];
      const votesEl = optionVotesCounts[opt];
      const pctEl = optionPcts[opt];

      if (textEl) textEl.textContent = qData.opciones[opt];
      if (card) {
        card.classList.remove('is-correct', 'is-dimmed');
      }
      if (statsRow) statsRow.classList.remove('active');
      if (votesEl) votesEl.textContent = '0 votos';
      if (pctEl) pctEl.textContent = '0%';
    });

    // Streamer dock buttons state
    if (btnStartRound) {
      btnStartRound.classList.remove('is-active');
      btnStartRound.innerHTML = '<i class="fas fa-play"></i> ▶️ Empezar Ronda';
      btnStartRound.disabled = false;
    }
    if (btnCloseRound) {
      btnCloseRound.disabled = true;
    }

    // Terminal Status
    if (radarActiveTargetText) {
      radarActiveTargetText.innerHTML = `<span class="radar-ping-dot"></span> PREGUNTA: <strong>#${index + 1}</strong> // ${qData.categoria}`;
    }
    if (radarWsBadge) {
      radarWsBadge.textContent = '🔴 RONDA EN ESPERA';
      radarWsBadge.style.color = '#FFB703';
      radarWsBadge.style.borderColor = '#FFB703';
    }

    appendRadarTerminalLine('SISTEMA', `📌 Pregunta #${index + 1} lista. Pulsa 'Empezar Ronda' para abrir votación de 20s.`, 'sys');
    updateLiveLeaderboard();
  }

  // ========================================================================
  // 6. TIMER & COUNTDOWN ENGINE
  // ========================================================================
  function updateTimerVisuals(seconds) {
    const totalCircumference = 232; // SVG circle radius 37 => 2 * PI * 37 ≈ 232.4
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
        timerSecondsDisplay.classList.add('danger');
      } else {
        timerSecondsDisplay.classList.remove('danger');
      }
    }

    if (meterBarFill) {
      meterBarFill.style.width = `${fractionRemaining * 100}%`;
      if (seconds <= 10 && isRoundActive) {
        meterBarFill.classList.add('danger');
      } else {
        meterBarFill.classList.remove('danger');
      }
    }
  }

  function startRound() {
    if (isRoundActive) return;

    isRoundActive = true;
    isRevealed = false;
    secondsRemaining = ROUND_DURATION_SEC;
    roundVotes.clear();

    if (btnStartRound) {
      btnStartRound.classList.add('is-active');
      btnStartRound.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 🟢 Ronda en Curso (20s)';
      btnStartRound.disabled = true;
    }
    if (btnCloseRound) {
      btnCloseRound.disabled = false;
    }

    if (meterStatusText) {
      meterStatusText.innerHTML = '<span class="status-dot"></span> 🟢 VOTACIONES ABIERTAS (A, B, C, D)';
    }

    if (radarWsBadge) {
      radarWsBadge.textContent = '🟢 VOTACIÓN EN DIRECTO';
      radarWsBadge.style.color = '#00FA9A';
      radarWsBadge.style.borderColor = '#00FA9A';
    }

    appendRadarTerminalLine('SISTEMA', `🚀 ¡RONDA INICIADA! Tienes 20 segundos para responder A, B, C o D en el chat de Twitch.`, 'sys');
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
        closeRoundAndReveal();
      }
    }, 100);
  }

  // ========================================================================
  // 7. VOTE PROCESSING & KAHOOT SPEED FORMULA
  // ========================================================================
  function handleIncomingVote(rawUser, optionChar) {
    if (!isRoundActive || isRevealed) return;

    const opt = optionChar.toUpperCase();
    if (!['A', 'B', 'C', 'D'].includes(opt)) return;

    const userKey = rawUser.trim().toLowerCase();
    const displayName = rawUser.trim();

    // STRICT FIRST-VOTE ONLY RULE
    if (roundVotes.has(userKey)) {
      // User has already cast their single vote for this round
      return;
    }

    const currentSecsLeft = Math.max(0.1, Number(secondsRemaining.toFixed(2)));
    const qData = PREGUNTAS_TRIVIAL[currentQuestionIndex];
    const isCorrect = (opt === qData.correcta);

    // KAHOOT FORMULA: Puntos = Round( 1000 * (SegundosRestantes / 20) )
    let pointsEarned = isCorrect ? Math.round(1000 * (currentSecsLeft / ROUND_DURATION_SEC)) : 0;

    // FASE DE MUERTE SÚBITA (Rondas 31 a 35 -> Puntos x2)
    if (isCorrect && (currentQuestionIndex + 1) >= 31) {
      pointsEarned = pointsEarned * 2;
    }

    const voteData = {
      username: displayName,
      option: opt,
      secondsLeft: currentSecsLeft,
      pointsEarned: pointsEarned,
      isCorrect: isCorrect
    };

    roundVotes.set(userKey, voteData);

    // Update meter vote count
    if (meterVotesCounter) {
      meterVotesCounter.innerHTML = `<strong>${roundVotes.size}</strong> VOTOS`;
    }

    // Terminal log
    const typeClass = `vote-${opt.toLowerCase()}`;
    const extraLabel = (currentQuestionIndex + 1 >= 31) ? ` [X2 PUNTOS]` : '';
    appendRadarTerminalLine(displayName, `${currentSecsLeft}s restantes${extraLabel}`, typeClass);
    playSound('vote');
  }

  // ========================================================================
  // 8. CLOSE ROUND & REVEAL RESULTS
  // ========================================================================
  function closeRoundAndReveal() {
    if (isRevealed) return;

    clearInterval(timerInterval);
    timerInterval = null;
    isRoundActive = false;
    isRevealed = true;
    secondsRemaining = 0;
    updateTimerVisuals(0);

    const qData = PREGUNTAS_TRIVIAL[currentQuestionIndex];
    const correctOpt = qData.correcta;

    if (btnStartRound) {
      btnStartRound.classList.remove('is-active');
      btnStartRound.innerHTML = '<i class="fas fa-check"></i> Ronda Finalizada';
      btnStartRound.disabled = true;
    }
    if (btnCloseRound) {
      btnCloseRound.disabled = true;
    }

    if (meterStatusText) {
      meterStatusText.innerHTML = '<span class="status-dot" style="background:#FF3366;"></span> 🔴 VOTACIÓN CERRADA';
    }
    if (radarWsBadge) {
      radarWsBadge.textContent = '🔴 VOTACIÓN CERRADA';
      radarWsBadge.style.color = '#FF3366';
      radarWsBadge.style.borderColor = '#FF3366';
    }

    // Calculate vote distribution & update cumulative leaderboard
    const voteCounts = { A: 0, B: 0, C: 0, D: 0 };
    let acertantesCount = 0;

    roundVotes.forEach(vote => {
      if (voteCounts[vote.option] !== undefined) {
        voteCounts[vote.option]++;
      }

      // Cumulative user scoring update
      const uKey = vote.username.toLowerCase();
      if (!userScores[uKey]) {
        userScores[uKey] = {
          displayName: vote.username,
          totalScore: 0,
          correctCount: 0,
          totalRounds: 0
        };
      }

      userScores[uKey].totalRounds++;
      if (vote.isCorrect) {
        userScores[uKey].totalScore += vote.pointsEarned;
        userScores[uKey].correctCount++;
        acertantesCount++;
      }
    });

    const totalVotes = roundVotes.size;

    // Display statistics & highlight correct option
    ['A', 'B', 'C', 'D'].forEach(opt => {
      const card = optionCards[opt];
      const statsRow = optionStatsRows[opt];
      const votesEl = optionVotesCounts[opt];
      const pctEl = optionPcts[opt];

      const count = voteCounts[opt] || 0;
      const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

      if (votesEl) votesEl.textContent = `${count} ${count === 1 ? 'voto' : 'votos'}`;
      if (pctEl) pctEl.textContent = `${pct}%`;
      if (statsRow) statsRow.classList.add('active');

      if (card) {
        if (opt === correctOpt) {
          card.classList.add('is-correct');
          card.classList.remove('is-dimmed');
        } else {
          card.classList.add('is-dimmed');
          card.classList.remove('is-correct');
        }
      }
    });

    // Reveal Result Banner
    if (roundResultBanner) {
      if (resultCorrectText) {
        resultCorrectText.innerHTML = `<strong>${correctOpt}) ${escapeHtml(qData.opciones[correctOpt])}</strong>`;
      }
      if (resultAcertantesCount) {
        resultAcertantesCount.innerHTML = `<strong>${acertantesCount}</strong>`;
      }
      roundResultBanner.classList.add('active');
    }

    appendRadarTerminalLine(
      'SISTEMA',
      `🎉 Respuesta Correcta: [${correctOpt}] ${qData.opciones[correctOpt]} | Acertantes: ${acertantesCount}/${totalVotes}`,
      'sys'
    );

    playSound('reveal-success');
    if (acertantesCount > 0) {
      triggerConfetti();
    }

    updateLiveLeaderboard();

    // Check if this is the 30th (Final) question
    if (currentQuestionIndex === PREGUNTAS_TRIVIAL.length - 1) {
      appendRadarTerminalLine('SISTEMA', `🏆 ¡HAS COMPLETADO LAS 30 PREGUNTAS! Preparando podio final...`, 'sys');
      if (btnShowPodium) btnShowPodium.style.display = 'inline-flex';
      setTimeout(() => {
        openPodiumModal();
      }, 2400);
    }
  }

  // ========================================================================
  // 9. LIVE LEADERBOARD (SIDEBAR TAB)
  // ========================================================================
  function updateLiveLeaderboard() {
    if (!radarLeaderboardFeed) return;

    const rankedUsers = Object.values(userScores).sort((a, b) => b.totalScore - a.totalScore);
    radarLeaderboardFeed.innerHTML = '';

    if (rankedUsers.length === 0) {
      radarLeaderboardFeed.innerHTML = `
        <div style="text-align: center; color: #64748B; padding: 2rem 0; font-size: 0.76rem;">
          <i class="fas fa-trophy" style="font-size: 1.8rem; margin-bottom: 0.5rem; display: block; color: #475569;"></i>
          El ranking se actualizará a medida que el chat acierte preguntas.
        </div>
      `;
      return;
    }

    rankedUsers.slice(0, 15).forEach((u, index) => {
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
          <span class="lb-score">${u.totalScore.toLocaleString()} pts</span>
          <div style="font-size: 0.65rem; color: #94A3B8;">${u.correctCount}/${PREGUNTAS_TRIVIAL.length} aciertos</div>
        </div>
      `;
      radarLeaderboardFeed.appendChild(row);
    });
  }

  // Leaderboard Tab Toggle
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
  // 10. EPIC TOP 3 PODIUM & TXT REPORT
  // ========================================================================
  function openPodiumModal() {
    const rankedUsers = Object.values(userScores).sort((a, b) => b.totalScore - a.totalScore);

    const totalQ = PREGUNTAS_TRIVIAL.length;

    // 1st Place
    if (rankedUsers[0]) {
      if (podiumFirstUser) podiumFirstUser.textContent = `@${rankedUsers[0].displayName}`;
      if (podiumFirstPoints) podiumFirstPoints.textContent = `${rankedUsers[0].totalScore.toLocaleString()} PTS`;
      if (podiumFirstAccuracy) podiumFirstAccuracy.textContent = `${rankedUsers[0].correctCount}/${totalQ} aciertos (${((rankedUsers[0].correctCount/totalQ)*100).toFixed(0)}%)`;
    } else {
      if (podiumFirstUser) podiumFirstUser.textContent = 'Sin participantes';
      if (podiumFirstPoints) podiumFirstPoints.textContent = '0 PTS';
      if (podiumFirstAccuracy) podiumFirstAccuracy.textContent = `0/${totalQ}`;
    }

    // 2nd Place
    if (rankedUsers[1]) {
      if (podiumSecondUser) podiumSecondUser.textContent = `@${rankedUsers[1].displayName}`;
      if (podiumSecondPoints) podiumSecondPoints.textContent = `${rankedUsers[1].totalScore.toLocaleString()} PTS`;
      if (podiumSecondAccuracy) podiumSecondAccuracy.textContent = `${rankedUsers[1].correctCount}/${totalQ} aciertos (${((rankedUsers[1].correctCount/totalQ)*100).toFixed(0)}%)`;
    } else {
      if (podiumSecondUser) podiumSecondUser.textContent = '---';
      if (podiumSecondPoints) podiumSecondPoints.textContent = '0 PTS';
      if (podiumSecondAccuracy) podiumSecondAccuracy.textContent = `0/${totalQ}`;
    }

    // 3rd Place
    if (rankedUsers[2]) {
      if (podiumThirdUser) podiumThirdUser.textContent = `@${rankedUsers[2].displayName}`;
      if (podiumThirdPoints) podiumThirdPoints.textContent = `${rankedUsers[2].totalScore.toLocaleString()} PTS`;
      if (podiumThirdAccuracy) podiumThirdAccuracy.textContent = `${rankedUsers[2].correctCount}/${totalQ} aciertos (${((rankedUsers[2].correctCount/totalQ)*100).toFixed(0)}%)`;
    } else {
      if (podiumThirdUser) podiumThirdUser.textContent = '---';
      if (podiumThirdPoints) podiumThirdPoints.textContent = '0 PTS';
      if (podiumThirdAccuracy) podiumThirdAccuracy.textContent = `0/${totalQ}`;
    }

    if (podiumModalOverlay) {
      podiumModalOverlay.classList.add('active');
    }

    playSound('podium');
    triggerConfetti(6000);
  }

  function closePodiumModal() {
    if (podiumModalOverlay) {
      podiumModalOverlay.classList.remove('active');
    }
  }

  function downloadPodiumTxtReport() {
    const rankedUsers = Object.values(userScores).sort((a, b) => b.totalScore - a.totalScore);
    const dateStr = new Date().toLocaleString('es-ES');

    let report = `=================================================================\n`;
    report += `🏆 ESPECIALES IMARIXU - DÍA 4: TRIVIAL HISTORIA DE FORTNITE\n`;
    report += `=================================================================\n`;
    report += `Fecha del Evento: ${dateStr}\n`;
    report += `Canal Oficial: Twitch.tv/imarixu\n`;
    report += `Total de Preguntas: ${PREGUNTAS_TRIVIAL.length}\n`;
    report += `Total de Participantes Registrados: ${rankedUsers.length}\n\n`;

    report += `🎉 PODIO FINAL - TOP 3 CAMPEONES DE LA ISLA:\n`;
    if (rankedUsers[0]) report += `  🥇 1er Puesto: @${rankedUsers[0].displayName} -> ${rankedUsers[0].totalScore.toLocaleString()} Puntos (${rankedUsers[0].correctCount}/${PREGUNTAS_TRIVIAL.length} aciertos)\n`;
    if (rankedUsers[1]) report += `  🥈 2do Puesto: @${rankedUsers[1].displayName} -> ${rankedUsers[1].totalScore.toLocaleString()} Puntos (${rankedUsers[1].correctCount}/${PREGUNTAS_TRIVIAL.length} aciertos)\n`;
    if (rankedUsers[2]) report += `  🥉 3er Puesto: @${rankedUsers[2].displayName} -> ${rankedUsers[2].totalScore.toLocaleString()} Puntos (${rankedUsers[2].correctCount}/${PREGUNTAS_TRIVIAL.length} aciertos)\n`;

    report += `\n-----------------------------------------------------------------\n`;
    report += `📊 TABLA CLASIFICATORIA GENERAL COMPLETA:\n`;
    rankedUsers.forEach((u, idx) => {
      const pos = (idx + 1).toString().padStart(2, '0');
      const user = u.displayName.padEnd(22, ' ');
      const pts = u.totalScore.toLocaleString().padStart(8, ' ');
      const acc = `${u.correctCount}/${PREGUNTAS_TRIVIAL.length}`.padStart(6, ' ');
      const pct = ((u.correctCount / PREGUNTAS_TRIVIAL.length) * 100).toFixed(1);
      report += `  ${pos}. @${user} | ${pts} pts | Aciertos: ${acc} (${pct}%)\n`;
    });
    report += `=================================================================\n`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ganadores_dia4_trivial_fortnite_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ========================================================================
  // 11. TWITCH IRC WEBSOCKET INTEGRATION
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
          radarWsBadge.textContent = isRoundActive ? '🟢 VOTACIÓN EN DIRECTO' : '🔴 RONDA EN ESPERA';
          radarWsBadge.style.color = isRoundActive ? '#00FA9A' : '#FFB703';
          radarWsBadge.style.borderColor = isRoundActive ? '#00FA9A' : '#FFB703';
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
            parseTwitchMessage(line);
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

  function parseTwitchMessage(rawLine) {
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
      totalTwitchMessages++;
      if (radarTotalVotesBadge) {
        radarTotalVotesBadge.innerHTML = `<strong>${totalTwitchMessages}</strong> MSGS_RECV`;
      }

      if (isRoundActive) {
        // Match A, B, C, D or 1, 2, 3, 4
        if (
          message === 'a' ||
          message === '1' ||
          message.startsWith('opcion a') ||
          message.startsWith('opción a') ||
          message === '!a' ||
          message === 'rojo' ||
          message === 'red'
        ) {
          handleIncomingVote(username, 'A');
        } else if (
          message === 'b' ||
          message === '2' ||
          message.startsWith('opcion b') ||
          message.startsWith('opción b') ||
          message === '!b' ||
          message === 'azul' ||
          message === 'blue'
        ) {
          handleIncomingVote(username, 'B');
        } else if (
          message === 'c' ||
          message === '3' ||
          message.startsWith('opcion c') ||
          message.startsWith('opción c') ||
          message === '!c' ||
          message === 'amarillo' ||
          message === 'yellow'
        ) {
          handleIncomingVote(username, 'C');
        } else if (
          message === 'd' ||
          message === '4' ||
          message.startsWith('opcion d') ||
          message.startsWith('opción d') ||
          message === '!d' ||
          message === 'verde' ||
          message === 'green'
        ) {
          handleIncomingVote(username, 'D');
        } else {
          appendRadarTerminalLine(username, message, 'chat');
        }
      } else {
        appendRadarTerminalLine(username, message, 'chat');
      }
    }
  }

  // ========================================================================
  // 12. ZERO POINT BACKGROUND & RIFT PARTICLES CANVAS
  // ========================================================================
  function initZeroPointCanvas() {
    const canvas = document.getElementById('zeroPointCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle types: 'butterfly', 'shard', 'spark'
    const particleCount = 42;
    const particles = [];

    const colors = [
      '#00F5D4', // Electric Cyan
      '#00E5FF', // Rift Blue
      '#FFFFFF', // Pure Light
      '#E056FD', // Rift Magenta
      '#70FFE8'  // Light Mint
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        size: Math.random() * 2.8 + 1.2,
        speedY: -(Math.random() * 0.55 + 0.25),
        ampX: Math.random() * 25 + 10,
        freqX: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() < 0.35 ? 'butterfly' : Math.random() < 0.7 ? 'shard' : 'spark',
        alpha: Math.random() * 0.5 + 0.3,
        alphaSpeed: (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? 1 : -1),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03
      });
    }

    let frameCount = 0;

    function renderZeroPoint() {
      ctx.clearRect(0, 0, width, height);
      frameCount++;

      // 1. Distant Fortnite Lore Silhouettes (5% opacity - Non intrusive)
      // Silhouette 1: Meteorite burning streak (Season 3/4 Dusty Depot event)
      ctx.save();
      ctx.globalAlpha = 0.045;
      const metX = width * 0.82;
      const metY = height * 0.18;
      const metGrad = ctx.createLinearGradient(metX, metY, metX - 180, metY - 90);
      metGrad.addColorStop(0, '#FF4500');
      metGrad.addColorStop(0.4, '#FFB703');
      metGrad.addColorStop(1, 'transparent');
      ctx.strokeStyle = metGrad;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(metX, metY);
      ctx.lineTo(metX - 180, metY - 90);
      ctx.stroke();

      ctx.fillStyle = '#FFD166';
      ctx.beginPath();
      ctx.arc(metX, metY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Silhouette 2: Kevin The Cube (Isometric purple outline with faint runes)
      ctx.save();
      ctx.globalAlpha = 0.04;
      const cubeX = width * 0.08;
      const cubeY = height * 0.82;
      const cubeSize = 38;
      ctx.strokeStyle = '#9146FF';
      ctx.lineWidth = 1.5;
      // Draw isometric cube wireframe
      ctx.beginPath();
      // Top face
      ctx.moveTo(cubeX, cubeY - cubeSize);
      ctx.lineTo(cubeX + cubeSize * 0.86, cubeY - cubeSize * 0.5);
      ctx.lineTo(cubeX, cubeY);
      ctx.lineTo(cubeX - cubeSize * 0.86, cubeY - cubeSize * 0.5);
      ctx.closePath();
      // Left face
      ctx.moveTo(cubeX - cubeSize * 0.86, cubeY - cubeSize * 0.5);
      ctx.lineTo(cubeX - cubeSize * 0.86, cubeY + cubeSize * 0.5);
      ctx.lineTo(cubeX, cubeY + cubeSize);
      ctx.lineTo(cubeX, cubeY);
      // Right face
      ctx.moveTo(cubeX, cubeY);
      ctx.lineTo(cubeX, cubeY + cubeSize);
      ctx.lineTo(cubeX + cubeSize * 0.86, cubeY + cubeSize * 0.5);
      ctx.lineTo(cubeX + cubeSize * 0.86, cubeY - cubeSize * 0.5);
      ctx.stroke();
      ctx.restore();

      // 2. Render Floating Rift Butterflies & Shards
      particles.forEach(p => {
        p.y += p.speedY;
        p.x = p.baseX + Math.sin(frameCount * p.freqX + p.phase) * p.ampX;
        p.rotation += p.rotSpeed;

        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.85 || p.alpha < 0.2) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Wrap around screen
        if (p.y < -20) {
          p.y = height + 20;
          p.baseX = Math.random() * width;
          p.x = p.baseX;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3;

        if (p.type === 'butterfly') {
          // Floating luminous butterfly shape
          const wingSpread = Math.sin(frameCount * 0.12 + p.phase) * (p.size * 0.85);
          ctx.beginPath();
          // Left Wing
          ctx.ellipse(-p.size * 0.8, 0, p.size * 0.9, Math.abs(wingSpread) + 1, -0.3, 0, Math.PI * 2);
          // Right Wing
          ctx.ellipse(p.size * 0.8, 0, p.size * 0.9, Math.abs(wingSpread) + 1, 0.3, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'shard') {
          // Pointed crystal rift shard
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.6);
          ctx.lineTo(p.size * 0.7, 0);
          ctx.lineTo(0, p.size * 1.6);
          ctx.lineTo(-p.size * 0.7, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          // Circular energy spark
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(renderZeroPoint);
    }

    requestAnimationFrame(renderZeroPoint);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // ========================================================================
  // 13. CANVAS CONFETTI EFFECT
  // ========================================================================
  function triggerConfetti(duration = 3000) {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#E21B3C', '#1368CE', '#D89E00', '#26890C', '#00FA9A', '#9146FF', '#FFD700'];
    const confettiCount = 140;
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
  // 13. MOCK SIMULATOR FOR TESTING & MANUAL INPUT
  // ========================================================================
  function simulateMockChatVotes() {
    if (!isRoundActive) {
      startRound();
    }

    const mockViewers = [
      'Jaratos', 'Vivi', 'Jesulito', 'SitoGamerz', 'Neus_Art', 'RubenDev', 'ArixuFan99',
      'FortniteGod', 'PeelyKing', 'SloneAgent', 'ZeroPointHero', 'TwitchViewer42',
      'KevTheCube', 'MidasTouch', 'OmegaPro', 'DefaultSkinPro'
    ];

    const options = ['A', 'B', 'C', 'D'];
    const qData = PREGUNTAS_TRIVIAL[currentQuestionIndex];

    mockViewers.forEach((viewer, idx) => {
      setTimeout(() => {
        if (!isRoundActive) return;
        // 65% probability of voting correct answer
        const chosenOpt = Math.random() < 0.65 ? qData.correcta : options[Math.floor(Math.random() * options.length)];
        handleIncomingVote(viewer, chosenOpt);
      }, (idx + 1) * 350);
    });
  }

  // ========================================================================
  // 14. EVENT LISTENERS & CONTROLS
  // ========================================================================
  // Streamer Buttons
  if (btnStartRound) {
    btnStartRound.addEventListener('click', () => {
      startRound();
    });
  }

  if (btnCloseRound) {
    btnCloseRound.addEventListener('click', () => {
      closeRoundAndReveal();
    });
  }

  if (btnNextQuestion) {
    btnNextQuestion.addEventListener('click', () => {
      if (currentQuestionIndex < PREGUNTAS_TRIVIAL.length - 1) {
        renderQuestion(currentQuestionIndex + 1);
      } else {
        openPodiumModal();
      }
    });
  }

  if (btnPrevQuestion) {
    btnPrevQuestion.addEventListener('click', () => {
      if (currentQuestionIndex > 0) {
        renderQuestion(currentQuestionIndex - 1);
      }
    });
  }

  if (btnResetRound) {
    btnResetRound.addEventListener('click', () => {
      renderQuestion(currentQuestionIndex);
    });
  }

  if (btnShowPodium) {
    btnShowPodium.addEventListener('click', () => {
      openPodiumModal();
    });
  }

  if (btnSimulateVotes) {
    btnSimulateVotes.addEventListener('click', () => {
      simulateMockChatVotes();
    });
  }

  // Interactive Click on Option Cards
  ['A', 'B', 'C', 'D'].forEach(opt => {
    const card = optionCards[opt];
    if (card) {
      card.addEventListener('click', () => {
        if (isRoundActive) {
          handleIncomingVote('Streamer (Test)', opt);
        }
      });
    }
  });

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
  if (btnClosePodiumModal) {
    btnClosePodiumModal.addEventListener('click', closePodiumModal);
  }

  if (btnDownloadTxtReport) {
    btnDownloadTxtReport.addEventListener('click', downloadPodiumTxtReport);
  }

  if (btnRestartGame) {
    btnRestartGame.addEventListener('click', () => {
      userScores = {};
      closePodiumModal();
      renderQuestion(0);
    });
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // If typing in input, ignore
    if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) return;

    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      if (!isRoundActive && !isRevealed) {
        startRound();
      } else if (isRoundActive) {
        closeRoundAndReveal();
      }
    } else if (e.key === '1' || e.key === 'a' || e.key === 'A') {
      if (isRoundActive) handleIncomingVote('Streamer', 'A');
    } else if (e.key === '2' || e.key === 'b' || e.key === 'B') {
      if (isRoundActive) handleIncomingVote('Streamer', 'B');
    } else if (e.key === '3' || e.key === 'c' || e.key === 'C') {
      if (isRoundActive) handleIncomingVote('Streamer', 'C');
    } else if (e.key === '4' || e.key === 'd' || e.key === 'D') {
      if (isRoundActive) handleIncomingVote('Streamer', 'D');
    } else if (e.key === 'n' || e.key === 'N' || e.key === 'ArrowRight') {
      if (currentQuestionIndex < PREGUNTAS_TRIVIAL.length - 1) {
        renderQuestion(currentQuestionIndex + 1);
      }
    } else if (e.key === 'p' || e.key === 'P' || e.key === 'ArrowLeft') {
      if (currentQuestionIndex > 0) {
        renderQuestion(currentQuestionIndex - 1);
      }
    }
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

  // ========================================================================
  // 15. INITIALIZATION
  // ========================================================================
  initZeroPointCanvas();
  renderQuestion(0);
  initTwitchWebSocket();
  console.log('⚡ Especiales ImArixu - Día 4: Trivial Historia de Fortnite Engine Initialized');
});
