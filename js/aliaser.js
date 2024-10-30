import { Pokemon } from "./pokemon.js";

const ALIASES = {
  Aegislash: ["Mugrón Fatal"],
  "Rotom-Wash": ["TE ODIO A MUERTE"],
  Togekiss: ["paraflincher"],
  Pikachu: ["Mata legendarios"],
  Sableye: ["Will-O-Miss"],
  Regigigas: ["Puño drenaje con gema"],
  Kecleon: ["KECLEON OP"],
  Cresselia: ["Lunaxxl99"],
};

export class Aliaser {
  constructor() {}

  /**
   * @param {Pokemon} pokemon
   * @returns {string[]}
   */
  aliasesOf(pokemon) {
    return ALIASES[pokemon.name] ?? [];
  }
}
