/**
 * Configuration options for the chart.
 * @const {Object}
 */
const CONFIG_CHART_OPTIONS =  {
    scales: {
      y: {
        beginAtZero: true
      },
    },
  };

/**
 * Array of colors used for different stats in the chart.
 * @const {string[]}
 */
const color = [
  'rgba(255, 99, 132, 0.7)', // HP
'rgba(54, 162, 235, 0.7)',  // ATTACK
'rgba(255, 206, 86, 0.7)',  // DEFENSE
'rgba(75, 192, 192, 0.7)',  // SPECIAL-ATTACK
'rgba(153, 102, 255, 0.7)', // SPECIAL-DEFENSE
'rgba(255, 159, 64, 0.7)'   // SPEED
];

/**
 * Renders a polar area chart for a specific Pokémon.
 * 
 * @param {number} index - The index of the Pokémon in the pokemonDataArray.
 */
function renderChart(index) {
  let pokemon = pokemonDataArray[index];
  const stats = pokemon.stats.map(stat => stat.stat.name);
  const statsData = pokemon.stats.map(stat => stat.base_stat);

    const ctx = document.getElementById('myChart');
    document.getElementById('moves').style.display = 'none';
    ctx.style.display ='block';

    destroyChart();

    window.myChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: stats,
        datasets: [{
          label: '',
          data: statsData,
          borderWidth: 1,
          backgroundColor: color,
        }]
      },
      options: CONFIG_CHART_OPTIONS
    });
}

/**
 * Destroys the existing chart if it exists.
 */
function destroyChart() {
  if (window.myChart instanceof Chart) {
    window.myChart.destroy();
  }
}