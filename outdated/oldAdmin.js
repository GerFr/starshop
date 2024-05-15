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
    console.log("Erfolg");
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
                console.log(key + "_" + ID);
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
        }
        form.classList.add('was-validated')
    }, false)
}


// MARK: Dynamic StarId selector
function dynamicIdSelector(id) {
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    const selectOptions = document.getElementById(id);
    for (let i = 0; i < StarIDarr.length; i++) {
        const option = document.createElement('option');
        option.textContent = StarIDarr[i];
        option.value = StarIDarr[i];
        selectOptions.appendChild(option);
    }
}

// MARK: Init Function onload, sets event listeners
function init() {
    render({}, '[type="text/x-handlebars-navbar"]')
    render({}, '[type="text/x-handlebars-footer"]')
    $on($('#createnew'), 'click', create)
    $on($('#editold'), 'click', edit)
    $on($('#submitDelete'), 'click', deleteId)
    $on($('#submitRead'), 'click', read)
}

// MARK: Create new Item function
function create(event) {
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    const form1 = document.getElementById('createForm')
    form1.addEventListener('submit', event => {
        if (!form1.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            const IdInput = document.getElementById('starId');
            const IdError = document.querySelector('.invalid-feedback');
            if (StarIDarr.includes(Number(IdInput.value))) {
                alert("ERROR:\nDuplicate StarId");
                setTimeout(function () { location.reload(); }, 0)
            }
            else {
                try {
                    data.push({
                        "StarID": Number(document.getElementById('starId').value),
                        "Hip": Number(document.getElementById('Hip').value),
                        "HD": document.getElementById('HD').value, //string
                        "ProperName": document.getElementById('name').value, //string
                        "RA": Number(document.getElementById('RA').value),
                        "Dec": Number(document.getElementById('Dec').value),
                        "Distance": Number(document.getElementById('Distance').value),
                        "Mag": Number(document.getElementById('Mag').value),
                        "AbsMag": Number(document.getElementById('AbsMag').value),
                        "Spectrum": document.getElementById('Spectrum').value, //string
                        "ColorIndex": document.getElementById('ColorIndex').value, //string
                        "GeneralInformation": document.getElementById('GeneralInformation').value, //string
                        "Price": Number(document.getElementById('Price').value),
                        "Color": document.getElementById('Color').value //string
                    })
                } catch (error) {
                    console.log("Error:", error);
                }
                localStorage.setItem("data", JSON.stringify(data))
            }
        }
        form1.classList.add('was-validated')
    }, false)
}
// MARK: Edit existing function
function edit(event) {
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    const form2 = document.getElementById('editform');
    form2.addEventListener('submit', event => {
        if (!form2.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            const StarId = Number(document.getElementById('SelectId').value)
            const Attribute = document.getElementById('Attribute').value
            const editInput = document.getElementById('edittext').value
            const stringList = ["HD", "ProperName", "Spectrum", "ColorIndex", "GeneralInformation", "Color"]
            const StarIndex = StarIDarr.indexOf(StarId)
            if (stringList.includes(Attribute)) {
                data[StarIndex][Attribute] = editInput
            }
            else {
                data[StarIndex][Attribute] = Number(editInput)
            }
            localStorage.setItem("data", JSON.stringify(data))
        }
        form2.classList.add('was-validated');
    }, false);
}
// MARK: Delete existing ID
function deleteId(event) {
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    const StarId = Number(document.getElementById('SelectIdDel').value)
    const StarIndex = StarIDarr.indexOf(StarId)
    data.splice(StarIndex, 1)
    localStorage.setItem("data", JSON.stringify(data))
    location.reload()
}

function deleteIdIndex(Id) {
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    const StarIndex = StarIDarr.indexOf(Id)
    data.splice(StarIndex, 1)
    localStorage.setItem("data", JSON.stringify(data))
    location.reload()
}
// MARK: Read existing ID
function read(event) {
    var infos = document.getElementById("infos")
    infos.select()
    document.execCommand('copy');
    alert("Data copied")
    setTimeout(function () { location.reload(); }, 0)
}
// MARK: Dynamic Edit
function dynamicEdit() {

    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    document.getElementById('editform').addEventListener('change', function () {
        var selectedValue = document.getElementById('Attribute').value
        var StarId = Number(document.getElementById('SelectId').value)
        var StarIndex = StarIDarr.indexOf(StarId)
        var previousvalue = document.getElementById('previousvalue');
        previousvalue.setAttribute('value', data[StarIndex][selectedValue])

    })

    const stringList = ["HD", "ProperName", "Spectrum", "ColorIndex", "GeneralInformation"];
    document.getElementById('Attribute').addEventListener('change', function () {
        // von der ID wird der ausgewählt wert entnommen
        var selectedValue = this.value
        // wenn der slected value in der Stringlist ist
        if (stringList.includes(selectedValue)) {
            var newTextInput = document.createElement('input');
            newTextInput.setAttribute('type', 'text');
            newTextInput.setAttribute('class', 'form-control');
            newTextInput.setAttribute('id', 'edittext');
            newTextInput.setAttribute('required', 'required');
            var oldTextInput = document.getElementById('edittext');
            oldTextInput.parentNode.replaceChild(newTextInput, oldTextInput);

        } else if (selectedValue === "Color") {
            var newSelect = document.createElement('select');
            newSelect.setAttribute('name', 'Color');
            newSelect.setAttribute('id', 'edittext');
            newSelect.setAttribute('class', 'form-select');
            newSelect.setAttribute('required', 'required');
            var options = ["yellowWhiteStar", "yellowStar", "whiteStar", "orangeStar", "orangeRedStar", "blueStar", "blueWhiteStar"];
            options.forEach(option => {
                var optionElement = document.createElement('option');
                optionElement.setAttribute('value', option);
                optionElement.textContent = option;
                newSelect.appendChild(optionElement);
            });
            var oldTextInput = document.getElementById('edittext');
            oldTextInput.parentNode.replaceChild(newSelect, oldTextInput);
        } else {
            var newNumberInput = document.createElement('input');
            newNumberInput.setAttribute('type', 'number');
            newNumberInput.setAttribute('step', 'any');
            newNumberInput.setAttribute('class', 'form-control');
            newNumberInput.setAttribute('id', 'edittext');
            newNumberInput.setAttribute('required', 'required');
            var oldTextInput = document.getElementById('edittext');
            oldTextInput.parentNode.replaceChild(newNumberInput, oldTextInput);
        }
    });
}
// MARK: Dynamic Read
function dynamicRead() {
    var temp = getStarIdArr()
    const StarIDarr = temp[0]
    const data = temp[1]
    document.getElementById('readform').addEventListener('change', function () {
        // von der ID wird der ausgewählt wert entnommen
        var StarId = Number(document.getElementById('SelectIdRead').value)
        var StarIndex = StarIDarr.indexOf(StarId)
        var infos = document.getElementById('infos');
        var attribute = document.getElementById('AttributeRead').value
        infos.setAttribute('value', data[StarIndex][attribute])

    })
}

