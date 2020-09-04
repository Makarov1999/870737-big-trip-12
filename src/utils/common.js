export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};

export const countTripCost = (routePoints) => {
  const cost = routePoints.reduce((accumulator, routePoint) => {
    return accumulator + routePoint.cost;
  }, 0);
  return cost;
};

export const countRoute = (routePoints) => {
  const cities = routePoints.slice().map((routePoint) => routePoint.city);
  const differentCities = [];
  cities.forEach((city) => {
    if (!differentCities.includes(city)) {
      differentCities.push(city);
    }
  });
  const citiesCount = differentCities.length;
  let route = ``;
  if (differentCities.length < 4) {
    route = differentCities.slice().join(`&mdash;`);
  } else {
    route = `${differentCities[0]} &mdash;...&mdash; ${differentCities[citiesCount - 1]}`;
  }
  return route;
};
