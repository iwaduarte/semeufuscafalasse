import React, { useEffect, useRef } from 'react';

const Canvas = ({ children, canvasBg }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = canvasBg;
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, 1000, 1000);
    };

    console.log('[Canvas] useEffect: canvasBg', canvasBg);
  }, [canvasBg]);

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
