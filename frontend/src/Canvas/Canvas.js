import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  background-image: ${({ canvasBg }) => `url("${canvasBg}");`};
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
const Canvas = ({ children, canvasBg }) => <Background canvasBg={canvasBg}>{children}</Background>;

export default Canvas;
