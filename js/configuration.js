export class Configuration {
  /** @type {Configuration|null} */
  static _instance = null;

  constructor() {
    this.uberChecked = true;
    this.ouChecked = true;
    this.uuChecked = true;
    this.puChecked = true;
    this.ruChecked = true;
    this.nuChecked = true;
    this.nfeChecked = true;
    this.lcChecked = true;
  }

  /**
   * @returns {Configuration|null}
   */
  static _fromLocalStorage() {
    const configString = localStorage.getItem("configuration");

    if (configString) {
      try {
        const storage = JSON.parse(configString);
        const configuration = new Configuration();

        configuration.uberChecked = storage.uberChecked;
        configuration.ouChecked = storage.ouChecked;
        configuration.uuChecked = storage.uuChecked;
        configuration.puChecked = storage.puChecked;
        configuration.ruChecked = storage.ruChecked;
        configuration.nuChecked = storage.nuChecked;
        configuration.nfeChecked = storage.nfeChecked;
        configuration.lcChecked = storage.lcChecked;

        return configuration;
      } catch (error) {
        console.warn("Error parsing configuration from local storage", error);
        return null;
      }
    }

    return null;
  }

  /**
   * @returns {Configuration}
   */
  static instance() {
    if (!Configuration._instance) {
      Configuration._instance = Configuration._fromLocalStorage();

      if (Configuration._instance) {
        return Configuration._instance;
      }

      Configuration._instance = new Configuration();
      Configuration._instance.toLocalStorage();
      return Configuration._instance;
    }

    return Configuration._instance;
  }

  toLocalStorage() {
    localStorage.setItem("configuration", JSON.stringify(this));
  }

  /** @param {boolean} checked */
  updateUberChecked(checked) {
    this.uberChecked = checked;
  }

  /** @param {boolean} checked */
  updateOuChecked(checked) {
    this.ouChecked = checked;
  }

  /** @param {boolean} checked */
  updateUuChecked(checked) {
    this.uuChecked = checked;
  }

  /** @param {boolean} checked */
  updatePuChecked(checked) {
    this.puChecked = checked;
  }

  /** @param {boolean} checked */
  updateRuChecked(checked) {
    this.ruChecked = checked;
  }

  /** @param {boolean} checked */
  updateNuChecked(checked) {
    this.nuChecked = checked;
  }

  /** @param {boolean} checked */
  updateNfeChecked(checked) {
    this.nfeChecked = checked;
  }

  /** @param {boolean} checked */
  updateLcChecked(checked) {
    this.lcChecked = checked;
  }
}
