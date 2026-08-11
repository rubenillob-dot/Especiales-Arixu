/* ==========================================================================
   MAIN JS - ESPECIALES ARIXU LANDING PAGE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Especiales ImArixu Twitch Partner Hub Loaded');

  // Day Details Data for Preview Modal
  const daysData = {
    1: {
      title: "Día 1: La Bomba de Tiempo Cooperativa",
      status: "¡EN VIVO AHORA!",
      statusClass: "tag-active",
      link: "dia1.html",
      badge: "RETOS DE CHAT & ADRENALINA",
      desc: "Un reactor de energía está a punto de colapsar. El chat debe unirse en directo para ingresar comandos de desactivación y acertijos en un tiempo límite. ¡Cualquier fallo activará un castigo inmediato para ImArixu!"
    },
    2: {
      title: "Día 2: El Juicio del Chat & Ruleta de la Verdad",
      status: "PRÓXIMAMENTE - MAÑANA 20:00 CEST",
      statusClass: "tag-upcoming",
      link: "#",
      badge: "VOTACIONES EN DIRECTO",
      desc: "El chat toma el control absoluto. Votaciones en directo para decidir los juegos, las reglas absurdas que ImArixu debe obedecer durante el stream y las confesiones más comprometedoras."
    },
    3: {
      title: "Día 3: Speedrun IRL & Retos Extremos",
      status: "PRÓXIMAMENTE - DÍA 3",
      statusClass: "tag-upcoming",
      link: "#",
      badge: "DESAFÍO IRL + CAM",
      desc: "Un cronómetro contra el reloj donde ImArixu deberá superar pruebas IRL en directo seleccionadas por la comunidad antes de que expire la meta de subs."
    },
    4: {
      title: "Día 4: Karaoke a Ciegas con Autotune Extremo",
      status: "PRÓXIMAMENTE - DÍA 4",
      statusClass: "tag-upcoming",
      link: "#",
      badge: "MUSICAL & SHOW",
      desc: "Bitz soundboard interactivo. El chat elige las canciones y los efectos de voz en tiempo real mientras ImArixu compite por sobrevivir al cantar sin escuchar su propia voz."
    },
    5: {
      title: "Día 5: Survival Horror Night & Pulsómetro HUD",
      status: "PRÓXIMAMENTE - DÍA 5",
      statusClass: "tag-upcoming",
      link: "#",
      badge: "TERROR & MONITOR PULSO",
      desc: "Pulsómetro transmitiendo en vivo el ritmo cardíaco de ImArixu. Cada susto o superación de 130 PPM desencadena donaciones automáticas o retos sorpresa."
    },
    6: {
      title: "Día 6: Subathon de la Ruleta Cósmica",
      status: "PRÓXIMAMENTE - DÍA 6",
      statusClass: "tag-upcoming",
      link: "#",
      badge: "SUBATHON & REGALOS",
      desc: "Ruleta con multiplicadores de tiempo y premios mágicos para los espectadores. ¡Recompensas de emotes exclusivos y pases VIP para la comunidad!"
    },
    7: {
      title: "Día 7: La Gran Gala Twitch Partner & Arixu Awards",
      status: "PRÓXIMAMENTE - EVENTO FINAL",
      statusClass: "tag-upcoming",
      link: "#",
      badge: "GALA ESPECIAL CELEBRACIÓN",
      desc: "Premio a los mejores clips del año, sorteo de merchandising firmado, invitados especiales en Discord y la gran coronación Partner de Twitch de ImArixu."
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
