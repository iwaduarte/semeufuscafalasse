import React, {useCallback, useEffect, useState} from 'react';
import {
    InterfaceBox,
    Laps,
    Points,
    TimerSeconds,
    Box,
    BoxTitle,
    BoxSubtitle,
    BoxButton
} from "./InterfaceStyled";
import lapConfig from './lapConfig';
// import useAudio from "./useAudio";
// import Sounds from "./Sounds";

const startPoints = (setPoints, points) => {
    if (!setPoints) return;
    const startPoint = points ? Date.now() - (points * 100) : Date.now();
    if (typeof setPoints !== 'function') return;
    return setInterval(() => {
        const points = Date.now() - startPoint;
        setPoints(Math.floor(points / 100));
    }, 50);

};
const checkCollision = (spriteA, spriteB) => {
    if (!spriteA || !spriteB) return false;
    //mdn collision algorithm see more at https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    //algorith edited to consider unusual shape and collided only when more noticeable;
    const percentageExtra = 0.7;
    const collision = spriteA.x < spriteB.x + spriteB.width &&
        spriteA.x + spriteA.width * percentageExtra > spriteB.x &&
        spriteA.y < spriteB.y + spriteB.height &&
        spriteA.y + spriteA.height * percentageExtra > spriteB.y;

    if (collision) {
        console.log('Crashed :(');
        return true;
    }
    return false;
};
const gameOver = (setStart, intervals, outcome) => {
    if (outcome === 'WIN') {
    }
    intervals.forEach(interval => {
        clearInterval(interval)
    });
    //savePoints
    //Display GameOver [options: restart, quit (goes to first screen)]
    // setStart(false);
    // console.log('GameOver');
};
// promise timer
const timer = (seconds, setSeconds, setIntervalsId) => {
    const timer = seconds * 1000;
    const dateNow = Date.now();
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            const time = Date.now() - dateNow;   // elapsed time;
            const displaySeconds = seconds - Math.floor(time / 1000); //elapsed time in as a countdown
            setSeconds(displaySeconds);
            if (time >= timer) {

                // clearInterval(intervalId);
                setIntervalsId(prevState => [...prevState, intervalId]);
                resolve(true);
            }
        }, 50);
    });
};
const Interface = ({
                       playerPosition, obstaclePosition,
                       start, setStart,
                       playerRef, obstacleRef, setIntervalsId, intervalsId,
                       moveObstacle, movePlayer
                   }) => {

    const [points, setPoints] = useState(0);
    // const [lap, setLap] = useState(lapConfig.LAP10);
    const [lap, setLap] = useState(lap.LAP_START);

    const [seconds, setSeconds] = useState(0);
    // const [showPanel, setShowPanel] = useState(false);
    // const [introAudio, introPlay, introStop, introToggleVolume] = useAudio(Sounds.INTRO);
    const [isPaused, setPause] = useState(false);
    const [hasFinished, setFinish] = useState(false);

    const pauseGame = useCallback(() => {
        console.log('[Game Paused]');
        setPause(true);
        intervalsId.forEach(interval => clearInterval(interval));
        setIntervalsId([null]);
        document.removeEventListener("keydown", movePlayer);
    }, [setIntervalsId, intervalsId, movePlayer]);
    const handleResumeGame = useCallback(() => {
        if (isPaused) {
            console.log('[Resuming Game...]');
            //re-start startPoints function
            const startIntervalId = startPoints(setPoints, points);
            setIntervalsId(prevState => [...prevState, startIntervalId]);
            //re-start moveObject function
            moveObstacle();
            //addEventListener for movePlayer
            document.addEventListener("keydown", movePlayer);
            //set Pause to false
            setPause(false);
        }

    }, [setIntervalsId, setPause, movePlayer, moveObstacle, isPaused, setPoints]);

    // listening to user events: (PAUSE, START)
    useEffect(() => {
        if (intervalsId.length) {
            const keyboardActions = (event) => {
                switch (event.keyCode) {
                    //left - (a) || arrow Left
                    case 27:
                        pauseGame();
                        break;
                    case 13:
                        handleResumeGame();
                        break;
                    default:
                        break;
                }
            };

            document.addEventListener('keydown', keyboardActions);

            return () => document.removeEventListener('keydown', keyboardActions);
        }

    }, [intervalsId, handleResumeGame, pauseGame, isPaused]);

    // start Game after timer
    useEffect(() => {
        (async () => {
            timer(3, setSeconds, setIntervalsId).then(shouldStart => {
                if (shouldStart) {
                    setStart(true);
                    // introPlay();
                }
            });
        })();

    }, [setStart]);

    // check state of start and initialize points and update interval array state
    useEffect(() => {
        if (start) {
            //start game
            //set engine (obstacles, points)
            //playsound
            //add to state.
            const pointsIntervalId = startPoints(setPoints);
            setIntervalsId(prevState => [...prevState, pointsIntervalId]);
            console.log('Starting....');
        }
    }, [start, setIntervalsId]);

    // collision check of sprites
    useEffect(() => {
        if (playerRef.current && obstacleRef.current) {
            const hasCollided = checkCollision(
                playerRef.current.getBoundingClientRect(),
                obstacleRef.current.getBoundingClientRect());
            if (hasCollided) gameOver(setStart, intervalsId);
        }
    }, [playerRef, obstacleRef, intervalsId, setStart]);

    // checking lap and final game
    // using negative values since calculation is done by having a countdown timer
    useEffect(() => {
        if (seconds < 0) {
            const newSeconds = seconds * -1;
            const lapNumber = lapConfig[`LAP${newSeconds}`];
            if (lapNumber) {
                if(lapNumber === 'GAME_OVER')
                    return gameOver(setStart, intervalsId, 'WIN');
                setLap(lapNumber)
            }

        }
    }, [seconds]);

    return <InterfaceBox>
        <Laps>
            {start && `LAP: ${lap}`}
        </Laps>
        <Points>
            {start && `SCORE: ${points}`}
        </Points>
        <TimerSeconds>
            {!start && seconds}
            <br/>
        </TimerSeconds>
        {isPaused &&
        <Box>
            <BoxTitle>GAME PAUSED</BoxTitle>
            <BoxSubtitle>[OR PRESS ENTER]</BoxSubtitle>
            <BoxButton onClick={() => handleResumeGame()}>RESUME </BoxButton>
        </Box>}
        {hasFinished &&
        <Box>
            <BoxTitle>Congratulations!</BoxTitle>
            <BoxSubtitle>You have win</BoxSubtitle>
            <BoxButton onClick={() => console.log('restarting...')}>RESTART GAME </BoxButton>
            <BoxButton onClick={() => console.log('quitting...')}>QUIT GAME </BoxButton>
        </Box>}}

        }

    </InterfaceBox>;
};


export default Interface;