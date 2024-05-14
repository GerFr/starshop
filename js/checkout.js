function fetchDataset() {
  fetch('data/hygfull.json')
    .then(response => response.json())
    .then(data => { localStorage.setItem("data", JSON.stringify(data)) })
    .catch(error => console.error('Error fetching JSON file:', error));
}

function getElement(starId, location) {
  if (location === null) {
    fetchDataset()
  }
  const data = JSON.parse(location)

  var result = null
  for (const iterator of data) {
    if (iterator["StarID"] === starId) {
      result = iterator
    }
  }
  if (result === null) {
    console.log("couldnt find the star");
  }
  return result
}

function toLocal(event) {

  const namesPaypal = ['first', 'last', 'email', 'address', 'address2', 'country', 'city', 'zip'];
  const displayNamesPaypal = ['First Name', 'Last name', 'Email', 'Address', 'Address2', 'Country', 'City', 'Zip'];
  const namesCard = [...namesPaypal, ...['card-name', 'card-number', 'expiration', 'cvv']];
  const displayNamesCard = [...displayNamesPaypal, ...['Card Name', 'Card Number', 'Expiration', 'CVV']];

  if (document.getElementById("ccRadio").checked) {
    setSessionStorage(namesCard, displayNamesCard, "card")

  } else if (document.getElementById("paypalRadio").checked) {
    setSessionStorage(namesPaypal, displayNamesPaypal, "paypal")
  }
}

function setSessionStorage(names, displayNames, payment) {
  var data = [];
  for (let index = 0; index < names.length; index++) {
    const value = document.getElementById(names[index]).value;
    const name = displayNames[index]
    data.push({ "value": value, "name": name })
  }
  data.push({ "value": payment, "name": "Payment" })
  sessionStorage.setItem("checkout", JSON.stringify(data))
}

function setCardPlaceholder() {
  document.getElementById("card-name").value = "placeholder"
  document.getElementById("card-number").value = 1234
  document.getElementById("expiration").value = "2001-01"
  document.getElementById("cvv").value = 123
}

function resetCardPlaceholder() {
  document.getElementById("card-name").value = ""
  document.getElementById("card-number").value = null
  document.getElementById("expiration").value = ""
  document.getElementById("cvv").value = null
}


function clearCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart"))
  sessionStorage.removeItem("cart")
  baseData = localStorage.getItem("data")
  if (!(baseData === null)) {
    const newData = [];
    const boughtStars = [];
    const data = JSON.parse(baseData)
    data.forEach(star => {
      var bought = false;
      cart.forEach(cartId => {
        if (star["StarID"] === cartId) {
          bought = true;
        }
      });

      if (!bought) {
        newData.push(star)
      } else {
        boughtStars.push(star)
      }
    });
    localStorage.setItem("data", JSON.stringify(newData))
    sessionStorage.setItem("boughtStars", JSON.stringify(boughtStars))

  }
}
