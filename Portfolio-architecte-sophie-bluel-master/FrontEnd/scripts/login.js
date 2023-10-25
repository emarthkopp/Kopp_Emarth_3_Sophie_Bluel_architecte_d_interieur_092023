//email: sophie.bluel@test.tld
//password: S0phie 

function login() {
    //recupere la balise html
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('click', (event) => {
        event.preventDefault(); // pour empêcher le GET du Form HTML

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
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'mode':'cors'
            },
            body: JSON.stringify(email,password),
        })
        .then ((res) => {
            console.log(res);
            return res.json();
        })
        .then((data) => {

        })
       
        
    })
   
}
login();


