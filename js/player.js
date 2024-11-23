const URLS = [
  "./assets/audio/mt-coroned-remastered.mp3",
  "./assets/audio/team-neo-plasma-remastered.mp3",
];

/**
 * @return {string}
 */
const pickRandomURL = () => {
  const randomIndex = Math.floor(Math.random() * URLS.length);
  return URLS[randomIndex];
};

export class Player {
  constructor() {
    this._audio = new Audio(pickRandomURL());
    this._audio.volume = 0.03;
  }

  /**
   * Volume from 0 to 1.
   * @param {number} value
   */
  setVolumen(value) {
    this._audio.volume = value;
  }

  /**
   * @returns {boolean}
   */
  isAtMaxVolume() {
    return this._audio.volume == 1;
  }

  /**
   * @returns {boolean}
   */
  isAtMinVolume() {
    return this._audio.volume == 0;
  }

  useNewSource() {
    this._audio.pause();
    this._audio = new Audio(pickRandomURL());
  }

  playFromBeginning() {
    this._audio.pause();
    this._audio.currentTime = 0;
    this._audio.play();
  }

  /**
   * @return {boolean}
   */
  isPlaying() {
    return !this.isNotPlaying();
  }

  /**
   * @return {boolean}
   */
  isNotPlaying() {
    return this._audio.ended || this._audio.paused;
  }

  playIfNotPlaying() {
    if (this.isNotPlaying()) {
      this.playFromBeginning();
    }
  }
}
