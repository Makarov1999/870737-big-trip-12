import {generateRoutePoints} from "./mock/route-point.js";
import Trip from "./presenter/trip.js";

const routePoints = generateRoutePoints(15);
const mainTripBlock = document.querySelector(`.trip-main`);
const mainTripFilterContainer = mainTripBlock.querySelector(`.trip-controls`);
const eventsTripContainer = document.querySelector(`.trip-events`);

const trip = new Trip(mainTripBlock, mainTripFilterContainer, eventsTripContainer);
trip.init(routePoints);
