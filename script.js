let pokemonDataArray = [];
let currentIndex = 1;

async function init() {
  showLoadingScreen();
  await loadPokemons();
  hideLoadingScreen();
  renderPokemons(pokemonDataArray);
}

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

function renderPokemons(filteredPokemon) {
  let container = document.getElementById("pokedex-container");
  container.innerHTML = "";

  for (let i = 0; i < filteredPokemon.length; i++) {
    const pokemonData = filteredPokemon[i];
    const types = pokemonData.types[0].type.name;

    container.innerHTML += renderPokemonsCard(pokemonData, types, i);
  }
}

function loadMorePokemons() {
  showLoadingScreen();
  loadPokemons().then(() => {
    renderPokemons(pokemonDataArray);
    hideLoadingScreen();
  });
}

function updateLoadMoreButton() {
  if (currentIndex > 0 && currentIndex < 150) {
    document.getElementById("load-more-btn").style.display = "block";
  } else {
    document.getElementById("load-more-btn").style.display = "none";
  }
}

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

function showMoves(index) {
  let container = document.getElementById('moves');
  let pokemon = pokemonDataArray[index];
  let moves = pokemon.moves.map(move => `<span class="each-move">${move.move.name}</span>`).join(" ");

  document.getElementById('myChart').style.display = 'none';
  container.style.display ='block';

  container.innerHTML = renderMover(moves);
}

function nextPokemon(index) {
  index++;
  if(index >= pokemonDataArray.length) {
    index = 0;
  }
  pokemonDetailView(index)
}

function previousPokemon(index) {
  index--;
  if(index < 0) {
    index = pokemonDataArray.length -1;
  }
  pokemonDetailView(index)
}

function searchPokemon() {
  let search = document.getElementById('search').value.toLowerCase();
  if (search.length >= 3) {
  let filteredPokemon = pokemonDataArray.filter(pokemon => pokemon.name.toLowerCase().includes(search));
  renderPokemons(filteredPokemon);
  } else if (search.length === 0) {
    renderPokemons(pokemonDataArray);
  }
}


function doNotClose(event) {
  event.stopPropagation();
}

function closePokemonDetailView() {
  document.getElementById("pokemon-detail-view").style.display = "none";
}

function showLoadingScreen() {
  document.getElementById("loading-screen").style.display = "block";
}

function hideLoadingScreen() {
  document.getElementById("loading-screen").style.display = "none";
}
