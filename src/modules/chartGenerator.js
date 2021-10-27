export default class ChartGenerator {
  constructor(data) {
    this.data = data;
  }
  parseDates() {
    console.log(this.data);
    const datesArray = this.data.map((elem) =>
      new Date(elem[0]).toLocaleDateString()
    );
    return datesArray;
  }
  parsePrices() {
    const pricesArray = this.data.map((elem) => elem[1].toFixed(4));
    return pricesArray;
  }
}
