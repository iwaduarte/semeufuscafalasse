const startPoints = (setPointsFn, points) => {
  if (!setPointsFn) return;
  const startPoint = points ? Date.now() - points * 100 : Date.now();
  if (typeof setPointsFn !== 'function') return;
  return setInterval(() => {
    const points = Date.now() - startPoint;
    setPointsFn(Math.floor(points / 100));
  }, 50);
};

const timer = (seconds, setSeconds, setIntervalsId) => {
  const timer = seconds * 1000;
  const dateNow = Date.now();
  return new Promise(resolve => {
    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - dateNow;
      const elapsedTimeCountdown = seconds - Math.floor(elapsedTime / 1000);
      setSeconds(elapsedTimeCountdown);
      if (elapsedTime >= timer) {
        resolve(true);
      }
    }, 50);
    setIntervalsId(prevState => [...prevState, intervalId]);
  });
};

const checkCollision = (spriteA, spriteB, percentageCollision) => {
  if (!spriteA || !spriteB) return false;
  //mdn collision algorithm see more at https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  const percentageExtra = percentageCollision || 1;
  const collision =
    spriteA.x * percentageExtra < spriteB.x + spriteB.width &&
    (spriteA.x + spriteA.width) * percentageExtra > spriteB.x &&
    spriteA.y * percentageExtra < spriteB.y + spriteB.height &&
    (spriteA.y + spriteA.height) * percentageExtra > spriteB.y;

  if (collision) {
    console.log('Crashed :(');
    return true;
  }
  return false;
};

export { startPoints, checkCollision, timer };
