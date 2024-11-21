document.addEventListener('DOMContentLoaded', function () {
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));

    if (productData) {
        // Populate the product details page
        document.querySelector('.product-details img').src = productData.image;
        document.querySelector('.product-details #name').textContent = productData.name;
        document.querySelector('.product-details #price').textContent = `$${productData.price}`;
        //document.querySelector('.product-details #description').textContent = description;
        
        // Fetch description by ID and assign it
        const description = window.productDescriptions[productData.id];
        document.querySelector('#description').innerHTML =
            description || '<p>No description available.</p>';
    
        // Clear localStorage to avoid conflicts for other products
        //localStorage.removeItem('selectedProduct');
    } else {
        // Handle the case where no product data is available
        document.querySelector('.product-details').innerHTML = '<p>Product not found.</p>';
    }
});
