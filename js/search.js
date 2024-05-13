function setSearch(event) {
    const query = document.getElementById("query").value
    if (!(query == "")) {
        const params = new URLSearchParams(window.location.search)
        params.set('search', query)
        window.history.replaceState({}, "", `${window.location.pathname}?${params}`)
        window.location.reload()
    } else {
        removQueryData()
        const params = new URLSearchParams(window.location.search)
        params.delete("search")
        window.history.replaceState({}, "", `${window.location.pathname}${params}`)
        window.location.reload()
    }
}

function removQueryData() {
    // remove query data so the first 20 default entries of the data are shown
    sessionStorage.removeItem("queryData")
}


function search(query) {
    if (!(query == "")) {
        data = JSON.parse(localStorage.getItem("data"))
        const queryData = searchData(query, data)
        sessionStorage.setItem("queryData", JSON.stringify(queryData))
    }
}

function searchData(query, data) {
    const words = []
    data.forEach(element => {
        starName = element["ProperName"]
        starID = element["StarID"]
        distance = levenshteinDistance(starName, query)
        const star = { "id": starID, "dist": distance }
        words.push(star)
    });
    const sortedIDs = words.sort((a, b) => a.dist - b.dist).map(obj => obj.id).slice(0, 20)
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