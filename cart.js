// Simple cart functionality (cart.js)

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Clear cart on initial launch
if(!sessionStorage.getItem("cartInitialized")){
    cart = [];
    localStorage.setItem("cart",JSON.stringify(cart));
    sessionStorage.setItem("cartInitialized","true");
}

function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //const cartIcon = document.querySelector(".cart-icon img");
    const itemCount = cart.reduce((total, item) => total +item.quantity, 0)

    const cartIconCounter = document.querySelector(".cart-icon-counter");
    if (cartIconCounter){
    cartIconCounter.textContent = itemCount;
    }
    // Update cart icon with the number of items
    //cartIcon.setAttribute("alt", `Cart Icon (${cart.length})`);
}
// update cart icon on page load
document.addEventListener("DOMContentLoaded", updateCartIcon);

document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-grid");

    if (cartContainer) updateCartDisplay();

    // Define addToCart in the global scope
    window.addToCart = function( productImage, productName, productPrice) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ image:productImage, name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
        updateCartIcon();
    };

    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartContainer) {
            cartContainer.innerHTML = cart.length === 0 
                ? "<p>Your cart is currently empty.</p>" 
                : cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <p>${item.name}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <p>$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                `).join("");
        }
    }

   
});

document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        console.log('add to cart btn clicked');

        // Check if the button is in the collection grid
        const collectionCard = this.closest('.collection-card');
        if (collectionCard) {
            // Fetch the product information from the collection card
            const productImage = collectionCard.querySelector('img').src;
            const productName = collectionCard.querySelector('h3').textContent;
            const productPrice = parseFloat(collectionCard.querySelector('p').textContent.replace('$', '').trim());
            
            // Call the addToCart function with the retrieved data
            addToCart(productImage, productName, productPrice);
            
            // Alert the user that the product has been added to the cart
            alert(`${productName} has been added to your cart!`);
        } else {
            // If not in a collection-card (i.e., in product-item or product-details)
            const productItem = this.closest('.product-item');
            
            if (productItem) {
                // Fetch the data attributes from the product-item div (for product page)
                const productImage = productItem.dataset.image;
                const productName = productItem.dataset.name;
                const productPrice = parseFloat(productItem.dataset.price);
                
                // Call the addToCart function with the retrieved data
                addToCart(productImage, productName, productPrice);
                
                // Alert the user that the product has been added to the cart
                alert(`${productName} has been added to your cart!`);
            } else {
                // If not in a product-item (i.e., in the product details page), get data from product-details
                const productDetails = this.closest('.product-details-container').querySelector('.product-details');
                
                if (productDetails) {
                    // Fetch the product details directly from the product-details div
                    const productImage = productDetails.querySelector('#product-image').src;
                    const productName = productDetails.querySelector('#name').textContent;
                    const productPrice = parseFloat(productDetails.querySelector('#price').textContent.replace('$', '').trim());
                    
                    // Call the addToCart function with the retrieved data
                    addToCart(productImage, productName, productPrice);
                    
                    // Alert the user that the product has been added to the cart
                    alert(`${productName} has been added to your cart!`);
                }
            }
        }
    });
});
