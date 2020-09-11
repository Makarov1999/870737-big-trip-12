import {getRandomIntNumber, getRandomElementFromArr, getRandomBoolean} from "../utils/rand.js";
import {ROUTE_POINT_TYPES, DESCRIPTIONS_TO_ROUTE_POINT, CITIES} from "../const.js";
import {setOffers} from "./offer.js";

const getDescription = (minSentencesCount = 1, maxSentencesCount = 5, sentences) => {
  const sentencesCount = getRandomIntNumber(minSentencesCount, maxSentencesCount);
  let resultSentence = ``;
  for (let i = 0; i < sentencesCount; i++) {
    resultSentence += getRandomElementFromArr(sentences) + ` `;
  }
  return resultSentence;
};

const generatePhotosPlug = () => {
  const photosCount = getRandomIntNumber(1, 5);
  const photoPlugTemplate = `http://picsum.photos/248/152?r=${Math.random()}`;
  const photos = [];
  for (let i = 0; i < photosCount; i++) {
    photos.push(photoPlugTemplate);
  }
  return photos;
};

const getFinishDate = (startDate) => {
  const finishDate = startDate;
  finishDate.setMinutes(finishDate.getMinutes() + getRandomIntNumber(10, 45));
  finishDate.setHours(finishDate.getHours() + getRandomIntNumber(0, 6));
  return new Date(finishDate);
};

const generateId = () => {
  return Date.now() + parseInt(Math.random() * 10000, 10);
};
export const generateRoutePoint = (previousTimeFinish) => {
  const id = generateId();
  const type = getRandomElementFromArr(ROUTE_POINT_TYPES);
  const city = getRandomElementFromArr(CITIES);
  const description = getDescription(1, 5, DESCRIPTIONS_TO_ROUTE_POINT);
  const offers = setOffers(type);
  const startTime = previousTimeFinish;
  const finishTime = getFinishDate(startTime);
  const photos = generatePhotosPlug();
  const cost = getRandomIntNumber(50, 400);
  const isFavorite = getRandomBoolean();
  return {
    id,
    type,
    city,
    info: {description, photos},
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
