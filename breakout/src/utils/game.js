// Constants
import { theme } from "../constants/Theme.js";

const BALL_OFFSET = 8;

export const createBricks = () => {
  const bricks = [];
  let brickX = 2;
  let brickY = 10;
  let j = 0;
  let i = 0;
  for (i; i < theme.game.bricks.numberOfBricks; i++) {
    let brick = {
      x: brickX,
      y: brickY,
      w: theme.game.bricks.brickWidth,
      h: 10,
      color: "#000"
      // Use line below to use other brickColors
      // import { brickColors } from "../constants/Colors.js";
      // color: brickColors[j]
    };
    bricks.push(brick);
    brickX += theme.game.bricks.brickWidth + 2;
    if (brickX + theme.game.bricks.brickWidth + 2 > theme.game.width) {
      brickY += 12;
      brickX = 2;
      j++;
    }
  }
  return bricks;
};

export const getTime = (start, end) => {
  return (end - start) / 1000;
};

export const getAdaptationScore = (destroyedBricks, losses) => {
  return destroyedBricks - losses * 2;
};

export const checkCollision = (obj1, obj2) => {
  if (!obj1 || !obj2) return;
  if (
    obj1.y + obj1.radius >= obj2.y - BALL_OFFSET &&
    obj1.y - obj1.radius <= obj2.y + obj2.h + BALL_OFFSET &&
    obj1.x - obj1.radius >= obj2.x - BALL_OFFSET &&
    obj1.x + obj1.radius <= obj2.x + obj2.w + BALL_OFFSET
  ) {
    return true;
  }
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

const getLinearSpeed = currentSpeed => {
  return currentSpeed + 2.5;
};

const getHalfSpeed = currentSpeed => {
  return currentSpeed * 2;
};

const getSmartSpeed = (currentSpeed, round) => {
  let factor = 0;
  switch (round) {
    case 1:
      factor = 2
      break;
    case 2:
      factor = 1.5
      break;
    case 3:
      factor = 1.4
      break;
    case 4:
      factor = 1.3
      break;
    case 5:
      factor = 1.2
      break;
    case 6:
    case 7:
    case 8:
    case 9:
      factor = 1.1
    default: null

  }
  return currentSpeed * factor;
};
