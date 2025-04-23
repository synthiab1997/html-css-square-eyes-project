function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        const movieElement = document.createElement("div");
        movieElement.innerHTML = `
            <p><strong>${item.title}</strong> - $${item.price} (x${item.quantity})</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartContainer.appendChild(movieElement);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartContainer.innerHTML += `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
}

document.addEventListener("DOMContentLoaded", displayCart);

document.getElementById("checkout-button").addEventListener("click", () => {
    localStorage.removeItem("cart");  // Clear cart
    window.location.href = "confirmation/index.html";  // Redirect to confirmation page
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".banner-button-c").addEventListener("click", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const cardNumber = document.getElementById("card-number").value.trim();
        const expMonth = document.getElementById("exp-month").value.trim();
        const expYear = document.getElementById("exp-year").value.trim();
        const cvv = document.getElementById("CVV").value.trim();

        if (!fullName || !email || !cardNumber || !expMonth || !expYear || !cvv) {
            alert("Please fill in all fields!");
            return;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Invalid card number. Must be 16 digits.");
            return;
        }

        if (!/^\d{2}$/.test(expMonth) || expMonth < 1 || expMonth > 12) {
            alert("Invalid expiration month.");
            return;
        }

        if (!/^\d{4}$/.test(expYear) || expYear < new Date().getFullYear()) {
            alert("Invalid expiration year.");
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert("Invalid CVV. Must be 3 digits.");
            return;
        }

        alert("Payment successful! Redirecting...");
        localStorage.removeItem("cart"); // Clear cart
        window.location.href = "checkout_success.html";
    });
});
