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
            <button class = "btn btn-primary order-btn">Beställ</button>
        </div>
        `;
        productsContainer.appendChild(productElement);
        // Hämta den skapade knappen för produkten
        const orderButton = productElement.querySelector('.order-btn');
        // Lägg till eventlyssnare för knappen
        orderButton.addEventListener('click', () => {
            // Lagra den valda produkten i localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            // Navigera till beställningssidan
            window.location.href = 'bestallningssida.html';
        });
    });
}
getProducts();







/*
document.getElementById('myForm').addEventListener('submit', orderProduct);

function orderProduct(e){
    // Get form values
    let orderName = document.getElementById('name').value;
    console.log(orderName);
    let orderEmail = document.getElementById('email').value;
    let orderNumber = document.getElementById('telefonnr').value;
    let orderAddress = document.getElementById('address').value;
    //let product = document.getElementsByClassName('product-content').value
    console.log(product)
    
    var order = {
        name: orderName,
        email: orderEmail,
        number: orderNumber,
        address: orderAddress
    }

    console.log(order);
    e.preventDefault();
    
}
*/
