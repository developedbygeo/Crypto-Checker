import { submitQuery, closeError } from './utils.js';
import getData from './api.js';
import ChartGenerator from './chartGenerator.js';
import StatsGenerator from './statsGenerator.js';

export default function enableEventListeners() {
  const searchBtn = document.querySelector('.searchBtn');
  const searchForm = document.querySelector('form');
  const searchInput = document.querySelector('#sarch-coin');
  const errorBtn = document.querySelector('.close-err');

  async function handleData(chartInfo, marketInfo, pair) {
    const {
      name,
      symbol: id,
      market_cap_rank: marketCapRank,
      image: { large: image },
      market_data: data,
      tickers,
    } = marketInfo;
    const statsGenerator = new StatsGenerator(
      image,
      name,
      id,
      marketCapRank,
      tickers,
      data,
      pair
    );
    const chartGenerator = new ChartGenerator(
      chartInfo,
      statsGenerator.parsePriceChange().trend
    );

    statsGenerator.populateDOM();
    chartGenerator.createChart();
  }

  window.addEventListener('load', async () => {
    const { tickers, chart } = await getData('bitcoin', 'usd');
    handleData(chart.prices, tickers, 'usd');
  });

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
  searchForm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
  errorBtn.addEventListener('click', closeError);
}
