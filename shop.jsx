const products = [
    { id: 1, name: "Product 1", price: 10.00, description: "A great product.", image: "product1.jpg" },
    { id: 2, name: "Product 2", price: 15.00, description: "Another great product.", image: "product2.jpg" },
    // Add more products as needed
];

const cart = [];

function displayProducts() {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
            </div>
            <div class="product-actions">
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;

        productsContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    alert(`${product.name} has been added to the cart.`);
}

document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let cartDetails = 'Items in your cart:\n';
    cart.forEach(product => {
        cartDetails += `- ${product.name}: $${product.price.toFixed(2)}\n`;
    });

    cartDetails += `Total: $${cart.reduce((total, product) => total + product.price, 0).toFixed(2)}`;

    alert(cartDetails);
});

displayProducts();
