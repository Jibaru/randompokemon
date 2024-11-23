import { Configuration } from "./configuration.js";
import { ExcelGenerator } from "./excel.js";
import { RandomPokemonGenerator } from "./generator.js";
import { Player } from "./player.js";
import { SelectedPokemon } from "./selected-pokemon.js";
import { TierList } from "./tierlist.js";

/** @type {HTMLFormElement} */
const form = document.querySelector("#form");
/** @type {HTMLFormElement} */
const exportBtn = document.querySelector("#export-btn");
/** @type {HTMLFormElement} */
const copyBtn = document.querySelector("#copy-btn");
/** @type {HTMLFormElement} */
const volumeBtn = document.querySelector("#volume-btn");
/** @type {HTMLElement} */
const alertElement = document.querySelector("#alert");
/** @type {HTMLFormElement} */
const agCheckbox = document.querySelector("#ag");
/** @type {HTMLFormElement} */
const uberCheckbox = document.querySelector("#uber");
/** @type {HTMLFormElement} */
const ouCheckbox = document.querySelector("#ou");
/** @type {HTMLFormElement} */
const uuCheckbox = document.querySelector("#uu");
/** @type {HTMLFormElement} */
const puCheckbox = document.querySelector("#pu");
/** @type {HTMLFormElement} */
const ruCheckbox = document.querySelector("#ru");
/** @type {HTMLFormElement} */
const nuCheckbox = document.querySelector("#nu");
/** @type {HTMLFormElement} */
const zuCheckbox = document.querySelector("#zu");
/** @type {HTMLFormElement} */
const nfeCheckbox = document.querySelector("#nfe");
/** @type {HTMLFormElement} */
const lcCheckbox = document.querySelector("#lc");
/** @type {HTMLFormElement} */
const differentSpeciesCheckbox = document.querySelector("#different-species");
/** @type {HTMLFormElement} */
const noPreEvolutionsCheckbox = document.querySelector("#no-pre-evolutions");
/** @type {HTMLFormElement} */
const numberOfPokemonsInput = document.querySelector("#number-of-pokemons");

const tierList = new TierList();
const generator = new RandomPokemonGenerator(tierList);
const config = Configuration.instance();
const player = new Player();
const excelGenerator = new ExcelGenerator();
const currentPokemon = new SelectedPokemon();
currentPokemon.onChange((pokemonList) => {
  copyBtn.style.display = "block";
});

const updateConfigurationFromForm = () => {
  /** @type {boolean} */
  const agChecked = agCheckbox.checked;
  /** @type {boolean} */
  const uberChecked = uberCheckbox.checked;
  /** @type {boolean} */
  const ouChecked = ouCheckbox.checked;
  /** @type {boolean} */
  const uuChecked = uuCheckbox.checked;
  /** @type {boolean} */
  const puChecked = puCheckbox.checked;
  /** @type {boolean} */
  const ruChecked = ruCheckbox.checked;
  /** @type {boolean} */
  const nuChecked = nuCheckbox.checked;
  /** @type {boolean} */
  const zuChecked = zuCheckbox.checked;
  /** @type {boolean} */
  const nfeChecked = nfeCheckbox.checked;
  /** @type {boolean} */
  const lcChecked = lcCheckbox.checked;
  /** @type {boolean} */
  const differentSpeciesChecked = differentSpeciesCheckbox.checked;
  /** @type {boolean} */
  const noPreEvolutionsChecked = noPreEvolutionsCheckbox.checked;
  /** @type {number} */
  const numberOfPokemons = parseInt(numberOfPokemonsInput.value) ?? 6;

  config.updateAgChecked(agChecked);
  config.updateUberChecked(uberChecked);
  config.updateOuChecked(ouChecked);
  config.updateUuChecked(uuChecked);
  config.updatePuChecked(puChecked);
  config.updateRuChecked(ruChecked);
  config.updateNuChecked(nuChecked);
  config.updateZuChecked(zuChecked);
  config.updateNfeChecked(nfeChecked);
  config.updateLcChecked(lcChecked);
  config.updateDifferentSpeciesChecked(differentSpeciesChecked);
  config.updateNoPreEvolutionsChecked(noPreEvolutionsChecked);
  config.updateNumberOfPokemons(numberOfPokemons);
  config.toLocalStorage();
};

const loadConfigurationToForm = () => {
  agCheckbox.checked = config.agChecked;
  uberCheckbox.checked = config.uberChecked;
  ouCheckbox.checked = config.ouChecked;
  uuCheckbox.checked = config.uuChecked;
  puCheckbox.checked = config.puChecked;
  ruCheckbox.checked = config.ruChecked;
  nuCheckbox.checked = config.nuChecked;
  zuCheckbox.checked = config.zuChecked;
  nfeCheckbox.checked = config.nfeChecked;
  lcCheckbox.checked = config.lcChecked;
  differentSpeciesCheckbox.checked = config.differentSpeciesChecked;
  noPreEvolutionsCheckbox.checked = config.noPreEvolutionsChecked;
  numberOfPokemonsInput.value = config.numberOfPokemons.toString();
};

