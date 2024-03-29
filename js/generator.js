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

    if (includeNFE) {
      pokemons.push(...this._tierList.notFullEvolvedPokemons);
    }

    if (includeLC) {
      pokemons.push(...this._tierList.littleCupPokemons);
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
