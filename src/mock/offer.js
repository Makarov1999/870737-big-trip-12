import {getRandomBoolean} from "../utils/rand.js";

const OFFERS = {
  [`Taxi`]: [
    {
      name: `Add baby chair`,
      cost: 5,
      isChecked: getRandomBoolean()
    },
    {
      name: `Switch to comfort class`,
      cost: 10,
      isChecked: getRandomBoolean()
    }
  ],
  [`Flight`]: [
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
  ],
  [`Train`]: [
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
  ],
  [`Ship`]: [
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
  ],
  [`Bus`]: [
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
  ],
  [`Check-in`]: [
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
  ]
};

export const setOffers = (routePointType) => {
  return OFFERS[routePointType] ? OFFERS[routePointType] : [];
};
