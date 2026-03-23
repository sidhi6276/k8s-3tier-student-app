// API Base URL
const API = '/api';

// ── LOGIN ──────────────────────────────
async function doLogin() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errBox   = document.getElementById('error-msg');

  if (!username || !password) {
    showError(errBox, '⚠️ Please enter username and password!');
    return;
  }

  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      showError(errBox, '❌ ' + data.detail);
      return;
    }

    // Save to session
    sessionStorage.setItem('user', data.username);
    sessionStorage.setItem('role', data.role);

    // Redirect to dashboard
    window.location.href = 'dashboard.html';

  } catch (err) {
    showError(errBox, '❌ Cannot connect to server!');
  }
}

// ── AUTH GUARD ─────────────────────────
function checkAuth() {
  const user = sessionStorage.getItem('user');
  if (!user) {
    window.location.href = 'index.html';
    return;
  }
  const el = document.getElementById('nav-username');
  if (el) el.textContent = user;
}

function logout() {
  sessionStorage.clear();
  window.location.href = 'index.html';
}

// ── STATS ──────────────────────────────
async function loadStats() {
  try {
    const res  = await fetch(`${API}/stats`);
    const data = await res.json();
    document.getElementById('total-students').textContent = data.total_students;
    document.getElementById('total-courses').textContent  = data.total_courses;
  } catch (err) {
    console.error('Stats error:', err);
  }
}

// ── LOAD STUDENTS ──────────────────────
async function loadStudents() {
  const tbody = document.getElementById('students-tbody');
  tbody.innerHTML = '<tr><td colspan="5" class="loading-row">⏳ Loading...</td></tr>';

  try {
    const res  = await fetch(`${API}/students`);
    const data = await res.json();

    if (data.students.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="no-data">📭 No students yet. Add one!</td></tr>';
      return;
    }

    tbody.innerHTML = data.students.map(s => `
      <tr>
        <td><strong>${s.name}</strong></td>
        <td>${s.age}</td>
        <td>${s.course}</td>
        <td>${s.email}</td>
        <td>
          <button class="btn-delete" onclick="deleteStudent('${s.email}')">
            🗑️ Delete
          </button>
        </td>
      </tr>
    `).join('');

  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="5" class="no-data">❌ Failed to load!</td></tr>';
  }
}

// ── ADD STUDENT ────────────────────────
async function addStudent() {
  const name   = document.getElementById('s-name').value.trim();
  const age    = document.getElementById('s-age').value;
  const course = document.getElementById('s-course').value;
  const email  = document.getElementById('s-email').value.trim();
  const msgDiv = document.getElementById('form-msg');

  if (!name || !age || !course || !email) {
    showMsg(msgDiv, '⚠️ Please fill all fields!', 'error-msg');
    return;
  }

  try {
    const res = await fetch(`${API}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        age: parseInt(age),
        course,
        email
      })
    });

    const data = await res.json();

    if (!res.ok) {
      showMsg(msgDiv, '❌ ' + data.detail, 'error-msg');
      return;
    }

    showMsg(msgDiv, '✅ Student added successfully!', 'success-msg');

    // Clear form
    document.getElementById('s-name').value  = '';
    document.getElementById('s-age').value   = '';
    document.getElementById('s-email').value = '';
    document.getElementById('s-course').value = '';

    // Refresh
    loadStudents();
    loadStats();

  } catch (err) {
    showMsg(msgDiv, '❌ Server error!', 'error-msg');
  }
}

// ── DELETE STUDENT ─────────────────────
async function deleteStudent(email) {
  if (!confirm(`Delete student: ${email}?`)) return;

  try {
    const res = await fetch(`${API}/students/${email}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      loadStudents();
      loadStats();
    }
  } catch (err) {
    alert('Delete failed!');
  }
}

// ── HELPERS ────────────────────────────
function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

function showMsg(el, msg, cls) {
  el.textContent = msg;
  el.className = cls;
  setTimeout(() => {
    el.textContent = '';
    el.className = 'hidden';
  }, 4000);
}

// ── INIT ───────────────────────────────
if (window.location.pathname.includes('dashboard')) {
  checkAuth();
  loadStudents();
  loadStats();
}

// Enter key login
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && window.location.pathname.includes('index')) {
    doLogin();
  }
});
