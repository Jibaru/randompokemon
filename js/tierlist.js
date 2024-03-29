import { dex } from "./pokedex.js";
import { Pokemon } from "./pokemon.js";

export class TierList {
  constructor() {
    /** @type {Pokemon[]} */
    this.uberPokemons = [];

    /** @type {Pokemon[]} */
    this.overUsedPokemons = [];

    /** @type {Pokemon[]} */
    this.underUsedPokemons = [];

    /** @type {Pokemon[]} */
    this.puPokemons = [];

    /** @type {Pokemon[]} */
    this.rareUsedPokemons = [];

    /** @type {Pokemon[]} */
    this.neverUsedPokemons = [];

    /** @type {Pokemon[]} */
    this.notFullEvolvedPokemons = [];

    /** @type {Pokemon[]} */
    this.littleCupPokemons = [];
    this._load();
  }

  _load() {
    for (const pokemon in dex) {
      const pokemonName = dex[pokemon].name;
      const pokemonObj = new Pokemon(pokemonName, dex[pokemon].tier);

      if (dex[pokemon].tier == "Uber") {
        this.uberPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "OU") {
        this.overUsedPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "UU") {
        this.underUsedPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "PU") {
        this.puPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "RU") {
        this.rareUsedPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "NU") {
        this.neverUsedPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "NFE") {
        this.notFullEvolvedPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "LC") {
        this.littleCupPokemons.push(pokemonObj);
      }
    }
  }

  pokemons(
    search = null,
    uber = true,
    ou = true,
    uu = true,
    pu = true,
    ru = true,
    nu = true,
    nfe = true,
    lc = true
  ) {
    let allPokemons = [];

    if (uber) {
      allPokemons.push(...this.uberPokemons);
    }

    if (ou) {
      allPokemons.push(...this.overUsedPokemons);
    }

    if (uu) {
      allPokemons.push(...this.underUsedPokemons);
    }

    if (pu) {
      allPokemons.push(...this.puPokemons);
    }

    if (ru) {
      allPokemons.push(...this.rareUsedPokemons);
    }

    if (nu) {
      allPokemons.push(...this.neverUsedPokemons);
    }

    if (nfe) {
      allPokemons.push(...this.notFullEvolvedPokemons);
    }

    if (lc) {
      allPokemons.push(...this.littleCupPokemons);
    }

    if (search) {
      allPokemons = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return allPokemons.sort((a, b) => a.name.localeCompare(b.name));
  }
}
