/**
 * Set the search url parameters
 * @param {*} event 
 */
function setSearch(event) {
    const query = document.getElementById("query").value
    if (!(query == "")) {
        const params = new URLSearchParams(window.location.search)
        params.set('search', query)
        params.set("page", 1)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    } else {
        const params = new URLSearchParams(window.location.search)
        params.delete("search")
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }
}

/**
 * clear the search url parameters and reload
 */
function removeSearch() {
    const params = new URLSearchParams(window.location.search)
    const input = document.getElementById('query')
    input.value = ""
    params.delete("search")
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
    window.location.reload()
}

/**
 * initiates the form validation code for the search input in the sticky navbar
 * @param {*} searchForm 
 */
function startSearchForm(searchForm) {
    searchForm.addEventListener('submit', event => {
        if (!searchForm.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        searchForm.classList.add('was-validated')
    }, false)
    function handleForm(event) { event.preventDefault(); }
    searchForm.addEventListener('submit', handleForm);
}

/**
 * search through the dataset and get data, sort by levenshtein distance
 * @param {*} data - data to be searched on
 * @param {*} query - search query
 * @returns {Object} data in format of the base dataset
 */
function searchData(data, query) {
    const stars = []
    data.forEach(element => {
        stars.push({ 
            "star": element, 
            "dist": levenshteinDistance(element["ProperName"], query)
        })
    })
    return stars.sort((a, b) => a.dist - b.dist).map(obj => obj.star)
}

/**
 * get the distance in needed edits to get from one string to another
 * @param {String} first -first string 
 * @param {String} second - second string
 * @returns {Number} - distance in edits
 */
function levenshteinDistance(first, second) {
    first = first.toLowerCase()
    second = second.toLowerCase()

    const matrix = []

    for (let i = 0; i <= second.length; i++) {
        matrix[i] = [i]
    }

    for (let j = 0; j <= first.length; j++) {
        matrix[0][j] = j
    }

    for (let i = 1; i <= second.length; i++) {
        for (let j = 1; j <= first.length; j++) {
            if (second.charAt(i - 1) === first.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1]
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                )
            }
        }
    }
    return matrix[second.length][first.length]
}

/**
 * Set the placeholder in the sticky navbar
 */
function setSearchPlaceholdert() {
    const params = new URLSearchParams(window.location.search)
    const input = document.getElementById('query')
    const query = params.get("search")
    if (!(query === null)) {
        input.value = query
    }
}

/**
 * get all names of the stars
 * @param {Object} data 
 * @returns {Object}
 */
function getNames(data) {
    let names = [];
    data.forEach(star => {
        names.push(star["ProperName"])
    });
    return names
}

/**
 * update the dynamic search recommendations in the sticky navbar
 */
function updateRecommendation() {
    let input = document.getElementById('query').value.toLowerCase()
    let searchResults = document.getElementById('searchResults')
    const params = new URLSearchParams(window.location.search)
    const data = getQueryData(
        input,
        params.get("filter"),
        params.get("sort"),
        params.get("filterValue"),
        params.get("filterOperation"),
        params.get("sortDirection"))
    let names = null
    if (data !== null) {
        let searchdata = searchData(data, input)
        names = getNames(searchdata).slice(0, 8)
    }

    searchResults.innerHTML = ''
    let last = 1
    let counter = 0
    if ((input !== "") && (names !== null)) {
        names.forEach(item => {
            counter += 1

            let column = document.createElement('div')
            column.classList.add("col")
            column.classList.add("my-2")

            let resultDiv = document.createElement('button')
            resultDiv.classList.add("btn")
            if (counter === last) {
                resultDiv.classList.add("btn-secondary")
            } else {
                resultDiv.classList.add("btn-dark")
            }
            resultDiv.textContent = item

            resultDiv.addEventListener('click', () => {
                console.log(item);
                document.getElementById('query').value = item
                setSearch(null);
            });
            column.appendChild(resultDiv)
            searchResults.appendChild(column)
        });
    }
}
