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
  imageName = pokemonName.toLowerCase();

  return `https://www.smogon.com/dex/media/sprites/xy/${imageName}.gif`;
};

/**
 * @param {string} pokemonName
 * @returns {string}
 */
const getImageUrlHyphened = (pokemonName) => {
  imageName = pokemonName.toLowerCase();
  imageName = imageName.replace(" ", "-");

  return `https://www.smogon.com/dex/media/sprites/xy/${imageName}.gif`;
};

const loadData = async () => {
  const uber = await fetch(
    "https://jibaru.github.io/randompokemon/data/uber.json"
  ).then((response) => response.json());
  const ou = await fetch(
    "https://jibaru.github.io/randompokemon/data/ou.json"
  ).then((response) => response.json());
  const uu = await fetch(
    "https://jibaru.github.io/randompokemon/data/uu.json"
  ).then((response) => response.json());
  const pu = await fetch(
    "https://jibaru.github.io/randompokemon/data/pu.json"
  ).then((response) => response.json());
  const ru = await fetch(
    "https://jibaru.github.io/randompokemon/data/ru.json"
  ).then((response) => response.json());
  const nu = await fetch(
    "https://jibaru.github.io/randompokemon/data/ru.json"
  ).then((response) => response.json());

  uberPokemon = uber.pokemon_with_strategies;
  ouPokemon = ou.pokemon_with_strategies;
  uuPokemon = uu.pokemon_with_strategies;
  puPokemon = pu.pokemon_with_strategies;
  ruPokemon = ru.pokemon_with_strategies;
  nuPokemon = nu.pokemon_with_strategies;
};

form.addEventListener("submit", async (event) => {
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

    imageName = pokemon.toLowerCase();
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
