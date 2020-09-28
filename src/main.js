import {generateRoutePoints} from "./mock/route-point.js";
import Trip from "./presenter/trip.js";
import Points from "./model/points.js";
import Filter from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import MainMenuView from "./view/main-menu.js";
import NewEventButtonView from "./view/new-event-button.js";
import {renderTripInfo} from "./utils/trip-info.js";
import {render, remove} from "./utils/render.js";
import StatisticsView from "./view/statistics.js";
import {ELEMENTS_POSITIONS, MenuItem, FilterType, UpdateType} from "./const.js";
const routePoints = generateRoutePoints(15);
const points = new Points();
const filter = new Filter();
const mainMenuComponent = new MainMenuView();
const newEventButtonComponent = new NewEventButtonView();
const mainBodyElement = document.querySelector(`.page-main .page-body__container`);
const mainTripBlock = document.querySelector(`.trip-main`);
const mainTripFilterContainer = mainTripBlock.querySelector(`.trip-controls`);
const eventsTripContainer = document.querySelector(`.trip-events`);
const filterPresenter = new FilterPresenter(mainTripFilterContainer, filter, points);
const trip = new Trip(mainTripBlock, mainTripFilterContainer, eventsTripContainer, points, filter);
const handleNewPointFormClose = () => {
  mainMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`).disabled = false;
  newEventButtonComponent.getElement().disabled = false;
  mainMenuComponent.setMenuItem(MenuItem.TABLE);
};
let statisticsComponent = null;
const handleMainMenuChange = (menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_EVENT:
      mainMenuComponent.setMenuItem(MenuItem.TABLE);
      remove(statisticsComponent);
      trip.destroy();
      filter.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      trip.init();
      trip.createRoutePoint(handleNewPointFormClose);
      mainMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`).disabled = true;
      newEventButtonComponent.getElement().disabled = true;
      break;
    case MenuItem.TABLE:
      mainMenuComponent.setMenuItem(MenuItem.TABLE);
      trip.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      mainMenuComponent.setMenuItem(MenuItem.STATS);
      trip.destroy();
      statisticsComponent = new StatisticsView(points.getPoints());
      render(mainBodyElement, statisticsComponent, ELEMENTS_POSITIONS.BEFOREEND);
      break;
  }
};
points.setPoints(routePoints);
render(mainTripBlock, newEventButtonComponent, ELEMENTS_POSITIONS.BEFOREEND);
render(mainTripFilterContainer, mainMenuComponent, ELEMENTS_POSITIONS.AFTERBEGIN);
renderTripInfo(mainTripBlock, points.getPoints());
mainMenuComponent.setMenuClickHandler(handleMainMenuChange);
newEventButtonComponent.setNewEventButtonClickHandler(handleMainMenuChange);
filterPresenter.init();
trip.init(routePoints);
