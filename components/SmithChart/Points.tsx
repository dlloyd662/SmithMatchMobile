import Canvas, {CanvasRenderingContext2D} from 'react-native-canvas';
import React, {useRef} from 'react';
import {MutableRefObject} from 'react';

export default function Points(
  // canvas: ref
  // ctx: CanvasRenderingContext2D,
  // canvasRef: useRef<Canvas | null>,
  // canvasRef: MutableRefObject<Canvas>,
  canvasRef: React.RefObject<Canvas>,
  x: number,
  y: number,
) {
  // canvas.width = 800;
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const boundaryRadius = Math.min(
    canvas.width / 2 - 25,
    canvas.height / 2 - 25,
  );

  ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears previous points

  // console.log('x', x, 'y', y);
  // console.log(canvas.width, canvas.height);
  const circle = {
    xCent: 0,
    yCent: 0,
    x: x,
    y: y,
    size: 6,
    dragging: false,
    new: true,
    gamma_rad: 0,
    gamma_mag: 0,
  };

  function drawCenter() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'red'; // Fills the circle with red color
    ctx.strokeStyle = 'blue'; // Strokes the circle with blue color
    // ctx.arc(100, 111, circle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'red'; // Fills the circle with red color
    ctx.strokeStyle = 'blue'; // Strokes the circle with blue color
    // ctx.arc(100, 111, circle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  drawCircle();
  drawCenter();
}
