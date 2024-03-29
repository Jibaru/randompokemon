import { Configuration } from "./configuration.js";
import { RandomPokemonGenerator } from "./generator.js";
import { TierList } from "./tierlist.js";

/** @type {HTMLFormElement} */
const form = document.querySelector("#form");
/** @type {HTMLElement} */
const alertElement = document.querySelector("#alert");
/** @type {HTMLFormElement} */
const uberCheckbox = document.querySelector("#uber");
/** @type {HTMLFormElement} */
const ouCheckbox = document.querySelector("#ou");
/** @type {HTMLFormElement} */
const uuCheckbox = document.querySelector("#uu");
/** @type {HTMLFormElement} */
const puCheckbox = document.querySelector("#pu");
/** @type {HTMLFormElement} */
const ruCheckbox = document.querySelector("#ru");
/** @type {HTMLFormElement} */
const nuCheckbox = document.querySelector("#nu");
/** @type {HTMLFormElement} */
const nfeCheckbox = document.querySelector("#nfe");
/** @type {HTMLFormElement} */
const lcCheckbox = document.querySelector("#lc");

const tierList = new TierList();
const generator = new RandomPokemonGenerator(tierList);
const config = Configuration.instance();

document.addEventListener("DOMContentLoaded", () => {
  uberCheckbox.checked = config.uberChecked;
  ouCheckbox.checked = config.ouChecked;
  uuCheckbox.checked = config.uuChecked;
  puCheckbox.checked = config.puChecked;
  ruCheckbox.checked = config.ruChecked;
  nuCheckbox.checked = config.nuChecked;
  nfeCheckbox.checked = config.nfeChecked;
  lcCheckbox.checked = config.lcChecked;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  alertElement.style.display = "none";

  /** @type {boolean} */
  const uberChecked = uberCheckbox.checked;
  /** @type {boolean} */
  const ouChecked = ouCheckbox.checked;
  /** @type {boolean} */
  const uuChecked = uuCheckbox.checked;
  /** @type {boolean} */
  const puChecked = puCheckbox.checked;
  /** @type {boolean} */
  const ruChecked = ruCheckbox.checked;
  /** @type {boolean} */
  const nuChecked = nuCheckbox.checked;
  /** @type {boolean} */
  const nfeChecked = nfeCheckbox.checked;
  /** @type {boolean} */
  const lcChecked = lcCheckbox.checked;

  config.updateUberChecked(uberChecked);
  config.updateOuChecked(ouChecked);
  config.updateUuChecked(uuChecked);
  config.updatePuChecked(puChecked);
  config.updateRuChecked(ruChecked);
  config.updateNuChecked(nuChecked);
  config.updateNfeChecked(nfeChecked);
  config.updateLcChecked(lcChecked);
  config.toLocalStorage();

  const selectedPokemons = generator.generate(
    uberCheckbox.checked,
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
