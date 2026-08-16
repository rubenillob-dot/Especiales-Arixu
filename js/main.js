/* ==========================================================================
   MAIN JS - ESPECIALES ARIXU LANDING PAGE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Especiales ImArixu Twitch Partner Hub Loaded');

  // Day Details Data for Preview Modal
  const daysData = {
    1: {
      title: "Día 1: La Bomba de Tiempo",
      status: '<i class="fas fa-check"></i> COMPLETADO',
      statusClass: "tag-completed",
      link: "dia1.html",
      badge: "RETOS DE CHAT & ADRENALINA",
      desc: "Desactiva el reactor en equipo antes de que el contador llegue a cero. El chat debe ingresar comandos y resolver acertijos en vivo para evitar la explosión y salvar a ImArixu de la penalización."
    },
    2: {
      title: "Día 2: Fortnite-Guessr",
      status: '<i class="fas fa-check"></i> COMPLETADO',
      statusClass: "tag-completed",
      link: "dia2.html",
      badge: "RECONOCIMIENTO DE MAPA",
      desc: "Demuestra que conoces la isla. Adivina las 20 ubicaciones exactas a través del visor de reconocimiento satelital de Fortnite."
    },
    3: {
      title: "Día 3: Qué Prefieres: Edición ImArixu",
      status: "¡EN VIVO AHORA!",
      statusClass: "tag-active",
      link: "dia3.html",
      badge: "DILEMAS & DEBATE EN DIRECTO",
      desc: "35 dilemas interactivos sobre Fortnite, la vida del streamer en Twitch y salseo sano. ¡Votación en vivo con el chat de Twitch!"
    },
    4: {
      title: "Día 4: Trivial: Historia de Fortnite",
      status: "¡DISPONIBLE AHORA!",
      statusClass: "tag-active",
      link: "dia4.html",
      badge: "TRIVIAL & LORE FORTNITE",
      desc: "Cultura general de la isla. 35 preguntas de eventos, armas míticas, vehículos y fase final de Muerte Súbita (Puntos x2) con sistema Kahoot y chat de Twitch."
    },
    5: {
      title: "Día 5: El Sonido de la Batalla",
      status: "PRÓXIMAMENTE - BLOQUEADO",
      statusClass: "tag-locked",
      link: "#",
      badge: "DESAFÍO AUDITIVO A CIEGAS",
      desc: "Agudiza el oído. Adivina de qué arma, consumible o ítem es el efecto de sonido a ciegas sin ver la pantalla."
    },
    6: {
      title: "Día 6: ¿Quién es ese Streamer?",
      status: "¡DISPONIBLE AHORA!",
      statusClass: "tag-active",
      link: "dia6.html",
      badge: "ADIVINA AL CREADOR (TWITCH x YOUTUBE)",
      desc: "Adivina al creador de contenido de Twitch y YouTube viendo solo una parte de su cuerpo, accesorios o tatuajes con el chat en directo."
    },
    7: {
      title: "Día 7: Elimina una Opción",
      status: "PRÓXIMAMENTE - EVENTO FINAL",
      statusClass: "tag-locked",
      link: "#",
      badge: "GALA FINAL & TORNEO DE OPCIONES",
      desc: "Rondas eliminatorias extremas de objetos, mecánicas o skins del juego. ¡Votación en directo hasta coronar al ganador supremo!"
    }
  };

  // Modal Functionality
  const modalOverlay = document.getElementById('dayModalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalStatus = document.getElementById('modalStatus');
  const modalDesc = document.getElementById('modalDesc');
  const modalLinkBtn = document.getElementById('modalLinkBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Handle Preview Buttons
  document.querySelectorAll('.btn-day-preview').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dayNum = btn.dataset.day;
      const data = daysData[dayNum];
      if (data) {
        modalTitle.textContent = data.title;
        modalBadge.textContent = data.badge;
        modalStatus.innerHTML = data.status;
        modalStatus.className = `day-status-tag ${data.statusClass}`;
        modalDesc.textContent = data.desc;
        
        if (data.link !== '#') {
          modalLinkBtn.href = data.link;
          modalLinkBtn.style.display = 'inline-flex';
          modalLinkBtn.textContent = '¡Ir al Evento de Hoy!';
        } else {
          modalLinkBtn.style.display = 'none';
        }
        
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Social Media Link Action Feedback
  document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const socialName = card.querySelector('.social-name')?.textContent || 'Red Social';
      console.log(`Navigating to ImArixu ${socialName}`);
    });
  });

  // Animated Counter for Stats
  const statNumbers = document.querySelectorAll('.stat-num');
  statNumbers.forEach(numEl => {
    const target = parseInt(numEl.dataset.target || '0', 10);
    if (!target) return;
    let count = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      numEl.childNodes[0].nodeValue = count.toLocaleString();
    }, 40);
  });

  /* ==========================================================================
     INTERACTIVE MASCOT: SIMBA (AUTONOMOUS BLACK DACHSHUND / TECKEL NEGRO)
     ========================================================================== */
  const simbaMascot = document.getElementById('simba-mascot');
  const simbaSprite = document.getElementById('simbaSprite');
  const simbaSpeech = document.getElementById('simbaSpeech');
  const simbaText = document.getElementById('simbaText');

  if (simbaMascot && simbaSprite && simbaSpeech && simbaText) {
    let simbaX = 60; // Initial position (px from left)
    let currentDirection = 1; // 1: facing right, -1: facing left
    let currentState = 'IDLE'; // 'IDLE' | 'WALK' | 'JUMP' | 'POOP' | 'EAT'
    let speechTimer = null;
    let isUserInteracting = false;
    let walkAnimationId = null;
    let stateTimeoutId = null;
    let poopTimeoutId = null;
    let eatTimeoutId = null;
    let activeBoneEl = null;

    // Expanded dialogue array
    const simbaPhrases = [
      "¡Hola chat! 🐶",
      "Usen el Código Arixu",
      "Ari, dame de comer...",
      "¡Den like al stream!",
      "¡Ese Partner!",
      "Guau guau",
      "Estoy aburrido..."
    ];

    // Initial setup
    simbaMascot.style.left = `${simbaX}px`;
    simbaSprite.style.setProperty('--simba-dir', '1');

    // Function to display speech bubble with random or custom text
    function showSpeech(text = null, duration = 3000) {
      if (speechTimer) clearTimeout(speechTimer);
      const chosenText = text || simbaPhrases[Math.floor(Math.random() * simbaPhrases.length)];
      simbaText.textContent = chosenText;
      simbaSpeech.classList.add('active');

      speechTimer = setTimeout(() => {
        simbaSpeech.classList.remove('active');
      }, duration);
    }

    // Direction flip handler
    function setDirection(dir) {
      currentDirection = dir;
      simbaSprite.style.setProperty('--simba-dir', dir > 0 ? '1' : '-1');
    }

    // Clear active state animations and timeouts
    function clearCurrentState() {
      if (walkAnimationId) {
        cancelAnimationFrame(walkAnimationId);
        walkAnimationId = null;
      }
      if (poopTimeoutId) {
        clearTimeout(poopTimeoutId);
        poopTimeoutId = null;
      }
      if (eatTimeoutId) {
        clearTimeout(eatTimeoutId);
        eatTimeoutId = null;
      }
      if (activeBoneEl && activeBoneEl.parentNode) {
        activeBoneEl.parentNode.removeChild(activeBoneEl);
        activeBoneEl = null;
      }
      simbaSprite.classList.remove('walking', 'jumping', 'pooping', 'barking', 'eating');
    }

    // Set sprite animation class helper
    function setSpriteClass(className) {
      simbaSprite.classList.remove('idle', 'walking', 'jumping', 'pooping', 'barking', 'eating');
      simbaSprite.classList.add(className);
    }

    // Spawn Static Poop Emoji on Screen
    function dropPoop() {
      const poop = document.createElement('div');
      poop.className = 'simba-poop-item';
      poop.textContent = '💩';
      poop.setAttribute('title', '¡Simba ha dejado un regalito!');

      // Calculate position behind Simba based on facing direction
      const poopLeft = currentDirection > 0 ? simbaX + 8 : simbaX + 62;
      poop.style.left = `${Math.max(10, poopLeft)}px`;

      document.body.appendChild(poop);

      // Fade out before removal
      setTimeout(() => {
        poop.classList.add('fading-out');
      }, 9200);

      // Remove after 10 seconds
      setTimeout(() => {
        if (poop.parentNode) {
          poop.parentNode.removeChild(poop);
        }
      }, 10000);

      // Interactive Easter egg: squish on click
      poop.addEventListener('click', () => {
        poop.style.transform = 'scale(1.4) rotate(15deg)';
        setTimeout(() => {
          poop.classList.add('fading-out');
          setTimeout(() => {
            if (poop.parentNode) poop.parentNode.removeChild(poop);
          }, 300);
        }, 150);
      });
    }

    // Spawn floating munch particles
    function spawnMunchParticle(leftPos, char = '✨') {
      const particle = document.createElement('div');
      particle.className = 'simba-munch-particle';
      particle.textContent = char;
      particle.style.left = `${leftPos}px`;
      document.body.appendChild(particle);
      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 700);
    }

    // STATE: IDLE (Short breather)
    function executeIdle() {
      currentState = 'IDLE';
      setSpriteClass('idle');
    }

    // STATE: WALK (Fast & agile trotting across the full horizontal page)
    function executeWalk() {
      currentState = 'WALK';
      setSpriteClass('walking');

      const minX = 15;
      const maxX = Math.max(minX + 60, window.innerWidth - 105);

      let targetX;
      // 60% chance to pick a location anywhere across the entire width of the page
      // 40% chance of a long exploratory stride (180px to 650px)
      if (Math.random() < 0.60) {
        targetX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      } else {
        const walkDistance = Math.floor(Math.random() * 470) + 180;
        let dir = Math.random() < 0.5 ? 1 : -1;
        if (simbaX < minX + 150) dir = 1;
        if (simbaX > maxX - 150) dir = -1;
        targetX = Math.max(minX, Math.min(maxX, simbaX + (dir * walkDistance)));
      }

      // If target is too close to current spot, choose a destination on the opposite half of the screen
      if (Math.abs(targetX - simbaX) < 50) {
        targetX = simbaX > (window.innerWidth / 2)
          ? Math.floor(Math.random() * (Math.max(minX + 50, (window.innerWidth / 2) - 80) - minX)) + minX
          : Math.floor(Math.random() * (maxX - (window.innerWidth / 2))) + Math.floor(window.innerWidth / 2);
      }

      targetX = Math.max(minX, Math.min(maxX, targetX));
      const actualDir = targetX >= simbaX ? 1 : -1;
      setDirection(actualDir);

      // Adaptive trotting speed (3.6 to 4.2 px per frame for lively crossing)
      const distance = Math.abs(targetX - simbaX);
      const stepSpeed = distance > 400 ? 4.2 : 3.6;
      
      function stepWalk() {
        if (isUserInteracting) return;

        const diff = targetX - simbaX;
        if (Math.abs(diff) > stepSpeed) {
          simbaX += actualDir * stepSpeed;
          simbaMascot.style.left = `${Math.round(simbaX)}px`;
          walkAnimationId = requestAnimationFrame(stepWalk);
        } else {
          simbaX = targetX;
          simbaMascot.style.left = `${Math.round(simbaX)}px`;
          walkAnimationId = null;
          executeIdle();
        }
      }

      walkAnimationId = requestAnimationFrame(stepWalk);
    }

    // STATE: JUMP (Vertical spring jump)
    function executeJump() {
      currentState = 'JUMP';
      setSpriteClass('jumping');

      setTimeout(() => {
        if (currentState === 'JUMP' && !isUserInteracting) {
          executeIdle();
        }
      }, 550);
    }

    // STATE: EAT BONE (Eating & Chewing animation)
    function executeEat() {
      currentState = 'EAT';
      setSpriteClass('eating');

      // Place bone right in front of Simba's snout
      const bone = document.createElement('div');
      bone.className = 'simba-bone-item';
      bone.textContent = '🦴';
      bone.setAttribute('title', '¡Simba disfrutando de su huesito!');

      const boneLeft = currentDirection > 0 ? simbaX + 76 : simbaX - 16;
      const clampedBoneLeft = Math.max(10, Math.min(window.innerWidth - 45, boneLeft));
      bone.style.left = `${clampedBoneLeft}px`;

      document.body.appendChild(bone);
      activeBoneEl = bone;

      // Munch crunch visual particles
      spawnMunchParticle(clampedBoneLeft + 4, '✨');

      // Second crunch wave
      setTimeout(() => {
        if (currentState === 'EAT' && !isUserInteracting) {
          spawnMunchParticle(clampedBoneLeft + (currentDirection > 0 ? 8 : -2), '😋');
        }
      }, 1000);

      // Third crunch wave & dialogue chance
      setTimeout(() => {
        if (currentState === 'EAT' && !isUserInteracting) {
          spawnMunchParticle(clampedBoneLeft + 4, '🦴');
          if (Math.random() < 0.45) {
            showSpeech("¡Ñam ñam! 🦴", 2500);
          }
        }
      }, 1800);

      // Finish eating: bone is consumed
      eatTimeoutId = setTimeout(() => {
        if (currentState === 'EAT' && !isUserInteracting) {
          bone.classList.add('consumed');
          setTimeout(() => {
            if (bone.parentNode) bone.parentNode.removeChild(bone);
            if (activeBoneEl === bone) activeBoneEl = null;
          }, 400);

          executeIdle();
        }
      }, 2600);
    }

    // STATE: POOP (Occasional squat)
    function executePoop() {
      currentState = 'POOP';
      setSpriteClass('pooping');

      // Drop poop emoji halfway through the 3-second squat
      poopTimeoutId = setTimeout(() => {
        if (currentState === 'POOP') {
          dropPoop();
        }
      }, 1200);

      // Stand back up and return to IDLE after 3 seconds
      setTimeout(() => {
        if (currentState === 'POOP' && !isUserInteracting) {
          executeIdle();
        }
      }, 3000);
    }

    // Autonomy State Decision Engine
    function decideNextAction() {
      if (isUserInteracting) return;

      clearCurrentState();

      // 30% probability of showing a dialogue bubble on state change
      if (Math.random() < 0.30) {
        showSpeech();
      }

      // Action probabilities: WALK (42%), EAT (24%), JUMP (16%), IDLE (12%), POOP (6%)
      const rand = Math.random();
      if (rand < 0.42) {
        executeWalk();
      } else if (rand < 0.66) {
        executeEat();
      } else if (rand < 0.82) {
        executeJump();
      } else if (rand < 0.94) {
        executeIdle();
      } else {
        executePoop();
      }
    }

    // Autonomous behavior loop: runs dynamically every 2.2 to 4.5 seconds
    function scheduleNextBehavior() {
      if (stateTimeoutId) clearTimeout(stateTimeoutId);
      const delay = Math.floor(Math.random() * (4500 - 2200 + 1)) + 2200;
      stateTimeoutId = setTimeout(() => {
        decideNextAction();
        scheduleNextBehavior();
      }, delay);
    }

    // User Click Interactivity: interrupts current state, barks, jumps, and forces dialogue
    simbaMascot.addEventListener('click', () => {
      isUserInteracting = true;
      clearCurrentState();

      // Bark/jump animation
      setSpriteClass('barking');

      // Force dialogue
      showSpeech(null, 3000);

      // Restore idle state and resume behavior cycle after bark animation
      setTimeout(() => {
        isUserInteracting = false;
        executeIdle();
        scheduleNextBehavior();
      }, 480);
    });

    // Handle browser window resize to keep Simba in bounds
    window.addEventListener('resize', () => {
      const maxX = Math.max(20, window.innerWidth - 105);
      if (simbaX > maxX) {
        simbaX = maxX;
        simbaMascot.style.left = `${Math.round(simbaX)}px`;
      }
    });

    // Start autonomy loop
    executeIdle();
    scheduleNextBehavior();
  }
});
