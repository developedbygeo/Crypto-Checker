import { handleError } from './utils.js';

export default async function getData(coin, pair) {
  const urlTickers = `https://api.coingecko.com/api/v3/coins/${coin}?tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`;
  const urlChart = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${pair}&days=365&interval=daily`;
  try {
    const response = await Promise.all([fetch(urlTickers), fetch(urlChart)], {
      mode: 'cors',
    });
    const finalData = await Promise.all(
      response.map((res) =>
        !res.ok ? handleError(`${coin} not found`) : res.json()
      )
    );
    return { tickers: finalData[0], chart: finalData[1] };
  } catch (error) {
    handleError();
    return null;
  }
}
