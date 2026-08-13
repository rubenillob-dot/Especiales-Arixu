/* ==========================================================================
   ESPECIALES ARIXU - DÍA 2: FORTNITE-GUESSR ENGINE
   Current Meta: Capítulo 7 • Temporada 3 & Clásicos de la Isla
   Features:
   1. 20 POIs: 9 con capturas añadidas + 11 de la Temporada Actual (Capítulo 7 Temporada 3)
   2. Rutas directas a assets/dia2_guessr/
   3. Radar de Comunicaciones Live Terminal Feed ([COORD_RECV] Usuario: Mensaje)
   4. Real-time Twitch IRC WebSocket (wss://irc-ws.chat.twitch.tv:443) -> #imarixu
   5. Sello Militar Cartográfico "📍 ZONA CONFIRMADA" con animación
   6. Banner destacado de Explorador ganador y Auto-Scroll suave
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. DATA: 20 RONDAS DE FORTNITE-GUESSR (IMÁGENES CARGADAS + CAPÍTULO 7 TEMPORADA 3)
  // ========================================================================
  const RONDAS_FORTNITE = [
    // --- 9 RONDAS CON IMÁGENES AÑADIDAS EN assets/dia2_guessr/ ---
    {
      id: 1,
      ubicacion: "Pisos Picados (Tilted Towers)",
      keywords: ["pisos picados", "pisos", "picados", "tilted towers", "tilted", "neopicados"],
      imagen: "assets/dia2_guessr/Pisos Picados.jpeg",
      pista: "Aquí los relojes no solo dan la hora, ¡también dan la hora de caer! Un laberinto de oficinas y rascacielos donde el que no sube se queda 'picado' en el asfalto.",
      capitulo: "Capítulo 1 • Clásico",
      cuadricula: "D5",
      dificultad: "Fácil",
      curiosidad: "Fue destruida y reconstruida múltiples veces (Neopicados, Poblado Picados, Salvaje y Torres Fuertes)."
    },
    {
      id: 2,
      ubicacion: "Parque Placentero (Pleasant Park)",
      keywords: ["parque placentero", "parque", "placentero", "pleasant park", "pleasant", "dominio de doom"],
      imagen: "assets/dia2_guessr/Parque Placentero.jpeg",
      pista: "Un vecindario tan 'placentero' que hasta tiene campo de fútbol para marcar goles... si los francotiradores del quiosco central te dejan jugar.",
      capitulo: "Capítulo 1 • Clásico",
      cuadricula: "C3",
      dificultad: "Fácil",
      curiosidad: "Estuvo presente de forma ininterrumpida durante casi todo el Capítulo 1 y el Capítulo 2."
    },
    {
      id: 3,
      ubicacion: "Señorío de la Sal (Salty Springs)",
      keywords: ["senorio de la sal", "señorio de la sal", "señorío de la sal", "senorio", "señorio", "señorío", "salty springs", "salty"],
      imagen: "assets/dia2_guessr/Señorio de la Sal.webp",
      pista: "Si pierdes la partida aquí, te quedarás con mucha 'sal'. Cuidado con bajar al codiciado sótano secreto de la casa azul o saldrás escocido.",
      capitulo: "Capítulo 1 • Clásico",
      cuadricula: "F7",
      dificultad: "Fácil",
      curiosidad: "Uno de los puntos con mayor ratio de bajas por metro cuadrado debido a su céntrica posición."
    },
    {
      id: 4,
      ubicacion: "Ciudad Comercio (Retail Row)",
      keywords: ["ciudad comercio", "comercio", "retail row", "retail", "noms", "supermercado"],
      imagen: "assets/dia2_guessr/Ciudad Comercio.webp",
      pista: "El mejor lugar para ir de 'compras' y llenar el carrito con botines legendarios en el supermercado NOMS antes de que cierren por inventario.",
      capitulo: "Capítulo 1 • Clásico",
      cuadricula: "H6",
      dificultad: "Media",
      curiosidad: "En la Temporada 9 se transformó en Mega Mall con turbinas de aire futuristas."
    },
    {
      id: 5,
      ubicacion: "Balsa Botín (Loot Lake)",
      keywords: ["balsa botin", "balsa botín", "balsa", "botin", "botín", "loot lake", "loot"],
      imagen: "assets/dia2_guessr/Balsa Botín.jpg",
      pista: "Navega sin hundirte hacia la casa del medio. Un gran lago que esconde el mayor 'botín' subterráneo de la historia del Punto Cero.",
      capitulo: "Capítulo 1 • Clásico",
      cuadricula: "E4",
      dificultad: "Fácil",
      curiosidad: "Hogar subterráneo de la Bóveda del Punto Cero y escenario del evento 'The End'."
    },
    {
      id: 6,
      ubicacion: "Oasis Ostentoso (Paradise Palms)",
      keywords: ["oasis ostentoso", "oasis", "ostentoso", "paradise palms", "paradise", "palms"],
      imagen: "assets/dia2_guessr/Oasis Ostentoso.jpg",
      pista: "Entre palmeras y arena dorada, este 'oasis' de lujo te invita a broncearte en la piscina o pisar a fondo el acelerador en la pista de karts.",
      capitulo: "Capítulo 1 • Clásico",
      cuadricula: "I8",
      dificultad: "Media",
      curiosidad: "Apareció tras la grieta interdimensional de la Temporada 5 reemplazando a Charca Chorreante."
    },
    {
      id: 7,
      ubicacion: "Socavón Soterrado (Dusty Divot)",
      keywords: ["socavon soterrado", "socavón soterrado", "socavon", "socavón", "dusty divot", "crater"],
      imagen: "assets/dia2_guessr/Socavón Soterrado.webp",
      pista: "Un impacto cósmico dejó este terreno bien 'soterrado' y cubierto de densa maleza selvática. ¡Cuidado con los laboratorios del meteorito!",
      capitulo: "Capítulo 1 • Clásico",
      cuadricula: "F5",
      dificultad: "Media",
      curiosidad: "Dentro del meteorito central se hallaba la cápsula criogénica de 'El Visitante'."
    },
    {
      id: 8,
      ubicacion: "Alameda Aullante (Wailing Woods)",
      keywords: ["alameda aullante", "alameda", "aullante", "wailing woods", "wailing", "laberinto"],
      imagen: "assets/dia2_guessr/Alameda Aullante.webp",
      pista: "Escucha el viento 'aullar' entre los robles de este laberinto de setos. Quien encuentre el búnker subterráneo con grietas de teletransporte escapará con vida.",
      capitulo: "Capítulo 1 • Clásico",
      cuadricula: "I3",
      dificultad: "Media",
      curiosidad: "El búnker subterráneo tenía grietas permanentes para escapar rápidamente."
    },
    {
      id: 9,
      ubicacion: "Chiringuito Chatarra (Junk Junction)",
      keywords: ["chiringuito chatarra", "chiringuito", "chatarra", "junk junction", "junk", "desguace"],
      imagen: "assets/dia2_guessr/Chiringuito Chatarra.webp",
      pista: "Si buscas metal, este 'chiringuito' lleno de coches prensados y chatarra coronado por una llama gigante convertirá tu pico en oro puro.",
      capitulo: "Capítulo 1 • Clásico",
      cuadricula: "B1",
      dificultad: "Difícil",
      curiosidad: "El mejor lugar del mapa para conseguir el máximo de 999 de metal rápidamente."
    },

    // --- 11 RONDAS CON UBICACIONES DE LA TEMPORADA ACTUAL: CAPÍTULO 7 • TEMPORADA 3 ---
    {
      id: 10,
      ubicacion: "Monte Olimpo (Mount Olympus)",
      keywords: ["monte olimpo", "olimpo", "mount olympus", "zeus", "templo zeus"],
      imagen: "assets/dia2_guessr/Monte Olimpo.jpg",
      pista: "Hogar de los dioses en lo más alto de la montaña. Aquí los rayos no solo caen del cielo, ¡también te los lanza Zeus si invades su 'Olimpo'!",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "H7",
      dificultad: "Media",
      curiosidad: "Contiene el trono de Zeus y cofres divinos con poderes míticos celestiales."
    },
    {
      id: 11,
      ubicacion: "Villa Viñedo (Lavish Lair)",
      keywords: ["villa vinedo", "villa viñedo", "vinedo", "viñedo", "mansion lavish", "lavish lair", "lavish"],
      imagen: "assets/dia2_guessr/Villa Viñedo.webp",
      pista: "Una opulenta mansión aristocrática con jardines franceses y estatuas de mármol donde el botín fluye como el mejor vino de 'viñedo'.",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "D2",
      dificultad: "Media",
      curiosidad: "Residencia privada de Oscar con bóveda de alta seguridad y armas doradas."
    },
    {
      id: 12,
      ubicacion: "Inframundo Sombrío (The Underworld)",
      keywords: ["inframundo", "el inframundo", "inframundo sombrio", "the underworld", "grim gate", "hades", "cerbero"],
      imagen: "assets/dia2_guessr/Inframundo Sombrío.jpg",
      pista: "Aguas verdes fluorescentes y calaveras flotantes. Cruza la puerta si te atreves a desafiar a Hades y a su perro guardián Cerbero en el 'Inframundo'.",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "B3",
      dificultad: "Media",
      curiosidad: "El río Estigio otorga calaveras de impulso fantasmales al saltar al agua."
    },
    {
      id: 13,
      ubicacion: "Plaza Principal (Reckless Railways)",
      keywords: ["plaza principal", "grand plaza", "plaza", "estacion central", "reckless railways", "reckless"],
      imagen: "assets/dia2_guessr/plaza_principal.jpg",
      pista: "El epicentro de los raíles y trenes de vapor. Una gran 'plaza' metropolitana donde el tren blindado nunca espera a los rezagados.",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "F6",
      dificultad: "Fácil",
      curiosidad: "El tren blindado cruza esta estación cargado con cofres de suministros de rareza mítica."
    },
    {
      id: 14,
      ubicacion: "Cañon Calamar",
      respuesta: "Cañon Calamar",
      keywords: ["cañon calamar", "canon calamar", "cañón calamar", "calamar", "cañon", "canon", "cañón"],
      imagen: "assets/dia2_guessr/PENDIENTE.jpg",
      pista: "No te hagas un lío con los tentáculos, este 'cañón' es la pura tinta de la diversión.",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "D4",
      dificultad: "Media",
      curiosidad: "Una zona costera llena de tentáculos y pura diversión marina."
    },
    {
      id: 15,
      ubicacion: "Avenida Aterradora",
      respuesta: "Avenida Aterradora",
      keywords: ["avenida aterradora", "avenida", "aterradora"],
      imagen: "assets/dia2_guessr/PENDIENTE.jpg",
      pista: "Caminar por esta 'avenida' te pondrá los pelos de punta. ¡Lleva cuidado con los sustos!",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "F3",
      dificultad: "Media",
      curiosidad: "Una calle llena de misterio y sustos donde solo los más valientes sobreviven."
    },
    {
      id: 16,
      ubicacion: "Casas Congeladas",
      respuesta: "Casas Congeladas",
      keywords: ["casas congeladas", "casas", "congeladas", "congelada", "casa congelada"],
      imagen: "assets/dia2_guessr/PENDIENTE.jpg",
      pista: "Abrígate bien antes de lotear, que en estas 'casas' hace un frío que te dejará helado.",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "A7",
      dificultad: "Media",
      curiosidad: "Conjunto residencial cubierto de escarcha bajo cero."
    },
    {
      id: 17,
      ubicacion: "Wonkeelandia",
      respuesta: "Wonkeelandia",
      keywords: ["wonkeelandia", "wonkee", "wonkylandia", "wonki", "wonkilandia"],
      imagen: "assets/dia2_guessr/PENDIENTE.jpg",
      pista: "Un parque de locura y color donde la victoria sabe a puro caramelo. ¡Bienvenidos a la atracción principal!",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "C5",
      dificultad: "Fácil",
      curiosidad: "Un colorido parque temático repleto de atracciones y botín dulce."
    },
    {
      id: 18,
      ubicacion: "Boulevard Boscoso",
      respuesta: "Boulevard Boscoso",
      keywords: ["boulevard boscoso", "bulevar boscoso", "boulevard", "bulevar", "boscoso"],
      imagen: "assets/dia2_guessr/PENDIENTE.jpg",
      pista: "No te pierdas entre las ramas al pasear por este 'boulevard' tan verde y natural.",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "H4",
      dificultad: "Media",
      curiosidad: "Un paseo arbolado donde la naturaleza y el combate se fusionan."
    },
    {
      id: 19,
      ubicacion: "Costa Cafetera",
      respuesta: "Costa Cafetera",
      keywords: ["costa cafetera", "costa", "cafetera", "cafe", "café"],
      imagen: "assets/dia2_guessr/PENDIENTE.jpg",
      pista: "Tómate un respiro, un buen espresso y vigila el mar en esta 'costa' llena de energía.",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "I6",
      dificultad: "Fácil",
      curiosidad: "Zona costera famosa por sus cafeterías frente al océano."
    },
    {
      id: 20,
      ubicacion: "Desguace Desolado",
      respuesta: "Desguace Desolado",
      keywords: ["desguace desolado", "desguace", "desolado", "chatarra"],
      imagen: "assets/dia2_guessr/PENDIENTE.jpg",
      pista: "Entre chatarra y piezas sueltas, este 'desguace' está más vacío que un cofre ya abierto.",
      capitulo: "Capítulo 7 • Temporada 3",
      cuadricula: "G2",
      dificultad: "Media",
      curiosidad: "Gran cementerio de vehículos abandonados y piezas mecánicas."
    }
  ];

  // ========================================================================
  // 2. STATE MANAGEMENT
  // ========================================================================
  let currentActiveIndex = 0;
  let isAudioEnabled = true;
  let isProcessingMatch = false; // Mutex lock for speed validator
  let receivedCoordsCount = 0;
  const completedRounds = new Set();

  // Web Audio Context Synthesizer
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

  function playTacticalSound(type) {
    if (!isAudioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;

      if (type === 'stamp') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.28);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.3);

      } else if (type === 'reveal') {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc1.type = 'triangle';
        osc2.type = 'sawtooth';
        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        osc2.frequency.setValueAtTime(660, now);
        osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.25);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.35);

      } else if (type === 'next') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(940, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.12);

      } else if (type === 'victory') {
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((f, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.1);
          gain.gain.setValueAtTime(0.15, now + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.45);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 0.5);
        });
      }
    } catch (e) {
      console.warn('Audio feedback failed:', e);
    }
  }

  // ========================================================================
  // 3. TEXT NORMALIZATION
  // ========================================================================
  function normalizeText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ========================================================================
  // 4. DOM ELEMENTS
  // ========================================================================
  const feedScanContainer = document.getElementById('feedScanContainer');
  const stickyRoundNum = document.getElementById('stickyRoundNum');
  const roundTrackGrid = document.getElementById('roundTrackGrid');
  const btnAudioToggle = document.getElementById('btnAudioToggle');
  const btnFullscreenToggle = document.getElementById('btnFullscreenToggle');
  
  // Radar Terminal DOM Elements
  const radarChatMessages = document.getElementById('radarChatMessages');
  const radarWsBadge = document.getElementById('radarWsBadge');
  const radarMsgCount = document.getElementById('radarMsgCount');
  const radarTargetText = document.getElementById('radarTargetText');

  // Streamer Dock Controls
  const manualTestForm = document.getElementById('manualTestForm');
  const manualTestInput = document.getElementById('manualTestInput');
  const btnForceReveal = document.getElementById('btnForceReveal');
  const btnResetGame = document.getElementById('btnResetGame');
  const btnHintActive = document.getElementById('btnHintActive');

  // ========================================================================
  // 5. RADAR DE COMUNICACIONES (TERMINAL LOG FEED)
  // ========================================================================
  function appendRadarTerminalLine(author, message, type = 'user') {
    if (!radarChatMessages) return;

    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;

    if (type === 'sys') {
      line.innerHTML = `<span class="terminal-coord">[SYS_STATUS]</span> <span class="terminal-msg">${escapeHtml(message)}</span>`;
    } else if (type === 'match-win') {
      line.innerHTML = `<span class="terminal-coord" style="color: #FFD166;">[SYS_CONFIRM]</span> <span class="terminal-msg" style="color: #FFFFFF;">🎯 ¡ZONA CONFIRMADA por <strong>@${escapeHtml(author)}</strong>! Coordenadas verificadas.</span>`;
    } else {
      line.innerHTML = `<span class="terminal-coord">[COORD_RECV]</span> <span class="terminal-author">${escapeHtml(author)}:</span> <span class="terminal-msg">${escapeHtml(message)}</span>`;
    }

    radarChatMessages.appendChild(line);
    
    // Auto-scroll chat feed to the newest message
    radarChatMessages.scrollTo({
      top: radarChatMessages.scrollHeight,
      behavior: 'smooth'
    });

    if (radarChatMessages.children.length > 90) {
      radarChatMessages.removeChild(radarChatMessages.firstChild);
    }
  }

  // ========================================================================
  // 6. PROCEDURAL BLUEPRINT CANVAS GENERATOR FOR FALLBACKS
  // ========================================================================
  function drawCardCanvas(canvas, round) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 1280;
    const height = canvas.height = 720;

    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, 650);
    bgGrad.addColorStop(0, '#0E1C2C');
    bgGrad.addColorStop(0.6, '#08121E');
    bgGrad.addColorStop(1, '#03060B');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(0, 250, 154, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(0, 250, 154, 0.25)';
    ctx.lineWidth = 1.6;
    const seed = (round.id * 89) % 360;
    for (let r = 60; r <= 320; r += 45) {
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const offset = Math.sin(angle * 5 + seed + r) * 16 + Math.cos(angle * 3 + seed) * 14;
        const x = width / 2 + (r + offset) * Math.cos(angle);
        const y = height / 2 + (r + offset) * 0.75 * Math.sin(angle);
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(0, 210, 255, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 180, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 280, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = '#00fa9a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 36, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2 - 50, height / 2);
    ctx.lineTo(width / 2 + 50, height / 2);
    ctx.moveTo(width / 2, height / 2 - 50);
    ctx.lineTo(width / 2 + 50, height / 2);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 36px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 250, 154, 0.6)';
    ctx.shadowBlur = 14;
    ctx.fillText(`IMAGEN DE UBICACIÓN #${round.id}`, width / 2, height / 2 - 80);

    ctx.fillStyle = '#00fa9a';
    ctx.font = '700 20px "JetBrains Mono", monospace';
    ctx.shadowBlur = 8;
    ctx.fillText('FORTNITE RECON DRONE • FEED SATELITAL', width / 2, height / 2 + 100);

    ctx.fillStyle = '#38BDF8';
    ctx.font = '600 16px "JetBrains Mono", monospace';
    ctx.shadowBlur = 0;
    ctx.fillText(`CUADRÍCULA [ ${round.cuadricula} ] • ${round.capitulo}`, width / 2, height / 2 + 130);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = '500 14px "Outfit", sans-serif';
    ctx.fillText('Escribe la respuesta en el chat de Twitch de @imarixu', width / 2, height / 2 + 160);
  }

  // ========================================================================
  // 7. BUILD VERTICAL FEED (20 Cards with Image Paths & Clues)
  // ========================================================================
  function buildVerticalFeed() {
    if (!feedScanContainer) return;
    feedScanContainer.innerHTML = '';

    RONDAS_FORTNITE.forEach((round, idx) => {
      const card = document.createElement('article');
      card.className = `feed-card ${idx === 0 ? 'is-active' : 'is-hidden'}`;
      card.id = `feedCard_${idx}`;
      card.setAttribute('data-round-index', idx);

      card.innerHTML = `
        <!-- Card Header Strip -->
        <div class="feed-card-header">
          <div class="card-round-badge">
            <i class="fas fa-location-crosshairs"></i>
            <span>RONDA #${round.id.toString().padStart(2, '0')} // FORTNITE_POI</span>
          </div>
          <div class="card-meta-tags">
            <span class="card-meta-pill chapter"><i class="fas fa-layer-group"></i> ${round.capitulo}</span>
            <span class="card-meta-pill difficulty"><i class="fas fa-shield-alt"></i> ${round.dificultad}</span>
            <span class="card-meta-pill grid-coord"><i class="fas fa-crosshairs"></i> GRID ${round.cuadricula}</span>
          </div>
        </div>

        <!-- Recon Drone Viewfinder Visual (16:9) -->
        <div class="feed-drone-viewport" id="viewport_${idx}">
          <canvas class="feed-viewport-canvas" id="canvas_${idx}"></canvas>
          <img class="feed-viewport-img" id="img_${idx}" alt="Ubicación ${round.id}: ${round.ubicacion}" style="display: none;">

          <!-- Tactical Confirmed Stamp Container -->
          <div class="stamp-slot" id="stampSlot_${idx}"></div>

          <!-- Tactical HUD Corners ⌜ ⌝ ⌞ ⌟ -->
          <div class="reticle-corner top-left"></div>
          <div class="reticle-corner top-right"></div>
          <div class="reticle-corner bottom-left"></div>
          <div class="reticle-corner bottom-right"></div>

          <!-- Center Crosshair -->
          <div class="center-crosshair">
            <div class="center-crosshair-dot"></div>
          </div>

          <!-- Telemetry Top Bar -->
          <div class="viewport-telemetry-top">
            <div class="viewport-rec-tag">
              <span class="rec-pulse-dot"></span>
              <span>REC [CAM-${round.id.toString().padStart(2, '0')}]</span>
            </div>
            <div>RECON_FEED // 4K HDR</div>
            <div>FOV: 92°</div>
          </div>

          <!-- Telemetry Bottom Bar -->
          <div class="viewport-telemetry-bottom">
            <div>SATELLITE: <strong>GEO-FORT-${round.id}</strong></div>
            <div>GRID: <strong>${round.cuadricula}</strong></div>
            <div>STATUS: <strong style="color: var(--radar-green);">ENLACE ACTIVO</strong></div>
          </div>
        </div>

        <!-- ENCRYPTED CLUE TERMINAL UNDER IMAGE -->
        <div class="card-clue-terminal">
          <div class="clue-terminal-header">
            <span class="clue-tag-led"></span>
            <i class="fas fa-terminal"></i> PISTA ENCRIPTADA (DESCODIFICADOR TÁCTICO)
          </div>
          <div class="clue-terminal-body">
            <i class="fas fa-quote-left clue-quote-icon"></i>
            <p class="clue-text">${round.pista}</p>
          </div>
        </div>

        <!-- Answer & Winner Status Box -->
        <div class="feed-card-answer-box" id="answerBox_${idx}">
          
          <!-- State Locked (Waiting for chat) -->
          <div class="card-state-locked" id="stateLocked_${idx}">
            <div class="locked-info-group">
              <i class="fas fa-shield-halved locked-icon-pulse"></i>
              <div>
                <div class="locked-text-title">[ 🔒 UBICACIÓN CLASIFICADA ]</div>
                <div class="locked-text-sub">Escribe el nombre de la localización en el chat para desbloquearla</div>
              </div>
            </div>
            <span class="locked-listening-tag">
              <span class="hud-blip-dot"></span> ESCUCHANDO CHAT...
            </span>
          </div>

          <!-- State Completed (Revealed on match) -->
          <div class="card-state-completed" id="stateCompleted_${idx}">
            
            <!-- Prominent Explorer Winner Recognition Banner -->
            <div class="explorer-winner-banner" id="winnerBanner_${idx}">
              <i class="fas fa-trophy explorer-trophy-icon"></i>
              <div>
                <span class="explorer-winner-label">Descubierto por el Explorador:</span>
                <span class="explorer-user-highlight" id="winnerText_${idx}">@Comunidad</span>
              </div>
            </div>
            
            <h2 class="completed-location-name" id="locName_${idx}">${round.respuesta || round.ubicacion}</h2>
            <p class="completed-trivia-text">${round.curiosidad || round.pista}</p>
          </div>

        </div>
      `;

      feedScanContainer.appendChild(card);

      // Render procedural blueprint canvas
      const canvasEl = card.querySelector(`#canvas_${idx}`);
      drawCardCanvas(canvasEl, round);

      // Attempt to load the image file from assets/dia2_guessr/ with smart extension fallback
      const imgEl = card.querySelector(`#img_${idx}`);
      const fallbackExtensions = ['.jpg', '.jpeg', '.webp', '.png'];
      let extIndex = 0;

      function tryLoadImage(src) {
        const testImg = new Image();
        testImg.onload = () => {
          imgEl.src = src;
          imgEl.style.display = 'block';
          canvasEl.style.display = 'none';
        };
        testImg.onerror = () => {
          const dotIndex = round.imagen.lastIndexOf('.');
          if (dotIndex !== -1 && extIndex < fallbackExtensions.length) {
            const basePath = round.imagen.substring(0, dotIndex);
            const nextExt = fallbackExtensions[extIndex++];
            tryLoadImage(basePath + nextExt);
          } else {
            imgEl.style.display = 'none';
            canvasEl.style.display = 'block';
          }
        };
        testImg.src = src;
      }

      tryLoadImage(round.imagen);
    });

    buildStickyTrack();
    updateStickyHUD();
  }

  // ========================================================================
  // 8. STICKY TOP 20-ROUND TRACK
  // ========================================================================
  function buildStickyTrack() {
    if (!roundTrackGrid) return;
    roundTrackGrid.innerHTML = '';

    RONDAS_FORTNITE.forEach((r, idx) => {
      const node = document.createElement('div');
      node.className = `track-node ${idx === 0 ? 'active' : ''}`;
      node.id = `trackNode_${idx}`;
      node.textContent = r.id;
      node.title = `Ronda ${r.id}: ${r.ubicacion}`;
      node.addEventListener('click', () => {
        const card = document.getElementById(`feedCard_${idx}`);
        if (card && !card.classList.contains('is-hidden')) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
      roundTrackGrid.appendChild(node);
    });
  }

  function updateStickyHUD() {
    if (stickyRoundNum) {
      stickyRoundNum.textContent = currentActiveIndex + 1;
    }

    if (radarTargetText) {
      const activeRound = RONDAS_FORTNITE[currentActiveIndex];
      radarTargetText.innerHTML = `<span class="radar-ping-dot"></span> OBJETIVO ACTUAL: <strong>RONDA #${activeRound ? activeRound.id.toString().padStart(2, '0') : '20'}</strong> // ${activeRound ? activeRound.cuadricula : 'FIN'}`;
    }

    RONDAS_FORTNITE.forEach((_, idx) => {
      const node = document.getElementById(`trackNode_${idx}`);
      if (!node) return;
      node.classList.remove('active', 'completed');
      if (completedRounds.has(idx)) {
        node.classList.add('completed');
      }
      if (idx === currentActiveIndex) {
        node.classList.add('active');
      }
    });
  }

  // ========================================================================
  // 9. HIGH-SPEED RESOLUTION, MILITARY STAMP & AUTO-SCROLL
  // ========================================================================
  function completeActiveRound(winnerUser = 'Chat de ImArixu') {
    if (isProcessingMatch) return;
    if (completedRounds.has(currentActiveIndex)) return;

    isProcessingMatch = true;
    const roundIndex = currentActiveIndex;
    const roundData = RONDAS_FORTNITE[roundIndex];
    completedRounds.add(roundIndex);

    const currentCard = document.getElementById(`feedCard_${roundIndex}`);
    const stampSlot = document.getElementById(`stampSlot_${roundIndex}`);
    const stateLocked = document.getElementById(`stateLocked_${roundIndex}`);
    const stateCompleted = document.getElementById(`stateCompleted_${roundIndex}`);
    const winnerText = document.getElementById(`winnerText_${roundIndex}`);

    // B) SUPERPOSE MILITARY CARTOGRAPHIC STAMP "📍 ZONA CONFIRMADA"
    if (stampSlot) {
      stampSlot.innerHTML = `
        <div class="tactical-confirmed-stamp">
          <div class="stamp-main-text">
            <i class="fas fa-location-dot"></i> ZONA CONFIRMADA
          </div>
          <div class="stamp-sub-text">
            COORDENADAS VERIFICADAS // GRID ${roundData.cuadricula}
          </div>
        </div>
      `;
    }

    if (currentCard) {
      currentCard.classList.remove('is-active');
      currentCard.classList.add('is-completed');
    }

    // C) PROMINENTLY DISPLAY "Descubierto por el Explorador: [Nombre]"
    if (stateLocked) stateLocked.style.display = 'none';
    if (stateCompleted) stateCompleted.style.display = 'flex';
    if (winnerText) winnerText.textContent = `@${winnerUser}`;

    playTacticalSound('stamp');
    setTimeout(() => playTacticalSound('reveal'), 250);

    appendRadarTerminalLine(winnerUser, roundData.respuesta || roundData.ubicacion, 'match-win');

    // D) CASCADE REVEAL & AUTO-SCROLL TO NEXT CARD
    if (roundIndex < RONDAS_FORTNITE.length - 1) {
      const nextIndex = roundIndex + 1;
      currentActiveIndex = nextIndex;

      setTimeout(() => {
        const nextCard = document.getElementById(`feedCard_${nextIndex}`);
        if (nextCard) {
          nextCard.classList.remove('is-hidden');
          nextCard.classList.add('is-active');

          nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          playTacticalSound('next');
        }

        updateStickyHUD();
        isProcessingMatch = false;
      }, 700);

    } else {
      updateStickyHUD();
      setTimeout(() => {
        playTacticalSound('victory');
        appendRadarTerminalLine('SISTEMA', '🎉 ¡MISIÓN CUMPLIDA! Todas las 20 zonas de la isla han sido identificadas.', 'sys');
        alert('🎉 ¡ENHORABUENA! El chat de @imarixu ha completado con éxito las 20 rondas de Fortnite-Guessr.');
      }, 700);
    }
  }

  // ========================================================================
  // 10. SPEED VALIDATOR (MATCH AGAINST CURRENT ACTIVE IMAGE ONLY)
  // ========================================================================
  function validateGuessMessage(rawMessage, username) {
    if (isProcessingMatch) return;
    if (currentActiveIndex >= RONDAS_FORTNITE.length) return;
    if (completedRounds.has(currentActiveIndex)) return;

    const normalizedMsg = normalizeText(rawMessage);
    const round = RONDAS_FORTNITE[currentActiveIndex];

    const keywords = round.keywords || [];
    const isMatch = keywords.some(keyword => {
      const normalizedKeyword = normalizeText(keyword);
      return normalizedKeyword && normalizedMsg.includes(normalizedKeyword);
    }) || (round.respuesta && normalizedMsg.includes(normalizeText(round.respuesta)))
       || (round.ubicacion && normalizedMsg.includes(normalizeText(round.ubicacion)));

    if (isMatch) {
      console.log(`🎯 ¡ACIERTO EN RONDA #${round.id}! Descubierto por @${username}: "${rawMessage}"`);
      completeActiveRound(username);
    }
  }

  // ========================================================================
  // 11. TWITCH WEBSOCKET IRC CONNECTION (wss://irc-ws.chat.twitch.tv:443)
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
          radarWsBadge.textContent = '● RECEPTOR EN DIRECTO';
          radarWsBadge.style.color = '#00fa9a';
          radarWsBadge.style.borderColor = '#00fa9a';
        }
        appendRadarTerminalLine('SISTEMA', `✔ Enlace con Twitch IRC establecido en #${channelName}. Radar a la escucha...`, 'sys');
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
            parseTwitchPrivmsg(line);
          }
        });
      };

      ws.onerror = (err) => {
        console.warn('Twitch WS Error:', err);
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
      console.warn('WebSocket init failed:', e);
    }
  }

  function parseTwitchPrivmsg(rawLine) {
    let username = 'Explorador';
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

    if (message) {
      receivedCoordsCount++;
      if (radarMsgCount) {
        radarMsgCount.innerHTML = `<strong>${receivedCoordsCount}</strong> COORD_RECV`;
      }

      appendRadarTerminalLine(username, message, 'user');
      validateGuessMessage(message, username);
    }
  }

  // ========================================================================
  // 12. STREAMER DOCK & MANUAL CONTROLS
  // ========================================================================
  if (manualTestForm && manualTestInput) {
    manualTestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = manualTestInput.value.trim();
      if (val) {
        receivedCoordsCount++;
        if (radarMsgCount) {
          radarMsgCount.innerHTML = `<strong>${receivedCoordsCount}</strong> COORD_RECV`;
        }
        appendRadarTerminalLine('ImArixu (Manual)', val, 'user');
        validateGuessMessage(val, 'ImArixu (Manual)');
        manualTestInput.value = '';
      }
    });
  }

  if (btnForceReveal) {
    btnForceReveal.addEventListener('click', () => {
      completeActiveRound('ImArixu (Streamer)');
    });
  }

  if (btnHintActive) {
    btnHintActive.addEventListener('click', () => {
      const round = RONDAS_FORTNITE[currentActiveIndex];
      if (round) {
        appendRadarTerminalLine('SISTEMA PISTA', `Ronda #${round.id}: ${round.pista}`, 'sys');
        alert(`💡 PISTA PARA LA RONDA #${round.id} (${round.capitulo}):\n\n${round.pista}`);
      }
    });
  }

  if (btnResetGame) {
    btnResetGame.addEventListener('click', () => {
      if (confirm('¿Seguro que deseas reiniciar todo el feed de Fortnite-Guessr desde la Ronda #1?')) {
        completedRounds.clear();
        currentActiveIndex = 0;
        isProcessingMatch = false;
        receivedCoordsCount = 0;
        buildVerticalFeed();
        if (radarChatMessages) {
          radarChatMessages.innerHTML = `
            <div class="terminal-line sys">
              <span class="terminal-coord">[SYS_RESET]</span> Misión reiniciada. Escuchando respuestas de exploración en #imarixu...
            </div>
          `;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        document.documentElement.requestFullscreen().catch(err => console.warn(err));
      } else {
        document.exitFullscreen();
      }
    });
  }

  // Keyboard Shortcuts for Streamer
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.code === 'Space' || e.key.toLowerCase() === 'r') {
      e.preventDefault();
      completeActiveRound('ImArixu (Atajo)');
    } else if (e.key.toLowerCase() === 'h') {
      e.preventDefault();
      const round = RONDAS_FORTNITE[currentActiveIndex];
      if (round) {
        appendRadarTerminalLine('SISTEMA PISTA', `Ronda #${round.id}: ${round.pista}`, 'sys');
        alert(`💡 PISTA RONDA #${round.id}: ${round.pista}`);
      }
    }
  });

  // ========================================================================
  // 13. INITIALIZE ENGINE
  // ========================================================================
  buildVerticalFeed();
  initTwitchWebSocket();
  console.log('🗺️ Fortnite-Guessr con imágenes cargadas y Capítulo 7 Temporada 3 iniciado.');
});
