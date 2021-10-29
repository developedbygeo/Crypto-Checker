import getSymbolFromCurrency from 'currency-symbol-map';
import { convertToCurrency } from './utils.js';

export default class StatsGenerator {
  constructor(image, name, id, marketCapRank, data, pair) {
    this.image = image;
    this.name = name;
    this.id = id.toUpperCase();
    this.marketCapRank = marketCapRank;
    this.data = data;
    this.pair = pair.toUpperCase();
  }

  parseData() {
    console.log(this.data);
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

  addData() {
    const { mainStats, extraStats } = this.parseData();
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
    // const currentPriceText = document.querySelector('.current-price');
    // const trendStatsText = document.querySelector('.trend-stats');
    this.addImage();
    this.addPairText();
    // this.parseData();
    this.addData();
  }
}
