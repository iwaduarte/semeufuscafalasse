import React, {useEffect, useState} from 'react';
import styled from 'styled-components'

const InterfaceBox = styled.div`
    display: flex; 
    width: 100%;
    flex-direction: column;
  `;
const TimerSeconds = styled.div`
    align-self: center;
    // margin: auto;
    font-size: 8rem;
    font-weight:bold;
    color: white;

`;
const Points = styled(TimerSeconds)`
    width: 50vw;
    flex-basis: 35%;
    align-self: center;
    text-align: right;
    font-size: 3rem;
    color: #154caf;
    // align-self: top;

`;

const startPoints = (setPoints) => {
    const startPoint = Date.now();

    if (typeof setPoints !== 'function') return;
    const pointsIntervalId = setInterval(() => {
        const points = Date.now() - startPoint;
        return !checkCollision() ? setPoints(prevPoints => {
            return Math.floor(points / 100)
        }) : gameOver([pointsIntervalId]);


    }, 50);
};
const checkCollision = () => {
    return false;


};
const gameOver = (...intervals) => {
    intervals.forEach(interval => clearInterval(intervals));
};
// promise timer
const timer = (seconds, setSeconds) => {
    const timer = seconds * 1000;
    const dateNow = Date.now();
    const timerPromise = new Promise((resolve, reject) => {

        const intervalId = setInterval(() => {

            const time = Date.now() - dateNow;   // elapsed time;
            const displaySeconds = seconds - Math.floor(time / 1000); //elapsed time in as a countdown
            setSeconds(displaySeconds);
            if (time >= timer) {
                resolve(true);
                clearInterval(intervalId);
            }

        }, 50)


    });

    return timerPromise;

};

const Interface = ({children, playerPosition, start, setStart}) => {
    const [points, setPoints] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [showPanel, setShowPanel] = useState(false);

    //startGame after timer
    useEffect(() => {
        (async () => {
            timer(3, setSeconds).then(shouldStart => {
                if (shouldStart) {
                    setStart(true)
                }
            });
        })();

    }, [timer]);

    //start game
    useEffect(() => {
        if (start) {

            //start game
            //set engine (obstacles, points)
            //playsound

            console.log('Starting....');
            startPoints(setPoints);
        }


    }, [start]);

    return <InterfaceBox>
        <Points>
            {start && 'SCORE: {points}'}
        </Points>
        <TimerSeconds>
            {!start && seconds}
            <br/>
        </TimerSeconds>

    </InterfaceBox>;
};


export default Interface;