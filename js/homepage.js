document.addEventListener("DOMContentLoaded", async function () {
    const moviesContainer = document.querySelector(".movies-container");

    try {
        const response = await fetch("https://v2.api.noroff.dev/square-eyes");
        const data = await response.json();

        if (!data.data) throw new Error("Movies not found");

        moviesContainer.innerHTML = data.data.map(movie => `
            <div class="movie-card" data-id="${movie.id}">
                <img src="${movie.image.url}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>$${movie.price}</p>
                <button class="details-btn" data-id="${movie.id}">View Details</button>
                <button class="add-to-cart" data-id="${movie.id}">Add to Cart</button>
            </div>
        `).join("");

        // Add event listeners for buttons
        document.querySelectorAll(".details-btn").forEach(button => {
            button.addEventListener("click", function () {
                localStorage.setItem("selectedMovieId", this.dataset.id);
                window.location.href = "movie-details.html";
            });
        });

        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", function () {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                if (!cart.includes(this.dataset.id)) {
                    cart.push(this.dataset.id);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    alert("Movie added to cart!");
                } else {
                    alert("Movie is already in the cart!");
                }
            });
        });

    } catch (error) {
        moviesContainer.innerHTML = `<p>Error loading movies. Please try again later.</p>`;
        console.error("Error fetching movies:", error);
    }
});
