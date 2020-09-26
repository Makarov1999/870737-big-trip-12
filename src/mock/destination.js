import {getRandomIntNumber} from "../utils/rand.js";
const generatePhotosPlug = () => {
  const photosCount = getRandomIntNumber(1, 5);
  const photoPlugTemplate = {src: `http://picsum.photos/248/152?r=${Math.random()}`, description: `beautiful photo`};
  const photos = [];
  for (let i = 0; i < photosCount; i++) {
    photos.push(photoPlugTemplate);
  }
  return photos.slice();
};
export const DESTINATIONS = [
  {
    description: `Chamonix, is a beautiful city, a true asian pearl, with crowded streets.`,
    name: `Chamonix`,
    pictures: generatePhotosPlug()
  },
  {
    description: `Moscow, is a beautiful city, a true asian pearl, with crowded streets.`,
    name: `Moscow`,
    pictures: generatePhotosPlug()
  },
  {
    description: `Geneva, is a beautiful city, a true asian pearl, with crowded streets.`,
    name: `Geneva`,
    pictures: generatePhotosPlug()
  },
  {
    description: ``,
    name: `Dublin`,
    pictures: []
  },
  {
    description: ``,
    name: `Amsterdam`,
    pictures: []
  },
];

export const getDestination = (destinations, name) => {
  const destination = destinations.filter((dist) => dist.name === name);
  if (destination.length === 0) {
    return null;
  }
  return destination[0];
};

export const getCities = (destinations) => {
  return destinations.map((destination) => destination.name);
};
