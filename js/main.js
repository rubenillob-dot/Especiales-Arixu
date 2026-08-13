/* ==========================================================================
   MAIN JS - ESPECIALES ARIXU LANDING PAGE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Especiales ImArixu Twitch Partner Hub Loaded');

  // Day Details Data for Preview Modal
  const daysData = {
    1: {
      title: "Día 1: La Bomba de Tiempo",
      status: "¡EN VIVO AHORA!",
      statusClass: "tag-active",
      link: "dia1.html",
      badge: "RETOS DE CHAT & ADRENALINA",
      desc: "Desactiva el reactor en equipo antes de que el contador llegue a cero. El chat debe ingresar comandos y resolver acertijos en vivo para evitar la explosión y salvar a ImArixu de la penalización."
    },
    2: {
      title: "Día 2: Fortnite-Guessr",
      status: "PRÓXIMAMENTE - BLOQUEADO",
      statusClass: "tag-locked",
      link: "#",
      badge: "RECONOCIMIENTO DE MAPA",
      desc: "Demuestra que conoces la isla. Adivina la ubicación exacta viendo solo una fotografía de la isla de Fortnite en tiempo récord."
    },
    3: {
      title: "Día 3: Qué Prefieres: Edición ImArixu",
      status: "PRÓXIMAMENTE - BLOQUEADO",
      statusClass: "tag-locked",
      link: "#",
      badge: "DILEMAS & DEBATE CHAT",
      desc: "Dilemas imposibles sobre el meta actual de Fortnite, la vida del streamer en Twitch y salseo IRL elegidos en directo."
    },
    4: {
      title: "Día 4: Trivial: Historia de Fortnite",
      status: "PRÓXIMAMENTE - BLOQUEADO",
      statusClass: "tag-locked",
      link: "#",
      badge: "TRIVIAL & NOSTALGIA",
      desc: "Cultura general de la isla. ¿Recuerdas los eventos, pases de batalla y cambios de mapa de las primeras temporadas?"
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
      status: "PRÓXIMAMENTE - BLOQUEADO",
      statusClass: "tag-locked",
      link: "#",
      badge: "ADIVINA AL CREADOR",
      desc: "Adivina al creador de contenido de Fortnite viendo solo una parte de su cuerpo, silueta o avatar característico."
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
        modalStatus.textContent = data.status;
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
});
