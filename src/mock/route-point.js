import {getRandomIntNumber, getRandomElementFromArr, getRandomBoolean} from "../utils/rand.js";
import {ROUTE_POINT_TYPES} from "../const.js";
import {setOffers} from "./offer.js";
import {DESTINATIONS} from "./destination.js";

const getFinishDate = (startDate) => {
  const finishDate = startDate;
  finishDate.setMinutes(finishDate.getMinutes() + getRandomIntNumber(10, 45));
  finishDate.setHours(finishDate.getHours() + getRandomIntNumber(0, 6));
  return new Date(finishDate);
};

export const generateId = () => {
  return Date.now() + parseInt(Math.random() * 10000, 10);
};
export const generateRoutePoint = (previousTimeFinish) => {
  const id = generateId();
  const type = getRandomElementFromArr(ROUTE_POINT_TYPES);
  const destination = getRandomElementFromArr(DESTINATIONS);
  const offers = setOffers(type);
  const startTime = previousTimeFinish;
  const finishTime = getFinishDate(startTime);
  const cost = getRandomIntNumber(50, 400);
  const isFavorite = getRandomBoolean();
  return {
    id,
    type,
    destination,
    offers,
    startTime,
    finishTime,
    cost,
    isFavorite
  };
};

export const generateRoutePoints = (count) => {
  const routePoints = [];
  let previousTime = new Date();
  for (let i = 0; i < count; i++) {
    routePoints.push(generateRoutePoint(previousTime));
    previousTime = routePoints[i].finishTime;
  }
  return routePoints;
};
