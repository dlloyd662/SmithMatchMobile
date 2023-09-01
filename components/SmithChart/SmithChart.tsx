import DrawBackground from './DrawBackground';
import Points from './Points';
import React, {useEffect, useRef} from 'react';
import Canvas from 'react-native-canvas';
import {
  Dimensions,
  PanResponder,
  View,
  Animated,
  Button,
  StyleSheet,
} from 'react-native';

interface SmithChartProps {}

export default function SmithChart(props: SmithChartProps) {
  const backgroundRef = useRef<Canvas>(null);
  const smithChartCanvasRef = useRef<Canvas>(null);
  let scale = 1;
  const pan = useRef(new Animated.ValueXY()).current;

  const {width, height} = Dimensions.get('window');
  const activeWindowHeight = height * 0.6;

  const lastDistance = useRef(0);

  useEffect(() => {
    if (backgroundRef.current !== null) {
      console.log('background Init');
      const backgroundCanvas = backgroundRef.current;
      backgroundCanvas.width = width;
      backgroundCanvas.height = activeWindowHeight;
      DrawBackground(backgroundRef);
    }

    if (smithChartCanvasRef.current !== null) {
      console.log('background Init');
      const smithChartCanvas = smithChartCanvasRef.current;
      const smithChartCtx = smithChartCanvas.getContext('2d');
      smithChartCanvas.width = width;
      smithChartCanvas.height = activeWindowHeight;
      Points(smithChartCanvasRef, 0, 0);
    }
  }, [backgroundRef.current, smithChartCanvasRef.current]);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        if (!smithChartCanvasRef.current) return;
        if (!backgroundRef.current) return;
        if (event.nativeEvent.touches.length > 1) {
          let touch1 = event.nativeEvent.touches[0];
          let touch2 = event.nativeEvent.touches[1];

          let dx = touch1.pageX - touch2.pageX;
          let dy = touch1.pageY - touch2.pageY;

          let distance = Math.sqrt(dx * dx + dy * dy);

          console.log('lastDistance', lastDistance);
          if (lastDistance.current !== 0) {
            let scaleChange = (distance - lastDistance.current) / 0.5; // Adjust the denominator for sensitivity
            console.log('scaleChange', scaleChange);
            console.log('scale', scale);

            const newHeight = Math.min(
              Math.max(
                Math.max(smithChartCanvasRef.current.height + scaleChange, 0),
              ),
              activeWindowHeight,
            );
            smithChartCanvasRef.current.height = newHeight;
            backgroundRef.current.height = newHeight;
          }
          lastDistance.current = distance;
        }

        Points(
          smithChartCanvasRef,
          event.nativeEvent.locationX,
          event.nativeEvent.locationY,
        );
        DrawBackground(backgroundRef);
      },

      onPanResponderRelease: () => {
        lastDistance.current = 0;
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  const styles = StyleSheet.create({
    chart: {
      position: 'absolute',
      backgroundColor: 'transparant',
      borderColor: 'yellow',
      borderWidth: 1,
    },
  });

  return (
    <View style={{height: '100%', backgroundColor: 'black'}}>
      <View
        style={{height: '80%', backgroundColor: 'transparant'}}
        {...panResponder.panHandlers}>
        <Canvas ref={smithChartCanvasRef} style={styles.chart} />
        <Canvas ref={backgroundRef} style={styles.chart} />
      </View>

      {/* <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 36}}>
        <Button
          onPress={() => console.log('Button clicked')}
          title="Click me"></Button>
      </View> */}
    </View>
  );
}
