import AbstractView from "./abstract.js";
const createFilterTemplate = (filters, currentFilterType) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${createFilterListTemplate(filters, currentFilterType)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

const createFilterItemTemplate = (type, currentFilterType) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
};

const createFilterListTemplate = (filters, currentFilter) => {
  let filterItems = ``;
  filters.forEach((filter) => {
    filterItems += createFilterItemTemplate(filter, currentFilter);
  });
  return filterItems;
};
export default class FilterView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
  }
  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilterType);
  }
  _filterChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterChange(evt.target.value);
  }
  setFilterChangeHandler(callBack) {
    this._callback.filterChange = callBack;
    this.getElement().addEventListener(`change`, this._filterChangeHandler);
  }
}
