// Hämta den valda produkten från localStorage
const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
//console.log(selectedProduct);
if (selectedProduct) {
    // Visa den valda produkten på beställningssidan
    const resultatDiv = document.getElementById('resultat');
    resultatDiv.innerHTML = `
        <h3>Du valde:</h3>
        <p><strong>Titel:</strong> ${selectedProduct.title}</p>
        <p><strong>Pris:</strong> $${selectedProduct.price}</p>
        <p><strong>Beskrivning:</strong> ${selectedProduct.description}</p>
        <img src="${selectedProduct.image}" alt="${selectedProduct.title}" class="img-egen">
    `;
}

const form = document.getElementById('myForm')
const userName = document.getElementById('name')
const email = document.getElementById('email')
const tel = document.getElementById('telefonnr')
const adress = document.getElementById('address')
const postnr = document.getElementById('postnr')
const city = document.getElementById('ort')

form.addEventListener('submit', e => {
    e.preventDefault()

    validInputs()
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

    if(userNameValue === ""){
        setError(userName, 'Skriv in ditt namn')
    }else if(userNameValue.length < 2 || userNameValue.length > 50){
        setError(userName, 'Ditt namn måste vara mellan 2 - 50 tecken långt')
    }else{
        setSuccess(userName)
    }

    if(emailValue === ""){
        setError(email, 'Skriv in din e-postadress')
    }else if(!validEmail(emailValue)){
        setError(email, 'Skriv in en korrekt e-postadress')
    }else if(emailValue.length > 50){
        setError(email, 'E-postadressen får inte vara längre än 50 tecken')
    }
    else{
        setSuccess(email)
    }

    if(telValue === ""){
        setError(tel, 'Skriv in ditt telefonummer')
    }else if(telValue.length > 50){
        setError(tel, 'Ditt telefonummer får max innehålla 50 tecken')
    }else if(!validTel(telValue)){
        setError(tel, 'Ditt telefonummer får bara innehålla siffror, bindestreck och parenteser')
    }else{
        setSuccess(tel)
    }

    if(adressValue === ""){
        setError(adress, 'Skriv in din adress')
    }else if(adressValue.length < 2 || adressValue.length > 50){
        setError(adress, 'Adressen måste innehålla mellan 2 - 50 tecken')
    }else{
        setSuccess(adress)
    }
    
    if(postnrValue === ""){
        setError(postnr, 'Skriv in ditt postnummer')
    }else if(postnrValue.length != 5){
        setError(postnr, 'Skriv in korrekt postnummer, 5 tecken')
    }else if(!validPostnr(postnrValue)){
        setError(postnr, 'Skriv in korrekt postnummer, får bara innehålla siffror')
    }else{
        setSuccess(postnr)
    }
    
    if(cityValue === ""){
        setError(city, 'Skriv in din ort')
    }else if(cityValue.length < 2 || cityValue.length > 50){
        setError(city, 'Ortnamnet måste innehålla mellan 2 - 50 tecken')
    }else{
        setSuccess(city)
    }
    
}