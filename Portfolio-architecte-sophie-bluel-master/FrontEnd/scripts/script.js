const container = document.getElementById("gallery")

fetch("http://localhost:5678/api/works")
  .then(response => {
    // Gérer la réponse HTTP (conversion en JSON, gestion des erreurs)

    if (!response.ok) {
      throw new Error('Erreur de réseau : ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    projects = data;
    // Traiter les données reçues
    for (works in data) {
    // Création d'une balise html dans le DOM
      container.innerHTML += `<figure>
      <img src=${data[works].imageUrl} alt=${data[works].title}>
      <figcaption>${data[works].title}</figcaption>
    </figure>`
    }
  })
  .catch(error => {
    // Gérer les erreurs
    console.error('Erreur lors de la requête', error);
  });

  //Récupération des balises des boutons de filtres
const buttonObjects = document.getElementById("objects");
  //création de la fonction qui filtre au clic sur le bouton
buttonObjects.addEventListener("click", function () {
  //filtre les works par id
  const objectsFiltres = projects.filter((works) =>
    works.categoryId == 1
  )
  //vide le container de ce qui y était affiché
  container.innerHTML = "";
  //recrée un container avec uniquement les works correspondant au filtre
  for (works in objectsFiltres) {

    container.innerHTML += `<figure>
    <img src=${objectsFiltres[works].imageUrl} alt=${objectsFiltres[works].title}>
    <figcaption>${objectsFiltres[works].title}</figcaption>
  </figure>`
  }
})
const buttonFlats = document.getElementById("flats");
buttonFlats.addEventListener("click", function () {

  const flatsFiltres = projects.filter(function (works) {
    return works.categoryId == 2
  })
  container.innerHTML = "";
  for (works in flatsFiltres) {

    container.innerHTML += `<figure>
    <img src=${flatsFiltres[works].imageUrl} alt=${flatsFiltres[works].title}>
    <figcaption>${flatsFiltres[works].title}</figcaption>
  </figure>`
  }
})

const buttonHotels = document.getElementById("hotels");
buttonHotels.addEventListener("click", function () {

  const hotelsFiltres = projects.filter((works) =>
    works.categoryId == 3
  )
  container.innerHTML = "";
  for (works in hotelsFiltres) {

    container.innerHTML += `<figure>
    <img src=${hotelsFiltres[works].imageUrl} alt=${hotelsFiltres[works].title}>
    <figcaption>${hotelsFiltres[works].title}</figcaption>
  </figure>`
  }
})
const buttonAll = document.getElementById("all");
buttonAll.addEventListener("click", function () {

  const allFiltres = projects.filter((works) =>
    works
  )
  container.innerHTML = "";
  for (works in allFiltres) {

    container.innerHTML += `<figure>
    <img src=${allFiltres[works].imageUrl} alt=${allFiltres[works].title}>
    <figcaption>${allFiltres[works].title}</figcaption>
  </figure>`
  }
});

//vérifie si le token est valide et affiche ou non es éléments dépendant de la validité
if (localStorage.getItem('token')) {
  let elementsConnected = document.querySelectorAll('.connected');

  for (var i = 0; i < elementsConnected.length; i++) {
    elementsConnected[i].style.display = "block";
  }
  let elemntsDisconnected = document.querySelectorAll('.disconnected');

  for (var i = 0; i < elemntsDisconnected.length; i++) {
    elemntsDisconnected[i].style.display = "none";
  }
}
else {
  let elementsConnected = document.querySelectorAll('.connected');

  for (var i = 0; i < elementsConnected.length; i++) {
    elementsConnected[i].style.display = "none";
  }
  let elemntsDisconnected = document.querySelectorAll('.disconnected');

  for (var i = 0; i < elemntsDisconnected.length; i++) {
    elemntsDisconnected[i].style.display = "block";
  }
}

function logout() {
  // Supprime l'ID et le token du localStorage
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  // Redirige l'utilisateur vers la page en étatnt déconnecté
  window.location.href = 'index.html';
}

addEventListener("hashchange", (event) => {
  event.preventDefault();
  const dest = event.target?.document?.location?.hash;
  if (dest === "#logout") {
    logout();
  }
});

//création des variables nécessaires à la crétion de la modale de modification et lien avec les balises HTML
const modalModif = document.getElementById("modalModification");
const btnOpenModal = document.getElementById("btnProjects");
const btnCloseModal = document.getElementById("closeModal");
const modalContent = document.getElementById("modalContent");
const btnModFooter = document.getElementById("btnModalFooter");
//masque la modale par défaut
modalModif.style.display = "none";
//au clic ouvre la modale et lance l'appel
btnOpenModal.onclick = function () {
  document.getElementById("modalTitle").innerHTML='Galerie photo';
  document.getElementById("btnModalFooter").innerHTML='Ajouter une photo'
  document.getElementById("btnModalFooter").className = "btnGreen"
  document.getElementById("modalContentAdd").style.display = "none";
  document.getElementById("arrow").style.display = "none";
  modalModif.style.display = "block";
  fetch("http://localhost:5678/api/works")
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur : ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      //vide la modale de l'appel précédent
      modalContent.innerHTML = "";
      for (works in data) {
        modalContent.innerHTML += `<figure class="modalFigure">
          <div class="imageContainer" id="${data[works].id}">
            <img src=${data[works].imageUrl} alt=${data[works].title}>
            <i class="fa-solid fa-trash-can trash" id="trash_${data[works].id}" onclick="trash(${data[works].id})"></i>
          </div>
        </figure>`;
      }
    })
    .catch(error => {
      console.error(error);
    });
};

btnModFooter.onclick = function () {
  document.getElementById("modalTitle").innerHTML='Ajout photo';
  document.getElementById("modalContentAdd").style.display = "block";
  document.getElementById("btnModalFooter").innerHTML='Valider'
  document.getElementById("btnModalFooter").className = "btnGrey"
  document.getElementById("arrow").style.display = "block";
  modalContent.innerHTML = "";
  modalModif.style.display = "block";
};
  
//ferme la modale au clic sur le x
btnCloseModal.onclick = function () {
  modalModif.style.display = "none";
}

//ferme la modale au clic en dehors
window.onclick = function (event) {
  if (event.target == modalModif) {
    modalModif.style.display = "none";
  }
};
function trash (trashId){
  alert(trashId)
}
