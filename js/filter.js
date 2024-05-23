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
        "color": "100000",
        "title": "Sale",
        "key": null,
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
        params.delete("sale")
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
    const input = document.getElementById('filterField')
    const value = params.get("filterValue")

    if (value !== null) {
        let found = colors.find(obj => obj["color"] === value)
        if (found !== undefined) {
            input.innerHTML = "Filter: "+found["title"]
        } else {
            input.innerHTML = ""
        }
    } else {
        input.innerHTML = ""
    }
}




function toggleFilter(){
        document.getElementById('filter').classList.toggle('d-none')
        document.getElementById('filterButton').classList.toggle('btn-secondary')
        document.getElementById('filterButton').classList.toggle('btn-dark')
}