// Initialize an empty cart
let cart = [];

// Function to add a product to the cart
function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.title === product.title);
    
    if (existingProduct) {
        // If the product is already in the cart, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is not in the cart, add it with quantity 1
        cart.push({ ...product, quantity: 1 });
    }

    // Update the cart summary
    updateCartSummary();
}

// Function to update the cart summary
function updateCartSummary() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    // If the cart is empty, display a message
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let totalAmount = 0;

    // Iterate through the cart items and create the HTML elements
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div>
                <h4>${item.title}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);

        // Calculate the total amount
        totalAmount += item.price * item.quantity;
    });

    // Display the total amount
    const totalAmountElement = document.createElement('p');
    totalAmountElement.className = 'total-amount';
    totalAmountElement.innerText = `Total Amount: $${totalAmount.toFixed(2)}`;
    cartItemsContainer.appendChild(totalAmountElement);
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        // Find the product details from the button's parent element
        const productElement = event.target.closest('.product');
        const product = {
            image: productElement.querySelector('img').src,
            title: productElement.querySelector('h3').innerText,
            description: productElement.querySelector('p').innerText,
            price: parseFloat(productElement.querySelector('span').innerText.replace('$', ''))
        };

        // Add the product to the cart
        addToCart(product);
    });
});

// Checkout button event listener
document.getElementById('checkout-btn').addEventListener('click', () => {
    // Show the checkout section
    document.getElementById('checkout').style.display = 'block';
});