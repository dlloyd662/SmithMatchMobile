import React, { useEffect, useRef } from 'react';
import Canvas from 'react-native-canvas';
import { SafeAreaView, Dimensions } from 'react-native';
import Points from './Points';

interface BackgroundProps {
  canvasRef: React.RefObject<Canvas>;
}

export default function Background(props: BackgroundProps) {
  // const canvasRef = useRef<Canvas>(null);

  useEffect(() => {
    if (props.canvasRef.current) {
      const canvas = props.canvasRef.current;
      const ctx = canvas.getContext('2d');
      const { width, height } = Dimensions.get('window');
      const canvasWidth = width * 0.8;
      const canvasHeight = height * 0.8; 
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const boundaryRadius = canvasWidth / 2 - 50;

      const smithLeftEdge = centerX - boundaryRadius;
      const smithRightEdge = centerX + boundaryRadius;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      function getResistanceArcRad(r:number) {
        return (boundaryRadius * 1) / (1 + r);
      }

      function getReactanceArcRad(x:number):number {
        return boundaryRadius * (1 / x);
      }

      const normalizedVals = [4, 2, 1, 0.5, 0.2];
      let arcRad:number[] = normalizedVals.map(getReactanceArcRad);

      // Your drawing logic
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1; 
      ctx.beginPath();
      ctx.arc(centerX, centerY, boundaryRadius, 0, Math.PI * 2);
      ctx.stroke();

      function getReactanceArcLength(rad:number) {
        let d = Math.sqrt(boundaryRadius ** 2 + rad ** 2);
        //Chord is the distance between the two intersecting points
        let chord =
          (1 / d) *
          Math.sqrt(
            4 * d ** 2 * boundaryRadius ** 2 -
              (d ** 2 - rad ** 2 + boundaryRadius ** 2) ** 2
          );
      
        return 2 * Math.asin(chord / 2 / rad);
      }
      // Drawing Reactance Arcs
      arcRad.forEach((rad) => {
        ctx.beginPath();
        ctx.arc(
          smithRightEdge,
          centerY - rad,
          rad,
          Math.PI / 2,
          getReactanceArcLength(rad) + Math.PI / 2
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(
          smithRightEdge,
          centerY + rad,
          rad,
          1.5 * Math.PI,
          (3 / 2) * Math.PI - getReactanceArcLength(rad),true);
        ctx.stroke();
      });

      function updateCircRad() {
        return normalizedVals.map(getResistanceArcRad);
      }
    
      // Get radii for resistance and conductance circles
      let circRad = updateCircRad();
    
      // Drawing Resistance Circles
      circRad.forEach((rad) => {
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
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Canvas ref={props.canvasRef} style={{ width: '100%', height: '100%', backgroundColor: 'black' }} />
    </SafeAreaView>
  );
}
