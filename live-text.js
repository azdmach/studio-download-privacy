const phrases = ['Save MP3 audio.', 'Save MP4 video.', 'Skip eligible ads.'];
const text = document.querySelector('#live-text');
const toggle = document.querySelector('#motion-toggle');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let position = 0;
let interval;
function stop() {
  window.clearInterval(interval);
  interval = undefined;
  toggle.textContent = '▶';
  toggle.setAttribute('aria-label', 'Play animated text');
  toggle.title = 'Play animated text';
}
function start() {
  if (motion.matches) return;
  toggle.textContent = 'Ⅱ';
  toggle.setAttribute('aria-label', 'Pause animated text');
  toggle.title = 'Pause animated text';
  interval = window.setInterval(() => {
    position = (position + 1) % phrases.length;
    text.parentElement.classList.remove('swap');
    text.textContent = phrases[position];
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => text.parentElement.classList.add('swap')));
  }, 2900);
}
function updateMotion() {
  stop();
  toggle.hidden = motion.matches;
  if (!motion.matches) start();
}
toggle.addEventListener('click', () => interval === undefined ? start() : stop());
motion.addEventListener('change', updateMotion);
updateMotion();
