export const sortRoutePointsByTime = (routePointA, routePointB) => {
  return ((routePointB.finishTime - routePointB.startTime) - (routePointA.finishTime - routePointA.startTime));
};
export const sortRoutePointsByPrice = (routePointA, routePointB) => {
  return routePointB.cost - routePointA.cost;
};
