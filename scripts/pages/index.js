import { getBestMovies, getDetailBestMovie } from "../services/services.js";

async function init() {
  const movies = await getBestMovies("?page_size=8&sort_by=-imdb_score");
  const bestMovie = await findMovieWithBestRating(movies);
  await displayBestMovie(bestMovie);
  const nextBestMovies = await findSevenNextMoviesWithBestRating(movies);
  await displaySevenNextMovies(nextBestMovies);
  displaySevenFantasyMovies();
  displaySevenAnimationMovies();
  displaySevenWesternMovies();
}

init();

async function findMovieWithBestRating(movies) {
  const movie = movies[0].id;
  const bestMovie = await getDetailBestMovie(movie);
  return bestMovie;
}

function displayBestMovie(movie) {
  const bestMovie = document.querySelector(".bestMovie");

  if (movie) {
    const movieDetailHTML = `
          <img src=${movie.image_url} class="imgBestMovie" alt="Best Movie Image"/>
          <h2 class="titleBestMovie">${movie.title}</h2>
          <button class="detailBestMovie">détail</button>
          <div class="descriptionBestMovie">
          <p>${movie.description}</p>
          </div>
        `;
    bestMovie.innerHTML = movieDetailHTML;
  }
}

async function findSevenNextMoviesWithBestRating(movies) {
  return movies.slice(1, 8);
}

function displaySevenNextMovies(movies) {
  const sevenNextBestMovies = document.querySelector(
    ".sevenNextBestMovies .carousel"
  );

  movies.forEach((movie) => {
    const movieModel = `
        <div class="carousel-item">
          <img src=${movie.image_url} class="imgBestNextMovies" alt="Best Movie Image"/>
        </div>`;
    sevenNextBestMovies.innerHTML += movieModel;
  });
}

async function displaySevenFantasyMovies() {
  const movies = await getBestMovies(
    "?genre=Fantasy&sort_by=-imdb_score&page_size=7"
  );
  const fantasy = document.querySelector(".category1 .carousel");

  movies.forEach((movie) => {
    const movieModel = `
        <div class="carousel-item">
          <img src=${movie.image_url} class="imgBestNextMovies" alt="Best Movie Image"/>
        </div>`;
    fantasy.innerHTML += movieModel;
  });
}

async function displaySevenAnimationMovies() {
  const movies = await getBestMovies(
    "?genre=Animation&sort_by=-imdb_score&page_size=7"
  );
  const animation = document.querySelector(".category2 .carousel");

  movies.forEach((movie) => {
    const movieModel = `
        <div class="carousel-item">
          <img src=${movie.image_url} class="imgBestNextMovies" alt="Best Movie Image"/>
        </div>`;
    animation.innerHTML += movieModel;
  });
}

async function displaySevenWesternMovies() {
  const movies = await getBestMovies(
    "?genre=Western&sort_by=-imdb_score&page_size=7"
  );
  const western = document.querySelector(".category3 .carousel");

  movies.forEach((movie) => {
    const movieModel = `
        <div class="carousel-item">
          <img src=${movie.image_url} class="imgBestNextMovies" alt="Best Movie Image"/>
        </div>`;
    western.innerHTML += movieModel;
  });
}
