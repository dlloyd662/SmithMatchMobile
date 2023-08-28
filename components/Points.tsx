import Canvas, {CanvasRenderingContext2D} from 'react-native-canvas';

export default function Points(
  canvas: Canvas,
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const boundaryRadius = canvas.width / 2 - 50;

  ctx.clearRect(0, 0, canvas.width, canvas.height); //Clears previous points

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

  function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
  }
  drawCircle();
}