document.addEventListener("DOMContentLoaded", () => {
  loadConfigurationToForm();
  copyBtn.style.display = "none";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  alertElement.style.display = "none";
  copyBtn.style.display = "none";

  /** @type {boolean} */
  const agChecked = agCheckbox.checked;
  /** @type {boolean} */
  const uberChecked = uberCheckbox.checked;
  /** @type {boolean} */
  const ouChecked = ouCheckbox.checked;
  /** @type {boolean} */
  const uuChecked = uuCheckbox.checked;
  /** @type {boolean} */
  const puChecked = puCheckbox.checked;
  /** @type {boolean} */
  const ruChecked = ruCheckbox.checked;
  /** @type {boolean} */
  const nuChecked = nuCheckbox.checked;
  /** @type {boolean} */
  const zuChecked = zuCheckbox.checked;
  /** @type {boolean} */
  const nfeChecked = nfeCheckbox.checked;
  /** @type {boolean} */
  const lcChecked = lcCheckbox.checked;
  /** @type {boolean} */
  const differentSpeciesChecked = differentSpeciesCheckbox.checked;
  /** @type {boolean} */
  const noPreEvolutionsChecked = noPreEvolutionsCheckbox.checked;
  /** @type {number} */
  const numberOfPokemons = parseInt(numberOfPokemonsInput.value) ?? 6;

  updateConfigurationFromForm();

  const selectedPokemons = generator.generate(
    numberOfPokemons,
    agChecked,
    uberChecked,
    ouChecked,
    uuChecked,
    puChecked,
    ruChecked,
    nuChecked,
    zuChecked,
    nfeChecked,
    lcChecked,
    differentSpeciesChecked,
    noPreEvolutionsChecked
  );

  if (selectedPokemons.length === 0) {
    alertElement.textContent = "There is no pokemon to generate.";
    alertElement.style.display = "block";
    return;
  }

  currentPokemon.setPokemons(selectedPokemons);

  /** @type {HTMLElement} */
  const ul = document.querySelector("#pokemon-list");
  ul.innerHTML = "";

  for (const pokemon of selectedPokemons) {
    const li = document.createElement("li");
    const nameSpan = document.createElement("span");
    const tierSpan = document.createElement("span");
    const img = document.createElement("img");

    nameSpan.textContent = pokemon.name;
    tierSpan.textContent = pokemon.tier;
    tierSpan.classList.add("tier");

    if (pokemon.aliases.length > 0) {
      nameSpan.textContent += ` (${pokemon.aliases})`;
    }

    img.src = pokemon.imageUrl();
    const imageUrlHyphened = pokemon.imageUrlHyphened();
    img.onerror = function () {
      img.src = imageUrlHyphened;
    };
    img.alt = pokemon.name;

    li.appendChild(nameSpan);
    li.appendChild(tierSpan);
    li.prepend(img);
    ul.appendChild(li);
  }

  player.playIfNotPlaying();
});

exportBtn.addEventListener("click", () => {
  /** @type {boolean} */
  const agChecked = agCheckbox.checked;
  /** @type {boolean} */
  const uberChecked = uberCheckbox.checked;
  /** @type {boolean} */
  const ouChecked = ouCheckbox.checked;
  /** @type {boolean} */
  const uuChecked = uuCheckbox.checked;
  /** @type {boolean} */
  const puChecked = puCheckbox.checked;
  /** @type {boolean} */
  const ruChecked = ruCheckbox.checked;
  /** @type {boolean} */
  const nuChecked = nuCheckbox.checked;
  /** @type {boolean} */
  const zuChecked = zuCheckbox.checked;
  /** @type {boolean} */
  const nfeChecked = nfeCheckbox.checked;
  /** @type {boolean} */
  const lcChecked = lcCheckbox.checked;
  /** @type {boolean} */
  const noPreEvolutionsChecked = noPreEvolutionsCheckbox.checked;

  updateConfigurationFromForm();

  const selectedPokemons = generator.pokemonList(
    agChecked,
    uberChecked,
    ouChecked,
    uuChecked,
    puChecked,
    ruChecked,
    nuChecked,
    zuChecked,
    nfeChecked,
    lcChecked,
    noPreEvolutionsChecked
  );

  excelGenerator.generate(selectedPokemons);
});

copyBtn.addEventListener("click", () => {
  const pokemonNames = currentPokemon.all.map((pokemon) => pokemon.name);
  const content = pokemonNames.join("\n\n");
  const title = pokemonNames.join(", ");

  navigator.clipboard
    .writeText(content)
    .then(() => {
      alert(`Team [${title}] copied to clipboard!`);
    })
    .catch((err) => {
      console.error("Error copying to clipboard: ", err);
    });
});

volumeBtn.addEventListener("click", () => {
  if (player.isAtMinVolume()) {
    player.setVolumen(0.03);
    volumeBtn.textContent = "🔊";
  } else {
    player.setVolumen(0);
    volumeBtn.textContent = "🔇";
  }
});
