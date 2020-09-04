export const sortRoutePointsByTime = (routePointA, routePointB) => {
  return ((routePointA.finishTime - routePointA.startTime) - (routePointB.finishTime - routePointB.startTime));
};
export const sortRoutePointsByPrice = (routePointA, routePointB) => {
  return routePointA.cost - routePointB.cost;
};
