const colors = [
    {
        "color": "blueStar",
        "title": "Blue",
        "key": "Color",
    },
    {
        "color": "blueWhiteStar",
        "title": "Light-Blue",
        "key": "Color",
    },
    {
        "color": "orangeRedStar",
        "title": "Dark-Orange",
        "key": "Color",
    },
    {
        "color": "orangeStar",
        "title": "Orange",
        "key": "Color",
    },
    {
        "color": "whiteStar",
        "title": "White",
        "key": "Color",
    },
    {
        "color": "yellowStar",
        "title": "Yellow",
        "key": "Color",
    },
    {
        "color": "yellowWhiteStar",
        "title": "Light",
        "key": "Color",
    },
    {
        "color": "clear",
        "title": "Clear",
        "key": "Reset",
    }
]


function setFilter(key, value, operation) {
    if ((key !== "Reset")) {
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

function setFilterPlaceholder() {
    const params = new URLSearchParams(window.location.search)
    const input = document.getElementById('filter_button')
    const value = params.get("filterValue")

    if (value !== null) {
        let found = colors.find(obj => obj["color"] === value)
        if (found !== undefined) {
            input.innerHTML = found["title"]
        } else {
            input.innerHTML = ""
        }
    } else {
        input.innerHTML = ""
    }
}

function filterSale() {
    const params = new URLSearchParams(window.location.search)
    const sale = params.get("sale")
    if (sale !== null) {
        params.delete("sale")
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        setFilter('Reset', 100000, 'sm')
    } else {
        params.set("sale", true)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        setFilter('Price', 100000, 'sm')
    }
}

function setSalePlaceholder() {
    const params = new URLSearchParams(window.location.search)
    const input = document.getElementById('sale_pill')
    const sale = params.get("sale")

    if (sale !== null) {
        input.innerHTML = "reset"
    }else{
        input.innerHTML = "<i class='bi bi-currency-dollar'></i>Sale<i class='bi bi-currency-dollar'></i>"
    }
}