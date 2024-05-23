function setSort(key, direction) {
    if (!(key==="Reset")){
        const params = new URLSearchParams(window.location.search)
        params.set("sort", key)
        params.set("sortDirection", direction)
        params.set("page", 1)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }else{
        const params = new URLSearchParams(window.location.search)
        params.delete("sort")
        params.delete("sortDirection")
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }
}


function sortData(data, key, direction) {
    let newData = data;
    switch (direction) {
        case "asc":
            newData.sort((a, b) => a[key] - b[key]);
            break;
        case "dsc":
            newData.sort((a, b) => b[key] - a[key]);
            break;
        default:
            break;
    }
    return newData
}