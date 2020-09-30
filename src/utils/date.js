import moment from "moment";
export const getDifferenseInDates = (firstDate, secondDate) => {
  const TO_MINITES = 60000;
  const TO_DAYS = 1440;
  const TO_HOURS = 60;
  const differense = Math.round(Math.abs(secondDate - firstDate) / TO_MINITES);
  const differenseDays = Math.floor(differense / 1440);
  let differenseHours;
  let differenceMinutes;
  if (differenseDays > 0) {
    differenseHours = Math.floor((differense - differenseDays * TO_DAYS) / TO_HOURS);
    differenceMinutes = differense - differenseDays * TO_DAYS - differenseHours * TO_HOURS;
  } else {
    differenseHours = Math.floor(differense / TO_HOURS);
    if (differenseHours > 0) {
      differenceMinutes = differense - differenseHours * TO_HOURS;
    } else {
      differenceMinutes = differense;
    }
  }
  return ({
    minutes: differenceMinutes,
    hours: differenseHours,
    days: differenseDays
  });
};

export const getDurationInDates = (startTime, finishTime) => {
  startTime = moment(startTime);
  finishTime = moment(finishTime);
  const duration = moment.duration(finishTime.diff(startTime));
  const minutes = duration.get(`minutes`);
  const hours = duration.get(`hours`);
  const days = duration.get(`days`);
  let durationEvent = ``;
  let daysExpression = ``;
  let hoursExpression = ``;
  let minutesExpression = ``;
  if (days !== 0) {
    if (days < 10) {
      daysExpression = daysExpression + `0` + days + `D `;
    } else {
      daysExpression = daysExpression + days + `D `;
    }
  }
  if (hours !== 0) {
    if (hours < 10) {
      hoursExpression = hoursExpression + `0` + hours + `H `;
    } else {
      hoursExpression = hoursExpression + hours + `H `;
    }
  }

  if (hoursExpression !== `` && daysExpression !== ``) {
    minutesExpression = minutes + `M `;
  } else {
    if (minutes < 10) {
      minutesExpression = `0` + minutes + `M `;
    } else {
      minutesExpression = minutes + `M `;
    }
  }
  durationEvent = daysExpression + hoursExpression + minutesExpression;
  return durationEvent;
};
export const prepareDateToDay = (date) => {
  const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];
  if (!(date instanceof Date)) {
    return ``;
  } else {
    const month = date.getMonth();
    const dateExpression = MONTHS[month] + ` ` + date.getDate();
    return dateExpression;
  }
};

export const setDateToForm = (date) => {
  const options = {year: `2-digit`, month: `2-digit`, day: `numeric`, hour: `2-digit`, minute: `2-digit`, hour12: false};
  const resultDate = date.toLocaleString(`en-GB`, options).replace(`,`, ``);
  return resultDate;
};
