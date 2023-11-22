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

//vérifie si le token est valide et affiche ou non les éléments dépendant de la validité
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

//création des variables nécessaires à la création de la modale de modification et lien avec les balises HTML
const modalModif = document.getElementById("modalModification");
const btnOpenModal = document.getElementById("btnProjects");
const btnCloseModal = document.getElementById("closeModal");
const modalContent = document.getElementById("modalContent");
const btnModFooter = document.getElementById("btnModalFooter");
const btnArrow = document.getElementById("arrow");
const btnAdd = document.getElementById("btnAdd");
//masque la modale par défaut
modalModif.style.display = "none";
//au clic ouvre la modale et lance l'appel
function modalGalery() {
  document.getElementById("modalTitle").innerHTML = 'Galerie photo';
  document.getElementById("btnModalFooter").innerHTML = 'Ajouter une photo'
  document.getElementById("btnModalFooter").className = "btnGreen";
  document.getElementById("btnModalFooter").disabled = false;
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

btnOpenModal.onclick = () => {
  modalGalery()
};

function modalNewWork() {
  //création des éléments nécessaires à la craétion de la modale d'ajout
  document.getElementById("modalTitle").innerHTML = 'Ajout photo';
  document.getElementById("modalContentAdd").style.display = "block";
  document.getElementById("btnModalFooter").innerHTML = 'Valider'
  document.getElementById("btnModalFooter").className = "btnGrey"
  document.getElementById("btnModalFooter").disabled = true;
  document.getElementById("arrow").style.display = "block";
  modalContent.innerHTML = "";
  modalModif.style.display = "block";
};

function modalNewWorkHide() {
  //création des éléments nécessaires à la craétion de la modale d'ajout

  document.getElementById("arrow").style.display = "none";
  modalContent.innerHTML = "";
  modalModif.style.display = "block";
};

btnModFooter.addEventListener("click", (event) => {
  if (document.getElementById("btnModalFooter").innerHTML === 'Valider') {
    newWorks();
  } else {
    modalNewWork();
  }
});


btnArrow.onclick = () => {
  modalGalery();
}

function resetImageAndIcon() {
  imagePreview.src = "";
  imagePreview.style.display = 'none';
  photoChange.style.display = 'block';
}

//ferme la modale au clic sur le x
btnCloseModal.onclick = function () {
  resetImageAndIcon();
  modalModif.style.display = "none";
}

//ferme la modale au clic en dehors
window.onclick = function (event) {
  if (event.target == modalModif) {
    resetImageAndIcon();
    modalModif.style.display = "none";
  }
}

function trash(trashId) {
  const confirmation = confirm(`Voulez-vous supprimer cet élément ?`);
  // Si l'utilisateur annule, ne pas supprimer
  if (!confirmation) return;

  fetch("http://localhost:5678/api/works/" + trashId, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('La suppression a échoué');
      }
      return response.json();
    })
    .then(data => {
      // Supprimer l'élément du DOM après la suppression réussie
      const elementToRemove = document.getElementById(trashId);
      if (elementToRemove) {
        elementToRemove.remove();
      } else {
        console.error('Élément à supprimer non trouvé ');
      }
    })
    .catch(error => {
      console.error(error);
    });
}

let selectedFile = null;

btnAdd.onclick = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';

  fileInput.addEventListener('change', (event) => {
    selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (fileLoadedEvent) => {
        const binaryString = fileLoadedEvent.target.result;

        // Afficher l'image et masquer l'icône
        const imagePreview = document.getElementById('imagePreview');
        const photoChangeIcon = document.getElementById('photoChange');

        imagePreview.src = binaryString;
        imagePreview.style.display = 'block';

        photoChangeIcon.style.display = 'none';
        btnAdd.style.display = 'none';
        format.style.display = 'none';

      };

      reader.readAsDataURL(selectedFile);
    }

  });

  // Cliquez sur l'élément input créé pour ouvrir la fenêtre de sélection de fichier
  fileInput.click();
};

function newWorks() {
  console.log("toto")
  const titleValue = document.getElementById('titleAdd').value;
  const categoryValue = document.getElementById('categoryAdd').value;
  const imageValue = document.getElementById('imagePreview').value;

  if (selectedFile) {
   const reader = new FileReader();

    reader.onload = (fileLoadedEvent) => {
      const binaryString = fileLoadedEvent.target.result;


      const payload = {
        image: binaryString,
        title: titleValue,
        category: parseInt(categoryValue),
      };
      console.log(payload)
      // Effectuer la requête HTTP avec l'image en binary
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('token'),
          //'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'mode': 'cors'

        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Erreur lors de la requête vers l\'API');
          }
          return res.json();
        })
        .then(data => {
          console.log('Réponse de l\'API :', data);
          fetch("http://localhost:5678/api/works")
            .then(response => {
              if (!response.ok) {
                throw new Error('Erreur : ' + response.status);
              }
              return response.json();
            })
            .then(data => {
              container.innerHTML = "";
              for (works in data) {
                container.innerHTML += `<figure>
              <img src=${data[works].imageUrl} alt=${data[works].title}>
              <figcaption>${data[works].title}</figcaption>
            </figure>`;
              }
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error);
        });
    //};

    reader.readAsDataURL(selectedFile); // Lecture du fichier en tant qu'URL Data
  } else {
    console.error('Aucun fichier sélectionné');
  }
}

// Création d'une instance de MutationObserver
const observer = new MutationObserver(() => {
  toggleButtonState();
});

// Configuration de l'observateur pour surveiller les attributs
const observerConfig = { attributes: true, attributeFilter: ['style'] };

observer.observe(imagePreview, observerConfig);
document.getElementById('titleAdd').addEventListener('input', toggleButtonState);
document.getElementById('categoryAdd').addEventListener('change', toggleButtonState);

// Fonction pour activer le bouton si toutes les conditions sont remplies
function toggleButtonState() {
  const titleValue = document.getElementById('titleAdd').value.trim();
  const categoryValue = document.getElementById('categoryAdd').value.trim();

  const imageDisplay = window.getComputedStyle(imagePreview).getPropertyValue('display');

  if (titleValue !== '' && categoryValue !== '0' && imageDisplay !== 'none') {
    document.getElementById("btnModalFooter").className = "btnGreen";
    document.getElementById("btnModalFooter").disabled = false;

  } else {
    document.getElementById("btnModalFooter").className = "btnGrey";
    document.getElementById("btnModalFooter").disabled = true;

  }
}


