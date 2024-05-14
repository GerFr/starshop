function fetchDataset() {
    fetch('data/hygfull.json')
      .then(response => response.json())
      .then(data => { localStorage.setItem("data", JSON.stringify(data)) })
      .catch(error => console.error('Error fetching JSON file:', error));
  }
  function getElement(starId) {
    if (localStorage.getItem("data") === null) {
      fetchDataset()
    }
    const data = JSON.parse(localStorage.getItem("data"))

    var result = null
    for (const iterator of data) {
      if (iterator["StarID"] === starId) {
        result = iterator
      }
    }
    if (result === null) {
      console.log("couldnt find the star");
    }
    return result
  }