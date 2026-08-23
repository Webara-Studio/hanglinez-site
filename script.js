document.getElementById('year').textContent = new Date().getFullYear();

const bookingForm = document.getElementById('booking-form');
const formStatus = document.getElementById('form-status');

bookingForm.addEventListener('submit', (event) => {
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

  formStatus.textContent = 'Your booking details are ready. WhatsApp will open so Hanglinez can confirm the booking and payment next step.';
  formStatus.classList.add('is-visible');
  window.open(`https://wa.me/233546405275?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
