async function fetchMovieDetails(movieId) {
  try {
    // Fetch movie details from Noroff API using the movie ID
    const response = await fetch(`https://v2.api.noroff.dev/square-eyes/${movieId}`);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Movie not found");
    }

    const data = await response.json();
    displayMovieDetails(data.data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    document.querySelector(".movie-details-container").innerHTML = "<p>Error loading movie details.</p>";
  }
}
  
  function displayMovieDetails(movie) {
    const container = document.querySelector(".movie-details-container");
  
    const movieBox = document.createElement("div");
    movieBox.classList.add("movie-box");
  
    movieBox.innerHTML = `
      <img src="${movie.image.url}" alt="${movie.title}" class="movie-image" />
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
  
    container.appendChild(movieBox);
  
    const addToCartBtn = movieBox.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      if (!cart.includes(movie.id)) {
        cart.push(movie.id);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Movie added to cart!");
      } else {
        alert("Movie is already in your cart.");
      }
  
      // Optional: update cart count visually
      updateCartCount();
    });
  }
  
  function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartCount) cartCount.textContent = cart.length;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
  
    const movieId = localStorage.getItem("selectedMovieId");
    if (movieId) {
      fetchMovieDetails(movieId);
    } else {
      document.querySelector(".movie-details-container").innerHTML = "<p>No movie selected.</p>";
    }
  });
  