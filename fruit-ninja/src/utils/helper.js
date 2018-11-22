export const getTime = (start, end) => {
  return (end - start) / 1000;
};

export const getAdaptationScore = (hits, misses) => {
  return hits - misses * 2;
};

export const getSpeed = round => {
  switch (round) {
    case 1:
      return 2;
    case 2:
      return 1.8;
    case 3:
      return 1.6;
    case 4:
      return 1.4;
    case 5:
      return 1.2;
    case 6:
      return 1.0;
    case 7:
      return 0.8;
    case 8:
      return 0.6;
    case 9:
      return 0.4;
    case 10:
      return 0.2;
    default:
      return null;
  }
};

const createCoordinates = () => {
  const step = 100;
  let array = [];
  for (let i = 0; i < 13; i++) {
    array.push(i * step);
  }
  return array;
};

export const getCoordinates = elements => {
  const possibleCoordinates = createCoordinates();
  let coordinates = [];

  for (let i = 0; i < elements.length; i++) {
    let index = Math.floor(Math.random() * 13);
    if (coordinates.indexOf(possibleCoordinates[index]) !== -1) {
      index = Math.floor(Math.random() * 13);
    }
    coordinates.push(possibleCoordinates[index]);
  }
  return coordinates;
};
