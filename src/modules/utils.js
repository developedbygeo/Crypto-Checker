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
async function submitQuery(e) {
  const queryPair = e.target.parentElement[1].value;
  let queryText = nameLookup(e.target.parentElement[0].value);
  if (queryText == undefined) {
    queryText = e.target.parentElement[0].value;
  }
  return { coin: queryText.toLowerCase(), pair: queryPair };
}

export { closeError, handleError, submitQuery };
