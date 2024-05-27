/**
 * Liefert das 1. HTMLElement oder <null>, welches der <query> entspricht,
 * @param query - CSS-Selektor als String
 * @returns {HTMLElement} - das 1. gefundene Element
 */
const $ = query => document.querySelector(query)
const $$ = query => Array.from(document.querySelectorAll(query))

/**
 * Bindet einen Event-Handler (=Funktion) an ein DOM-Element
 * @param element - das Ziel-Element, z.B. Button
 * @param event - das Event, z.B. 'click'
 * @param func - die aufzurufende Funktion, z.B. handleValidation
 * @returns {*} - das Ziel-Element
 */
const $on = (element, event, func) => {
  Array.isArray(element)
    ? element.forEach(arrayElement => $on(arrayElement, event, func))
    : element.addEventListener(event, func)
  return element
}

/**
 * Durchläuft das HTML-Dokument und rendert sämtliche Handlebars-Script-Tags
 * @param data - die zu rendernden Daten
 * @param template - das zu ersetzende template (tag)
 * @returns {Promise<void>}
 */
const render = async (data, template) => {
  const templates = $$(template)
  for (const source of templates) {
    await loadPartials(source)
    const template = Handlebars.compile(source.innerHTML)
    const target = source.nextElementSibling
    target.innerHTML = template(data)
  }
}


/**
 * Lädt Partials mit der Datei-Endung '.html' aus dem gleichen Verzeichnis
 * @param code - der zu parsende Source-Code
 * @returns {Promise<void>}
 */
async function loadPartials(code) {
  const partialNames = code.innerText.match(/(?<={{(#>|>)).+?(?=\s)/g)
  if (partialNames) {
    for (let name of partialNames) {
      name = name.trim()
      const fileName = "partials/" + name + '.html'
      const partialCode = await fetch(fileName).then(response => response.text())
      Handlebars.registerPartial(name, partialCode)
    }
  }
}

//  Handlebar helpers
Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and() {
    return Array.prototype.every.call(arguments, Boolean);
  },
  or() {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  },
  // checks if admin param is equal to "true" and if so, reveals admin Buttons on each Star Card 
  admin() {
    const params = new URLSearchParams(window.location.search)
    const admin = params.get("admin")
    return (admin === "true")
  },
  formatCurrency(value){
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  }
});