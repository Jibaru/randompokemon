const SPRITE_URL =
  "https://www.smogon.com/dex/media/sprites/xy/{imageName}.gif";

export class Pokemon {
  /**
   * @param {string} name
   * @param {string} tier
   * @param {string} baseSpecies
   * @param {number} dexNumber
   */
  constructor(name, tier, baseSpecies, dexNumber) {
    this._name = name;
    this._tier = tier;
    this._baseSpecies = baseSpecies;
    this._dexNumber = dexNumber;
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
   * @returns {string}
   */
  imageUrl() {
    const imageName = this.name.toLowerCase().replace("'", "");

    return SPRITE_URL.replace("{imageName}", imageName);
  }

  /**
   * @returns {string}
   */
  imageUrlHyphened() {
    let imageName = this.name.toLowerCase().replace("'", "");
    imageName = imageName.replace(" ", "-");

    return SPRITE_URL.replace("{imageName}", imageName);
  }
}
