const apiUrl = "http://localhost:8000/api/v1/titles/";

/**
 *
 * @param {string} url
 * @param {object} options
 * @returns {object} data
 */
async function customFetch(url, options) {
  try {
    const response = await fetch(`${apiUrl}${url}`, options);
    if (response.status < 200 && response.status >= 300) {
      return new Error("Problème d'accès aux données de l'API");
    }
    return response.json();
  } catch {
    throw new Error("Problème d'accès aux données de l'API");
  }
}

export async function getBestMovies(url) {
  const data = await customFetch(url);
  return data.results;
}

export async function getDetailBestMovie(url) {
  const data = await customFetch(url);
  return data;
}
