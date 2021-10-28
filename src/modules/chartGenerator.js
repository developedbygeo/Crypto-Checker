import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
export default class ChartGenerator {
  constructor(data) {
    this.data = data;
  }

  parseDates() {
    const datesArray = this.data.map((elem) =>
      new Date(elem[0]).toLocaleDateString()
    );
    return datesArray;
  }

  parsePrices() {
    const pricesArray = this.data.map((elem) => elem[1].toFixed(4));
    return pricesArray;
  }

  async createChart(val) {
    const chart = document.querySelector('canvas').getContext('2d');
    // destroying previous chart (if it exists)
    const chartStatus = Chart.getChart(chart);
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }
    const newChart = new Chart(chart, {
      type: 'line',
      data: {
        labels: await this.parseDates(),
        datasets: [
          {
            data: await this.parsePrices(),
            backgroundColor: '#111213ff',
            // configures the line color based on the average change provided
            borderColor: val <= 0 ? '#ff0021' : '#5cdb5c',
            borderWidth: 1.5,
            borderJoinStyle: 'round',
            pointRadius: 0,
            pointHitRadius: 15,
            pointStyle: 'circle',
            pointBackgroundColor: '#4361EE',
            lineTension: 0.25,
          },
        ],
      },
      options: {
        animations: {
          tension: {
            duration: 1000,
            delay: 100,
            easing: 'easeInOutElastic',
            from: 1,
            to: 0,
          },
        },
        callbacks: {},
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        subtitle: {
          display: false,
        },
        legend: {
          display: false,
          labels: {
            fontSize: 0,
          },
        },
        layout: {
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
              color: '#3A3D41',
            },
            ticks: {
              // filters out the prime y ticks
              callback(value, index) {
                return index % 2 === 0 ? this.getLabelForValue(value) : '';
              },
            },
          },
        },
      },
    });
    return newChart;
  }
}
