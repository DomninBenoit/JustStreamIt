import { getDetailBestMovie } from "../services/services.js";

// Récupérer l'élément de la modale par son ID
const modal = document.getElementById("myModal");

// Récupérer l'élément du bouton de fermeture de la modale
const closeButton = document.querySelector(".close");

// Sélectionner tous les conteneurs de carrousel ayant la classe "carousel-container"
const carouselContainers = document.querySelectorAll(".carousel-container");

// Ajouter le gestionnaire d'événement de clic à chaque conteneur de carrousel
carouselContainers.forEach((carouselContainer) => {
  carouselContainer.addEventListener("click", async (event) => {
    // Vérifier si l'élément cliqué est une image cliquable (vérifier si l'élément ou un de ses ancêtres possède la classe "clickableImage")
    const clickableImage = event.target.closest(".clickableImage");
    if (clickableImage) {
      event.preventDefault(); // Empêcher la navigation par défaut

      // Récupérer l'ID du film à partir de l'attribut "data-movie-id" de l'image cliquable
      const movieId = clickableImage.getAttribute("data-movie-id");

      // Obtenir les informations détaillées du film à partir de l'API
      const detailMovie = await getDetailBestMovie(movieId);

      // Mettre à jour le contenu de la modale avec les informations du film cliqué
      const modalContent = document.querySelector(".modal-content");
      modalContent.innerHTML = generateModalContent(detailMovie);

      // Afficher la modale
      modal.classList.remove("display_none")
      modal.classList.add("display_block");
    }
  });
});

// Sélectionner tous les conteneurs de carrousel ayant la classe "carousel-container"
const bestContainers = document.querySelectorAll(".bestMovie");

// Ajouter le gestionnaire d'événement de clic à chaque conteneur de carrousel
bestContainers.forEach((bestContainer) => {
  bestContainer.addEventListener("click", async (event) => {
    // Vérifier si l'élément cliqué est une image cliquable (vérifier si l'élément ou un de ses ancêtres possède la classe "clickableImage")
    const clickableImage = event.target.closest(".clickableImage");
    if (clickableImage) {
      event.preventDefault(); // Empêcher la navigation par défaut

      // Récupérer l'ID du film à partir de l'attribut "data-movie-id" de l'image cliquable
      const movieId = clickableImage.getAttribute("data-movie-id");

      // Obtenir les informations détaillées du film à partir de l'API
      const detailMovie = await getDetailBestMovie(movieId);

      // Mettre à jour le contenu de la modale avec les informations du film cliqué
      const modalContent = document.querySelector(".modal-content");
      modalContent.innerHTML = generateModalContent(detailMovie);

      // Afficher la modale
      modal.classList.remove("display_none")
      modal.classList.add("display_block");
    } else if (event.target.classList.contains("detailBestMovie")) {
      event.preventDefault(); // Empêcher la navigation par défaut

      // Récupérer l'ID du film à partir de l'attribut "data-movie-id" du bouton de détail
      const movieId = event.target.getAttribute("data-movie-id");

      // Obtenir les informations détaillées du film à partir de l'API
      const detailMovie = await getDetailBestMovie(movieId);

      // Mettre à jour le contenu de la modale avec les informations du film cliqué
      const modalContent = document.querySelector(".modal-content");
      modalContent.innerHTML = generateModalContent(detailMovie);

      // Afficher la modale
      modal.classList.remove("display_none")
      modal.classList.add("display_block");
    }
  });
});

// Ajouter un gestionnaire d'événement de clic sur le bouton de fermeture de la modale
closeButton.addEventListener("click", function () {
  // Masquer la modale en modifiant son style display
  modal.classList.remove("display_block")
  modal.classList.add("display_none");
});

function generateModalContent(detailMovie) {
  return `
        <img src=${detailMovie.image_url} class="imgBestNextMovies" alt="Best Movie Image in Modal"/>
        <h2>${detailMovie.title}</h2>
        <p>genres : ${detailMovie.genres}</p>
        <p>Année de sortie : ${detailMovie.year}</p>
        <p>Rated : ${detailMovie.rated}</p>
        <p>Score IMDB : ${detailMovie.imdb_score}</p>
        <p>Réalisateur : ${detailMovie.directors}</p>
        <p>Acteurs : ${detailMovie.actors}</p>
        <p>Durée : ${detailMovie.duration} minutes</p>
        <p>Pays : ${detailMovie.countries}</p>
        <p>Box office : ${detailMovie.metascore}</p>
        <p>Résumé : ${detailMovie.description}</p>
      `;
}
