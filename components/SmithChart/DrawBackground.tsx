import Canvas, {CanvasRenderingContext2D} from 'react-native-canvas';
import {Dimensions} from 'react-native';
import {MutableRefObject} from 'react';

interface DrawBackgroundInterface {
  canvasRef: React.RefObject<Canvas>;
  admittanceArcs: boolean;
  conductanceArcs: boolean;
}

export default function DrawBackground({
  canvasRef,
  admittanceArcs,
  conductanceArcs,
}: DrawBackgroundInterface) {
  console.log('Drawing background');
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  // const boundaryRadius = canvas.width / 2 - 50;
  const boundaryRadius = Math.min(
    canvas.width / 2 - 25,
    canvas.height / 2 - 25,
  );

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

  function updateCircRad() {
    return normalizedVals.map(getResistanceArcRad);
  }

  // Get radii for resistance and conductance circles
  let circRad = updateCircRad();

  //Series Elements:
  // Drawing Reactance Arcs

  if (admittanceArcs) {
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
  }

  // Drawing Resistance Circles
  if (admittanceArcs) {
    circRad.forEach(rad => {
      ctx.beginPath();
      ctx.arc(centerX + boundaryRadius - rad, centerY, rad, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  //Parallel Elements:
  // Drawing Conductance Circles
  if (conductanceArcs) {
    circRad.forEach(rad => {
      ctx.beginPath();
      ctx.arc(centerX - boundaryRadius + rad, centerY, rad, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  //Susceptance arcs

  if (conductanceArcs) {
    arcRad.forEach(rad => {
      ctx.beginPath();
      ctx.arc(
        smithLeftEdge,
        centerY - rad,
        rad,
        Math.PI / 2,
        -getReactanceArcLength(rad) + Math.PI / 2,
        true,
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(
        smithLeftEdge,
        centerY + rad,
        rad,
        1.5 * Math.PI,
        (3 / 2) * Math.PI + getReactanceArcLength(rad),
      );
      ctx.stroke();
    });
  }
}
