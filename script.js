// js/script.js
// Sparkling background animation
const canvas = document.getElementById('sparkle-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  const sparkles = Array.from({ length: 70 }, () => ({
    x: randomBetween(0, w),
    y: randomBetween(0, h),
    r: randomBetween(0.7, 2.2),
    alpha: randomBetween(0.3, 1),
    dx: randomBetween(-0.15, 0.15),
    dy: randomBetween(-0.15, 0.15),
    twinkle: Math.random() > 0.5 ? 1 : -1
  }));

  function drawSparkles() {
    ctx.clearRect(0, 0, w, h);
    for (const s of sparkles) {
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
      // Animate
      s.x += s.dx;
      s.y += s.dy;
      s.alpha += 0.01 * s.twinkle;
      if (s.alpha > 1) s.twinkle = -1;
      if (s.alpha < 0.3) s.twinkle = 1;
      // Wrap
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;
    }
    requestAnimationFrame(drawSparkles);
  }
  drawSparkles();

  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  });
}

// Scroll to top button
const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth sparkle follows cursor
(function() {
  let sparkle = document.querySelector('.cursor-sparkle');
  if (!sparkle) {
    sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    document.body.appendChild(sparkle);
  }
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let sparkleX = mouseX, sparkleY = mouseY;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateSparkle() {
    // Interpolate position for smooth trailing
    sparkleX += (mouseX - sparkleX) * 0.22;
    sparkleY += (mouseY - sparkleY) * 0.22;
    sparkle.style.left = sparkleX + 'px';
    sparkle.style.top = sparkleY + 'px';
    requestAnimationFrame(animateSparkle);
  }
  animateSparkle();
})();

// Confetti burst on achievement card hover
function confettiBurst(card) {
  const confetti = card.querySelector('.confetti');
  if (!confetti) return;
  confetti.innerHTML = '';
  const colors = ['#6C63FF', '#3ECF8E', '#4facfe', '#fff', '#a084ee'];
  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('span');
    const angle = (i / 18) * 2 * Math.PI;
    const dist = 48 + Math.random() * 16;
    dot.style.setProperty('--x', `${Math.cos(angle) * dist}px`);
    dot.style.setProperty('--y', `${Math.sin(angle) * dist}px`);
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.appendChild(dot);
  }
  setTimeout(() => { confetti.innerHTML = ''; }, 800);
}

document.querySelectorAll('.achievement-card').forEach(card => {
  card.addEventListener('mouseenter', () => confettiBurst(card));
});

// Existing theme toggle
if (document.getElementById("themeToggle")) {
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
}
  