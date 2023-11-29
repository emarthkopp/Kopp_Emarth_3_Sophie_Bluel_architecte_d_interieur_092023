const container = document.getElementById("gallery");

fetch("http://localhost:5678/api/works")
  .then((response) => {
    // Gérer la réponse HTTP (conversion en JSON, gestion des erreurs)

    if (!response.ok) {
      throw new Error("Erreur : " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    projects = data;
    // Traiter les données reçues
    for (works in data) {
      // Création d'une balise html dans le DOM
      container.innerHTML += `<figure>
      <img src=${data[works].imageUrl} alt=${data[works].title}>
      <figcaption>${data[works].title}</figcaption>
    </figure>`;
    }
  })
  .catch((error) => {
    // Gérer les erreurs
    console.error("Erreur lors de la requête", error);
  });

function filterWorks() {
  setupFilterButtons();
}

function setupFilterButtons() {
  const filterButtons = [
    { id: "objects", filter: 1 },
    { id: "flats", filter: 2 },
    { id: "hotels", filter: 3 },
    { id: "all", filter: null },
  ];

  filterButtons.forEach((button) => {
    const filterButton = document.getElementById(button.id);
    filterButton.addEventListener("click", () => filterProjects(button.filter));
  });
}

function filterProjects(categoryId) {
  const filteredProjects = categoryId
    ? projects.filter((project) => project.categoryId === categoryId)
    : projects;

  container.innerHTML = "";
  filteredProjects.forEach((project) => {
    container.innerHTML += `<figure>
      <img src="${project.imageUrl}" alt="${project.title}">
      <figcaption>${project.title}</figcaption>
    </figure>`;
  });
}

filterWorks();

//vérifie si le token est valide et affiche ou non les éléments dépendant de la validité
if (localStorage.getItem("token")) {
  let elementsConnected = document.querySelectorAll(".connected");

  for (var i = 0; i < elementsConnected.length; i++) {
    elementsConnected[i].style.display = "block";
  }
  let elemntsDisconnected = document.querySelectorAll(".disconnected");

  for (var i = 0; i < elemntsDisconnected.length; i++) {
    elemntsDisconnected[i].style.display = "none";
  }
} else {
  let elementsConnected = document.querySelectorAll(".connected");

  for (var i = 0; i < elementsConnected.length; i++) {
    elementsConnected[i].style.display = "none";
  }
  let elemntsDisconnected = document.querySelectorAll(".disconnected");

  for (var i = 0; i < elemntsDisconnected.length; i++) {
    elemntsDisconnected[i].style.display = "block";
  }
}

function logout() {
  // Supprime l'ID et le token du localStorage
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  // Redirige l'utilisateur vers la page en étatnt déconnecté
  window.location.href = "index.html";
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
  document.getElementById("modalTitle").innerHTML = "Galerie photo";
  document.getElementById("btnModalFooter").innerHTML = "Ajouter une photo";
  document.getElementById("btnModalFooter").className = "btn bgActive";
  document.getElementById("btnModalFooter").disabled = false;
  document.getElementById("modalContentAdd").style.display = "none";
  document.getElementById("arrow").style.display = "none";
  modalModif.style.display = "block";
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur : " + response.status);
      }
      return response.json();
    })
    .then((data) => {
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
    .catch((error) => {
      console.error(error);
    });
}

btnOpenModal.onclick = () => {
  modalGalery();
};

function modalNewWork() {
  //création des éléments nécessaires à la craétion de la modale d'ajout
  document.getElementById("modalTitle").innerHTML = "Ajout photo";
  document.getElementById("modalContentAdd").style.display = "block";
  document.getElementById("btnModalFooter").innerHTML = "Valider";
  document.getElementById("btnModalFooter").disabled = true;
  document.getElementById("arrow").style.display = "block";
  document.getElementById("footerLine").style.display = "none";
  document.getElementById("btnModalFooter").style.display = "none";
console.log(document.getElementById("validateNewWork").className);
  modalContent.innerHTML = "";
  modalModif.style.display = "block";
}

function modalNewWorkHide() {
  //création des éléments nécessaires à la craétion de la modale d'ajout

  document.getElementById("arrow").style.display = "none";
  modalContent.innerHTML = "";
  modalModif.style.display = "block";
}

btnModFooter.addEventListener("click", (event) => {
  if (document.getElementById("btnModalFooter").innerHTML === "Valider") {
  } else {
    modalNewWork();
  }
});

btnArrow.onclick = () => {
  modalGalery();
  document.getElementById("footerLine").style.display = "Block";
  document.getElementById("btnModalFooter").style.display = "Block";
};

//ferme la modale au clic sur le x
btnCloseModal.onclick = function () {
  modalModif.style.display = "none";
};

//ferme la modale au clic en dehors
window.onclick = function (event) {
  if (event.target == modalModif) {
    modalModif.style.display = "none";
  }
};

function trash(trashId) {
  const confirmation = confirm(`Voulez-vous supprimer cet élément ?`);
  // Si l'utilisateur annule, ne pas supprimer
  if (!confirmation) return;

  fetch("http://localhost:5678/api/works/" + trashId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La suppression a échoué");
      }
      return response.json();
    })
    .then((data) => {
      // Supprimer l'élément du DOM après la suppression réussie
      const elementToRemove = document.getElementById(trashId);
      if (elementToRemove) {
        elementToRemove.remove();
      } else {
        console.error("Élément à supprimer non trouvé ");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
const imagePreview = document.getElementById("imagePreview");
const photoChangeIcon = document.getElementById("photoChange");

let selectedFile = null;
btnAdd.onclick = (event) => {
  event.preventDefault();

  const fileInput = document.getElementById("inputAdd");
  fileInput.addEventListener("change", (event) => {
    selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (fileLoadedEvent) => {
        document.getElementById("");
        const binaryString = fileLoadedEvent.target.result;

        // Afficher l'image et masquer l'icône

        imagePreview.src = binaryString;
        imagePreview.style.display = "block";

        photoChangeIcon.style.display = "none";
        btnAdd.style.display = "none";
        format.style.display = "none";
      };

      reader.readAsDataURL(selectedFile);
    }
  });

  // Cliquez sur l'élément input créé pour ouvrir la fenêtre de sélection de fichier
  if (!selectedFile) {
    fileInput.click();
  }
};
document.getElementById("validateNewWork").addEventListener("click", (event) => {
    event.preventDefault();

    const titleValue = document.getElementById("titleAdd").value;
    const categoryValue = document.getElementById("categoryAdd").value;
    const selectedFile = document.getElementById("inputAdd").files[0]; // Récupération du fichier sélectionné

    if (selectedFile) {
      const resFormData = new FormData();

      resFormData.append("image", selectedFile);
      resFormData.append("title", titleValue);
      resFormData.append("category", parseInt(categoryValue));

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        body: resFormData,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erreur lors de la requête vers l'API");
          }
          return res.json();
        })
        .catch((error) => {
          console.error("Erreur lors de la requête :", error);
        });
    } else {
      console.error("Aucun fichier sélectionné");
    }
  });

  document.getElementById("titleAdd").addEventListener('change',()=>{changeButtonState()});
  document.getElementById("categoryAdd").addEventListener('change',()=>{changeButtonState()});
  document.getElementById("inputAdd").addEventListener('change',()=>{changeButtonState()});

function changeButtonState() {
  const titleValue = document.getElementById("titleAdd").value;
  const categoryValue = document.getElementById("categoryAdd").value;
  const imageDisplay = window.getComputedStyle(imagePreview).getPropertyValue("display");
  const validateButton = document.getElementById("validateNewWork");
  console.log(titleValue !== "" && categoryValue !== "0" && imageDisplay !== "none");
  if (titleValue !== "" && categoryValue !== "0" && imageDisplay !== "none") {
    console.log("azer");
    console.log(validateButton.classList);
    validateButton.classList.remove("bgDisable");
    validateButton.classList.add("bgActive");
    console.log(validateButton.classList);
    // validateButton.disabled = false;
    
  } else {
    console.log("azertyuiop");
    validateButton.classList.remove("bgActive");
    validateButton.classList.add("bgDisable");
    // validateButton.disabled = true;
  }
}
