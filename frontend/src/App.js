import React, {createRef, useState} from 'react';
import Canvas from "./Canvas/Canvas";
import Player from "./Player/Player"
import Menu from "./Menu/Menu";
import Interface from "./Interface/Interface";
import useMove from "./Player/useMove";
import playerConfig from "./Player/playerConfig";
import obstacleConfig from "./Obstacles/obstaclesConfig";
import Obstacles from "./Obstacles/Obstacles";

const App = () => {
    //all repeated tasks across the game
    const [intervalsId, setIntervalsId] = useState([]);
    const [
        playerPosition,
        movePlayer,
        obstaclePosition,
        moveObstacle ] = useMove(playerConfig.LEFT, obstacleConfig, setIntervalsId);
    const [start, setStart] = useState(false);
    const [initialize, setInitialize] = useState(true);
    const playerRef = createRef();
    const obstacleRef = createRef();

    return <>
        {initialize ?
            <Interface playerPosition={playerPosition}
                       obstaclePosition={obstaclePosition}
                       start={start}
                       setStart={setStart}
                       playerRef={playerRef}
                       obstacleRef={obstacleRef}
                       setIntervalsId={setIntervalsId}
                       intervalsId={intervalsId}
                       moveObstacle={moveObstacle}
                       movePlayer={movePlayer}
            />
            : < Menu setInitialize={setInitialize}/>

        }
        <Canvas>
            {start && <>
                <Player ref={playerRef}
                        movePlayer={movePlayer}
                        playerPosition={playerPosition}
                        playerTop={playerConfig.TOP}
                        display={start}/>
                <Obstacles
                    ref={obstacleRef}
                    top={obstaclePosition.top}
                    left={obstaclePosition.left}
                    height={obstaclePosition.height}
                    moveObstacle={moveObstacle}
                />
            </>
            }
        </Canvas>
    </>
};

export default App;
