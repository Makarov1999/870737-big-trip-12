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
