import { Pokemon } from "../../js/pokemon.js";
import { TierList } from "../../js/tierlist.js";

const pokemonTable = document.querySelector("#pokemons");
const filterForm = document.querySelector("#filter-form");

const tierList = new TierList();

/**
 * @param {Pokemon[]} pokemons
 */
const renderPokemons = (pokemons) => {
  for (const pokemon of pokemons) {
    /** @type {HTMLTableRowElement} */
    const row = document.createElement("tr");
    /** @type {HTMLTableCellElement} */
    const spriteCell = document.createElement("td");
    /** @type {HTMLTableCellElement} */
    const nameCell = document.createElement("td");
    /** @type {HTMLTableCellElement} */
    const tierCell = document.createElement("td");

    const img = document.createElement("img");

    nameCell.textContent = pokemon.name;
    img.src = pokemon.imageUrl();
    const imageUrlHyphened = pokemon.imageUrlHyphened();
    img.onerror = function () {
      img.src = imageUrlHyphened;
    };

    spriteCell.appendChild(img);
    tierCell.textContent = pokemon.tier;

    row.appendChild(spriteCell);
    row.appendChild(nameCell);
    row.appendChild(tierCell);

    pokemonTable.appendChild(row);
  }
};

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const search = event.target.search.value;
  const uber = event.target.uber.checked;
  const ou = event.target.ou.checked;
  const uu = event.target.uu.checked;
  const pu = event.target.pu.checked;
  const ru = event.target.ru.checked;
  const nu = event.target.nu.checked;
  const nfe = event.target.nfe.checked;
  const lc = event.target.lc.checked;

  const pokemons = tierList.pokemons(search, uber, ou, uu, pu, ru, nu, nfe, lc);

  pokemonTable.innerHTML = "";
  renderPokemons(pokemons);
});
