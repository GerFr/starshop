/**
 * Sets the order of query operations and gets the data from the query
 * @param {String} searchParam 
 * @param {String} filterParam 
 * @param {String} sortParam 
 * @param {*} filterValue 
 * @param {String} filterOperation 
 * @param {String} sortDirection 
 * @returns {Object}
 */
function getQueryData(searchParam, filterParam, sortParam, filterValue, filterOperation, sortDirection) {
    const searching = !(searchParam === null)
    const filtering = !(filterParam === null) && !(filterValue === null) && !(filterOperation === null)
    const sorting = !(sortParam === null) && !(sortDirection === null)

    const dataString = localStorage.getItem("data")
    if (!(dataString === null)) {
        const data = JSON.parse(dataString)
        if (!(searching || filtering || sorting)) {
            return data
        } else if (!searching && filtering && !sorting) {
            return filterData(
                data, 
                filterParam, 
                filterValue, 
                filterOperation
            )
        } else if (!searching && !filtering && sorting) {
            return sortData(
                data, 
                sortParam, 
                sortDirection
            )
        } else if (!searching && filtering && sorting) {
            return sortData(
                filterData(
                    data, 
                    filterParam, 
                    filterValue, 
                    filterOperation
                ), 
                sortParam, 
                sortDirection
            )
        } else if (searching && filtering) {
            return searchData(
                filterData(
                    data, 
                    filterParam, 
                    filterValue, 
                    filterOperation
                ), 
                searchParam
            )
        } else if (searching && !filtering) {
            return searchData(
                data, 
                searchParam
            )
        }
    } else {
        return null
    }
}

CART = "cart"
/**
 * Add star by ID to the cart in sessionstorage
 * @param {Number} sID 
 */
function tocart(sID) {
    const alert = document.getElementById('cartAlert' + sID)
    var cartarr = sessionStorage.getItem(CART)
    var parsedCartarr = JSON.parse(cartarr)
    if (cartarr === null) {
        parsedCartarr = [sID]
        setTimeout(function () {
            alert.classList.remove('d-none');
            alert.classList.add('alert-success');
            alert.innerHTML = "<p>Added!</p>"
            setTimeout(function () {
                alert.classList.add('d-none');
                alert.classList.remove('alert-success');
                alert.innerHTML = ""

            }, 500);
        }, 20);
    }
    else if (parsedCartarr.includes(sID) === false) {
        parsedCartarr.push(sID);
        setTimeout(function () {
            alert.classList.remove('d-none');
            alert.classList.add('alert-success');
            alert.innerHTML = "<p>Added!</p>"
            setTimeout(function () {
                alert.classList.add('d-none');
                alert.classList.remove('alert-success');
                alert.innerHTML = ""

            }, 500);
        }, 20);
    } else {
        setTimeout(function () {
            alert.classList.remove('d-none');
            alert.classList.add('alert-danger');
            alert.innerHTML = "<p>in Cart</p>"
            setTimeout(function () {
                alert.classList.add('d-none');
                alert.classList.remove('alert-danger');
                alert.innerHTML = ""

            }, 500);
        }, 20);
    }
    sessionStorage.setItem(CART, JSON.stringify(parsedCartarr))
    document.getElementById("cartcounter").innerHTML = parsedCartarr.length
    setInCart()
}

/**
 * set the in-cart confirmation pill on the article cards
 */
function setInCart() {
    var cart = JSON.parse(sessionStorage.getItem("cart"))
    if (cart !== null) {
        cart.forEach(element => {
            var tag = document.getElementById(element + "-inCart")
            if (tag !== null) {
                tag.innerHTML = "\
            <div class='badge position-absolute rounded-pill alert-success text-white ms-4 p-2 m-2'>In Cart</div>\
            "
            }
        });
    }
}