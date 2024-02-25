// async function fetchCartMovies() {
//     try {
//         let cart = JSON.parse(localStorage.getItem("cart")) || [];
//         for (const movieId of cart) {
//             const response = await fetch(`https://v2.api.noroff.dev/square-eyes/${movieId}`);
//             const data = await response.json();
//             displayMovieDetails(data.data);
//         }
//     } catch (error) {
//         console.error("Error fetching movies from cart:", error);
//     }
// }

// function displayMovieDetails(movie) {
//     const moviesContainers = document.querySelectorAll(".movies-container");
//     moviesContainers.forEach((container) => {
//         const movieBox = document.createElement("div");
//         movieBox.classList.add("movie-box");

//         movieBox.innerHTML = `
//           <img src="${movie.image.url}" alt="movie" class="movie-image">
//           <div class="movie-details">
//           <h2 class="movie-title">${movie.title}</h2>
//           <p class="movie-description"><strong>Description:</strong> ${movie.description}</p>
//           <p class="movie-genre"><strong>Genre:</strong> ${movie.genre}</p>
//           <p class="movie-rating"><strong>Rating:</strong> ${movie.rating}</p>
//           <p class="movie-released"><strong>Released:</strong> ${movie.released}</p>
//           <p class="movie-price"><strong>Price:</strong> $${movie.price}</p>  
//       </div>
//         `;

//         container.appendChild(movieBox);
//     });
// }

// document.addEventListener("DOMContentLoaded", function () {
//     fetchCartMovies();
// });

// Function to update cart count
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length.toString();
}

// Function to update total price
async function updateTotalPrice() {
    const totalPriceElement = document.getElementById("total-price");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;
    for (const movieId of cart) {
        const response = await fetch(`https://v2.api.noroff.dev/square-eyes/${movieId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie ${movieId}`);
        }
        const data = await response.json();
        totalPrice += data.data.price;
    }
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to add a movie to the cart
function addToCart(movieId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(movieId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); 
    updateTotalPrice(); 
}

// Function to remove a movie from the cart
function removeFromCart(movieId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.indexOf(movieId);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount(); 
        updateTotalPrice(); 
    }
}

// Function to remove a movie from the cart and UI
function removeFromCartAndUI(movieId) {
    removeFromCart(movieId); // from cart
    const movieElement = document.querySelector(`[data-movie-id="${movieId}"]`);
    if (movieElement) {
        movieElement.remove(); //  from UI
    }
}

// Function to fetch and display cart movies
async function fetchCartMovies() {
    try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        for (const movieId of cart) {
            const response = await fetch(`https://v2.api.noroff.dev/square-eyes/${movieId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch movie ${movieId}`);
            }
            const data = await response.json();
            displayMovieDetails(data.data);
        }
        updateTotalPrice(); 
    } catch (error) {
        console.error("Error fetching movies from cart:", error);
    }
}

// Function to display movie details
function displayMovieDetails(movie) {
    const moviesContainer = document.getElementById("movies-container");
    const movieBox = document.createElement("div");
    movieBox.classList.add("movie-box");
    movieBox.dataset.movieId = movie.id; 
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
            <button class="remove-from-cart-btn">Remove from Cart</button>
        </div>
    `;
    moviesContainer.appendChild(movieBox);

    const addToCartBtn = movieBox.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
        addToCart(movie.id);
    });

    const removeFromCartBtn = movieBox.querySelector(".remove-from-cart-btn");
    removeFromCartBtn.addEventListener("click", () => {
        removeFromCartAndUI(movie.id);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchCartMovies();
    updateCartCount(); 
});

