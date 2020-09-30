export const getOffersByType = (offers, type) => {
  let resultOffers = null;
  if (offers.filter((offer) => offer.type === type).length > 0) {
    resultOffers = offers.filter((offer) => offer.type === type)[0];
  }

  return resultOffers;
};

const getTitlesFromOffers = (offers) => {
  return offers.map((offer) => offer.title);
};


export const isOfferChecked = (routePointsOffers, offer) => {
  const offerTitles = getTitlesFromOffers(routePointsOffers);
  return offerTitles.includes(offer.title);
};
