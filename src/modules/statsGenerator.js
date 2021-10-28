export default class StatsGenerator {
  constructor(image, name, id, marketCapRank, data, pair) {
    this.image = image;
    this.name = name;
    this.id = id.toUpperCase();
    this.marketCapRank = marketCapRank;
    this.data = data;
    this.pair = pair.toUpperCase();
  }

  //   parseData() {}

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
  }
}
