/**
 * jump to page 1 
 */
function goToStartPage() {
    const params = new URLSearchParams(window.location.search)
    params.set("page", 1)
    history.replaceState({}, "", `${window.location.pathname}?${params}`)
    location.reload()
}
/**
 * jump to page given in parameter
 * @param {*} page 
 */
function goToEndPage(page) {
    const params = new URLSearchParams(window.location.search)
    params.set("page", page)
    history.replaceState({}, "", `${window.location.pathname}?${params}`)
    location.reload()
}
/**
 * logic for activating and deactivating pagination buttons
 * @param {*} page last possible page
 * @param {*} max last possible page
 */
function paginationCheck(page, max) {
    if (page <= 1) {
        document.getElementById('decrement').classList.add('d-none')
        document.getElementById('increment').classList.remove('d-none')
        document.getElementById('startPage').classList.add('d-none')
        document.getElementById('endPage').classList.remove('d-none')
    }
    if (page > 1 && page < max) {
        document.getElementById('decrement').classList.remove('d-none')
        document.getElementById('increment').classList.remove('d-none')
        document.getElementById('startPage').classList.remove('d-none')
        document.getElementById('endPage').classList.remove('d-none')
    }
    if (page >= max && max != 1) {
        document.getElementById('decrement').classList.remove('d-none')
        document.getElementById('increment').classList.add('d-none')
        document.getElementById('startPage').classList.remove('d-none')
        document.getElementById('endPage').classList.add('d-none')
    }
    if (max == 1) {
        document.getElementById('increment').classList.add('d-none')
        document.getElementById('endPage').classList.add('d-none')
    }
}
/**
 * decrements page by one 
 */
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
/**
 * increments page by one 
 */
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
/**
 * returns start and end Index of items for current page and sets page in URL
 * @param {*} page current page
 * @param {*} pageLength amount of items on page
 * @returns {object} [start, end, pageNum]
 */
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