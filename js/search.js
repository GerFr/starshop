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
        params.delete("page")
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    }
}

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



function searchData(data, query) {
    const words = []
    data.forEach(element => {
        starName = element["ProperName"]
        starID = element["StarID"]
        distance = levenshteinDistance(starName, query)
        const star = { "id": starID, "dist": distance }
        words.push(star)
    });
    const sortedIDs = words.sort((a, b) => a.dist - b.dist).map(obj => obj.id)
    const queryData = getById(sortedIDs, data)
    return queryData
}

function getById(sortedIDs, data) {
    const queryData = []
    sortedIDs.forEach(ID => {
        data.forEach(star => {
            if (star.StarID === ID) {
                queryData.push(star)
            }
        });
    });
    return queryData
}

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

function setSearchPlaceholder() {
    const params = new URLSearchParams(window.location.search)
    const input = document.getElementById('query')

    const query = params.get("search")
    if (!(query === null)) {
        input.placeholder = query
    } else {
        input.placeholder = "Search"
    }
}