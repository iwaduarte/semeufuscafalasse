import React, { useEffect, useRef } from 'react';

const drawRoad = (context, canvas) => {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  context.fillStyle = '#87CEEB';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw road
  context.fillStyle = '#808080';
  context.fillRect(200, 0, 400, canvas.height);

  // Draw road lines
  context.strokeStyle = '#FFFFFF';
  context.lineWidth = 5;
  context.beginPath();
  for (let i = 10; i < canvas.height; i += 40) {
    context.moveTo(400, i);
    context.lineTo(400, i + 20);
  }
  context.closePath();
  context.setLineDash([]);
  context.stroke();
};

const Canvas = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawRoad(context, canvas);
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
      <canvas ref={canvasRef} width="1000" height="1000"></canvas>
      {children}
    </div>
  );
};

export default Canvas;
