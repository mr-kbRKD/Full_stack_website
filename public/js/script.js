function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Send a POST request to your server to handle the signup logic
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server (success or error)
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Send a POST request to your server to handle the login logic
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server (success or error)
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  