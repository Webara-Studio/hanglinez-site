document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const intro = document.getElementById('flash-intro');
const skipIntro = document.getElementById('flash-skip');

function closeIntro() {
  if (!intro) return;
  intro.classList.add('is-hidden');
  sessionStorage.setItem('hanglinez-intro-seen', '1');
}

if (intro && !reduceMotion && !sessionStorage.getItem('hanglinez-intro-seen')) {
  window.setTimeout(closeIntro, 1550);
} else if (intro) {
  intro.classList.add('is-hidden');
}

skipIntro?.addEventListener('click', closeIntro);

document.body.classList.add('motion-ready');
const sections = document.querySelectorAll('main > section');
if ('IntersectionObserver' in window && !reduceMotion) {
  const reveal = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  sections.forEach((section, index) => {
    section.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
    reveal.observe(section);
  });
} else {
  sections.forEach((section) => section.classList.add('is-visible'));
}

const bookingForm = document.getElementById('booking-form');
const formStatus = document.getElementById('form-status');

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const message = [
    'Hello Hanglinez, I would like to book a drying rack.',
    `Name: ${data.get('name')}`,
    `Phone / WhatsApp: ${data.get('phone')}`,
    `Product: ${data.get('product')}`,
    `Area: ${data.get('area')}`,
    `Preferred date: ${data.get('date')}`,
    `Installation address: ${data.get('address')}`,
    `Preferred payment: ${data.get('payment')}`
  ].join('\n');

  if (formStatus) {
    formStatus.textContent = 'Your booking details are ready. WhatsApp will open so Hanglinez can confirm the booking and payment next step.';
    formStatus.classList.add('is-visible');
  }
  window.open(`https://wa.me/233546405275?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
