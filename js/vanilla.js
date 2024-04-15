/**
 * Liefert das 1. HTMLElement oder <null>, welches der <query> entspricht,
 * @param query - CSS-Selektor als String
 * @returns {HTMLElement} - das 1. gefundene Element
 */
const $ = query => document.querySelector(query)
const $$ = query => Array.from(document.querySelectorAll(query))

/**
 *
 * @param element
 * @param event
 * @param func
 * @returns {*}
 */
const $on = (element, event, func) => {
  Array.isArray(element)
    ? element.forEach(arrayElement => $on(arrayElement, event, func))
    : element.addEventListener(event, func)
  return element
}

const render =  (data) => {
  console.log(typeof data)
  const templates = $$('[type="text/x-handlebars-template"]')

  for(const source of templates) {
    const template = Handlebars.compile(source.innerHTML)
    const target = source.nextElementSibling
    target.innerHTML = template(data)
  }
}

const PIZZA_KEY = "selectedPizzas"



