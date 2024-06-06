
function goToStartPage() {
    const params = new URLSearchParams(window.location.search)
    params.set("page", 1)
    history.replaceState({}, "", `${window.location.pathname}?${params}`)
    location.reload()
}
function goToEndPage(page) {
    const params = new URLSearchParams(window.location.search)
    params.set("page", page)
    history.replaceState({}, "", `${window.location.pathname}?${params}`)
    location.reload()
}

function paginationCheck(page, max) {
    if (page <= 1) {
        document.getElementById('decrement').classList.add('d-none')
        document.getElementById('increment').classList.remove('d-none')
        document.getElementById('centralpage').classList.add('d-none')
        document.getElementById('startPage').classList.add('d-none')
        document.getElementById('endPage').classList.remove('d-none')
    }
    if (page > 1 && page < max) {
        document.getElementById('decrement').classList.remove('d-none')
        document.getElementById('increment').classList.remove('d-none')
        document.getElementById('centralpage').classList.remove('d-none')
        document.getElementById('startPage').classList.remove('d-none')
        document.getElementById('endPage').classList.remove('d-none')
    }
    if (page >= max && max != 1) {
        document.getElementById('decrement').classList.remove('d-none')
        document.getElementById('increment').classList.add('d-none')
        document.getElementById('centralpage').classList.add('d-none')
        document.getElementById('startPage').classList.remove('d-none')
        document.getElementById('endPage').classList.add('d-none')
    }
    if (max == 1) {
        document.getElementById('increment').classList.add('d-none')
        document.getElementById('endPage').classList.add('d-none')
    }
}

function decrement() {
    const params = new URLSearchParams(window.location.search)
    var page = Number(params.get("page"))
    if (!(page === null) && (page > 1)) {
        page -= 1
        params.set("page", page)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }
}

function increment() {
    const dataString = localStorage.getItem("data")
    const dataLenght = JSON.parse(dataString).length
    const max = Math.ceil(dataLenght / 12)
    const params = new URLSearchParams(window.location.search)
    var page = params.get("page")
    if (!(page === null) && (page < max)) {
        page = Number(page)
        page += 1
        params.set("page", page)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    } else if (page === null) {
        page = 2
        params.set("page", page)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }
}

function getPageNumbers(page, pageLength) {
    var start
    var end
    var pageNum
    if (!(page === null)) {
        start = pageLength * (page - 1)
        end = pageLength * (page)
        pageNum = page
    } else {
        start = 0
        end = pageLength
        pageNum = 1
    }
    const params = new URLSearchParams(window.location.search)
    params.set("page", pageNum)
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
    return [start, end, pageNum]
}

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
            return filterData(data, filterParam, filterValue, filterOperation)
        } else if (!searching && !filtering && sorting) {
            return sortData(data, sortParam, sortDirection)
        } else if (!searching && filtering && sorting) {
            return sortData(filterData(data, filterParam, filterValue, filterOperation), sortParam, sortDirection)
        } else if (searching && filtering) {
            return searchData(filterData(data, filterParam, filterValue, filterOperation), searchParam)
        } else if (searching && !filtering) {
            return searchData(data, searchParam)
        }
    } else {
        return null
    }
}

CART = "cart"
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

function setInCart() {
    var cart = JSON.parse(sessionStorage.getItem("cart"))
    if (cart !== null) {
        cart.forEach(element => {
            var tag = document.getElementById(element + "-inCart")
            if (tag !== null) {
                tag.innerHTML = "\
            <div class='badge position-absolute rounded-pill bg-success text-white ms-4 p-2 m-2'>In Cart</div>\
            "
            }
        });
    }
}