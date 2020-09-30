import Trip from "./presenter/trip.js";
import Points from "./model/points.js";
import Filter from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import MainMenuView from "./view/main-menu.js";
import NewEventButtonView from "./view/new-event-button.js";
import {render, remove} from "./utils/render.js";
import StatisticsView from "./view/statistics.js";
import {ELEMENTS_POSITIONS, MenuItem, FilterType, UpdateType} from "./const.js";
import {getRandomStringAuthorization} from "./utils/rand.js";
import Api from "./api.js";
const ATHORIZATION_KEY = getRandomStringAuthorization();
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const mainBodyElement = document.querySelector(`.page-main .page-body__container`);
const mainTripBlock = document.querySelector(`.trip-main`);
const mainTripFilterContainer = mainTripBlock.querySelector(`.trip-controls`);
const eventsTripContainer = document.querySelector(`.trip-events`);
const api = new Api(END_POINT, ATHORIZATION_KEY);
const pointsModel = new Points();
const filterModel = new Filter();
const mainMenuComponent = new MainMenuView();
const newEventButtonComponent = new NewEventButtonView();
const filterPresenter = new FilterPresenter(mainTripFilterContainer, filterModel, pointsModel);
const trip = new Trip(mainTripBlock, mainTripFilterContainer, eventsTripContainer, pointsModel, filterModel, api);
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
      if (statisticsComponent) {
        remove(statisticsComponent);
      }
      trip.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      trip.init();
      trip.createRoutePoint(handleNewPointFormClose);
      mainMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`).disabled = true;
      newEventButtonComponent.getElement().disabled = true;
      break;
    case MenuItem.TABLE:
      mainMenuComponent.setMenuItem(MenuItem.TABLE);
      trip.init();
      if (statisticsComponent) {
        remove(statisticsComponent);
      }
      break;
    case MenuItem.STATS:
      mainMenuComponent.setMenuItem(MenuItem.STATS);
      trip.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(mainBodyElement, statisticsComponent, ELEMENTS_POSITIONS.BEFOREEND);
      break;
  }
};

mainMenuComponent.setMenuClickHandler(handleMainMenuChange);
newEventButtonComponent.setNewEventButtonClickHandler(handleMainMenuChange);
render(mainTripBlock, newEventButtonComponent, ELEMENTS_POSITIONS.BEFOREEND);
render(mainTripFilterContainer, mainMenuComponent, ELEMENTS_POSITIONS.AFTERBEGIN);
newEventButtonComponent.getElement().disabled = true;
trip.init();
filterPresenter.init();
Promise.all([api.getPoints(), api.getOffers(), api.getDestinations()])
 .then(([points, offers, destinations]) => {
   trip.destroy();
   trip.init(offers, destinations);
   pointsModel.setPoints(UpdateType.INIT, points);
   newEventButtonComponent.getElement().disabled = false;
 })
.catch(() => {
  pointsModel.setPoints(UpdateType.ERROR, []);
});
