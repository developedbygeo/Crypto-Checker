import { cryptoSymbol } from 'crypto-symbol';

const { nameLookup } = cryptoSymbol({});

function closeError() {
  const errorDiv = this.parentElement.parentElement;
  errorDiv.classList.toggle('error-wrapper-active');
}
function handleError(err = '') {
  const errorDiv = document.querySelector('.error-wrapper');
  const errorMsg = document.querySelector('.error-msg');
  if (err !== '') {
    errorMsg.textContent = err;
  } else {
    errorMsg.textContent = 'Something went wrong!';
  }
  errorDiv.classList.add('error-wrapper-active');
}
function submitQuery(e) {
  const queryPair = e.target.parentElement[1].value;
  let queryText = nameLookup(e.target.parentElement[0].value);
  if (queryText === undefined) {
    queryText = e.target.parentElement[0].value;
  }
  return { coin: queryText.toLowerCase(), pair: queryPair };
}
function convertToCurrency(value) {
  let str;
  // Evaluation
  if (Number(value) >= 1.0e12) {
    str = `${(Math.abs(Number(value)) / 1.0e12).toFixed(2)}T`;
  } else if (Number(value) >= 1.0e9) {
    str = `${(Math.abs(Number(value)) / 1.0e9).toFixed(2)}B`;
  } else if (Number(value) >= 1.0e6) {
    str = `${(Math.abs(Number(value)) / 1.0e9).toFixed(2)}B`;
  } else if (Number(value) >= 1.0e3) {
    str = `${(Math.abs(Number(value)) / 1.0e3).toFixed(2)}K`;
  } else if (Number.isNaN(value)) {
    str = `Unavailable`;
  } else {
    str = Math.abs(Number(value));
  }
  return str;
}

export { closeError, handleError, submitQuery, convertToCurrency };
