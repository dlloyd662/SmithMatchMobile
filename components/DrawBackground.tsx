import Canvas, {CanvasRenderingContext2D} from 'react-native-canvas';
import {Dimensions} from 'react-native';

export default function DrawBackground(
  canvas: Canvas,
  ctx: CanvasRenderingContext2D,
) {
  console.log('Drawing background');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const boundaryRadius = canvas.width / 2 - 50;

  const smithLeftEdge = centerX - boundaryRadius;
  const smithRightEdge = centerX + boundaryRadius;
  function getResistanceArcRad(r: number) {
    return (boundaryRadius * 1) / (1 + r);
  }

  function getReactanceArcRad(x: number): number {
    return boundaryRadius * (1 / x);
  }

  const normalizedVals = [4, 2, 1, 0.5, 0.2];
  let arcRad: number[] = normalizedVals.map(getReactanceArcRad);

  // Your drawing logic
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(centerX, centerY, boundaryRadius, 0, Math.PI * 2);
  ctx.stroke();

  function getReactanceArcLength(rad: number) {
    let d = Math.sqrt(boundaryRadius ** 2 + rad ** 2);
    //Chord is the distance between the two intersecting points
    let chord =
      (1 / d) *
      Math.sqrt(
        4 * d ** 2 * boundaryRadius ** 2 -
          (d ** 2 - rad ** 2 + boundaryRadius ** 2) ** 2,
      );

    return 2 * Math.asin(chord / 2 / rad);
  }
  // Drawing Reactance Arcs
  arcRad.forEach(rad => {
    ctx.beginPath();
    ctx.arc(
      smithRightEdge,
      centerY - rad,
      rad,
      Math.PI / 2,
      getReactanceArcLength(rad) + Math.PI / 2,
    );
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      smithRightEdge,
      centerY + rad,
      rad,
      1.5 * Math.PI,
      (3 / 2) * Math.PI - getReactanceArcLength(rad),
      true,
    );
    ctx.stroke();
  });

  function updateCircRad() {
    return normalizedVals.map(getResistanceArcRad);
  }

  // Get radii for resistance and conductance circles
  let circRad = updateCircRad();

  // Drawing Resistance Circles
  circRad.forEach(rad => {
    ctx.beginPath();
    ctx.arc(centerX + boundaryRadius - rad, centerY, rad, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Drawing Conductance Circles
  // circRad.forEach((rad) => {
  //   ctx.beginPath();
  //   ctx.arc(centerX - boundaryRadius + rad, centerY, rad, 0, Math.PI * 2);
  //   ctx.stroke();
  // });
}
