let cart = JSON.parse(localStorage.getItem('cart'));
let customer = JSON.parse(localStorage.getItem('customer'));

if (cart) {
    const resultatDiv = document.getElementById('resultat2');
resultatDiv.innerHTML =  `<h2>Orderbekräftelse<h2><hr>
                            <h3>Tack för din beställning:</h3><br>
    `;

    cart.forEach(product => {
        resultatDiv.innerHTML += `<div>
        <img src="${product.image}" style="width: 60px; height: 60px;" alt="${product.title}" class="img-egen">
        <p><strong>Titel:</strong> ${product.title}</p>
        <p><strong>Pris:</strong> $${product.price}</p>
        <p><strong>Beskrivning:</strong> ${product.description}</p>
        <hr>
        </div>
    `;
});

        resultatDiv.innerHTML += `
        <h3>Leveransuppgifter:</h3>
        <p><strong>Namn:</strong> ${customer.userName}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Telefonnummer:</strong> ${customer.tel}</p>
        <p><strong>Adress:</strong> ${customer.adress}</p>
        <p><strong>Postnummer:</strong> ${customer.postnr}</p>
        <p><strong>Stad:</strong> ${customer.city}</p>
        </div>
    `;
}