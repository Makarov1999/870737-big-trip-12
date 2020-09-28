import {render} from "./render.js";
import {ELEMENTS_POSITIONS} from "../const.js";
import {countRoute, countTripCost} from "./common.js";
import TripInfoView from "../view/trip-info.js";
export const renderTripInfo = (container, routePoints) => {
  const route = routePoints.length > 0 ? countRoute(routePoints) : ``;
  const tripCost = countTripCost(routePoints) ? countTripCost(routePoints) : 0;
  const tripStart = routePoints[0] ? routePoints[0].startTime : ``;
  const tripFinish = routePoints[routePoints.length - 1] ? routePoints[routePoints.length - 1].finishTime : ``;
  const tripInfoComponent = new TripInfoView(route, tripCost, tripStart, tripFinish);
  render(container, tripInfoComponent, ELEMENTS_POSITIONS.AFTERBEGIN);
};
