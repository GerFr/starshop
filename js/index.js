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
    const filtering = !(filterParam === null)&&!(filterValue===null)&&!(filterOperation===null)
    const sorting = !(sortParam === null)&&!(sortDirection===null)

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