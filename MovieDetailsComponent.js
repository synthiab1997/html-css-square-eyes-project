async function fetchMovieDetails(movieId) {
    try {
      const response = await fetch(`https://v2.api.noroff.dev/square-eyes/${movieId}`);
      const data = await response.json();
      displayMovieDetails(data.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
}

function displayMovieDetails(movie) {
    const moviesContainer = document.querySelector(".movies-container");
    
    const movieBox = document.createElement("div");
    movieBox.classList.add("movie-box");

    movieBox.innerHTML = `
      <img src="${movie.image.url}" alt="movie" class="movie-image">
      <div class="movie-details">
          <h2 class="movie-title">${movie.title}</h2>
          <p class="movie-description"><strong>Description:</strong> ${movie.description}</p>
          <p class="movie-genre"><strong>Genre:</strong> ${movie.genre}</p>
          <p class="movie-rating"><strong>Rating:</strong> ${movie.rating}</p>
          <p class="movie-released"><strong>Released:</strong> ${movie.released}</p>
          <p class="movie-price"><strong>Price:</strong> $${movie.price}</p>  
          <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    `;

    moviesContainer.appendChild(movieBox);

    const addToCartBtn = movieBox.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(movie.id); // Use movie.id instead of movieId
        localStorage.setItem("cart", JSON.stringify(cart));
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const movieId = localStorage.getItem("selectedMovieId");
    fetchMovieDetails(movieId);
});
