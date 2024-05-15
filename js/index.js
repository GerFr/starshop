function decrement() {
    const params = new URLSearchParams(window.location.search)
    var page = Number(params.get("page"))
    if (!(page===null)&&(page>1)){
        page-=1
        params.set("page", page)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }
}

function increment() {
    const params = new URLSearchParams(window.location.search)
    var page = params.get("page")
    if (!(page===null)){
        page =Number(page)
        page+=1
        params.set("page", page)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }else{
        page=2
        params.set("page", page)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }
}
