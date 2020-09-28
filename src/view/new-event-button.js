import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";
const createNewEventButtonTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" data-menu-item=${MenuItem.NEW_EVENT}>${MenuItem.NEW_EVENT}</button>`
  );
};

export default class NewEventButtonView extends AbstractView {
  constructor() {
    super();
    this._newEventButtonClickHandler = this._newEventButtonClickHandler.bind(this);
  }
  getTemplate() {
    return createNewEventButtonTemplate();
  }
  _newEventButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.newEventClick(evt.target.textContent);
  }
  setNewEventButtonClickHandler(callBack) {
    this._callback.newEventClick = callBack;
    this.getElement().addEventListener(`click`, this._newEventButtonClickHandler);

  }
}
