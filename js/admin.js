// MARK: Datensatz in local storage
/**
 * Retrieves an array of star IDs from local storage or fetches from a JSON file if not available.
 * @returns {Array} - An array with the first element being an array of star IDs and the second being the full data array.
 */
function getStarIdArr() {
    if (localStorage.getItem("data") === null) {
        fetch('data/hygfull.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("data", JSON.stringify(data))
                location.reload()
            })
            .catch(error => console.error('Error fetching JSON file:', error));
    }
    const data = JSON.parse(localStorage.getItem("data"));
    const StarIDarr = [];
    for (let i = 0; i < data.length; i++) {
        StarIDarr.push(data[i]["StarID"]);
    }
    return [StarIDarr, data]
}

// MARK: Edit Funktion für Indexpage
/**
 * Handles the submission and validation of an edit form for a star entry.
 * @param {number} ID - The ID of the star to be edited.
 */
function IndexEdit(ID) {
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    var form = document.getElementById('editForm_' + ID);
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            var StarIndex = StarIDarr.indexOf(ID)
            const stringList = ["HD", "ProperName", "Spectrum", "ColorIndex", "GeneralInformation", "Color"];
            for (const key in data[StarIndex]) {
                if (key == "StarID") {
                    continue
                }
                if (stringList.includes(key)) {
                    data[StarIndex][key] = document.getElementById(key + "_" + ID).value
                }
                else {
                    data[StarIndex][key] = Number(document.getElementById(key + "_" + ID).value)
                }
            }
            localStorage.setItem("data", JSON.stringify(data))
            location.reload()
        }
        form.classList.add('was-validated')
    }, false)
}

// MARK: Create new Item function
/**
 * Handles the submission and validation of a create form for a new star entry.
 */
function create() {
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    const form = document.getElementById('createForm')
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            const IdInput = document.getElementById('StarID');
            const stringList = ["HD", "ProperName", "Spectrum", "ColorIndex", "GeneralInformation", "Color"];
            if (StarIDarr.includes(Number(IdInput.value))) {
                alert("ERROR:\nDuplicate StarId");
                setTimeout(function () { location.reload(); }, 0)
            }
            else {
                var NewStar = {}
                for (const key in data[0]) {
                    if (stringList.includes(key)) {
                        NewStar[key] = document.getElementById(key).value
                    }
                    else {
                        NewStar[key] = Number(document.getElementById(key).value)
                    }
                }
                data.push(NewStar)
                localStorage.setItem("data", JSON.stringify(data))
                location.reload()
            }
        }
        form.classList.add('was-validated')
    }, false)
}
// MARK: Delete id on Index
/**
 * Deletes a star entry from the data array based on its ID.
 * @param {number} ID - The ID of the star to be deleted.
 */
function deleteIdIndex(ID) {
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    const StarIndex = StarIDarr.indexOf(ID)
    data.splice(StarIndex, 1)
    localStorage.setItem("data", JSON.stringify(data))
    location.reload()
}

