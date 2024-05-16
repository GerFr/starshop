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
    } else if (page===null) {
        page = 2
        params.set("page", page)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }
}

function getPageNumbers(page, pageLength) {
    var start;
    var end;
    if (!(page === null)) {
        start = pageLength * (page - 1)
        end = pageLength * (page)
    } else {
        start = 0
        end = pageLength
    }
    return [start, end]
}

function getQueryData(searchParam, filterParam, sortParam) {
    const searching = !(searchParam === null)
    const filtering = !(filterParam === null)
    const sorting = !(sortParam === null)

    const dataString = localStorage.getItem("data")
    if (!(dataString === null)) {
        const data = JSON.parse(dataString)
        if (!(searching || filtering || sorting)) {
            return data
        } else if (!searching && filtering && !sorting) {
            return filter(data, filterParam)
        } else if (!searching && !filtering && sorting) {
            return sort(data, sortParam)
        } else if (!searching && filtering && sorting) {
            return sort(filter(data, filterParam), sortParam)
        } else if (searching && filtering) {
            return search(filter(data, filterParam), searchParam)
        } else if (searching && !filtering) {
            return search(data, searchParam)
        }
    } else {
        return null
    }
}

CART = "cart"
function tocart(sID) {
    setTimeout(function () {
        document.getElementById('cartAlert' + sID).classList.remove('d-none');

        setTimeout(function () {
            document.getElementById('cartAlert' + sID).classList.add('d-none');
        }, 500);
    }, 20);

    var cartarr = sessionStorage.getItem(CART)
    var parsedCartarr = JSON.parse(cartarr)
    if (cartarr === null) {
        parsedCartarr = [sID]
    }
    else if (parsedCartarr.includes(sID) === false) {
        parsedCartarr.push(sID);
    }
    sessionStorage.setItem(CART, JSON.stringify(parsedCartarr))
}