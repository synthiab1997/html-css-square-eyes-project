// Fetch a movie's full data
async function fetchMovieData(id) {
  const res = await fetch(`https://v2.api.noroff.dev/square-eyes/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch movie ${id}`);
  const data = await res.json();
  return data.data;
}

// Get and save cart
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCartItems(); // Refresh display
}

// Update cart icon count
function updateCartCount() {
  const countEl = document.querySelector(".cart-count") || document.getElementById("cart-count");
  if (countEl) {
    const cart = getCart();
    countEl.textContent = cart.length;
  }
}

// Remove item from cart
function removeFromCart(id) {
  const updatedCart = getCart().filter(movieId => movieId !== id);
  saveCart(updatedCart);
}

// Display cart items on either cart.html or checkout.html
async function displayCartItems() {
  const container =
    document.getElementById("movies-container") ||
    document.getElementById("checkout-movies-container");
  const totalEl = document.getElementById("total-price");

  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "$0.00";
    return;
  }

  for (const id of cart) {
    try {
      const movie = await fetchMovieData(id);
      total += movie.price;

      const movieBox = document.createElement("div");
      movieBox.classList.add("movie-box");

      movieBox.innerHTML = `
        <img src="${movie.image.url}" alt="${movie.title}" class="movie-image" />
        <div class="movie-details">
          <h2>${movie.title}</h2>
          <p><strong>Price:</strong> $${movie.price}</p>
          <button class="remove-btn" data-id="${movie.id}">Remove</button>
        </div>
      `;

      container.appendChild(movieBox);
    } catch (err) {
      console.error("Error displaying cart item:", err);
    }
  }

  totalEl.textContent = `$${total.toFixed(2)}`;

  // Attach remove button listeners
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const movieId = btn.getAttribute("data-id");
      removeFromCart(movieId);
    });
  });
}

// Init on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCartItems();
});

