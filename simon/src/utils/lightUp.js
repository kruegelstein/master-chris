export const createPattern = (patternSize, elements) => {
  let availiableElements = elements;
  let pattern = [];
  let i = 0;
  for (i = 0; i < patternSize; i++) {
    const element =
      availiableElements[
        Object.keys(availiableElements)[
          Math.floor(Math.random() * availiableElements.length)
        ]
      ].key;
    let remainingElements = [];
    availiableElements.map(x => {
      if (x.key !== element) {
        remainingElements.push(x);
      }
    });
    availiableElements = remainingElements;
    pattern.push(element);
  }
  return pattern;
};

export const getNewSpeed = (currentSpeed, stepsize, round) => {
  switch (stepsize) {
    case "Linear":
      return getLinearSpeed(currentSpeed);
    case "Half":
      return getHalfSpeed(currentSpeed);
    case "Smart":
      return getSmartSpeed(currentSpeed, round);
    default:
      null;
  }
};

const getSmartSpeed = (currentSpeed, round) => {
  let newSpeed
  if(round === 1) {
    newSpeed = 1000
  } else {
    newSpeed = 1000 + -364.0956907 * Math.log(round)
  }
  console.log('ROUND', round)
  console.log('NEW_SPEED', newSpeed)
  return newSpeed;
};

const getHalfSpeed = currentSpeed => {
  // Prevent too low speed
  if (currentSpeed === 125) return currentSpeed;
  return currentSpeed * 0.5;
};

const getLinearSpeed = currentSpeed => {
  const linearStepSize = 200;
  return currentSpeed - linearStepSize;
};
