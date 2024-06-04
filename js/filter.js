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
        if (
        (key !== "Reset")&&
        ((key+value+operation)!==
        (params.get("filter")+params.get("filterValue")+params.get("filterOperation")))
        ) {
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

function setFilterHighlight() {
        const params = new URLSearchParams(window.location.search)
        const value = params.get("filterValue")
        const key = params.get("filter")
        const operation = params.get("filterOperation")

        if (value !== null) {
            const element = document.getElementById(key + value + operation)
            element.classList.remove('bg-black')
            element.classList.add('bg-dark')
        }

}



function toggleFilter() {
    document.getElementById('filter').classList.toggle('d-none')
    document.getElementById('filterButton').classList.toggle('btn-secondary')
    document.getElementById('filterButton').classList.toggle('btn-dark')
}