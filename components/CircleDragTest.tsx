import {PanResponder} from 'react-native';

export default function CircleDragTest(canvas, ctx) {
  let x = 50,
    y = 50,
    radius = 30;

  const drawCircle = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
  };

  const isCircleTouched = (circle, touchX, touchY) => {
    console.log(touchX, touchY);
    const {x, y, radius} = circle;
    return (
      Math.sqrt(Math.pow(touchX - x, 2) + Math.pow(touchY - y, 2)) <= radius
    );
  };

  drawCircle();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (isCircleTouched({x, y, radius}, gestureState.x0, gestureState.y0)) {
        x += gestureState.dx;
        y += gestureState.dy;
        drawCircle();
      }
    },
  });

  //   return panResponder.panHandlers;
}
