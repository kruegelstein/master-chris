export const getTime = (start, end) => {
  return (end - start) / 1000;
};

export const getAdaptationScore = (hits, misses) => {
  return hits - misses * 2;
};

export const getSpeed = (round, stepsize) => {
  switch (stepsize) {
    case "Linear":
      return getLinearSpeed(round);
    case "Half":
      return getHalfSpeed(round);
    case "Smart":
      return getSmartSpeed(round);
    default:
      null;
  }
};

const getSmartSpeed = round => {
  let newSpeed
  if(round === 0) {
    newSpeed = 2000
  } else if(round === 1) {
    newSpeed = 1000
  } else {
    newSpeed = 1000 -347.4355855 * Math.log(round)
  }
  return newSpeed;
};

const getHalfSpeed = round => {
  switch (round) {
    case 0:
      return 3200;
    case 1:
      return 1600;
    case 2:
      return 800;
    case 3:
      return 400;
    case 4:
      return 200;
    default:
      return null;
  }
};

const getLinearSpeed = round => {
  switch (round) {
    case 0:
      return 2000;
    case 1:
      return 1800;
    case 2:
      return 1600;
    case 3:
      return 1400;
    case 4:
      return 1200;
    case 5:
      return 1000;
    case 6:
      return 800;
    case 7:
      return 600;
    case 8:
      return 400;
    case 9:
      return 200;
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
