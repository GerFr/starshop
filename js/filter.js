function setFilter(key, value, operation) {
    if (!(key === "Reset")) {
        const params = new URLSearchParams(window.location.search)
        params.set("filter", key)
        params.set("filterValue", value)
        params.set("filterOperation", operation)
        params.set("page", 1)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    } else {
        const params = new URLSearchParams(window.location.search)
        params.delete("filter")
        params.delete("filterValue")
        params.delete("filterOperation")
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }
}

// if value a number key.O is 
function filterData(data, key, value, operation) {
    switch (operation) {
        case "eq":
            return data.filter(star => star[key] == value)

        case "sm":
            return data.filter(star => star[key] < value)

        case "lg":
            return data.filter(star => star[key] > value)

        default:
            return data;
    }

}