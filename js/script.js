async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('col-md-4', 'product');
        productElement.innerHTML = `
        <div class ="product-content">
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <img src="${product.image}" alt="${product.title}" class="img-fluid">
        </div>
        <div class="order-btn">
            <button class = "btn btn-primary order-btn">Lägg till varukorg</button>
        </div>
        `;
        productsContainer.appendChild(productElement);
        const orderButton = productElement.querySelector('.order-btn');
        orderButton.addEventListener('click', () => {
            addToCart(product);
        });
    });
}
getProducts();

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
  
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
  
  function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    }
  }
  
  function clearCart() {
    localStorage.removeItem('cart');
    updateCart();
  }
  
  function updateCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let totalPrice = 0;
  
    cartItemsContainer.innerHTML = '';
  
    cart.forEach((product, index) => {
      totalPrice += product.price * product.quantity;
      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <img src="${product.image}" width = "40px" alt="${product.title}" class="cart-item-image">
          <div>
            <p>${product.title} - $${product.price} x ${product.quantity}</p>
            <div>
              <button class="btn btn-secondary" onclick="increaseQuantity(${index})">+</button>
              <button class="btn btn-secondary" onclick="decreaseQuantity(${index})">-</button>
              <button class="btn btn-danger" onclick="removeFromCart(${index})">Ta bort</button>
            </div>
          </div>
        </div>
      `;
    });
  
    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(2);
    document.getElementById('checkout-btn').addEventListener('click', () => {
        console.log(cart);
        window.location.href = 'bestallningssida.html';
      });
  }
  document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
  updateCart();
