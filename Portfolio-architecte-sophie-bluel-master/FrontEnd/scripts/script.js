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

      container.innerHTML += `<figure>
      <img src=${data[works].imageUrl} alt=${data[works].title}>
      <figcaption>${data[works].title}</figcaption>
    </figure>`
    }
  })
  .catch(error => {
    // Gérer les erreurs
    //console.error('Erreur lors de la requête Fetch :', error);
  });

const buttonObjects = document.getElementById("objects");
buttonObjects.addEventListener("click", function () {

  const objectsFiltres = projects.filter((works) =>
    works.categoryId == 1
  )
  container.innerHTML = "";
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

const modalModif = document.getElementById("modalModification");
const btnOpenModal = document.getElementById("btnProjects");
const btnCloseModal = document.getElementById("closeModal");
const modalContent = document.getElementById("modalContent");

modalModif.style.display = "none";

btnOpenModal.onclick = function () {
  modalModif.style.display = "block";
  fetch("http://localhost:5678/api/works")
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur : ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      modalContent.innerHTML = "";
      for (works in data) {
        modalContent.innerHTML += `<figure>
          <img src=${data[works].imageUrl} alt=${data[works].title} >
          <i class="fa-solid fa-trash-can" id="trash"></i>
        </figure>`;
      }
    })
    .catch(error => {
      console.error(error);
    });
};

btnCloseModal.onclick = function () {
  modalModif.style.display = "none";
}


window.onclick = function (event) {
  if (event.target == modalModif) {
    modalModif.style.display = "none";
  }
};


