export const getRandomIntNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElementFromArr = (arr) => {
  const randIndex = getRandomIntNumber(0, arr.length - 1);
  return arr[randIndex];
};

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

export const getDuration = (duration) => {
  const minutes = duration.minutes;
  const hours = duration.hours;
  const days = duration.days;
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
  const month = date.getMonth();
  let dateExpression = ``;
  switch (month) {
    case 0:
      dateExpression += `JAN `;
      break;
    case 1:
      dateExpression += `FEB `;
      break;
    case 2:
      dateExpression += `MAR `;
      break;
    case 3:
      dateExpression += `APR `;
      break;
    case 4:
      dateExpression += `MAY `;
      break;
    case 5:
      dateExpression += `JUN `;
      break;
    case 6:
      dateExpression += `JUL`;
      break;
    case 7:
      dateExpression += `AUG`;
      break;
    case 8:
      dateExpression += `SEP`;
      break;
    case 9:
      dateExpression += `OCT`;
      break;
    case 10:
      dateExpression += `NOV`;
      break;
    case 11:
      dateExpression += `DEC`;
      break;
  }
  return (dateExpression += date.getDate());
};

export const setDateToForm = (date) => {
  const options = {year: `2-digit`, month: `2-digit`, day: `numeric`, hour: `2-digit`, minute: `2-digit`, hour12: false};
  const resultDate = date.toLocaleString(`en-GB`, options).replace(`,`, ``);
  return resultDate;
};
