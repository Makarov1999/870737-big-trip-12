import AbstractView from "./abstract.js";
const createRoutePointListTemplate = () => {
  return (`<ul class="trip-events__list"><ul>`);
};

export default class RoutePointListView extends AbstractView {
  getTemplate() {
    return createRoutePointListTemplate();
  }
}
