import { Pokemon } from "./pokemon.js";

export class SelectedPokemon {
  constructor() {
    this.all = [];
    this.callbacks = [];
  }

  /**
   * @param {Function} callback
   */
  onChange(callback) {
    this.callbacks.push(callback);
  }

  triggerCallbacks() {
    this.callbacks.forEach((callback) => callback(this.all));
  }

  notify() {
    this.triggerCallbacks();
  }

  /**
   * @param {Pokemon[]} item
   */
  setPokemons(pokemons) {
    this.clear();
    for (const pokemon of pokemons) {
      this.all.push(pokemon);
    }
    this.notify();
  }

  clear() {
    while (this.all.length > 0) {
      this.all.pop();
    }
  }
}
