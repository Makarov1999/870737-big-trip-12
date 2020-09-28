import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";
const createMainMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu-item="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn" href="#" data-menu-item="${MenuItem.STATS}">${MenuItem.STATS}</a>
    </nav>`
  );
};

export default class MainMenuView extends AbstractView {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._currentMenuItem = MenuItem.TABLE;
  }
  getTemplate() {
    return createMainMenuTemplate();
  }
  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._callback.menuClick(evt.target.textContent);
  }
  setMenuClickHandler(callBack) {
    this._callback.menuClick = callBack;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
  setMenuItem(menuItem) {
    const prevItem = this.getElement().querySelector(`[data-menu-item=${this._currentMenuItem}]`);
    const item = this.getElement().querySelector(`[data-menu-item=${menuItem}]`);
    if (item !== null) {
      prevItem.classList.remove(`trip-tabs__btn--active`);
      item.classList.add(`trip-tabs__btn--active`);
      this._currentMenuItem = menuItem;
    }
  }
}
