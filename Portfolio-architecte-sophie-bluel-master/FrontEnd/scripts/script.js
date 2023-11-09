let token = localStorage.getItem('token')


const container = document.getElementById("gallery")

fetch("http://localhost:5678/api/works")
  .then(response => {
    // Gérer la réponse HTTP (conversion en JSON, gestion des erreurs, etc.)

    if (!response.ok) {
      throw new Error('Erreur de réseau : ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    this.projects=data;
    // Traiter les données reçues
    for (project in data) {

      container.innerHTML += `<figure>
      <img src=${data[project].imageUrl} alt=${data[project].title}>
      <figcaption>${data[project].title}</figcaption>
    </figure>`
    }
  })
  .catch(error => {
    // Gérer les erreurs
    //console.error('Erreur lors de la requête Fetch :', error);
  });

  const buttonObjects = document.getElementById("objects");
  buttonObjects.addEventListener("click", function(){
   
    const objectsFiltres=projects.filter((project)=>
      project.categoryId ==1
    )
    container.innerHTML = "";
  for (project in objectsFiltres) {

    container.innerHTML += `<figure>
    <img src=${objectsFiltres[project].imageUrl} alt=${objectsFiltres[project].title}>
    <figcaption>${objectsFiltres[project].title}</figcaption>
  </figure>`
  }
   })
   const buttonFlats = document.getElementById("flats");
  buttonFlats.addEventListener("click", function(){
   
    const flatsFiltres=projects.filter(function(project){
      return project.categoryId ==2
  })
  container.innerHTML = "";
  for (project in flatsFiltres) {

    container.innerHTML += `<figure>
    <img src=${flatsFiltres[project].imageUrl} alt=${flatsFiltres[project].title}>
    <figcaption>${flatsFiltres[project].title}</figcaption>
  </figure>`
  }
   })
  
   const buttonHotels = document.getElementById("hotels");
  buttonHotels.addEventListener("click", function(){
   
    const hotelsFiltres=projects.filter((project)=>
      project.categoryId ==3
    )
    container.innerHTML = "";
  for (project in hotelsFiltres) {

    container.innerHTML += `<figure>
    <img src=${hotelsFiltres[project].imageUrl} alt=${hotelsFiltres[project].title}>
    <figcaption>${hotelsFiltres[project].title}</figcaption>
  </figure>`
  }
   })
   const buttonAll = document.getElementById("all");
  buttonAll.addEventListener("click", function(){
   
    const allFiltres=projects.filter((project)=>
      project
    )
    container.innerHTML = "";
  for (project in allFiltres) {

    container.innerHTML += `<figure>
    <img src=${allFiltres[project].imageUrl} alt=${allFiltres[project].title}>
    <figcaption>${allFiltres[project].title}</figcaption>
  </figure>`
  }
   });
   
   
  
   
   

  