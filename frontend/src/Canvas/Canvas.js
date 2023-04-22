import React, { useEffect } from 'react';
import styled from 'styled-components';

const Background = styled.div.attrs(({ canvasBg }) => ({
  style: {
    backgroundImage: `url(${canvasBg})`
  }
}))`
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1000px 1000px;
  width: 1000px;
  margin: auto;
  position: absolute;
  z-index: -1;
  height: 95vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Canvas = ({ children, canvasBg }) => {
  useEffect(() => {
    console.log(`CanvasBg`, canvasBg);
  }, [canvasBg]);

  return <canvas>{children}</canvas>;
};

export default Canvas;
