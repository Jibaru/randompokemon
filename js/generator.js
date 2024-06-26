import { Pokemon } from "./pokemon.js";
import { TierList } from "./tierlist.js";

export class RandomPokemonGenerator {
  /**
   * @param {TierList} tierList
   */
  constructor(tierList) {
    this._tierList = tierList;
  }

  /**
   * @param {number} numberOfPokemons
   * @param {boolean} includeAnythingGoes
   * @param {boolean} includeUber
   * @param {boolean} includeOU
   * @param {boolean} includeUU
   * @param {boolean} includePU
   * @param {boolean} includeRU
   * @param {boolean} includeNU
   * @param {boolean} includeZU
   * @param {boolean} includeNFE
   * @param {boolean} includeLC
   * @param {boolean} differentBaseSpecies
   * @param {boolean} noPreEvolutions
   * @returns {Pokemon[]}
   */
  generate(
    numberOfPokemons,
    includeAnythingGoes,
    includeUber,
    includeOU,
    includeUU,
    includePU,
    includeRU,
    includeNU,
    includeZU,
    includeNFE,
    includeLC,
    differentBaseSpecies,
    noPreEvolutions
  ) {
    const pokemons = this.pokemonList(
      includeAnythingGoes,
      includeUber,
      includeOU,
      includeUU,
      includePU,
      includeRU,
      includeNU,
      includeZU,
      includeNFE,
      includeLC,
      noPreEvolutions
    );

    if (pokemons.length === 0) {
      return [];
    }

    const selectedPokemonByKeys = {};
    const total = Math.min(numberOfPokemons, pokemons.length);
    for (
      let i = 0, maxTries = 100000;
      i < total && maxTries > 0;
      i++, maxTries--
    ) {
      const randomIndex = Math.floor(Math.random() * pokemons.length);
      const pokemon = pokemons[randomIndex];
      let key = pokemon.name;

      if (differentBaseSpecies) {
        key = pokemon.dexNumber;
      }

      if (selectedPokemonByKeys[key]) {
        i--;
        continue;
      }

      selectedPokemonByKeys[key] = pokemon;
    }

    return Object.values(selectedPokemonByKeys);
  }

  /**
   * @param {boolean} includeAnythingGoes
   * @param {boolean} includeUber
   * @param {boolean} includeOU
   * @param {boolean} includeUU
   * @param {boolean} includePU
   * @param {boolean} includeRU
   * @param {boolean} includeNU
   * @param {boolean} includeZU
   * @param {boolean} includeNFE
   * @param {boolean} includeLC
   * @param {boolean} noPreEvolutions
   * @returns {Pokemon[]}
   */
  pokemonList(
    includeAnythingGoes,
    includeUber,
    includeOU,
    includeUU,
    includePU,
    includeRU,
    includeNU,
    includeZU,
    includeNFE,
    includeLC,
    noPreEvolutions
  ) {
    /** @type {Pokemon[]} */
    let pokemons = [];
    if (includeAnythingGoes) {
      pokemons.push(...this._tierList.anythingGoesPokemons);
    }

    if (includeUber) {
      pokemons.push(...this._tierList.uberPokemons);
    }

    if (includeOU) {
      pokemons.push(...this._tierList.overUsedPokemons);
    }

    if (includeUU) {
      pokemons.push(...this._tierList.underUsedPokemons);
    }

    if (includePU) {
      pokemons.push(...this._tierList.puPokemons);
    }

    if (includeRU) {
      pokemons.push(...this._tierList.rareUsedPokemons);
    }

    if (includeNU) {
      pokemons.push(...this._tierList.neverUsedPokemons);
    }

    if (includeZU) {
      pokemons.push(...this._tierList.zuPokemons);
    }

    if (includeNFE) {
      pokemons.push(...this._tierList.notFullEvolvedPokemons);
    }

    if (includeLC) {
      pokemons.push(...this._tierList.littleCupPokemons);
    }

    if (noPreEvolutions) {
      pokemons = pokemons.filter((pokemon) => pokemon.doesNotHaveEvolutions);
    }

    return pokemons;
  }
}
