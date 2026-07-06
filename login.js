// Helper: get all users from localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
  
  // Helper: save users to localStorage
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  // Simple password encoding (for demo only)
  function encode(password) {
    return btoa(password);
  }
  
  // Register function
  function register() {
    const name = document.getElementById('name').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
  
    const msg = document.getElementById('registerMsg');
  
    if (!name || !username || !email || !phone || !password) {
      msg.innerText = "Please fill in all fields.";
      return;
    }
  
    const users = getUsers();
  
    if (users.find(u => u.username === username)) {
      msg.innerText = "Username already exists. Try another.";
      return;
    }
  
    users.push({
      name,
      username,
      email,
      phone,
      password: encode(password)
    });
  
    saveUsers(users);
    msg.style.color = "green";
    msg.innerText = "Registration successful! Redirecting to login...";
    setTimeout(() => {
      window.location.href = 'testhome.html';
    }, 2000);
  }
  
  // Login function
  function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const msg = document.getElementById('loginMsg');
  
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === encode(password));
  
    if (user) {
      localStorage.setItem('currentUser', user.name); // store name for greeting
      window.location.href = 'home.html';
    } else {
      msg.innerText = "Invalid username or password.";
    }
  }
  