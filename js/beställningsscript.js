const form = document.getElementById('myForm')
const userName = document.getElementById('name')
const email = document.getElementById('email')
const tel = document.getElementById('telefonnr')
const adress = document.getElementById('address')
const postnr = document.getElementById('postnr')
const city = document.getElementById('ort')

form.addEventListener('submit', e => {
    e.preventDefault()

    if(validInputs()){
        let customer = {userName: userName.value, email: email.value, tel: tel.value, adress: adress.value, postnr: postnr.value, city: city.value};
        localStorage.setItem('customer', JSON.stringify(customer));
        window.location.href = 'bekräftelsesida.html'
    }
})

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;

    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';

    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validEmail = email => {
    const charSet =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return charSet.test(String(email).toLocaleLowerCase())
}
const validPostnr = postnr => {
    return /^\d+$/.test(postnr);
}

const validTel = tel => {
    return /^[\d()-]+$/.test(tel)
}

const validInputs = () => {
    const userNameValue = userName.value.trim()
    const emailValue = email.value.trim()
    const telValue = tel.value.trim()
    const adressValue = adress.value.trim()
    const postnrValue = postnr.value.trim()
    const cityValue = city.value.trim()
    var allValid = true
    

    if(userNameValue === ""){
        setError(userName, 'Skriv in ditt namn')
        allValid = false
    }else if(userNameValue.length < 2 || userNameValue.length > 50){
        setError(userName, 'Ditt namn måste vara mellan 2 - 50 tecken långt')
        allValid = false
    }else{
        setSuccess(userName)
    }

    if(emailValue === ""){
        setError(email, 'Skriv in din e-postadress')
        allValid = false
    }else if(!validEmail(emailValue)){
        setError(email, 'Skriv in en korrekt e-postadress')
        allValid = false
    }else if(emailValue.length > 50){
        setError(email, 'E-postadressen får inte vara längre än 50 tecken')
        allValid = false
    }
    else{
        setSuccess(email)
    }

    if(telValue === ""){
        setError(tel, 'Skriv in ditt telefonummer')
        allValid = false
    }else if(telValue.length > 50){
        setError(tel, 'Ditt telefonummer får max innehålla 50 tecken')
        allValid = false
    }else if(!validTel(telValue)){
        setError(tel, 'Ditt telefonummer får bara innehålla siffror, bindestreck och parenteser')
        allValid = false
    }else{
        setSuccess(tel)
    }

    if(adressValue === ""){
        setError(adress, 'Skriv in din adress')
        allValid = false
    }else if(adressValue.length < 2 || adressValue.length > 50){
        setError(adress, 'Adressen måste innehålla mellan 2 - 50 tecken')
        allValid = false
    }else{
        setSuccess(adress)
    }
    
    if(postnrValue === ""){
        setError(postnr, 'Skriv in ditt postnummer')
        allValid = false
    }else if(postnrValue.length != 5){
        setError(postnr, 'Skriv in korrekt postnummer, 5 tecken')
        allValid = false
    }else if(!validPostnr(postnrValue)){
        setError(postnr, 'Skriv in korrekt postnummer, får bara innehålla siffror')
        allValid = false
    }else{
        setSuccess(postnr)
    }
    
    if(cityValue === ""){
        setError(city, 'Skriv in din ort')
        allValid = false
    }else if(cityValue.length < 2 || cityValue.length > 50){
        setError(city, 'Ortnamnet måste innehålla mellan 2 - 50 tecken')
        allValid = false
    }else{
        setSuccess(city)
    }
    if(allValid){
        return true
    } 
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
    let totalPrice = 0;
    let tableBody = document.getElementById('cart-table-body');
  
    tableBody.innerHTML = '';
  
    cart.forEach((product, index) => {
      let row = tableBody.insertRow();
      let productImageCell = row.insertCell(0);
      let productNameCell = row.insertCell(1);
      let pricePerItemCell = row.insertCell(2);
      let quantityCell = row.insertCell(3);
      let totalItemPriceCell = row.insertCell(4);
      let actionCell = row.insertCell(5);

      let productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.width = '40';
      productImage.alt = product.title;
      productImageCell.appendChild(productImage);
  
      productNameCell.textContent = product.title;
      pricePerItemCell.textContent = '$' + product.price.toFixed(2);
      quantityCell.textContent = product.quantity;
      let totalItemPrice = product.price * product.quantity;
      totalItemPriceCell.textContent = '$' + totalItemPrice.toFixed(2);
      totalPrice += totalItemPrice;
  
      let increaseBtn = document.createElement('button');
      increaseBtn.textContent = '+';
      increaseBtn.className = 'btn btn-secondary';
      increaseBtn.onclick = function() { increaseQuantity(index); };
      actionCell.appendChild(increaseBtn);
  
      let decreaseBtn = document.createElement('button');
      decreaseBtn.textContent = '-';
      decreaseBtn.className = 'btn btn-secondary';
      decreaseBtn.onclick = function() { decreaseQuantity(index); };
      actionCell.appendChild(decreaseBtn);
  
      let removeBtn = document.createElement('button');
      removeBtn.textContent = 'Ta bort';
      removeBtn.className = 'btn btn-danger';
      removeBtn.onclick = function() { removeFromCart(index); };
      actionCell.appendChild(removeBtn);
    });
  
    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(2);
  }
  
  document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
  updateCart();