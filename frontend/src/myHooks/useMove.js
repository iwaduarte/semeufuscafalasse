import {useCallback, useState} from 'react';
import obstacleConfig from '../Obstacles/obstaclesConfig'

const useMove = (playerInitialPosition, obstacleInitialPosition, setIntervalsId) => {

    const [obstaclePosition, setObstaclePosition] = useState(obstacleInitialPosition);
    const [playerPosition, setPlayerPosition] = useState(playerInitialPosition.LEFT);
    // const [positionBottom, setPositionBottom] = useState(0);

    //below we would have: movePlayer, moveSprite, moveEtc functions.
    const movePlayer = useCallback((event) => {
        switch (event.keyCode) {
            //left - (a) || arrow Left
            case 37:
            case 65:
                console.log('[LEFT]');
                setPlayerPosition(10);
                break;
            //right - (d) || arrow Right
            case 39:
            case 68:
                console.log('[RIGHT]');
                setPlayerPosition(72);

                break;
            //middle - (s)
            case 83:
                console.log('[CENTER]');
                setPlayerPosition(playerInitialPosition.LEFT);
                break;
            // turbo - (w) || (arrow Up)
            case 38:
            case 87:
                console.log('turbo');
                break;
            // break - (f)
            case 70:
                console.log('breaking');
                break;
            default:
                break;

        }
    }, [playerInitialPosition]);

    //improvement check collision with the end of the canvas
    const moveObstacle = useCallback((event) => {
        const random = ()=>Math.floor(Math.random() * 3);
        // console.log(obstacleInitialPosition);
        const moveIntervalId = setInterval(() => {
            setObstaclePosition(prevState => {
                const {left, top, height, leftIncrease, width} = prevState;
                if (top > 86) {
                    return obstacleConfig[random()];
                    // clearInterval(obstacleInterval);
                    // return prevState
                }
                return {
                    left: left + leftIncrease,
                    top: top * 1.01,
                    height: height + 0.9,
                    width,
                    leftIncrease,
                };
            });
        }, 25);
        setIntervalsId(prevState => [...prevState, moveIntervalId])
    }, [setIntervalsId]);

    const resetPosition = useCallback(() => {
        setPlayerPosition(playerInitialPosition.LEFT);
        setObstaclePosition(obstacleInitialPosition);
    }, [setObstaclePosition, setPlayerPosition, obstacleInitialPosition, playerInitialPosition]);

    return [playerPosition, movePlayer, obstaclePosition, moveObstacle, resetPosition];
};

export default useMove;