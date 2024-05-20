// TODO:set url params
function setFilter(event) {
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