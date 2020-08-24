export const ELEMENTS_POSITIONS = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
export const CAPTIONS_TEXT = {
  TRIP_VIEW: `Switch trip view`,
  FILTER: `Filter events`,
  EVENT: `Trip events`
};

export const ROUTE_POINT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

export const ROUTE_POINT_TYPES_FORM = {
  [`Transfer`]: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  [`Activity`]: [`Check-in`, `Sightseeing`, `Restaurant`]
};

export const ROUTE_POINT_GROUPS = [`Transfer`, `Activity`];

export const DESCRIPTIONS_TO_ROUTE_POINT = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const CITIES = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `Dublin`,
  `Moscow`
];

export const FLIGHT_OFFERS = [
  {
    name: `Add luggage`,
    cost: 30
  },
  {
    name: `Switch to comfort class`,
    cost: 100
  },
  {
    name: `Add meal`,
    cost: 15
  },
  {
    name: `Choose seats`,
    cost: 5
  }
];

export const TAXI_OFFERS = [
  {
    name: `Add baby chair`,
    cost: 5
  },
  {
    name: `Switch to comfort class`,
    cost: 10
  },
];

export const TRAIN_OFFERS = [
  {
    name: `Add meal`,
    cost: 15
  },
  {
    name: `Switch to comfort class`,
    cost: 30
  }
];

export const SHIP_OFFERS = [
  {
    name: `Switch to comfort class`,
    cost: 50
  },
  {
    name: `Add meal`,
    cost: 15
  },
  {
    name: `Choose seats`,
    cost: 5
  }
];

export const BUS_OFFERS = [
  {
    name: `Switch to comfort class`,
    cost: 20
  },
  {
    name: `Add luggage`,
    cost: 5
  }
];
