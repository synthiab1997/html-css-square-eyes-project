async function displaySummary() {
    const container = document.getElementById("summary-movies-container");
    const totalEl = document.getElementById("total-price");
  
    if (!container || !totalEl) return;
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      container.innerHTML = "<p>No movies were found in your order.</p>";
      totalEl.textContent = "$0.00";
      return;
    }
  
    let total = 0;
    container.innerHTML = "";
  
    for (const id of cart) {
      try {
        const res = await fetch(`https://v2.api.noroff.dev/square-eyes/${id}`);
        const data = await res.json();
        const movie = data.data;
        total += movie.price;
  
        const summaryBox = document.createElement("div");
        summaryBox.classList.add("movie-box");
  
        summaryBox.innerHTML = `
          <img src="${movie.image.url}" alt="${movie.title}" class="movie-image" />
          <div class="movie-details">
            <h2>${movie.title}</h2>
            <p><strong>Price:</strong> $${movie.price}</p>
          </div>
        `;
  
        container.appendChild(summaryBox);
      } catch (err) {
        console.error("Failed to fetch movie in summary:", err);
      }
    }
  
    totalEl.textContent = `$${total.toFixed(2)}`;
  
    // Optionally clear cart after purchase
    localStorage.removeItem("cart");
  }
  