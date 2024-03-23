import { dex } from "./pokedex.js";
import { Pokemon } from "./pokemon.js";

/** @type {Pokemon[]} */
let UBER_POKEMONS = [];

/** @type {Pokemon[]} */
let OU_POKEMONS = [];

/** @type {Pokemon[]} */
let UU_POKEMONS = [];

/** @type {Pokemon[]} */
let PU_POKEMONS = [];

/** @type {Pokemon[]} */
let RU_POKEMONS = [];

/** @type {Pokemon[]} */
let NU_POKEMONS = [];

/** @type {Pokemon[]} */
let NFE_POKEMONS = [];

/** @type {Pokemon[]} */
let LC_POKEMONS = [];

export class RandomPokemonGenerator {
  constructor() {
    this._load();
  }

  _load() {
    for (const pokemon in dex) {
      const pokemonName = dex[pokemon].name;
      const pokemonObj = new Pokemon(pokemonName);

      if (dex[pokemon].tier == "Uber") {
        UBER_POKEMONS.push(pokemonObj);
      } else if (dex[pokemon].tier == "OU") {
        OU_POKEMONS.push(pokemonObj);
      } else if (dex[pokemon].tier == "UU") {
        UU_POKEMONS.push(pokemonObj);
      } else if (dex[pokemon].tier == "PU") {
        PU_POKEMONS.push(pokemonObj);
      } else if (dex[pokemon].tier == "RU") {
        RU_POKEMONS.push(pokemonObj);
      } else if (dex[pokemon].tier == "NU") {
        NU_POKEMONS.push(pokemonObj);
      } else if (dex[pokemon].tier == "NFE") {
        NFE_POKEMONS.push(pokemonObj);
      } else if (dex[pokemon].tier == "LC") {
        LC_POKEMONS.push(pokemonObj);
      }
    }
    console.log(UBER_POKEMONS);
    console.log(OU_POKEMONS);
    console.log(UU_POKEMONS);
    console.log(PU_POKEMONS);
    console.log(RU_POKEMONS);
    console.log(NU_POKEMONS);
    console.log(NFE_POKEMONS);
    console.log(LC_POKEMONS);
  }

  /**
   * @param {boolean} includeUber
   * @param {boolean} includeOU
   * @param {boolean} includeUU
   * @param {boolean} includePU
   * @param {boolean} includeRU
   * @param {boolean} includeNU
   * @param {boolean} includeNFE
   * @param {boolean} includeLC
   * @returns {Pokemon[]}
   */
  generate(
    includeUber,
    includeOU,
    includeUU,
    includePU,
    includeRU,
    includeNU,
    includeNFE,
    includeLC
  ) {
    /** @type {string[]} */
    const pokemons = [];
    if (includeUber) {
      pokemons.push(...UBER_POKEMONS);
    }

    if (includeOU) {
      pokemons.push(...OU_POKEMONS);
    }

    if (includeUU) {
      pokemons.push(...UU_POKEMONS);
    }

    if (includePU) {
      pokemons.push(...PU_POKEMONS);
    }

    if (includeRU) {
      pokemons.push(...RU_POKEMONS);
    }

    if (includeNU) {
      pokemons.push(...NU_POKEMONS);
    }

    if (includeNFE) {
      pokemons.push(...NFE_POKEMONS);
    }

    if (includeLC) {
      pokemons.push(...LC_POKEMONS);
    }

    if (pokemons.length === 0) {
      return [];
    }

    const selectedPokemonByNames = {};
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * pokemons.length);
      const pokemon = pokemons[randomIndex];

      if (selectedPokemonByNames[pokemon.name]) {
        i--;
        continue;
      }

      selectedPokemonByNames[pokemon.name] = pokemon;
    }

    return Object.values(selectedPokemonByNames);
  }
}
