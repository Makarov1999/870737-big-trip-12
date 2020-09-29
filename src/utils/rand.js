export const getRandomIntNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElementFromArr = (arr) => {
  const randIndex = getRandomIntNumber(0, arr.length - 1);
  return arr[randIndex];
};

export const getRandomBoolean = () => {
  return Boolean(getRandomIntNumber(0, 1));
};

export const getRandomStringAuthorization = () => {
  const LENGTH = 15;
  const startExpression = `Basic `;
  const ALPHABET = `1234567890abcdefghijklmnopqrstuvwxyz`;
  let resultExpression = ``;
  for (let i = 0; i < LENGTH; i++) {
    resultExpression += ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];
  }
  return startExpression + resultExpression;
};
