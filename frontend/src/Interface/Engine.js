
// start points either creating it or receiving an initial value
// use a callback fn provided (setPoints) and return a set Interval for executing it.
const startPoints = (setPoints, points) => {
    if (!setPoints) return;
    const startPoint = points ? Date.now() - (points * 100) : Date.now();
    if (typeof setPoints !== 'function') return;
    return setInterval(() => {
        const points = Date.now() - startPoint;
        setPoints(Math.floor(points / 100));
    }, 50);

};

//check collision between two sprites and consider a percentage of how much collision is considering a collision
// (i.e a simple touch (square lines touch it) or a deep collision area
const checkCollision = (spriteA, spriteB, percentageCollision) => {
    if (!spriteA || !spriteB) return false;
    //mdn collision algorithm see more at https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    //algorithm edited to consider unusual shape and collided only when more noticeable;
    const percentageExtra = percentageCollision || 1;
    const collision = spriteA.x * percentageExtra < spriteB.x + spriteB.width &&
        (spriteA.x  + spriteA.width ) * percentageExtra > spriteB.x &&
        spriteA.y  * percentageExtra < spriteB.y + spriteB.height &&
        (spriteA.y  + spriteA.height) * percentageExtra > spriteB.y;

    if (collision) {
        console.log('Crashed :(');
        return true;
    }
    return false;
};


export {startPoints, checkCollision};