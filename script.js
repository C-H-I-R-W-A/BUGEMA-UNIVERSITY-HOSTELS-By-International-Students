// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Modal
const modal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.querySelector('.close');

loginBtn.onclick = () => modal.style.display = 'flex';
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target == modal) modal.style.display = 'none'; }

// Auth System (LocalStorage)
const users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = null;

document.getElementById('registerSubmit').onclick = () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  if (!username || !password) return alert('Fill all fields');
  if (users[username]) return document.getElementById('authMessage').textContent = 'User exists!';
  users[username] = { password, isAdmin: username === 'admin' };
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registered! Now login.');
};

document.getElementById('loginSubmit').onclick = () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  if (users[username] && users[username].password === password) {
    currentUser = username;
    loginBtn.textContent = `Hi, ${username}`;
    modal.style.display = 'none';
    if (users[username].isAdmin) {
      document.querySelector('footer a').style.display = 'inline';
    }
  } else {
    document.getElementById('authMessage').textContent = 'Wrong credentials!';
  }
};

// Contact Form
document.getElementById('contactForm').onsubmit = e => {
  e.preventDefault();
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  const formData = new FormData(e.target);
  messages.push({
    name: formData.get('name') || 'Anonymous',
    email: formData.get('email'),
    message: e.target.querySelector('textarea').value,
    date: new Date().toISOString(),
    reply: ''
  });
  localStorage.setItem('messages', JSON.stringify(messages));
  alert('Message sent! Admin will reply soon.');
  e.target.reset();
};

// Booking Form
document.getElementById('bookingForm').onsubmit = e => {
  e.preventDefault();
  if (!currentUser) return alert('Please login first!');
  
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  const form = e.target;
  bookings.push({
    user: currentUser,
    fullName: form[0].value,
    gender: form[1].value,
    nationality: form[2].value,
    phone: form[3].value,
    parentName: form[4].value,
    parentPhone: form[5].value,
    arrival: form[6].value,
    duration: form[7].value,
    message: form[8].value,
    date: new Date().toISOString(),
    status: 'Pending'
  });
  localStorage.setItem('bookings', JSON.stringify(bookings));
  document.getElementById('bookingStatus').textContent = 'Booking submitted! Check status later.';
  document.getElementById('bookingStatus').style.color = 'green';
  e.target.reset();
};