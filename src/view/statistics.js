import AbstractView from "./abstract.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getMoneyChartData, getTransportChartData, getTimeChartData} from "../utils/chart.js";
import {ROUTE_POINT_TYPES_MONEY_CHART, TRANSPORT_TYPES_CHART, ROUTE_POINT_TYPES_TIME_CHART} from "../const.js";
const renderMoneyChart = (moneyCtx, routePoints) => {
  const BAR_HEIGHT = 55 * ROUTE_POINT_TYPES_MONEY_CHART.length;
  moneyCtx.height = BAR_HEIGHT;
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: ROUTE_POINT_TYPES_MONEY_CHART,
      datasets: [{
        data: getMoneyChartData(routePoints),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

};

const renderTransportChart = (transportCtx, routePoints) => {
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: TRANSPORT_TYPES_CHART,
      datasets: [{
        data: getTransportChartData(routePoints),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (timeCtx, routePoints) => {
  const BAR_HEIGHT = 55 * ROUTE_POINT_TYPES_TIME_CHART.length;
  timeCtx.height = BAR_HEIGHT;
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: ROUTE_POINT_TYPES_MONEY_CHART,
      datasets: [{
        data: getTimeChartData(routePoints),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val} H`
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

};
const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`
  );
};

export default class StatisticsView extends AbstractView {
  constructor(routePoints) {
    super();
    this._routePoints = routePoints;
    this.setCharts();
  }
  getTemplate() {
    return createStatisticsTemplate();
  }
  removeElement() {
    super.removeElement();
    if (this._moneyChart !== null || this._transportChart !== null || this._timeChart !== null) {
      this._moneyChartCart = null;
      this._transportChart = null;
      this._timeChart = null;
    }
  }
  setCharts() {
    this._moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    this._transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    this._moneyChart = renderMoneyChart(this._moneyCtx, this._routePoints);
    this._transportChart = renderTransportChart(this._transportCtx, this._routePoints);
    this._timeCtx = this.getElement().querySelector(`.statistics__chart--time`);
    this._timeChart = renderTimeChart(this._timeCtx, this._routePoints);
  }
}
