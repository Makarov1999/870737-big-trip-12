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
