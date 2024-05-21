// MARK: Datensatz in local storage
/**
 * Retrieves an array of star IDs from local storage or fetches from a JSON file if not available.
 * @returns {Array} - An array with the first element being an array of star IDs and the second being the full data array.
 */
function getStarIdArr() {
    // if data json item is not found in local storage, it is fetched locally and set
    if (localStorage.getItem("data") === null) {
        fetch('data/hygfull.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("data", JSON.stringify(data))
                location.reload()
            })
            .catch(error => console.error('Error fetching JSON file:', error));
    }
    // the complete star data (as a dictionary) aswell as all the StarIDs (as an array) are initiated for further use in the admin functions
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
    // stores data and StarId array in local variables
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    // adds eventlistener to the edit form used for editing an existing Star Item 
    var form = document.getElementById('editForm_' + ID);
    form.addEventListener('submit', event => {
        // checks if form is vlaidated, if no, the form is not submitted, if yes the form gets submitted
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            // gets all the required values out of the form using loop over the item key list
            // for this to work, the key names have to be present in the individual Form IDs
            var StarIndex = StarIDarr.indexOf(ID)
            const stringList = ["HD", "ProperName", "Spectrum", "ColorIndex", "GeneralInformation", "Color"];
            for (const key in data[StarIndex]) {
                // StarId is skipped because it is an uneditable value 
                if (key == "StarID") {
                    continue
                }
                // filters out all the values that have to be saved as Strings 
                if (stringList.includes(key)) {
                    data[StarIndex][key] = document.getElementById(key + "_" + ID).value
                }
                // filter for all the remaining Values that have to be added to the data as a number
                else {
                    data[StarIndex][key] = Number(document.getElementById(key + "_" + ID).value)
                }
            }
            // data is saved and the location is reloaded so that the updated data can be shown
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
    // stores data and StarId array in local variables
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    // adds eventlistener to the create form used for creating a new Star Item 
    const form = document.getElementById('createForm')
    form.addEventListener('submit', event => {
        // checks if form is vlaidated, if no, the form is not submitted, if yes the form gets submitted
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            const IdInput = document.getElementById('StarID');
            const stringList = ["HD", "ProperName", "Spectrum", "ColorIndex", "GeneralInformation", "Color"];
            // Checks if the new ID already exists and throws an error message in that case
            if (StarIDarr.includes(Number(IdInput.value))) {
                alert("ERROR:\nDuplicate StarId");
                setTimeout(function () { location.reload(); }, 0)
            }
            else {
                // gets all the required values out of the form using loop over the item key list
                // for this to work, the key names have to be present in the individual Form IDs
                var NewStar = {}
                for (const key in data[0]) {
                    if (stringList.includes(key)) {
                        // filters out all the values that have to be saved as Strings 
                        NewStar[key] = document.getElementById(key).value
                    }
                    else {
                        // filter for all the remaining Values that have to be added to the data as a number
                        NewStar[key] = Number(document.getElementById(key).value)
                    }
                }
                data.push(NewStar)
                // data is saved and the location is reloaded so that the updated data can be shown
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
    // stores data and StarId array in local variables
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    // removes Item based on its ID usin the index of the ID on StarIDarr
    const StarIndex = StarIDarr.indexOf(ID)
    data.splice(StarIndex, 1)
    // data is saved and the location is reloaded so that the updated data can be shown
    localStorage.setItem("data", JSON.stringify(data))
    location.reload()
}

