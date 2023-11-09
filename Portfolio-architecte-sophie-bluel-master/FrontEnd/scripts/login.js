function login() {
    // Recupere la balise HTML
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('click', (event) => {
      event.preventDefault(); // Pour empêcher le GET du Form HTML
  
      let email = document.getElementById("email").value;
      console.log(email)
      if (/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+.[a-z]{2,10}/
        .test(email) === false) {
        document.getElementById('emailErrorMsg').textContent = 'Erreur de saisie!';

  
      }
      let password = document.getElementById("password").value;
      console.log(password)
      if (/^[a-zA-Zàâäéèêëïîôöùûüç' ,0-9]+$/
        .test(password) === false) {
        document.getElementById('passwordErrorMsg').textContent = 'Erreur de saisie!';
  
      }
      const requestBody = {
        email: email,
        password: password
      };
  
      function connect() {
        fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            'Authorization' : 'bearer',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'cors'
          },
          body: JSON.stringify(requestBody),
        })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
            if (email === email && password === password) {

                // Stocker l'information d'authentification dans le localStorage
                localStorage.setItem('userid', 'token');

                // Rediriger l'utilisateur vers une page sécurisée
                window.location.href = 'index.html';
            } else {
                // Authentification échouée
                alert('Authentification échouée');
            }
         
          console.log(data);
        })
        .catch((error) => {
          console.error("Erreur :", error);
        });
      }
  
      connect();
    });
  }
  
  login();
