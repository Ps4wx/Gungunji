const startScreen = document.getElementById('startScreen');
const website = document.getElementById('website');
const startBtn = document.getElementById('startBtn');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const pages = [...document.querySelectorAll('.page')];
const dots = [...document.querySelectorAll('.dot')];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPage = 0;
let musicPlaying = false;

/* ---------- Fix for mobile 100vh (browser toolbar changes viewport height) ---------- */
function setViewportHeight() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

/* ---------- Page navigation ---------- */
function showPage(index) {
  currentPage = Math.max(0, Math.min(index, pages.length - 1));

  pages.forEach((page, i) => page.classList.toggle('active', i === currentPage));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentPage));

  prevBtn.disabled = currentPage === 0;
  nextBtn.textContent = currentPage === pages.length - 1 ? 'Again ❤️' : 'Next →';
}

/* ---------- Music ---------- */
async function playMusic() {
  try {
    await bgMusic.play();
    musicPlaying = true;
    musicBtn.textContent = '🔊';
  } catch (error) {
    // No song added yet, or browser blocked autoplay — fail silently, don't break the page
    musicPlaying = false;
    musicBtn.textContent = '🔇';
  }
}

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hide');
  website.classList.add('show');
  playMusic();
  showPage(0);
});

musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.textContent = '🔇';
  } else {
    playMusic();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage === pages.length - 1) {
    showPage(0);
  } else {
    showPage(currentPage + 1);
  }
});

prevBtn.addEventListener('click', () => showPage(currentPage - 1));

dots.forEach(dot => {
  dot.addEventListener('click', () => showPage(Number(dot.dataset.page)));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') nextBtn.click();
  if (event.key === 'ArrowLeft') prevBtn.click();
});

/* ---------- Swipe support for mobile ---------- */
let touchStartX = 0;
website.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

website.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) < 50) return;
  if (dx < 0) nextBtn.click();
  else prevBtn.click();
}, { passive: true });

/* ---------- Graceful fallback if a photo file is missing / broken ---------- */
document.querySelectorAll('.photo-frame img').forEach((img) => {
  img.addEventListener('error', () => {
    img.classList.add('img-fallback');
    img.removeAttribute('src');
    img.alt = '💗';
  }, { once: true });
});

/* ---------- Floating hearts on page 1 (generated, not just 2 fixed spots) ---------- */
function spawnFloatingHearts() {
  const container = document.querySelector('.floating-hearts');
  if (!container) return;
  const glyphs = ['💕', '💗', '❤️', '💖'];
  const count = 10;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${18 + Math.random() * 22}px`;
    heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 80}px`);
    heart.style.animationDuration = `${6 + Math.random() * 5}s`;
    heart.style.animationDelay = `${Math.random() * 6}s`;
    container.appendChild(heart);
  }
}
spawnFloatingHearts();

showPage(0);
