// color id to title mapping for handlebars in the filter
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
    }
]

/**
 * set the filter url parameters
 * @param {String} key - filter key, any key from the dataset
 * @param {String} value - filter value, any value that can be associated with the key
 * @param {String} operation - filter operation can be: eq(=equals), lg(=larger), sm(=smaller)
 */
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

/**
 * filter the data and return result
 * @param {Object} data - data in format of base dataset
 * @param {String} key - filter key, key in base dataset
 * @param {*} value - value to be filtered against
 * @param {String} operation - filter operation
 * @returns {Object} - data in the format of the base dataset
 */
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

/**
 * sets the hightlight of the filter buttons in the sticky navbar on the article page
 */
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


/**
 * mark that the filter button on the sticky navbar has been pressed
 */
function toggleFilter() {
    document.getElementById('filter').classList.toggle('d-none')
    document.getElementById('filterButton').classList.toggle('btn-secondary')
    document.getElementById('filterButton').classList.toggle('btn-dark')
}