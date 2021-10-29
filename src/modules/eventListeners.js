import { submitQuery, closeError } from './utils.js';
import getData from './api.js';
import ChartGenerator from './chartGenerator.js';
import StatsGenerator from './statsGenerator.js';

export default function enableEventListeners() {
  const searchBtn = document.querySelector('.searchBtn');
  const searchForm = document.querySelector('form');
  const errorBtn = document.querySelector('.close-err');

  async function handleData(chartInfo, marketInfo, pair) {
    const {
      name,
      symbol: id,
      market_cap_rank: marketCapRank,
      image: { large: image },
      market_data: data,
    } = marketInfo;
    const statsGenerator = new StatsGenerator(
      image,
      name,
      id,
      marketCapRank,
      data,
      pair
    );
    const chartGenerator = new ChartGenerator(chartInfo);

    statsGenerator.populateDOM();
    chartGenerator.createChart(10);
  }

  searchBtn.addEventListener('click', async (e) => {
    const searchField = e.target.parentElement[0];
    if (searchField.value === '') return;
    const { coin, pair } = submitQuery(e);
    const { tickers, chart } = await getData(coin, pair);
    if (tickers === undefined || chart === undefined) return;
    handleData(chart.prices, tickers, pair);
  });
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  errorBtn.addEventListener('click', closeError);
}
