import { closeError } from './utils.js';
import { submitQuery } from './utils.js';
import getData from './api.js';
import ChartGenerator from './chartGenerator.js';

export default function enableEventListeners() {
  const searchBtn = document.querySelector('.searchBtn');
  const searchForm = document.querySelector('form');
  const errorBtn = document.querySelector('.close-err');

  searchBtn.addEventListener('click', async (e) => {
    const { coin, pair } = await submitQuery(e);
    const { tickers, chart } = await getData(coin, pair);
    const chartGenerator = new ChartGenerator(chart.prices);
    chartGenerator.parsePrices();
    chartGenerator.parseDates();
  });
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  errorBtn.addEventListener('click', closeError);
}
