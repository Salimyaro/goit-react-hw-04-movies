const API_KEY = 'a376afb1e4846f5a2cea2f835a3f297e';
const BASE_URL = 'https://api.themoviedb.org/3/';

function fetchTrending() {
  return fetch(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Не удалось загрузить популярные фильмы`),
      );
    },
  );
}

function fetchQueue(query, page = 1) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=true`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Не удалось найти фильм по запросу "${query}"`),
    );
  });
}

function fetchMovieById(id) {
  return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Не удалось найти фильм с идентификатором "${id}"`),
      );
    },
  );
}

function fetchCreditsById(id) {
  return fetch(
    `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(
        `Не удалось найти информации о актёрском составе фильма с идентификатором "${id}"`,
      ),
    );
  });
}

function fetchReviewsById(id, page = 1) {
  return fetch(
    `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Не удалось найти обзоры фильма с идентификатором "${id}"`),
    );
  });
}

const api = {
  fetchTrending,
  fetchQueue,
  fetchMovieById,
  fetchCreditsById,
  fetchReviewsById,
};

export default api;
