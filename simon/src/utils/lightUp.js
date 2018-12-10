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

export const getNewSpeed = (currentSpeed, stepsize) => {
  switch (stepsize) {
    case "Linear":
      return getLinearSpeed(currentSpeed);
    case "Half":
      return getHalfSpeed(currentSpeed);
    case "Smart":
      return getSmartSpeed(currentSpeed);
    default:
      null;
  }
};

const getSmartSpeed = currentSpeed => {
  if (currentSpeed < 138) return currentSpeed;
  return currentSpeed * 0.8;
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
