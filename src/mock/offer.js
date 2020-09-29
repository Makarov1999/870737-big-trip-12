import {getRandomIntNumber} from "../utils/rand.js";

export const OFFERS = [
  {
    type: `taxi`,
    offers: [
      {
        title: `Add baby chair`,
        price: 5,
      },
      {
        title: `Switch to comfort class`,
        price: 10,
      }
    ]
  },
  {
    type: `flight`,
    offers: [
      {
        title: `Add luggage`,
        price: 30
      },
      {
        title: `Switch to comfort class`,
        price: 100
      },
      {
        title: `Add meal`,
        price: 15
      },
      {
        title: `Choose seats`,
        price: 5
      }
    ]
  },
  {
    type: `train`,
    offers: [
      {
        title: `Add meal`,
        price: 15
      },
      {
        title: `Switch to comfort class`,
        price: 20
      }
    ]
  },
  {
    type: `ship`,
    offers: [
      {
        title: `Switch to comfort class`,
        price: 25
      },
      {
        title: `Add meal`,
        price: 40
      }
    ]
  },
  {
    type: `bus`,
    offers: [
      {
        title: `Switch to comfort class`,
        price: 20
      },
      {
        title: `Add luggage`,
        price: 10
      }
    ]
  },
  {
    type: `check-in`,
    offers: [
      {
        title: `Book 5 stars hotel`,
        price: 100
      },
      {
        title: `Add SPA`,
        price: 30
      }
    ]
  }
];

const getSomeOffers = (offers) => {
  const count = getRandomIntNumber(0, offers.length);
  const resultOffers = [];
  for (let i = 0; i < count; i++) {
    resultOffers.push(offers[i]);
  }
  return resultOffers;
};

export const getOffersByType = (offers, type) => {
  let resultOffers = null;
  if (offers.filter((offer) => offer.type === type).length > 0) {
    resultOffers = offers.filter((offer) => offer.type === type)[0];
  }

  return resultOffers;
};
export const setOffers = (allOffers, routePointType) => {
  const offers = allOffers.filter((offer) => offer.type === routePointType);
  if (offers.length === 0) {
    return [];
  } else {
    return getSomeOffers(offers[0].offers);
  }
};
const getTitlesFromOffers = (offers) => {
  return offers.map((offer) => offer.title);
};


export const isOfferChecked = (routePointsOffers, offer) => {
  const offerTitles = getTitlesFromOffers(routePointsOffers);
  return offerTitles.includes(offer.title);
};
