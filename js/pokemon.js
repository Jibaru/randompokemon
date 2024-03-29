const SPRITE_URL =
  "https://www.smogon.com/dex/media/sprites/xy/{imageName}.gif";

export class Pokemon {
  /**
   * @param {string} name
   * @param {string} tier
   */
  constructor(name, tier) {
    this._name = name;
    this._tier = tier;
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
  imageUrl() {
    const imageName = this.name.toLowerCase();

    return SPRITE_URL.replace("{imageName}", imageName);
  }

  /**
   * @returns {string}
   */
  imageUrlHyphened() {
    let imageName = this.name.toLowerCase();
    imageName = imageName.replace(" ", "-");

    return SPRITE_URL.replace("{imageName}", imageName);
  }
}
