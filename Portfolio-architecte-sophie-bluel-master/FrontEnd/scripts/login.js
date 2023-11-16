function login() {
    // Recupere la balise HTML
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('click', (event) => {
      event.preventDefault(); // Pour empêcher le GET du Form HTML
  
      let email = document.getElementById("email").value;
      console.log(email)
      //regex pour vérifier le format du email saisi
      if (/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+.[a-z]{2,10}/
        .test(email) === false) {
        document.getElementById('emailErrorMsg').textContent = 'Erreur de saisie!';

  
      }
      let password = document.getElementById("password").value;
      console.log(password)
      //regex pour vérifier le format du mot de passe saisi
      if (/^[a-zA-Zàâäéèêëïîôöùûüç' ,0-9]+$/
        .test(password) === false) {
        document.getElementById('passwordErrorMsg').textContent = 'Erreur de saisie!';
  
      }
      //cvariable utilisée dans la fonction connect
      const requestBody = {
        email: email,
        password: password
      };
      //création de l'appel pour connecter l'admin
      function connect() {
        fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'cors'
          },
          body: JSON.stringify(requestBody),
        })
        //mise de la réponse au format attendu
        .then((res) => {
          console.log(res);
          return res.json();
        })
        //récuration de l'ID et du token dans le local storage
        .then((data) => {
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('token', data.token);
         window.location.href = 'index.html';
         
        })
        //gestion des erreurs
        .catch((error) => {
          console.error("Erreur :", error);
        });
      }
      //appel de la fonction connect
      connect();
    });
  }
  //appel de la fonction login
  login();

  
