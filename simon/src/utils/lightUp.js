//

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

export const getNewSpeed = currentSpeed => {
  const linearStepSize = 300;
  // Preventing nevative speed
  if (currentSpeed - linearStepSize > 0) {
    return currentSpeed - linearStepSize;
  } else {
    // Do not reduce speed if speed is 150ms
    if (currentSpeed === 150) return currentSpeed;
    currentSpeed / 2;
  }
};
