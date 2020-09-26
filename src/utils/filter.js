import {FilterType} from "../const.js";

export const filter = {
  [FilterType.EVERYTHING]: (points) => {
    return points;
  },
  [FilterType.FUTURE]: (points) => points.filter((point) => point.startTime > new Date()),
  [FilterType.PAST]: (points) => points.filter((point) => point.startTime < new Date())
};
