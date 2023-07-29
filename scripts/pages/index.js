import { getBestMovies, getDetailBestMovie } from "../services/services.js";

async function init() {
  const movies = await getBestMovies("?page_size=8&sort_by=-imdb_score");
  const bestMovie = await findMovieWithBestRating(movies);
  await displayBestMovie(bestMovie);
  const nextBestMovies = await findSevenNextMoviesWithBestRating(movies);
  await displaySevenNextMovies(nextBestMovies);
  await displaySevenFantasyMovies();
  await displaySevenAnimationMovies();
  await displaySevenWesternMovies();
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
          <a href="#" class="clickableImage" data-movie-id="${movie.id}">
            <img src=${movie.image_url} class="imgBestMovie" alt="${movie.title}"/>
          </a>
          <h2 class="titleBestMovie">${movie.title}</h2>
          <button class="detailBestMovie" data-movie-id="${movie.id}">détail</button>
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
  const genres = document.querySelector(".sevenNextBestMovies .carousel");
  movieModel(movies, genres);
}

async function displaySevenFantasyMovies() {
  const movies = await getBestMovies(
    "?genre=Fantasy&sort_by=-imdb_score&page_size=7"
  );
  const genres = document.querySelector(".category1 .carousel");
  movieModel(movies, genres);
}

async function displaySevenAnimationMovies() {
  const movies = await getBestMovies(
    "?genre=Animation&sort_by=-imdb_score&page_size=7"
  );
  const genres = document.querySelector(".category2 .carousel");
  movieModel(movies, genres);
}

async function displaySevenWesternMovies() {
  const movies = await getBestMovies(
    "?genre=Western&sort_by=-imdb_score&page_size=7"
  );
  const genres = document.querySelector(".category3 .carousel");
  movieModel(movies, genres);
}

function movieModel(movies, genres) {
  return movies.forEach((movie) => {
    const movieModel = `
        <div class="carousel-item">
          <a href="#" class="clickableImage" data-movie-id="${movie.id}">
            <img src=${movie.image_url} class="imgBestNextMovies" alt="${movie.title}"/>
          </a>
        </div>`;
    genres.innerHTML += movieModel;
  });
}
