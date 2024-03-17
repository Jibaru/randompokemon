import { dex } from "./pokedex.js";

const form = document.querySelector("#form");

let uberPokemon = [];
let ouPokemon = [];
let uuPokemon = [];
let puPokemon = [];
let ruPokemon = [];
let nuPokemon = [];

/**
 * @param {string} pokemonName
 * @returns {string}
 */
const getImageUrl = (pokemonName) => {
  const imageName = pokemonName.toLowerCase();

  return `https://www.smogon.com/dex/media/sprites/xy/${imageName}.gif`;
};

/**
 * @param {string} pokemonName
 * @returns {string}
 */
const getImageUrlHyphened = (pokemonName) => {
  let imageName = pokemonName.toLowerCase();
  imageName = imageName.replace(" ", "-");

  return `https://www.smogon.com/dex/media/sprites/xy/${imageName}.gif`;
};

const loadData = () => {
  for (const pokemon in dex) {
    const pokemonName = dex[pokemon].name;

    if (dex[pokemon].tier == "UBER") {
      uberPokemon.push(pokemonName);
    } else if (dex[pokemon].tier == "OU") {
      ouPokemon.push(pokemonName);
    } else if (dex[pokemon].tier == "UU") {
      uuPokemon.push(pokemonName);
    } else if (dex[pokemon].tier == "PU") {
      puPokemon.push(pokemonName);
    } else if (dex[pokemon].tier == "RU") {
      ruPokemon.push(pokemonName);
    } else if (dex[pokemon].tier == "NU") {
      nuPokemon.push(pokemonName);
    }
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const uberChecked = document.querySelector("#uber").checked;
  const ouChecked = document.querySelector("#ou").checked;
  const uuChecked = document.querySelector("#uu").checked;
  const puChecked = document.querySelector("#pu").checked;
  const ruChecked = document.querySelector("#ru").checked;
  const nuChecked = document.querySelector("#nu").checked;

  const pokemons = [];
  if (uberChecked) {
    pokemons.push(...uberPokemon);
  }

  if (ouChecked) {
    pokemons.push(...ouPokemon);
  }

  if (uuChecked) {
    pokemons.push(...uuPokemon);
  }

  if (puChecked) {
    pokemons.push(...puPokemon);
  }

  if (ruChecked) {
    pokemons.push(...ruPokemon);
  }

  if (nuChecked) {
    pokemons.push(...nuPokemon);
  }

  const selectedPokemons = [];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    selectedPokemons.push(pokemons[randomIndex]);
  }

  const list = document.querySelector("#pokemon-list");
  list.innerHTML = "";
  for (const pokemon of selectedPokemons) {
    const listItem = document.createElement("li");

    const span = document.createElement("span");
    const img = document.createElement("img");

    span.textContent = pokemon;

    img.src = getImageUrl(pokemon);
    img.onerror = function () {
      img.src = getImageUrlHyphened(pokemon);
    };
    img.alt = pokemon;
    listItem.appendChild(span);
    listItem.prepend(img);
    list.appendChild(listItem);
  }
});

loadData();
