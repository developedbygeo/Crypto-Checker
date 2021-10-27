import { cryptoSymbol } from 'crypto-symbol';
import { closeError } from './utils.js';
const { nameLookup } = cryptoSymbol({});

function submitQuery() {
  let queryText = nameLookup(this.parentElement[0].value).toLowerCase();
  const queryPair = this.parentElement[1].value;
  if (queryText === undefined) {
    queryText = this.parentElement[0].value.toLowerCase();
  }
  return { coin: queryText, pair: queryPair };
}

export default function enableEventListeners() {
  const searchBtn = document.querySelector('.searchBtn');
  const searchForm = document.querySelector('form');
  const errorBtn = document.querySelector('.close-err');

  searchBtn.addEventListener('click', submitQuery);
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  errorBtn.addEventListener('click', closeError);
}
