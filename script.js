const eventDate = new Date('2026-07-18T18:00:00-05:00');
const ids = ['days', 'hours', 'minutes', 'seconds'];

function updateCountdown() {
  const now = new Date();
  let diff = eventDate - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const values = [days, hours, minutes, seconds].map(value => String(value).padStart(2, '0'));
  ids.forEach((id, index) => document.getElementById(id).textContent = values[index]);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
