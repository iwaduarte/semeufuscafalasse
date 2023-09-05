import React, { useEffect, useRef } from 'react';

const drawPolygon = (context, shapePoints = [], color) => {
  context.fillStyle = color;
  context.beginPath();
  shapePoints.forEach(({ x, y }, index) => {
    if (!index) {
      context.moveTo(x, y);
      return;
    }
    context.lineTo(x, y);
  });
  context.closePath();
  context.fill();
};

const roadParts = (width, height) => {
  return (startX, startY, z) => [
    { x: startX, y: startY, z },
    { x: startX + width, y: startY, z },
    { x: startX + width, y: startY + height, z },
    { x: startX, y: startY + height, z }
  ];
};

const getWidth = (percent, width) => (percent / 2) * width;

const createRoadSegment = (canvasWidth, segmentHeight) => {
  const rumblePercent = 0.1;
  const grassPercent = 0.3;
  const roadPercent = 0.6;

  const leftRumble = roadParts(getWidth(rumblePercent, canvasWidth), segmentHeight);
  const road = roadParts(getWidth(roadPercent, canvasWidth), segmentHeight);
  const rightRumble = leftRumble;

  return { leftRumble, road, rightRumble };
};

const drawRoad = ({ context, segmentHeight, backgroundHeight, canvasHeight, canvasWidth }) => {
  const segments = (canvasHeight - backgroundHeight) / segmentHeight;
  const { leftRumble, road, rightRumble } = createRoadSegment(canvasWidth, segmentHeight);

  // for (let i = canvasHeight; i < 0; i = i - segmentHeight) {}
  const rumbleCoordinates = leftRumble(0, canvasHeight - segmentHeight, 1);
  const roadCoordinates = road(rumbleCoordinates[1].x, canvasHeight - segmentHeight, 1);
  const rightRumbleCoordinates = rightRumble(roadCoordinates[1].x, canvasHeight - segmentHeight, 1);
  console.log(rumbleCoordinates);
  console.log(roadCoordinates);
  console.log(rightRumbleCoordinates);

  drawPolygon(context, rumbleCoordinates, 'red');
  drawPolygon(context, roadCoordinates, 'green');
  drawPolygon(
    context,
    rightRumbleCoordinates,

    'red'
  );
};

const Canvas = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawRoad({
      context: context,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      segmentHeight: 100,
      backgroundHeight: 100
    });
  }, []);

  const containerStyle = {
    display: 'flex',
    width: '1000px',
    margin: 'auto',
    position: 'absolute',
    zIndex: -1,
    height: '95vh',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  return (
    <div style={containerStyle}>
      <canvas ref={canvasRef} width="1000" height="1000" />
      {children}
    </div>
  );
};

export default Canvas;
