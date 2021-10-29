import getSymbolFromCurrency from 'currency-symbol-map';
import { convertToCurrency } from './utils.js';

export default class StatsGenerator {
  constructor(image, name, id, marketCapRank, tickers, data, pair) {
    this.image = image;
    this.name = name;
    this.id = id.toUpperCase();
    this.marketCapRank = marketCapRank;
    this.tickers = tickers;
    this.data = data;
    this.pair = pair.toUpperCase();
  }

  parseCurrentPrice() {
    let currentPriceValues = this.tickers
      .filter((obj) => obj.base === this.id && obj.target === this.pair)
      .map((obj) => obj.last);
    let currentValuesLength = currentPriceValues.length;
    if (currentValuesLength === 0) {
      currentPriceValues = this.tickers
        .filter((obj) => obj.base === this.id && obj.target === 'USDT')
        .map((obj) => obj.last);
      currentValuesLength = currentPriceValues.length;
    }
    let currentValue =
      currentPriceValues.sort((a, b) => a - b).reduce((a, b) => a + b) /
      currentValuesLength;
    if (currentValue >= 1000) {
      currentValue = currentValue.toFixed(2);
    } else if (currentValue >= 1) {
      currentValue = currentValue.toFixed(4);
    } else {
      currentValue = currentValue.toFixed(6);
    }
    return currentValue;
  }

  parsePriceChange() {
    let color = '#219721';
    let icon = '<i class="fas fa-chevron-up"></i>';
    let currentPriceTrend = this.data.price_change_percentage_24h.toFixed(4);
    if (currentPriceTrend < 0) {
      icon = '<i class="fas fa-chevron-down"></i>';
      color = '#E0001E';
    }
    if (currentPriceTrend < 1000) {
      currentPriceTrend = String(currentPriceTrend.replace('.', ','));
    }
    return { trend: currentPriceTrend, icon, color };
  }

  parseMarketData() {
    // market stats
    const marketCap = convertToCurrency(
      this.data.market_cap[this.pair.toLowerCase()]
    );
    const todaysHigh = `${getSymbolFromCurrency(this.pair)}${
      this.data.high_24h[this.pair.toLowerCase()]
    }`;
    const todaysLow = `${getSymbolFromCurrency(this.pair)}${
      this.data.low_24h[this.pair.toLowerCase()]
    }`;
    const allTimeHigh = `${getSymbolFromCurrency(this.pair)}${
      this.data.ath[this.pair.toLowerCase()]
    }`;
    const allTimeLow = `${getSymbolFromCurrency(this.pair)}${
      this.data.atl[this.pair.toLowerCase()]
    }`;
    // extra market stats
    const marketVolToday = `${getSymbolFromCurrency(
      this.pair
    )}${convertToCurrency(this.data.total_volume[this.pair.toLowerCase()])}`;
    let fullyDilutedMC = `${getSymbolFromCurrency(
      this.pair
    )}${convertToCurrency(
      this.data.fully_diluted_valuation[this.pair.toLowerCase()]
    )}`;
    const circulatingSupply = convertToCurrency(this.data.circulating_supply);
    let maxSupply = convertToCurrency(this.data.max_supply);
    let totalSupply = convertToCurrency(this.data.total_supply);
    const marketRank = `#${this.data.market_cap_rank}`;

    if (fullyDilutedMC === `${getSymbolFromCurrency(this.pair)}NaN`) {
      fullyDilutedMC = 'Unavailable';
    }
    if (maxSupply === 0) {
      maxSupply = 'Unavailable';
    }
    if (totalSupply === 0) {
      totalSupply = 'Unavailable';
    }

    return {
      mainStats: { marketCap, todaysHigh, todaysLow, allTimeHigh, allTimeLow },
      extraStats: {
        marketVolToday,
        fullyDilutedMC,
        circulatingSupply,
        maxSupply,
        totalSupply,
        marketRank,
      },
    };
  }

  configureMainData() {
    // main stats
    const currentPrice = document.querySelector('.current-price');
    const currentPriceTrend = document.querySelector('.trend-stats');
    const trendContainer = document.querySelector('.trend-icon');
    currentPrice.textContent = `${getSymbolFromCurrency(
      this.pair
    )}${this.parseCurrentPrice()}`;
    currentPriceTrend.textContent = `${this.parsePriceChange().trend}%`;
    currentPriceTrend.style.color = this.parsePriceChange().color;
    trendContainer.innerHTML = this.parsePriceChange().icon;
    trendContainer.style.color = this.parsePriceChange().color;
  }

  addData() {
    const { mainStats, extraStats } = this.parseMarketData();
    // market stats
    const marketCapText = document.querySelector('.market-stats p');
    const todaysHighText = document.querySelector('.market-24h-high p');
    const todaysLowText = document.querySelector('.market-24h-low p');
    const athText = document.querySelector('.ath p');
    const atlText = document.querySelector('.atl p');
    const marketVolText = document.querySelector('.market-volume p');
    const dilutedMarketText = document.querySelector('.diluted-market p');
    const circulatingSupplyText = document.querySelector('.circulating-supp p');
    const totalSupplyText = document.querySelector('.total-supply p');
    const maxSupplyText = document.querySelector('.max-supply p');
    const marketRankText = document.querySelector('.rank p');
    marketCapText.textContent = mainStats.marketCap;
    todaysHighText.textContent = mainStats.todaysHigh;
    todaysLowText.textContent = mainStats.todaysLow;
    athText.textContent = mainStats.allTimeHigh;
    atlText.textContent = mainStats.allTimeLow;
    marketVolText.textContent = extraStats.marketVolToday;
    dilutedMarketText.textContent = extraStats.fullyDilutedMC;
    circulatingSupplyText.textContent = extraStats.circulatingSupply;
    totalSupplyText.textContent = extraStats.totalSupply;
    maxSupplyText.textContent = extraStats.maxSupply;
    marketRankText.textContent = extraStats.marketRank;
  }

  addImage() {
    const imageDiv = document.querySelector('.icon-wrapper');
    imageDiv.style.background = `url(${this.image}) center no-repeat`;
    imageDiv.style.backgroundSize = 'contain';
  }

  addPairText() {
    const pairText = document.querySelector('.pair');
    pairText.textContent = `${this.id}/${this.pair}`;
  }

  populateDOM() {
    this.configureMainData();
    this.addImage();
    this.addPairText();
    this.addData();
  }
}
