// MARK: Datensatz in local storage

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
            }
        }
        form.classList.add('was-validated')
    }, false)
}
// MARK: Delete id on Index
function deleteIdIndex(Id) {
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    const StarIndex = StarIDarr.indexOf(Id)
    data.splice(StarIndex, 1)
    localStorage.setItem("data", JSON.stringify(data))
    location.reload()
}

