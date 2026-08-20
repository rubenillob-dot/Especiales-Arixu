document.addEventListener('DOMContentLoaded', () => {
  const COSMETICOS_PRECIO_JUSTO = [
    {
      id: 1,
      nombre: "Skin Raven (Cuervo)",
      categoria: "Skin",
      precio: 2000,
      imagen: "PrecioJusto/Raven.jpg",
      descripcion: "Uno de los atuendos más legendarios e icónicos de la Temporada 3 de Fortnite."
    },
    {
      id: 2,
      nombre: "Skin Black Widow",
      categoria: "Skin",
      precio: 1500,
      imagen: "PrecioJusto/Black_Widow.jpg",
      descripcion: "Atuendo de Marvel lanzado originalmente durante el evento Vengadores: Endgame."
    },
    {
      id: 3,
      nombre: "Skin Demogorgon",
      categoria: "Skin",
      precio: 1500,
      imagen: "PrecioJusto/Demogorgon.jpg",
      descripcion: "La temible criatura del Upside Down de la colaboración con Stranger Things."
    },
    {
      id: 4,
      nombre: "Pack Ninja",
      categoria: "Pack",
      precio: 2000,
      imagen: "PrecioJusto/Pack_Ninja.jpg",
      descripcion: "Lote de la Serie de Ídolos del legendario streamer Tyler 'Ninja' Blevins."
    },
    {
      id: 5,
      nombre: "Pack Star Wars",
      categoria: "Pack",
      precio: 3000,
      imagen: "PrecioJusto/Pack_StarWars.jpg",
      descripcion: "Lote galáctico especial con skins de la saga Star Wars en la tienda."
    },
    {
      id: 6,
      nombre: "Skin Travis Scott",
      categoria: "Skin",
      precio: 1500,
      imagen: "PrecioJusto/Travis_Scott.jpg",
      descripcion: "Skin exclusiva del evento astronómico en vivo Astronomical de Travis Scott."
    },
    {
      id: 7,
      nombre: "Pack Venom",
      categoria: "Pack",
      precio: 2800,
      imagen: "PrecioJusto/Pack_Venom.jpg",
      descripcion: "Lote simbionte de Marvel con el simbionte Venom y sus accesorios."
    },
    {
      id: 8,
      nombre: "Skin Thanos",
      categoria: "Skin",
      precio: 1500,
      imagen: "PrecioJusto/Thanos.jpg",
      descripcion: "El Titán Loco de Marvel equipado con el Guantelete del Infinito."
    },
    {
      id: 9,
      nombre: "Skin Xenomorfo",
      categoria: "Skin",
      precio: 1600,
      imagen: "PrecioJusto/Xenomorfo.jpg",
      descripcion: "El cazador perfecto de la saga Alien como parte de la Serie Leyendas del Juego."
    },
    {
      id: 10,
      nombre: "Pack TheGrefg",
      categoria: "Pack",
      precio: 1800,
      imagen: "PrecioJusto/Pack_Grefg.jpg",
      descripcion: "Lote de la Serie de Ídolos de TheGrefg tras su histórico récord mundial en Twitch."
    },
    {
      id: 11,
      nombre: "Pico Unicornio (Llamacornio)",
      categoria: "Pico",
      precio: 1500,
      imagen: "PrecioJusto/Pico_Unicornio.jpg",
      descripcion: "Herramienta de recolección épica y colorida con animaciones brillantes."
    },
    {
      id: 12,
      nombre: "Pico Varita Estrellada",
      categoria: "Pico",
      precio: 800,
      imagen: "PrecioJusto/Varita_estrellada.jpg",
      descripcion: "Uno de los picos más populares y tryhard de la historia competitiva."
    },
    {
      id: 13,
      nombre: "Pico Escudo Capitán América",
      categoria: "Pico",
      precio: 800,
      imagen: "PrecioJusto/escudo_capi.jpg",
      descripcion: "El icónico escudo de vibranium de Marvel que funciona como mochila y pico."
    },
    {
      id: 14,
      nombre: "Pico Beskar",
      categoria: "Pico",
      precio: 800,
      imagen: "PrecioJusto/Pico_Beskar.jpg",
      descripcion: "Lanza de acero Beskar forjada en el universo de The Mandalorian."
    },
    {
      id: 15,
      nombre: "Mascota Baby Groot",
      categoria: "Mascota",
      precio: 1500,
      imagen: "PrecioJusto/BabyGroot.jpg",
      descripcion: "Mochila interactiva que baila en su maceta reactiva a las eliminaciones."
    },
    {
      id: 16,
      nombre: "Mascota Super Meat Boy",
      categoria: "Mascota",
      precio: 1500,
      imagen: "PrecioJusto/supermeatboy.jpg",
      descripcion: "Acompañante cosmético de la colaboración indie en Fortnite."
    },
    {
      id: 17,
      nombre: "Mochila Grinning Ghoul",
      categoria: "Mochila",
      precio: 400,
      imagen: "PrecioJusto/Grinning_Ghoul.jpg",
      descripcion: "Accesorio mochilero oscuro y espectral para combinaciones temáticas."
    },
    {
      id: 18,
      nombre: "Mochila Saco de Boxeo",
      categoria: "Mochila",
      precio: 300,
      imagen: "PrecioJusto/Saco_Boxeo.jpg",
      descripcion: "Mochila de entrenamiento físico con efecto reactivo a los impactos."
    },
    {
      id: 19,
      nombre: "Mochila MJ (Mary Jane)",
      categoria: "Mochila",
      precio: 1500,
      imagen: "PrecioJusto/Mochila_MJ.jpg",
      descripcion: "Accesorio mochilero de Spider-Man & Mary Jane Watson de Marvel."
    },
    {
      id: 20,
      nombre: "Mochila Impostor",
      categoria: "Mochila",
      precio: 500,
      imagen: "PrecioJusto/Impostor.jpg",
      descripcion: "Accesorio mochilero de la colaboración oficial de Among Us en Fortnite."
    }
  ];

  let currentItemIndex = 0;
  let isUrnOpen = false;
  let isRevealed = false;
  let audioEnabled = true;
  let urnOpenTimestamp = 0;

  const currentRoundBids = new Map();
  const userScores = new Map();
  const roundHistory = [];

  const headerRoundNum = document.getElementById('headerRoundNum');
  const roundNumberBadge = document.getElementById('roundNumberBadge');
  const categoryBadge = document.getElementById('categoryBadge');
  const urnStatusBadge = document.getElementById('urnStatusBadge');
  const urnStatusText = document.getElementById('urnStatusText');
  const cosmeticImg = document.getElementById('cosmeticImg');
  const cosmeticName = document.getElementById('cosmeticName');
  const cosmeticDesc = document.getElementById('cosmeticDesc');
  const vaultPriceValue = document.getElementById('vaultPriceValue');
  const priceNumberText = document.getElementById('priceNumberText');
  const roundBidsCount = document.getElementById('roundBidsCount');
  const roundBidRange = document.getElementById('roundBidRange');
  const roundBidAverage = document.getElementById('roundBidAverage');
  const roundWinnerCard = document.getElementById('roundWinnerCard');
  const winnerHeadline = document.getElementById('winnerHeadline');
  const winnerUserRow = document.getElementById('winnerUserRow');
  const winnerStatsRow = document.getElementById('winnerStatsRow');
  const bidsFeedCountBadge = document.getElementById('bidsFeedCountBadge');
  const bidsFeedChips = document.getElementById('bidsFeedChips');
  const emptyBidsHint = document.getElementById('emptyBidsHint');

  const btnStartUrn = document.getElementById('btnStartUrn');
  const btnCloseUrn = document.getElementById('btnCloseUrn');
  const btnPrevRound = document.getElementById('btnPrevRound');
  const btnNextRound = document.getElementById('btnNextRound');
  const btnResetRound = document.getElementById('btnResetRound');
  const btnSimulateBids = document.getElementById('btnSimulateBids');
  const btnAddManualBid = document.getElementById('btnAddManualBid');
  const btnShowPodium = document.getElementById('btnShowPodium');
  const btnAudioToggle = document.getElementById('btnAudioToggle');
  const btnFullscreenToggle = document.getElementById('btnFullscreenToggle');

  const tabChatBtn = document.getElementById('tabChatBtn');
  const tabLeaderboardBtn = document.getElementById('tabLeaderboardBtn');
  const tabChatContent = document.getElementById('tabChatContent');
  const tabLeaderboardContent = document.getElementById('tabLeaderboardContent');
  const chatCountBadge = document.getElementById('chatCountBadge');
  const lbTotalUsers = document.getElementById('lbTotalUsers');
  const radarWsTag = document.getElementById('radarWsTag');
  const radarChatMessages = document.getElementById('radarChatMessages');
  const radarActiveUrnStatus = document.getElementById('radarActiveUrnStatus');
  const radarRoundEstimatesBadge = document.getElementById('radarRoundEstimatesBadge');
  const radarLeaderboardFeed = document.getElementById('radarLeaderboardFeed');

  const podiumModalOverlay = document.getElementById('podiumModalOverlay');
  const btnClosePodiumModal = document.getElementById('btnClosePodiumModal');
  const btnModalDismiss = document.getElementById('btnModalDismiss');
  const btnDownloadTxtReport = document.getElementById('btnDownloadTxtReport');
  const btnRestartGame = document.getElementById('btnRestartGame');
  const podiumFirstUser = document.getElementById('podiumFirstUser');
  const podiumFirstPoints = document.getElementById('podiumFirstPoints');
  const podiumFirstSpeed = document.getElementById('podiumFirstSpeed');
  const podiumSecondUser = document.getElementById('podiumSecondUser');
  const podiumSecondPoints = document.getElementById('podiumSecondPoints');
  const podiumSecondSpeed = document.getElementById('podiumSecondSpeed');
  const podiumThirdUser = document.getElementById('podiumThirdUser');
  const podiumThirdPoints = document.getElementById('podiumThirdPoints');
  const podiumThirdSpeed = document.getElementById('podiumThirdSpeed');
  const flashOverlay = document.getElementById('flashOverlay');
  const confettiCanvas = document.getElementById('confettiCanvas');

  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'coin') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.08);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'cash') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now);
        osc1.frequency.setValueAtTime(659.25, now + 0.07);
        osc1.frequency.setValueAtTime(783.99, now + 0.14);
        osc1.frequency.setValueAtTime(1046.50, now + 0.21);
        osc2.frequency.setValueAtTime(2093.00, now + 0.21);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now + 0.21);
        osc1.stop(now + 0.6);
        osc2.stop(now + 0.6);
      } else if (type === 'horn') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.45);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'open') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn('Audio FX error:', e);
    }
  }

  function launchConfetti(durationMs = 2800) {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    let width = confettiCanvas.width = window.innerWidth;
    let height = confettiCanvas.height = window.innerHeight;

    const colors = ['#FFD700', '#FFE866', '#00F0FF', '#10B981', '#FFFFFF', '#0088FF'];
    const particles = [];

    for (let i = 0; i < 110; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height * 0.5,
        w: Math.random() * 10 + 6,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: Math.random() * 3 + 2.5,
        vx: Math.random() * 3 - 1.5,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 8 - 4
      });
    }

    let startTime = performance.now();
    function render(now) {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (now - startTime < durationMs) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }
    requestAnimationFrame(render);
  }

  function triggerFlashEffect() {
    if (!flashOverlay) return;
    flashOverlay.classList.add('flash-active');
    setTimeout(() => {
      flashOverlay.classList.remove('flash-active');
    }, 140);
  }

  function loadItem(index) {
    if (index < 0 || index >= COSMETICOS_PRECIO_JUSTO.length) return;
    currentItemIndex = index;
    isUrnOpen = false;
    isRevealed = false;
    currentRoundBids.clear();

    const item = COSMETICOS_PRECIO_JUSTO[currentItemIndex];

    headerRoundNum.textContent = currentItemIndex + 1;
    roundNumberBadge.textContent = `ARTÍCULO #${currentItemIndex + 1} / ${COSMETICOS_PRECIO_JUSTO.length}`;
    categoryBadge.innerHTML = `<i class="fas fa-tag"></i> CATEGORÍA: ${item.categoria.toUpperCase()}`;

    urnStatusBadge.className = 'urn-status-badge urn-closed';
    urnStatusText.textContent = 'URNA CERRADA';

    cosmeticImg.src = item.imagen;
    cosmeticImg.alt = item.nombre;
    cosmeticName.textContent = item.nombre;
    cosmeticDesc.textContent = item.descripcion;

    vaultPriceValue.className = 'vault-price-value hidden-price';
    priceNumberText.textContent = '???';

    roundWinnerCard.classList.remove('active', 'all-over', 'exact-hit');
    roundWinnerCard.style.display = 'none';

    btnStartUrn.disabled = false;
    btnCloseUrn.disabled = true;

    updateMetricsUI();
    renderBidsFeed();

    radarActiveUrnStatus.innerHTML = `Urna: <strong style="color: #F87171;">CERRADA</strong>`;
    appendRadarLog('SISTEMA', `📦 Ronda #${currentItemIndex + 1}: ${item.nombre} cargado. Pulsa 'Abrir Urna' para iniciar.`, 'sys');
  }

  function openUrn() {
    if (isUrnOpen || isRevealed) return;
    isUrnOpen = true;
    urnOpenTimestamp = Date.now();

    urnStatusBadge.className = 'urn-status-badge urn-open';
    urnStatusText.textContent = '🟢 URNA ABIERTA';

    btnStartUrn.disabled = true;
    btnCloseUrn.disabled = false;

    radarActiveUrnStatus.innerHTML = `Urna: <strong style="color: #34D399;">ABIERTA</strong>`;
    appendRadarLog('SISTEMA', `🔔 ¡URNA ABIERTA! Escribe tu estimación en PaVos en el chat (ej. 1500).`, 'sys');
    playSound('open');
  }

  function calculateAndCloseUrn() {
    if (!isUrnOpen || isRevealed) return;
    isUrnOpen = false;
    isRevealed = true;

    urnStatusBadge.className = 'urn-status-badge urn-revealed';
    urnStatusText.textContent = '🏆 RESULTADOS';

    btnStartUrn.disabled = true;
    btnCloseUrn.disabled = true;

    radarActiveUrnStatus.innerHTML = `Urna: <strong style="color: #FFD700;">CALCULANDO</strong>`;

    const item = COSMETICOS_PRECIO_JUSTO[currentItemIndex];
    const realPrice = item.precio;

    const bidsArray = Array.from(currentRoundBids.entries()).map(([user, data]) => ({
      user,
      bid: typeof data === 'object' ? data.bid : data,
      reactionTimeMs: typeof data === 'object' ? data.reactionTimeMs : 0
    }));

    const validBids = [];
    const overBids = [];

    bidsArray.forEach(entry => {
      if (entry.bid > realPrice) {
        overBids.push({ ...entry, diff: entry.bid - realPrice, status: 'OVER' });
      } else {
        const diff = realPrice - entry.bid;
        validBids.push({ ...entry, diff, isExact: diff === 0, status: 'VALID' });
      }
    });

    let roundWinners = [];
    let isAllOver = false;
    let isExactHit = false;

    if (validBids.length === 0) {
      isAllOver = true;
    } else {
      // Ordenar por diferencia (más cercano) y desempatar por menor tiempo de reacción
      validBids.sort((a, b) => {
        if (a.diff !== b.diff) {
          return a.diff - b.diff;
        }
        return (a.reactionTimeMs || 0) - (b.reactionTimeMs || 0);
      });

      const winner = validBids[0];
      roundWinners = [winner];
      isExactHit = winner.diff === 0;

      roundWinners.forEach(w => {
        const currentScore = userScores.get(w.user) || {
          points: 0,
          exactHits: 0,
          closestHits: 0,
          wins: 0,
          totalAciertos: 0,
          tiempoTotalRespuesta: 0,
          totalReactionTime: 0
        };
        const addedPoints = isExactHit ? 3 : 1;
        currentScore.points += addedPoints;
        currentScore.wins += 1;
        currentScore.totalAciertos = (currentScore.totalAciertos || 0) + 1;
        if (isExactHit) currentScore.exactHits += 1;
        else currentScore.closestHits += 1;
        currentScore.totalReactionTime = (currentScore.totalReactionTime || 0) + (w.reactionTimeMs || 0);
        currentScore.tiempoTotalRespuesta = (currentScore.tiempoTotalRespuesta || 0) + (w.reactionTimeMs || 0);
        userScores.set(w.user, currentScore);
      });
    }

    roundHistory.push({
      itemNumber: currentItemIndex + 1,
      itemName: item.nombre,
      realPrice,
      totalBids: bidsArray.length,
      winners: roundWinners.map(w => ({ user: w.user, bid: w.bid, diff: w.diff, reactionTimeMs: w.reactionTimeMs })),
      isAllOver,
      isExactHit
    });

    animatePriceCounter(realPrice, () => {
      triggerFlashEffect();
      launchConfetti();
      playSound(isAllOver ? 'horn' : 'cash');

      displayWinnerBanner(roundWinners, realPrice, isAllOver, isExactHit);
      renderBidsFeed(roundWinners, realPrice);
      updateLeaderboardUI();

      if (isAllOver) {
        appendRadarLog('SISTEMA', `💥 ¡TODOS SE HAN PASADO! El precio real era ${realPrice.toLocaleString()} PaVos.`, 'sys');
      } else if (isExactHit) {
        const winner = roundWinners[0];
        const speedSec = ((winner.reactionTimeMs || 0) / 1000).toFixed(1);
        appendRadarLog('SISTEMA', `💎 ¡PLENO EXACTO! @${winner.user} acertó ${realPrice.toLocaleString()} PaVos en ${speedSec}s (+3 PTS).`, 'sys');
      } else {
        const winner = roundWinners[0];
        const speedSec = ((winner.reactionTimeMs || 0) / 1000).toFixed(1);
        appendRadarLog('SISTEMA', `🎉 GANADOR: @${winner.user} (${winner.bid.toLocaleString()} PaVos) en ${speedSec}s (+1 PTO).`, 'sys');
      }
    });
  }

  function animatePriceCounter(targetPrice, onComplete) {
    vaultPriceValue.className = 'vault-price-value revealed-price';
    let current = 0;
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      current = Math.round(easeProgress * targetPrice);
      priceNumberText.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        priceNumberText.textContent = targetPrice.toLocaleString();
        if (onComplete) onComplete();
      }
    }
    requestAnimationFrame(step);
  }

  function displayWinnerBanner(winners, realPrice, isAllOver, isExactHit) {
    roundWinnerCard.classList.remove('all-over', 'exact-hit');
    roundWinnerCard.style.display = 'block';
    roundWinnerCard.classList.add('active');

    if (isAllOver) {
      roundWinnerCard.classList.add('all-over');
      winnerHeadline.innerHTML = `<i class="fas fa-times-circle"></i> ¡TODOS SE HAN PASADO DE PRECIO!`;
      winnerUserRow.textContent = `Precio oficial: ${realPrice.toLocaleString()} PaVos`;
      winnerStatsRow.textContent = `Ningún espectador apostó una cifra menor o igual. Ningún punto otorgado.`;
    } else if (isExactHit) {
      roundWinnerCard.classList.add('exact-hit');
      const winner = winners[0];
      const speedSec = ((winner.reactionTimeMs || 0) / 1000).toFixed(1);
      winnerHeadline.innerHTML = `<i class="fas fa-gem"></i> ¡PLENO CLAVADO AL PRECIO EXACTO! (+3 PUNTOS)`;
      winnerUserRow.innerHTML = `@${winner.user} con ${realPrice.toLocaleString()} PaVos <span class="winner-speed-badge" style="display: inline-flex; align-items: center; gap: 5px; background: rgba(0, 240, 255, 0.18); border: 1px solid #00F0FF; color: #00F0FF; padding: 3px 10px; border-radius: 9999px; font-size: 0.8rem; font-weight: 800; margin-left: 8px;"><i class="fas fa-bolt"></i> ¡Respuesta rápida: ${speedSec}s!</span>`;
      winnerStatsRow.textContent = `¡Precisión milimétrica! Acierto 100% exacto en la tienda en ${speedSec} segundos.`;
    } else {
      const winner = winners[0];
      const bestBid = winner.bid;
      const diff = winner.diff;
      const speedSec = ((winner.reactionTimeMs || 0) / 1000).toFixed(1);
      winnerHeadline.innerHTML = `<i class="fas fa-trophy"></i> GANADOR DE LA RONDA (+1 PUNTO)`;
      winnerUserRow.innerHTML = `@${winner.user} con ${bestBid.toLocaleString()} PaVos <span class="winner-speed-badge" style="display: inline-flex; align-items: center; gap: 5px; background: rgba(255, 215, 0, 0.18); border: 1px solid #FFD700; color: #FFD700; padding: 3px 10px; border-radius: 9999px; font-size: 0.8rem; font-weight: 800; margin-left: 8px;"><i class="fas fa-bolt"></i> ¡Respuesta rápida: ${speedSec}s!</span>`;
      winnerStatsRow.textContent = `Diferencia con el precio real (${realPrice.toLocaleString()} PaVos): -${diff.toLocaleString()} PaVos en ${speedSec}s.`;
    }
  }

  function parseBidNumber(text) {
    if (!text) return null;
    let clean = text.trim().toLowerCase();

    const kMatch = clean.match(/^(\d+(?:[.,]\d+)?)\s*k(?:\s*pavos|\s*vbucks|\s*vb)?$/i);
    if (kMatch) {
      const val = parseFloat(kMatch[1].replace(',', '.')) * 1000;
      if (!isNaN(val) && val > 0 && val <= 50000) return Math.round(val);
    }

    clean = clean.replace(/\./g, '').replace(/,/g, '');
    const pureMatch = clean.match(/^\s*(\d{1,6})\s*(?:pavos|vbucks|vb|pts)?\s*$/i);
    if (pureMatch) {
      const val = parseInt(pureMatch[1], 10);
      if (!isNaN(val) && val > 0 && val <= 50000) return val;
    }

    const wordMatch = clean.match(/\b(\d{2,5})\b/);
    if (wordMatch) {
      const val = parseInt(wordMatch[1], 10);
      if (!isNaN(val) && val > 0 && val <= 50000) return val;
    }

    return null;
  }

  function registerBid(username, bidVal) {
    if (!isUrnOpen || isRevealed) return;
    if (currentRoundBids.has(username)) return;

    const msgTimestamp = Date.now();
    const reactionTimeMs = Math.max(0, msgTimestamp - urnOpenTimestamp);

    currentRoundBids.set(username, {
      bid: bidVal,
      reactionTimeMs: reactionTimeMs,
      timestamp: msgTimestamp
    });

    updateMetricsUI();
    renderBidsFeed();
    playSound('coin');
    const speedSec = (reactionTimeMs / 1000).toFixed(1);
    appendRadarLog(username, `Registró puja: <span class="log-bid-highlight">${bidVal.toLocaleString()} PaVos</span> <span style="font-size: 0.7rem; color: #94A3B8;">(${speedSec}s)</span>`, 'bid');
  }

  function updateMetricsUI() {
    const total = currentRoundBids.size;
    roundBidsCount.textContent = total;
    bidsFeedCountBadge.textContent = total;
    radarRoundEstimatesBadge.innerHTML = `💰 Estimaciones: <strong>${total}</strong>`;

    if (total === 0) {
      roundBidRange.textContent = '---';
      roundBidAverage.textContent = '---';
      return;
    }

    const values = Array.from(currentRoundBids.values()).map(v => typeof v === 'object' ? v.bid : v);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const sum = values.reduce((acc, v) => acc + v, 0);
    const avg = Math.round(sum / total);

    roundBidRange.textContent = `${minVal.toLocaleString()} - ${maxVal.toLocaleString()}`;
    roundBidAverage.textContent = `${avg.toLocaleString()} PaVos`;
  }

  function renderBidsFeed(roundWinners = [], realPrice = null) {
    bidsFeedChips.innerHTML = '';
    if (currentRoundBids.size === 0) {
      bidsFeedChips.appendChild(emptyBidsHint);
      return;
    }

    const winnerSet = new Set((roundWinners || []).map(w => w.user));

    currentRoundBids.forEach((data, user) => {
      const bid = typeof data === 'object' ? data.bid : data;
      const reactionTimeMs = typeof data === 'object' ? data.reactionTimeMs : 0;
      const chip = document.createElement('div');
      chip.className = 'bid-bubble-chip';

      if (isRevealed && realPrice !== null) {
        if (winnerSet.has(user)) {
          chip.classList.add(bid === realPrice ? 'evaluated-exact' : 'evaluated-winner');
        } else if (bid <= realPrice) {
          chip.classList.add('evaluated-valid');
        } else {
          chip.classList.add('evaluated-over');
        }
      }

      const speedSec = (reactionTimeMs / 1000).toFixed(1);
      chip.innerHTML = `<span class="bid-user">@${user}:</span> <span class="bid-val">${bid.toLocaleString()}</span> <span style="font-size: 0.68rem; opacity: 0.75; font-family: var(--font-mono); margin-left: 4px;">(${speedSec}s)</span>`;
      bidsFeedChips.appendChild(chip);
    });
  }

  function getSortedLeaderboardUsers() {
    return Array.from(userScores.entries()).sort((a, b) => {
      if (b[1].points !== a[1].points) return b[1].points - a[1].points;
      if (b[1].exactHits !== a[1].exactHits) return b[1].exactHits - a[1].exactHits;
      if (b[1].wins !== a[1].wins) return b[1].wins - a[1].wins;
      return (a[1].totalReactionTime || 0) - (b[1].totalReactionTime || 0);
    });
  }

  function updateLeaderboardUI() {
    const sortedUsers = getSortedLeaderboardUsers();

    lbTotalUsers.textContent = sortedUsers.length;
    radarLeaderboardFeed.innerHTML = '';

    if (sortedUsers.length === 0) {
      radarLeaderboardFeed.innerHTML = `
        <div class="lb-empty-placeholder">
          <i class="fas fa-info-circle"></i> Las puntuaciones aparecerán en cuanto se calcule la primera ronda.
        </div>`;
      return;
    }

    sortedUsers.forEach(([username, data], idx) => {
      const row = document.createElement('div');
      row.className = `lb-user-row ${idx === 0 ? 'rank-1' : ''}`;

      let medal = `#${idx + 1}`;
      if (idx === 0) medal = '🥇';
      else if (idx === 1) medal = '🥈';
      else if (idx === 2) medal = '🥉';

      row.innerHTML = `
        <div class="lb-user-left">
          <span class="lb-rank-num">${medal}</span>
          <span class="lb-username">@${username}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <span style="font-size: 0.72rem; color: #94A3B8;">(${data.exactHits}🎯/${data.wins}🏆)</span>
          <span class="lb-points-badge">${data.points} PTS</span>
        </div>`;
      radarLeaderboardFeed.appendChild(row);
    });
  }

  function appendRadarLog(author, messageHtml, type = 'chat') {
    const d = new Date();
    const timeStr = d.toTimeString().split(' ')[0];
    const logItem = document.createElement('div');
    logItem.className = `radar-log-msg ${type === 'sys' ? 'system-msg' : (type === 'bid' ? 'valid-bid' : '')}`;

    logItem.innerHTML = `
      <div class="log-meta">
        <span class="log-time">[${timeStr}]</span>
        <span class="log-author">${author}:</span>
      </div>
      <div class="log-text">${messageHtml}</div>`;

    radarChatMessages.appendChild(logItem);
    radarChatMessages.scrollTop = radarChatMessages.scrollHeight;

    const count = parseInt(chatCountBadge.textContent || '0', 10) + 1;
    chatCountBadge.textContent = count;
  }

  function initTwitchWebSocket() {
    let socket;
    try {
      socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
    } catch (err) {
      if (radarWsTag) {
        radarWsTag.textContent = '🟠 MODO SIMULADO';
        radarWsTag.style.color = '#FFB703';
      }
      return;
    }

    socket.onopen = () => {
      socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
      socket.send('PASS oauth:anonymous_user');
      socket.send(`NICK justinfan${Math.floor(Math.random() * 80000 + 10000)}`);
      socket.send('JOIN #imarixu');

      if (radarWsTag) {
        radarWsTag.textContent = '🟢 EN VIVO (#imarixu)';
        radarWsTag.style.color = '#00FA9A';
      }
      appendRadarLog('SISTEMA', '📡 Conectado al chat en vivo de Twitch (#imarixu).', 'sys');
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
          parseTwitchMessage(line);
        }
      });
    };

    socket.onerror = () => {
      if (radarWsTag) {
        radarWsTag.textContent = '🟡 RECONECTANDO...';
        radarWsTag.style.color = '#FFD166';
      }
    };

    socket.onclose = () => {
      setTimeout(initTwitchWebSocket, 6000);
    };

    function parseTwitchMessage(raw) {
      let displayName = '';
      let message = '';

      const matchTags = raw.match(/display-name=([^;]+)/);
      if (matchTags && matchTags[1]) displayName = matchTags[1];

      const privmsgIndex = raw.indexOf('PRIVMSG #imarixu :');
      if (privmsgIndex !== -1) {
        message = raw.substring(privmsgIndex + 'PRIVMSG #imarixu :'.length).trim();
      }

      if (!displayName) {
        const nickMatch = raw.match(/:([^!]+)!/);
        if (nickMatch && nickMatch[1]) displayName = nickMatch[1];
      }

      if (!displayName || !message) return;

      const bidVal = parseBidNumber(message);
      if (bidVal !== null) {
        if (isUrnOpen) {
          registerBid(displayName, bidVal);
        } else {
          appendRadarLog(displayName, `${message} <span style="font-size: 0.7rem; color: #94A3B8;">(Urna cerrada)</span>`, 'chat');
        }
      } else {
        appendRadarLog(displayName, message, 'chat');
      }
    }
  }

  function simulateChatBids() {
    if (!isUrnOpen) {
      openUrn();
    }

    const mockChatters = [
      'Jaratos', 'Vivi', 'Jesulito', 'rflexmon_', 'SitoGamerz', 'Neus_Art',
      'RubenDev', 'ArixuFan99', 'FortniteGod', 'PeelyKing', 'SloneAgent',
      'ZeroPointHero', 'TwitchViewer42', 'KevTheCube', 'MidasTouch'
    ];

    const currentItem = COSMETICOS_PRECIO_JUSTO[currentItemIndex];
    const realPrice = currentItem.precio;

    mockChatters.forEach((user, idx) => {
      setTimeout(() => {
        if (!isUrnOpen) return;
        const variance = (Math.random() - 0.45) * 0.5;
        let generatedBid = Math.round((realPrice * (1 + variance)) / 50) * 50;
        if (Math.random() < 0.15) generatedBid = realPrice;
        if (generatedBid <= 0) generatedBid = 200;
        registerBid(user, generatedBid);
      }, (idx + 1) * 220);
    });
  }

  function showPodiumModal() {
    const sortedUsers = getSortedLeaderboardUsers();

    const first = sortedUsers[0] || ['---', { points: 0, exactHits: 0, wins: 0, totalAciertos: 0, tiempoTotalRespuesta: 0, totalReactionTime: 0 }];
    const second = sortedUsers[1] || ['---', { points: 0, exactHits: 0, wins: 0, totalAciertos: 0, tiempoTotalRespuesta: 0, totalReactionTime: 0 }];
    const third = sortedUsers[2] || ['---', { points: 0, exactHits: 0, wins: 0, totalAciertos: 0, tiempoTotalRespuesta: 0, totalReactionTime: 0 }];

    function formatAvgSpeed(d) {
      const aciertos = d.totalAciertos || d.wins || 0;
      if (aciertos === 0) return '⏱️ Media: 0.0s';
      const tiempoTotal = d.tiempoTotalRespuesta !== undefined ? d.tiempoTotalRespuesta : (d.totalReactionTime || 0);
      const avgSec = (tiempoTotal / aciertos / 1000).toFixed(1);
      return `⏱️ Media: ${avgSec}s`;
    }

    podiumFirstUser.textContent = first[0] !== '---' ? `@${first[0]}` : '---';
    podiumFirstPoints.textContent = `${first[1].points} PTS (${first[1].exactHits}🎯 / ${first[1].wins}🏆)`;
    if (podiumFirstSpeed) podiumFirstSpeed.textContent = formatAvgSpeed(first[1]);

    podiumSecondUser.textContent = second[0] !== '---' ? `@${second[0]}` : '---';
    podiumSecondPoints.textContent = `${second[1].points} PTS (${second[1].exactHits}🎯 / ${second[1].wins}🏆)`;
    if (podiumSecondSpeed) podiumSecondSpeed.textContent = formatAvgSpeed(second[1]);

    podiumThirdUser.textContent = third[0] !== '---' ? `@${third[0]}` : '---';
    podiumThirdPoints.textContent = `${third[1].points} PTS (${third[1].exactHits}🎯 / ${third[1].wins}🏆)`;
    if (podiumThirdSpeed) podiumThirdSpeed.textContent = formatAvgSpeed(third[1]);

    podiumModalOverlay.classList.add('active');
    launchConfetti(3500);
    playSound('cash');
  }

  function downloadTxtReport() {
    const sortedUsers = getSortedLeaderboardUsers();
    let content = `=====================================================\n`;
    content += `🏆 INFORME OFICIAL: EL PRECIO JUSTO (EDICIÓN PAVOS) 🏆\n`;
    content += `ESPECIALES IMARIXU - DÍA 7 (GRAN FINAL)\n`;
    content += `Fecha: ${new Date().toLocaleString()}\n`;
    content += `Sistema de Desempate: Velocidad de Respuesta (Menor Tiempo)\n`;
    content += `=====================================================\n\n`;

    content += `🥇 CLASIFICACIÓN GENERAL TOP USUARIOS:\n`;
    if (sortedUsers.length === 0) {
      content += `(No se registraron puntuaciones en esta sesión)\n`;
    } else {
      sortedUsers.forEach(([username, d], i) => {
        const avg = d.wins > 0 ? `${(d.totalReactionTime / d.wins / 1000).toFixed(1)}s` : '0.0s';
        content += `${i + 1}. @${username} -> ${d.points} Puntos (${d.exactHits} Plenos, ${d.wins} Rondas ganadas) - Vel. Media: ${avg}\n`;
      });
    }

    content += `\n-----------------------------------------------------\n`;
    content += `📜 HISTORIAL DE RONDAS CALCULADAS:\n`;
    content += `-----------------------------------------------------\n`;
    roundHistory.forEach(r => {
      content += `Ronda #${r.itemNumber}: ${r.itemName}\n`;
      content += `  - Precio Real: ${r.realPrice} PaVos\n`;
      content += `  - Estimaciones totales: ${r.totalBids}\n`;
      if (r.isAllOver) {
        content += `  - Resultado: Todos se pasaron de precio.\n`;
      } else if (r.isExactHit) {
        content += `  - Resultado: ¡PLENO EXACTO! Ganador: ${r.winners.map(w => `@${w.user} (${((w.reactionTimeMs || 0)/1000).toFixed(1)}s)`).join(', ')}\n`;
      } else {
        content += `  - Ganador(es): ${r.winners.map(w => `@${w.user} con ${w.bid} PaVos (dif: -${w.diff}, en ${((w.reactionTimeMs || 0)/1000).toFixed(1)}s)`).join(', ')}\n`;
      }
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `informe_precio_justo_dia7_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  btnStartUrn.addEventListener('click', openUrn);
  btnCloseUrn.addEventListener('click', calculateAndCloseUrn);

  btnNextRound.addEventListener('click', () => {
    if (currentItemIndex < COSMETICOS_PRECIO_JUSTO.length - 1) {
      loadItem(currentItemIndex + 1);
    } else {
      showPodiumModal();
    }
  });

  btnPrevRound.addEventListener('click', () => {
    if (currentItemIndex > 0) {
      loadItem(currentItemIndex - 1);
    }
  });

  btnResetRound.addEventListener('click', () => {
    loadItem(currentItemIndex);
  });

  btnSimulateBids.addEventListener('click', simulateChatBids);

  btnAddManualBid.addEventListener('click', () => {
    const user = prompt('Nombre de usuario de Twitch:');
    if (!user) return;
    const bidStr = prompt('Estimación en PaVos (ej. 1500):');
    if (!bidStr) return;
    const bidVal = parseBidNumber(bidStr);
    if (bidVal !== null) {
      registerBid(user.trim(), bidVal);
    } else {
      alert('Número no válido. Introduce un número entero de PaVos.');
    }
  });

  btnShowPodium.addEventListener('click', showPodiumModal);

  btnClosePodiumModal.addEventListener('click', () => podiumModalOverlay.classList.remove('active'));
  btnModalDismiss.addEventListener('click', () => podiumModalOverlay.classList.remove('active'));
  btnDownloadTxtReport.addEventListener('click', downloadTxtReport);
  btnRestartGame.addEventListener('click', () => {
    podiumModalOverlay.classList.remove('active');
    userScores.clear();
    roundHistory.length = 0;
    loadItem(0);
    updateLeaderboardUI();
  });

  btnAudioToggle.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    btnAudioToggle.innerHTML = audioEnabled ? '<i class="fas fa-volume-up"></i> FX: ON' : '<i class="fas fa-volume-mute"></i> FX: OFF';
  });

  btnFullscreenToggle.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      btnFullscreenToggle.innerHTML = '<i class="fas fa-compress"></i> Normal';
    } else {
      document.exitFullscreen().catch(() => {});
      btnFullscreenToggle.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
    }
  });

  tabChatBtn.addEventListener('click', () => {
    tabChatBtn.classList.add('active');
    tabLeaderboardBtn.classList.remove('active');
    tabChatContent.classList.add('active');
    tabLeaderboardContent.classList.remove('active');
  });

  tabLeaderboardBtn.addEventListener('click', () => {
    tabLeaderboardBtn.classList.add('active');
    tabChatBtn.classList.remove('active');
    tabLeaderboardContent.classList.add('active');
    tabChatContent.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (e.code === 'ArrowRight' || e.code === 'KeyN') {
      btnNextRound.click();
    } else if (e.code === 'ArrowLeft' || e.code === 'KeyP') {
      btnPrevRound.click();
    } else if (e.code === 'Space') {
      e.preventDefault();
      if (!isUrnOpen && !isRevealed) openUrn();
      else if (isUrnOpen && !isRevealed) calculateAndCloseUrn();
    }
  });

  loadItem(0);
  initTwitchWebSocket();
});
