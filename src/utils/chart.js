import moment from "moment";
import {ROUTE_POINT_TYPES, ROUTE_POINT_TYPES_FORM} from "../const.js";
export const getMoneyChartData = (routePoints) => {
  const routePointsCostValues = [];
  ROUTE_POINT_TYPES.forEach((type)=> {
    const sumOnTypeOfPoint = routePoints.filter((routePoint) => routePoint.type === type).reduce((typeSum, point) => typeSum + point.cost, 0);
    routePointsCostValues.push(sumOnTypeOfPoint);
  });
  return routePointsCostValues;
};

export const getTransportChartData = (routePoints) => {
  const routePointsTransportValues = [];
  ROUTE_POINT_TYPES_FORM[`Transfer`].forEach((transportType) => {
    const amoutTransport = routePoints.filter((routePoint) => routePoint.type === transportType.toLowerCase()).length;
    routePointsTransportValues.push(amoutTransport);
  });
  return routePointsTransportValues;
};

export const getTimeChartData = (routePoints) => {
  const routePointsTimesValues = [];
  ROUTE_POINT_TYPES.forEach((type) => {
    const sumOfTimePoint = routePoints
    .filter((routePoint) => routePoint.type === type)
    .reduce((typeSum, point) => {
      const dateStart = moment(point.startTime);
      const dateFinish = moment(point.finishTime);
      return typeSum + dateFinish.diff(dateStart, `hours`);
    }, 0);
    routePointsTimesValues.push(sumOfTimePoint);
  });
  return routePointsTimesValues;
};
