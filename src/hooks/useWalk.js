import { useState } from 'react';

export default function useWalk(maxSteps) {
  // STATES
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // zero maps to down, getter is dir, setter is setDir
  const [dir, setDir] = useState(0);
  // one step forward
  const [step, setStep] = useState(0);

  // Maps directions to integer values
  const directions = {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  };
  const stepSize = 16;

  // Modifiers for each direction
  const modifier = {
    down: { x: 0, y: stepSize },
    left: { x: -stepSize, y: 0 },
    right: { x: stepSize, y: 0 },
    up: { x: 0, y: -stepSize },
  };

  // Function to update the direction and step
  function walk(dir) {
    setDir((prev) => {
      // Prevent just turning without moving
      if (directions[dir] === prev) move(dir);
      // Return the current direction back into the setter
      return directions[dir];
    });
    // Increment step, ensuring it doesn't go above the maximum number of steps
    setStep((prev) => (prev < maxSteps - 1 ? prev + 1 : 0));
  }

  // Function to update the position based on the direction
  function move(dir) {
    setPosition((prev) => ({
      x: prev.x + modifier[dir].x,
      y: prev.y + modifier[dir].y,
    }));
  }

  return {
    walk,
    dir,
    step,
    position,
  };
}
