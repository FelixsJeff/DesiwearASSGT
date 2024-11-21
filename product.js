document.querySelectorAll('.product-item a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent immediate navigation
        localStorage.removeItem('selectedProduct');

        const productItem = this.closest('.product-item');
        
        const productData = {
            id: productItem.dataset.id,
            name: productItem.dataset.name,
            price: productItem.dataset.price,
            image: productItem.dataset.image,
        };

        // Store product data in localStorage
        localStorage.setItem('selectedProduct', JSON.stringify(productData));

        // Redirect to the product details page
        window.location.href = this.href;
    });
});
