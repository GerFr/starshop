/**
 * set key and direction (asc, desc) of the sort in the url
 * @param {String} key 
 * @param {String} direction 
 */
function setSort(key, direction) {
    if ((key!=="Reset")&&
    ((key+direction)!==
    (params.get("sort")+params.get("sortDirection")))){

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

/**
 * Sort the dataset with a key and a given direction
 * @param {Object} data 
 * @param {String} key 
 * @param {String} direction 
 * @returns {Object} - sorted dataset in format of the base dataset
 */
function sortData(data, key, direction) {
    let newData = data;

    if (key==="Price"){
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
    }else if (key==="ProperName"){
        switch (direction) {
            case "asc":
                newData.sort((a, b) => a[key].localeCompare(b[key]));
                break;
            case "dsc":
                newData.sort((a, b)=> b[key].localeCompare(a[key]));
                break;
            default:
                break;
        }
    }
    return newData
}

/**
 * toggle the sort button on the sticky navbar
 */
function toggleSort(){
    document.getElementById('sort').classList.toggle('d-none')
    document.getElementById('sortButton').classList.toggle('btn-secondary')    
    document.getElementById('sortButton').classList.toggle('btn-dark')
}

/**
 * hightlight currently selected sort button
 */
function setSortHighlight() {
    const params = new URLSearchParams(window.location.search)
    const value = params.get("sort")
    const search = params.get("search")
    const direction = params.get("sortDirection")
    if (value!==null){
        const element = document.getElementById(value+direction)
        element.classList.remove('bg-black')
        element.classList.add('bg-dark')
    }
}