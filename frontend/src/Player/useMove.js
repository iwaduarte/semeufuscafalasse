import {useCallback, useState} from 'react';

const useMove = (playerInitialPosition, obstacleInitialPosition, setIntervalsId) => {

    const [obstaclePosition, setObstaclePosition] = useState(obstacleInitialPosition);
    const [playerPosition, setPlayerPosition] = useState(playerInitialPosition);
    // const [positionBottom, setPositionBottom] = useState(0);

    //below we would have: movePlayer, moveSprite, moveEtc functions.
    const movePlayer = useCallback((event) => {
        switch (event.keyCode) {
            //left - (a) || arrow Left
            case 37:
            case 65:
                console.log('moving left');
                setPlayerPosition(20);
                break;
            //right - (d) || arrow Right
            case 39:
            case 68:
                console.log('moving right');
                setPlayerPosition(64);

                break;
            //middle - (s)
            case 83:
                console.log('moving center');
                setPlayerPosition(playerInitialPosition);
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
                console.log('other key');
                break;

        }
    },[playerInitialPosition]);

    //improvement check collision with the end of the canvas
    const moveObstacle = useCallback((event) => {
        // console.log(obstacleInitialPosition);
        const moveIntervalId = setInterval(() => {
            setObstaclePosition(prevState => {
                const {left, top, height} = prevState;
                if (top > 88) {
                    return obstacleInitialPosition
                    // clearInterval(obstacleInterval);
                    // return prevState
                }
                return {
                    left: left - 0.3,
                    top: top + 0.5,
                    height: height + 0.8,
                };
            });
        }, 25);
        setIntervalsId(prevState => [...prevState, moveIntervalId])
    }, [obstacleInitialPosition, setIntervalsId] );


    return [playerPosition, movePlayer, obstaclePosition, moveObstacle];
};

export default useMove;