const SPRITE_URL =
  "https://www.smogon.com/dex/media/sprites/xy/{imageName}.gif";

export class Pokemon {
  /**
   * @param {string} name
   */
  constructor(name) {
    this._name = name;
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
