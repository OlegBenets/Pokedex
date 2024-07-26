/**
 * Array to hold Pokémon data.
 * @type {Object[]}
 */
let pokemonDataArray = [];

/**
 * Index to keep track of the current loading position.
 * @type {number}
 */
let currentIndex = 1;

/**
 * Initializes the application by showing the loading screen, loading Pokémon data,
 * and rendering the Pokémon cards.
 */
async function init() {
  showLoadingScreen();
  await loadPokemons();
  hideLoadingScreen();
  renderPokemons(pokemonDataArray);
}

/**
 * Loads Pokémon data from the API and updates the global pokemonDataArray.
 */
async function loadPokemons() {
  showLoadingScreen();
  const step = 25;

  for (let i = currentIndex; i <= currentIndex - 1 + step; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    pokemonDataArray.push(responseAsJson);
  }
  currentIndex += step;
  updateLoadMoreButton();
  hideLoadingScreen();
}

/**
 * Renders Pokémon cards in the container element.
 *
 * @param {Object[]} filteredPokemon - Array of Pokémon data to render.
 */
function renderPokemons(filteredPokemon) {
  let container = document.getElementById("pokedex-container");
  container.innerHTML = "";

  for (let i = 0; i < filteredPokemon.length; i++) {
    const pokemonData = filteredPokemon[i];
    const types = pokemonData.types[0].type.name;

    container.innerHTML += renderPokemonsCard(pokemonData, types, i);
  }
}

/**
 * Loads more Pokémon data and renders the updated list.
 */
function loadMorePokemons() {
  showLoadingScreen();
  loadPokemons().then(() => {
    renderPokemons(pokemonDataArray);
    hideLoadingScreen();
  });
}

/**
 * Updates the visibility of the "Load More" button based on the current index.
 */
function updateLoadMoreButton() {
  if (currentIndex > 0 && currentIndex < 150) {
    document.getElementById("load-more-btn").style.display = "block";
  } else {
    document.getElementById("load-more-btn").style.display = "none";
  }
}

/**
 * Displays the detailed view of a specific Pokémon.
 *
 * @param {number} index - The index of the Pokémon in the pokemonDataArray.
 */
function pokemonDetailView(index) {
  let pokemon = pokemonDataArray[index];
  let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  let type = pokemon.types[0].type.name;
  let img = pokemon.sprites.other.dream_world.front_default;

  let clickedPokemon = document.getElementById("pokemon-detail-view");
  clickedPokemon.style.display = "block";

  clickedPokemon.innerHTML = renderPokemonData(type, name, img, index);
  showMoves(index);
  renderChart(index);
}

/**
 * Displays the moves of a specific Pokémon.
 *
 * @param {number} index - The index of the Pokémon in the pokemonDataArray.
 */
function showMoves(index) {
  let container = document.getElementById('moves');
  let pokemon = pokemonDataArray[index];
  let moves = pokemon.moves.map(move => `<span class="each-move">${move.move.name}</span>`).join(" ");

  document.getElementById('myChart').style.display = 'none';
  container.style.display ='block';

  container.innerHTML = renderMover(moves);
}

/**
 * Displays the next Pokémon in the detailed view.
 *
 * @param {number} index - The current index of the Pokémon in the pokemonDataArray.
 */
function nextPokemon(index) {
  index++;
  if(index >= pokemonDataArray.length) {
    index = 0;
  }
  pokemonDetailView(index)
}

/**
 * Displays the previous Pokémon in the detailed view.
 *
 * @param {number} index - The current index of the Pokémon in the pokemonDataArray.
 */
function previousPokemon(index) {
  index--;
  if(index < 0) {
    index = pokemonDataArray.length -1;
  }
  pokemonDetailView(index)
}

/**
 * Filters and renders Pokémon based on the search input.
 */
function searchPokemon() {
  let search = document.getElementById('search').value.toLowerCase();
  if (search.length >= 3) {
  let filteredPokemon = pokemonDataArray.filter(pokemon => pokemon.name.toLowerCase().includes(search));
  renderPokemons(filteredPokemon);
  } else if (search.length === 0) {
    renderPokemons(pokemonDataArray);
  }
}

/**
 * Prevents the event from propagating to parent elements.
 *
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * Closes the Pokémon detailed view.
 */
function closePokemonDetailView() {
  document.getElementById("pokemon-detail-view").style.display = "none";
}

/**
 * Shows the loading screen.
 */
function showLoadingScreen() {
  document.getElementById("loading-screen").style.display = "block";
}

/**
 * Hides the loading screen.
 */
function hideLoadingScreen() {
  document.getElementById("loading-screen").style.display = "none";
}
