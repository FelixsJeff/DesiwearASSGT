// checkout.js
// Assuming the cart is stored in localStorage or can be accessed globally
function getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    return cartItems;
}
// this function update the cart summary table in th checkout page 
function updateCartSummary() {
    const cartItems = getCartItems();
    const cartItemsList = document.getElementById("cart-items-list");
    const totalPriceElement = document.getElementById("total-price");

    // Clear previous cart items
    cartItemsList.innerHTML = "";

    if (cartItems.length === 0) {
        cartItemsList.innerHTML = "<tr><td colspan='3'>Your cart is empty.</td></tr>";
        totalPriceElement.textContent = "0.00";
        return;
    }

    let totalPrice = 0;

    // Iterate over cart items and create a row for each item
    cartItems.forEach(item => {
        const row = document.createElement("tr");

        // Item name cell
        const itemCell = document.createElement("td");
        itemCell.textContent = item.name;
        row.appendChild(itemCell);

        // Quantity cell
        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;
        row.appendChild(quantityCell);

        // Price cell
        const priceCell = document.createElement("td");
        priceCell.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        row.appendChild(priceCell);

        // Append the row to the table body
        cartItemsList.appendChild(row);

        // Update the total price
        totalPrice += item.price * item.quantity;
    });

    // Update the total price display
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Handle form submission
function handleCheckoutForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    // Basic validation
    if (!name || !email || !address) {
        alert("Please fill in all fields.");
        return;
    }

    // Get cart items
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add items before proceeding.");
        return;
    }

    // Simulate order processing (e.g., API request)
    setTimeout(() => {
        alert(`Thank you for your purchase, ${name}!`);
        
        // Clear the cart after checkout
        localStorage.removeItem("cart");
        window.location.href = "index.html"; // Redirect to homepage after checkout
    }, 1000);
}

// Initialize the checkout process
function initializeCheckoutProcess() {
    updateCartSummary();

    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", handleCheckoutForm);
}

// Wait for the DOM to be ready before initializing
document.addEventListener("DOMContentLoaded", initializeCheckoutProcess);
