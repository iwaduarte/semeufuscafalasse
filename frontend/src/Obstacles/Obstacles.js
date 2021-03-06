import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
import obstacleSrc from '../assets/images/obstacles/rock.png';

const ObstacleSprite = styled.img`
  // display: ${props => props.display || 'none'};
  position: absolute;
  z-index: 2;
  top: ${props => props.top && `${props.top}%`};
  left: ${props => props.left && `${props.left}%`};
  height: ${props => (props.propsHeight ? `${props.propsHeight}px` : '33px')};
  box-sizing: border-box;
  // border: 2px solid red; //dev
`;

const Obstacles = forwardRef(({ top, left, height, moveObstacle }, ref) => {
  useEffect(() => {
    moveObstacle();
  }, [moveObstacle]);

  return <ObstacleSprite ref={ref} top={top} left={left} propsHeight={height} src={obstacleSrc} />;
});

Obstacles.displayName = 'Obstacles';

export default Obstacles;
