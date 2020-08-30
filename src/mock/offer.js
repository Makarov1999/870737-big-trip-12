import {getRandomBoolean} from "../utils/rand.js";

const FLIGHT_OFFERS = [
  {
    name: `Add luggage`,
    cost: 30,
    isChecked: getRandomBoolean()
  },
  {
    name: `Switch to comfort class`,
    cost: 100,
    isChecked: getRandomBoolean()
  },
  {
    name: `Add meal`,
    cost: 15,
    isChecked: getRandomBoolean()
  },
  {
    name: `Choose seats`,
    cost: 5,
    isChecked: getRandomBoolean()
  }
];

const TAXI_OFFERS = [
  {
    name: `Add baby chair`,
    cost: 5,
    isChecked: getRandomBoolean()
  },
  {
    name: `Switch to comfort class`,
    cost: 10,
    isChecked: getRandomBoolean()
  },
];

const TRAIN_OFFERS = [
  {
    name: `Add meal`,
    cost: 15,
    isChecked: getRandomBoolean()
  },
  {
    name: `Switch to comfort class`,
    cost: 30,
    isChecked: getRandomBoolean()
  }
];

const SHIP_OFFERS = [
  {
    name: `Switch to comfort class`,
    cost: 50,
    isChecked: getRandomBoolean()
  },
  {
    name: `Add meal`,
    cost: 15,
    isChecked: getRandomBoolean()
  },
  {
    name: `Choose seats`,
    cost: 5,
    isChecked: getRandomBoolean()
  }
];

const BUS_OFFERS = [
  {
    name: `Switch to comfort class`,
    cost: 20,
    isChecked: getRandomBoolean()
  },
  {
    name: `Add luggage`,
    cost: 5,
    isChecked: getRandomBoolean()
  }
];

const CHECK_IN_OFFERS = [
  {
    name: `Book 5 stars hotel`,
    cost: 100,
    isChecked: getRandomBoolean()
  },
  {
    name: `Add Spa`,
    cost: 30,
    isChecked: getRandomBoolean()
  }
];
export const setOffers = (routePointType) => {
  let offers = [];
  switch (routePointType) {
    case `Flight`:
      offers = FLIGHT_OFFERS.slice();
      break;
    case `Taxi`:
      offers = TAXI_OFFERS.slice();
      break;
    case `Train`:
      offers = TRAIN_OFFERS.slice();
      break;
    case `Ship`:
      offers = SHIP_OFFERS.slice();
      break;
    case `Bus`:
      offers = BUS_OFFERS.slice();
      break;
    case `Check-in`:
      offers = CHECK_IN_OFFERS.slice();
      break;
    default: offers = [];
  }
  return offers;
};
