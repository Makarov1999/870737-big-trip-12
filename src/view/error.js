import AbstractView from "./abstract.js";
const createErrorTemplate = () => {
  return (`<p class="trip-events__msg trip-events__msg--error">Error! Data not recieved</p>`);
};
export default class ErrorView extends AbstractView {
  getTemplate() {
    return createErrorTemplate();
  }
}
