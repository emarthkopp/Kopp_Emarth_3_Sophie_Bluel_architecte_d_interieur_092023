fetch("http://localhost:5678/api/works")
  .then(response => {
    // Gérer la réponse HTTP (conversion en JSON, gestion des erreurs, etc.)
    if (!response.ok) {
      throw new Error('Erreur de réseau : ' + response.status);
    }
    return response.json(); // Si vous attendez une réponse JSON
  })
  .then(data => {
    // Traiter les données reçues
    console.log(data);
  })
  .catch(error => {
    // Gérer les erreurs
    console.error('Erreur lors de la requête Fetch :', error);
  });