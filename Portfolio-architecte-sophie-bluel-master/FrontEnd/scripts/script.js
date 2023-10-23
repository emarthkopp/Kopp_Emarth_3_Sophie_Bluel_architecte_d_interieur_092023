const url = "http://localhost:5678/api/works"
const container = document.getElementById("gallery")


fetch(url)
  .then(response => {
    // Gérer la réponse HTTP (conversion en JSON, gestion des erreurs, etc.)

    if (!response.ok) {
      throw new Error('Erreur de réseau : ' + response.status);
    }
    return response.json(); 
  })
  .then(data => {
    // Traiter les données reçues
    for(project in data){
      container.innerHTML+=`<figure>
      <img src=${data[project].imageUrl} alt=${data[project].title}>
      <figcaption>${data[project].title}</figcaption>
    </figure>`
    }
    console.log(data);
  })
  .catch(error => {
    // Gérer les erreurs
    console.error('Erreur lors de la requête Fetch :', error);
  });