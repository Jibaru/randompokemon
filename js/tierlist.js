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

    /** @type {Pokemon[]} */
    this.zuPokemons = [];

    /** @type {Pokemon[]} */
    this.anythingGoesPokemons = [];

    this._load();
  }

  _load() {
    for (const pokemon in dex) {
      const pokemonObj = new Pokemon(
        dex[pokemon].name,
        dex[pokemon].tier,
        dex[pokemon].baseSpecies,
        dex[pokemon].num
      );

      if (dex[pokemon].tier == "Uber") {
        this.uberPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "OU") {
        this.overUsedPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "UU" || dex[pokemon].tier == "UUBL") {
        this.underUsedPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "PU" || dex[pokemon].tier == "PUBL") {
        this.puPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "RU" || dex[pokemon].tier == "RUBL") {
        this.rareUsedPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "NU" || dex[pokemon].tier == "NUBL") {
        this.neverUsedPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "NFE") {
        this.notFullEvolvedPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "LC") {
        this.littleCupPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "ZU" || dex[pokemon].tier == "ZUBL") {
        this.zuPokemons.push(pokemonObj);
      } else if (dex[pokemon].tier == "AG") {
        this.anythingGoesPokemons.push(pokemonObj);
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
    lc = true,
    zu = true,
    ag = true
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

    if (zu) {
      allPokemons.push(...this.zuPokemons);
    }

    if (ag) {
      allPokemons.push(...this.anythingGoesPokemons);
    }

    if (search) {
      allPokemons = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return allPokemons.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   *
   * @param {TierList} otherTierList
   * @returns {Object[]}
   */
  compareWithOtherTierList(otherTierList) {
    const pokemons = this.pokemons();
    const otherPokemons = otherTierList.pokemons();

    const differences = [];
    for (const pokemon of pokemons) {
      const otherPokemon = otherPokemons.find(
        (p) => p.name.toLowerCase() === pokemon.name.toLowerCase()
      );

      if (!otherPokemon) {
        differences.push({
          name: pokemon.name,
          tier: pokemon.tier,
          otherTier: "Not found",
        });
        continue;
      }

      if (otherPokemon && otherPokemon.tier != pokemon.tier) {
        differences.push({
          name: pokemon.name,
          tier: pokemon.tier,
          otherTier: otherPokemon.tier,
        });
      }
    }

    return differences;
  }
}
