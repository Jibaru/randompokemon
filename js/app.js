import { RandomPokemonGenerator } from "./generator.js";

/** @type {HTMLFormElement} */
const form = document.querySelector("#form");
/** @type {HTMLElement} */
const alertElement = document.querySelector("#alert");

const generator = new RandomPokemonGenerator();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  alertElement.style.display = "none";

  /** @type {boolean} */
  const uberChecked = document.querySelector("#uber").checked;
  /** @type {boolean} */
  const ouChecked = document.querySelector("#ou").checked;
  /** @type {boolean} */
  const uuChecked = document.querySelector("#uu").checked;
  /** @type {boolean} */
  const puChecked = document.querySelector("#pu").checked;
  /** @type {boolean} */
  const ruChecked = document.querySelector("#ru").checked;
  /** @type {boolean} */
  const nuChecked = document.querySelector("#nu").checked;
  /** @type {boolean} */
  const nfeChecked = document.querySelector("#nfe").checked;
  /** @type {boolean} */
  const lcChecked = document.querySelector("#lc").checked;

  const selectedPokemons = generator.generate(
    uberChecked,
    ouChecked,
    uuChecked,
    puChecked,
    ruChecked,
    nuChecked,
    nfeChecked,
    lcChecked
  );

  if (selectedPokemons.length === 0) {
    alertElement.textContent = "Please select at least one tier.";
    alertElement.style.display = "block";
    return;
  }

  /** @type {HTMLElement} */
  const ul = document.querySelector("#pokemon-list");
  ul.innerHTML = "";

  for (const pokemon of selectedPokemons) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const img = document.createElement("img");

    span.textContent = pokemon.name;

    img.src = pokemon.imageUrl();
    const imageUrlHyphened = pokemon.imageUrlHyphened();
    img.onerror = function () {
      img.src = imageUrlHyphened;
    };
    img.alt = pokemon.name;

    li.appendChild(span);
    li.prepend(img);
    ul.appendChild(li);
  }
});
