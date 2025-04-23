async function fetchMovies() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/square-eyes");
    const data = await response.json();
    displayMoviesByGenre(data.data);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function displayMoviesByGenre(movies) {
  const genres = [...new Set(movies.map(movie => movie.genre))];

  genres.forEach(genre => {
    const genreContainer = document.createElement("div");
    genreContainer.classList.add("genre-container");
    genreContainer.innerHTML = `<h3>${genre}</h3>`;
    document.body.appendChild(genreContainer); 

    const moviesByGenre = movies.filter(movie => movie.genre === genre);

    const moviesContainer = document.createElement("div");
    moviesContainer.classList.add("movies-container");
    genreContainer.appendChild(moviesContainer);

    moviesByGenre.forEach(movie => {
      const movieBox = document.createElement("div");
      movieBox.classList.add("movie-box");

      movieBox.innerHTML = `
        <img src="${movie.image.url}" alt="movie" class="movie-image">
        <div class="movie-details">
          <h3 class="movie-title">${movie.title}</h3>
          <button class="details-btn">See details</button>
        </div>
      `;

      moviesContainer.appendChild(movieBox);

      const detailsBtn = movieBox.querySelector(".details-btn");
      detailsBtn.addEventListener("click", () => {
        localStorage.setItem("selectedMovieId", movie.id);
        window.location.href = "movie-details.html";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchMovies();
});
