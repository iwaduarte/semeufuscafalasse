// inspiration for rotation and mouse movement
// https://github.com/carltheperson/3d-to-2d-example/blob/main/index.ts
// the 3d transformation to 2d doesn't use tang calculation because assumes n (near plane of y) thus
// y' = nY/Z whereas n would be n = 1/tan(a/2) if n = 1, y' = Y/Z

import React, { useEffect, useRef, useState } from 'react';
import './Cube.css';

const faces = [
  // front
  [
    { x: 0.5, y: 0.5, z: 0.5 },
    { x: 0.5, y: 1, z: 0.5 },
    { x: 1, y: 1, z: 0.5 },
    { x: 1, y: 0.5, z: 0.5 }
  ],
  [
    //back
    { x: 0.5, y: 0.5, z: 1 },
    { x: 0.5, y: 1, z: 1 },
    { x: 1, y: 1, z: 1 },
    { x: 1, y: 0.5, z: 1 }
  ],
  [
    //top
    { x: 0.5, y: 0.5, z: 1 },
    { x: 0.5, y: 0.5, z: 0.5 },
    { x: 1, y: 0.5, z: 0.5 },
    { x: 1, y: 0.5, z: 1 }
  ],
  //bottom
  [
    { x: 0.5, y: 1, z: 1 },
    { x: 0.5, y: 1, z: 0.5 },
    { x: 1, y: 1, z: 0.5 },
    { x: 1, y: 1, z: 1 }
  ]
];
const SCALE = 600;
const OFFSET = 400;
const transform2dto3d = ({ x, y, z }, zValue) => {
  const newZ = z + zValue;
  return { x: x / newZ, y: y / newZ, z };
};

const rotate3D = ({ x, y, z }, roll, pitch, yaw) => {
  // roll => y    pitch => B    yaw => a
  /*
  [cos(y)*cos(p), cos(y)*sin(p)*sin(r)-sin(y)*cos(r), cos(y)*sin(p)*cos(r)+sin(y)*sin(r)]
  [sin(y)*cos(p), sin(y)*sin(p)*sin(r)+cos(y)*cos(r), sin(y)*sin(p)*cos(r)-cos(y)*sin(r)]
  [   -sin(p),               cos(p)*sin(r),                     cos(p)*cos(r)           ]
 */
  return {
    x:
      Math.cos(yaw) * Math.cos(pitch) * x +
      (Math.cos(yaw) * Math.sin(pitch) * Math.sin(roll) - Math.sin(yaw) * Math.cos(roll)) * y +
      (Math.cos(yaw) * Math.sin(pitch) * Math.cos(roll) + Math.sin(yaw) * Math.sin(roll)) * z,
    y:
      Math.sin(yaw) * Math.cos(pitch) * x +
      (Math.sin(yaw) * Math.sin(pitch) * Math.sin(roll) + Math.cos(yaw) * Math.cos(roll)) * y +
      (Math.sin(yaw) * Math.sin(pitch) * Math.cos(roll) - Math.cos(yaw) * Math.sin(roll)) * z,
    z: -Math.sin(pitch) * x + Math.cos(pitch) * Math.sin(roll) * y + Math.cos(pitch) * Math.cos(roll) * z
  };
};
const scaleAndOffset = ({ x, y, z }) => ({ x: x * SCALE + OFFSET, y: y * SCALE + OFFSET, z: z });
const draw = (ctx, faces, zValue, roll, pitch, yaw) => {
  faces.map(face => {
    ctx.beginPath();
    face
      .map(f => scaleAndOffset(transform2dto3d(rotate3D(f, roll, pitch, yaw), zValue)))
      .forEach(({ x, y }) => ctx.lineTo(x, y));
    ctx.closePath();
    ctx.stroke();
  });
};

const decrease = (value, amount) => {
  return Math.round((value - amount) * 100) / 100;
};
const increase = (value, amount) => {
  return Math.round((value + amount) * 100) / 100;
};

const Cube = () => {
  const canvasRef = useRef(null);
  const [zValue, setZValue] = useState(2);
  const [roll, setRoll] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [yaw, setYaw] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    draw(context, faces, zValue, roll, pitch, yaw);
  }, [zValue, roll, pitch, yaw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const rotate = event => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const roll = (event.offsetY / canvas.height) * Math.PI;
      const pitch = (event.offsetX / canvas.width) * Math.PI;
      const yaw = 0;
      return draw(context, faces, zValue, roll, pitch, yaw);
    };
    canvas.addEventListener('mousemove', rotate);
    return () => {
      canvas.removeEventListener('mousemove', rotate);
    };
  }, [zValue]);

  return (
    <div className="container">
      <div className="properties">
        <div className="property">
          <label htmlFor="zRange" className="label">
            Z:
          </label>
          <input
            id="zRange"
            type="range"
            min="-1"
            max="20"
            step="0.1"
            value={zValue}
            onChange={e => setZValue(Number(e.target.value))}
            className="range-input"
          />
          <span className="range-value">{zValue}</span>
        </div>
        <div className="property">
          <label htmlFor="roll" className="label">
            Roll:
          </label>
          <div>
            <input id="roll" type="button" value="-" onClick={() => setRoll(prevValue => decrease(prevValue, 0.1))} />
            <input id="roll" type="button" value="+" onClick={() => setRoll(prevValue => increase(prevValue, 0.1))} />
          </div>
          <span className="range-value">{roll}</span>
        </div>
        <div className="property">
          <label htmlFor="pitch" className="label">
            Pitch:
          </label>
          <div>
            <input id="roll" type="button" value="-" onClick={() => setPitch(prevValue => decrease(prevValue, 0.1))} />
            <input id="roll" type="button" value="+" onClick={() => setPitch(prevValue => increase(prevValue, 0.1))} />
          </div>

          <span className="range-value">{pitch}</span>
        </div>
        <div className="property">
          <label htmlFor="yaw" className="label">
            Yaw:
          </label>

          <div>
            <input id="yaw" type="button" value="-" onClick={() => setYaw(prevValue => decrease(prevValue, 0.1))} />
            <input id="yaw" type="button" value="+" onClick={() => setYaw(prevValue => increase(prevValue, 0.1))} />
          </div>

          <span className="range-value">{yaw}</span>
        </div>
      </div>

      <canvas ref={canvasRef} className="canvas" width="800" height="800" />
    </div>
  );
};

export default Cube;
