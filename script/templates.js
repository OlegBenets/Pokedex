/**
 * Renders an HTML card for a specific Pokémon.
 *
 * @param {Object} pokemonData - The data of the Pokémon.
 * @param {string} types - The type of the Pokémon.
 * @param {number} i - The index of the Pokémon.
 * @returns {string} The HTML string for the Pokémon card.
 */
function renderPokemonsCard(pokemonData, types, i) {
  return /*html*/ `
    <div class="pokemon-card ${types}" id="pokemon-card-${i}" onclick="pokemonDetailView(${i})">
     <div class="pokemon-id-name">
     <h3 class="pokemon-name">${
       pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
        <p class="pokemon-id">#${pokemonData.id.toString().padStart(3, "0")}</p>
     </div>
        <div class="pokemon-abilities">
            ${pokemonData.abilities.map((ability) =>`<span class="ability">${ability.ability.name}</span>`).join("")}
        </div>
        <span class="pokemon-type">${types.toUpperCase()}</span>
        <img class="pokemon-image" src="${
          pokemonData.sprites.other.dream_world.front_default
        }" alt="${pokemonData.name}">
        <img class="background-image" src="../image/cinema.png">
        </div>
`;
}

/**
 * Renders the detailed view for a specific Pokémon.
 *
 * @param {string} type - The type of the Pokémon.
 * @param {string} name - The name of the Pokémon.
 * @param {string} img - The image URL of the Pokémon.
 * @param {number} index - The index of the Pokémon.
 * @returns {string} The HTML string for the detailed Pokémon view.
 */
function renderPokemonData(type, name, img, index) {
  return /*html*/ `
    <div class="main-card" onclick="closePokemonDetailView()">
      <button class="left-arrow" onclick="previousPokemon(${index}); doNotClose(event)"><</button>
      <button class="right-arrow" onclick="nextPokemon(${index}); doNotClose(event)">></button>
      <div class="card" onclick="doNotClose(event)">  
       <div class="pokemon-img ${type}">
         <p onclick="closePokemonDetailView()">X</p>
         <h3>${name}</h3>
         <span class="pokemon-type-detail">${type.toUpperCase()}</span>
        <img class="pokemon-image-detail" src="${img}">
        <img class="background-image-detail" src="../image/cinema.png">
       </div>
      <div class="pokemon-datas">
        <div class="data-category">
          <button class="${type}" onclick="renderChart(${index})">stats</button>
          <button class=" ${type}" onclick="showMoves(${index})">moves</button>
        </div>
        <div class="category">
      <canvas id="myChart"></canvas>
      <div id="moves"></div>
      </div>
       </div>
     </div>
     </div>
     </div>
     `;
}

/**
 * Renders the moves of a Pokémon.
 *
 * @param {string} moves - The HTML string of the Pokémon's moves.
 * @returns {string} The HTML string for the Pokémon's moves container.
 */
function renderMover(moves) {
  return /*html*/ `
  <div class="moves-container">${moves}</div>
  `;
}