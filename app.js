import { dex } from "./pokedex.js";

const SPRITE_URL =
  "https://www.smogon.com/dex/media/sprites/xy/{imageName}.gif";

/** @type {string[]} */
let UBER_POKEMON_NAMES = [];

/** @type {string[]} */
let OU_POKEMON_NAMES = [];

/** @type {string[]} */
let UU_POKEMON_NAMES = [];

/** @type {string[]} */
let PU_POKEMON_NAMES = [];

/** @type {string[]} */
let RU_POKEMON_NAMES = [];

/** @type {string[]} */
let NU_POKEMON_NAMES = [];

/** @type {string[]} */
let NFE_POKEMON_NAMES = [];

/** @type {string[]} */
let LC_POKEMON_NAMES = [];

/** @type {HTMLFormElement} */
const form = document.querySelector("#form");

/**
 * @param {string} pokemonName
 * @returns {string}
 */
const getImageUrl = (pokemonName) => {
  const imageName = pokemonName.toLowerCase();

  return SPRITE_URL.replace("{imageName}", imageName);
};

/**
 * @param {string} pokemonName
 * @returns {string}
 */
const getImageUrlHyphened = (pokemonName) => {
  let imageName = pokemonName.toLowerCase();
  imageName = imageName.replace(" ", "-");

  return SPRITE_URL.replace("{imageName}", imageName);
};

const loadData = () => {
  for (const pokemon in dex) {
    const pokemonName = dex[pokemon].name;

    if (dex[pokemon].tier == "Uber") {
      UBER_POKEMON_NAMES.push(pokemonName);
    } else if (dex[pokemon].tier == "OU") {
      OU_POKEMON_NAMES.push(pokemonName);
    } else if (dex[pokemon].tier == "UU") {
      UU_POKEMON_NAMES.push(pokemonName);
    } else if (dex[pokemon].tier == "PU") {
      PU_POKEMON_NAMES.push(pokemonName);
    } else if (dex[pokemon].tier == "RU") {
      RU_POKEMON_NAMES.push(pokemonName);
    } else if (dex[pokemon].tier == "NU") {
      NU_POKEMON_NAMES.push(pokemonName);
    } else if (dex[pokemon].tier == "NFE") {
      NFE_POKEMON_NAMES.push(pokemonName);
    } else if (dex[pokemon].tier == "LC") {
      LC_POKEMON_NAMES.push(pokemonName);
    }
  }
  console.log(UBER_POKEMON_NAMES);
  console.log(OU_POKEMON_NAMES);
  console.log(UU_POKEMON_NAMES);
  console.log(PU_POKEMON_NAMES);
  console.log(RU_POKEMON_NAMES);
  console.log(NU_POKEMON_NAMES);
  console.log(NFE_POKEMON_NAMES);
  console.log(LC_POKEMON_NAMES);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

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

  /** @type {string[]} */
  const pokemonNames = [];
  if (uberChecked) {
    pokemonNames.push(...UBER_POKEMON_NAMES);
  }

  if (ouChecked) {
    pokemonNames.push(...OU_POKEMON_NAMES);
  }

  if (uuChecked) {
    pokemonNames.push(...UU_POKEMON_NAMES);
  }

  if (puChecked) {
    pokemonNames.push(...PU_POKEMON_NAMES);
  }

  if (ruChecked) {
    pokemonNames.push(...RU_POKEMON_NAMES);
  }

  if (nuChecked) {
    pokemonNames.push(...NU_POKEMON_NAMES);
  }

  if (nfeChecked) {
    pokemonNames.push(...NFE_POKEMON_NAMES);
  }

  if (lcChecked) {
    pokemonNames.push(...LC_POKEMON_NAMES);
  }

  const selectedPokemonNames = {};
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * pokemonNames.length);

    const pokemonName = pokemonNames[randomIndex];

    if (selectedPokemonNames[pokemonName]) {
      i--;
      continue;
    }

    selectedPokemonNames[pokemonName] = true;
  }

  /** @type {HTMLElement} */
  const ul = document.querySelector("#pokemon-list");
  ul.innerHTML = "";
  for (const pokemonName in selectedPokemonNames) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const img = document.createElement("img");

    span.textContent = pokemonName;

    img.src = getImageUrl(pokemonName);
    img.onerror = function () {
      img.src = getImageUrlHyphened(pokemonName);
    };
    img.alt = pokemonName;

    li.appendChild(span);
    li.prepend(img);
    ul.appendChild(li);
  }
});

loadData();
