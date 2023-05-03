import React, { useEffect, useRef } from 'react';

const dashLineRoad = ({ context, color = '#000', width = 20 }) => {
  context.strokeStyle = color;
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(0, 50);
  context.lineTo(0, 300);
  context.setLineDash([20, 10]);
  context.stroke();
};

const drawSegment = ({ context, color = '#6B6B6B', width = 20 }) => {
  context.strokeStyle = color;
  context.lineWidth = width;
  context.rect();
  context.stroke();
};

const drawRoad = (ctx, canvas) => {
  dashLineRoad({ context: ctx });
  drawSegment({ context: ctx, color: '#6B6B6B', width: 20 });

  // Dashed line
  // ctx.beginPath();
  // ctx.moveTo(75, 50);
  // ctx.lineTo(100, 75);
  // ctx.lineTo(100, 25);
  // ctx.fill();
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
      <canvas ref={canvasRef} width="1000" height="1000" />
      {children}
    </div>
  );
};

export default Canvas;
