const SPRITE_URL =
  "https://www.smogon.com/dex/media/sprites/xy/{imageName}.gif";
const GEN_5_SPRITE_URL =
  "https://play.pokemonshowdown.com/sprites/gen5/{imageName}.png";

export class Pokemon {
  /**
   * @param {string} name
   * @param {string} tier
   * @param {string} baseSpecies
   * @param {number} dexNumber
   * @param {boolean} hasEvolutions
   */
  constructor(name, tier, baseSpecies, dexNumber, hasEvolutions) {
    this._name = name;
    this._tier = tier;
    this._baseSpecies = baseSpecies;
    this._dexNumber = dexNumber;
    this._hasEvolutions = hasEvolutions;
  }

  /**
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * @returns {string}
   */
  get tier() {
    return this._tier;
  }

  /**
   * @returns {string}
   */
  get baseSpecies() {
    return this._baseSpecies;
  }

  /**
   * @returns {number}
   */
  get dexNumber() {
    return this._dexNumber;
  }

  /**
   * @returns {boolean}
   */
  get hasEvolutions() {
    return this._hasEvolutions;
  }

  /**
   * @returns {boolean}
   */
  get doesNotHaveEvolutions() {
    return !this._hasEvolutions;
  }

  /**
   * @returns {string}
   */
  imageUrl() {
    if (this.name === "Pikachu-World") {
      return GEN_5_SPRITE_URL.replace("{imageName}", "pikachu-world");
    }

    const imageName = this.name
      .toLowerCase()
      .replace("'", "")
      .split("é")
      .join("e");

    return SPRITE_URL.replace("{imageName}", imageName);
  }

  /**
   * @returns {string}
   */
  imageUrlHyphened() {
    if (this.name === "Pikachu-World") {
      return GEN_5_SPRITE_URL.replace("{imageName}", "pikachu-world");
    }

    const imageName = this.name
      .toLowerCase()
      .replace("'", "")
      .split("é")
      .join("e")
      .replace(" ", "-");

    return SPRITE_URL.replace("{imageName}", imageName);
  }
}
