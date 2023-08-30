import DrawBackground from './DrawBackground';
import React, {useEffect, useRef} from 'react';
import Canvas from 'react-native-canvas';
import {
  Dimensions,
  Text,
  PanResponder,
  View,
  Animated,
  TouchableOpacity,
  Button,
} from 'react-native';
import Points from './Points';
import CircleDragTest from './CircleDragTest';

interface SmithChartProps {}

export default function SmithChart(props: SmithChartProps) {
  const backgroundRef = useRef<Canvas>(null);
  const smithChartCanvasRef = useRef<Canvas>(null);

  useEffect(() => {
    const {width, height} = Dimensions.get('window');
    const activeWindowHeight = height * 0.8;

    // console.log('width', width, 'height', height);
    // console.log(smithChartCanvasRef.current);

    if (backgroundRef.current !== null) {
      console.log('background Init');
      const backgroundCanvas = backgroundRef.current;
      const backgroundCtx = backgroundCanvas.getContext('2d');

      backgroundCanvas.width = width;
      backgroundCanvas.height = activeWindowHeight;

      DrawBackground(backgroundCanvas, backgroundCtx);
    }

    if (smithChartCanvasRef.current !== null) {
      console.log('background Init');
      const smithChartCanvas = smithChartCanvasRef.current;
      const smithChartCtx = smithChartCanvas.getContext('2d');
      smithChartCanvas.width = width;
      smithChartCanvas.height = activeWindowHeight;
      Points(smithChartCanvas, smithChartCtx, 0, 0);
    }
  }, [backgroundRef.current, smithChartCanvasRef.current]);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      onPanResponderMove: (event, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        const canvas = smithChartCanvasRef.current;

        if (!canvas) return;
        Points(
          smithChartCanvasRef.current,
          smithChartCanvasRef.current.getContext('2d'),
          event.nativeEvent.locationX,
          event.nativeEvent.locationY,
        );
      },
    }),
  ).current;

  return (
    <View style={{height: '100%', backgroundColor: 'black'}}>
      <View
        style={{height: '80%', backgroundColor: 'transparant'}}
        {...panResponder.panHandlers}>
        <Canvas
          ref={smithChartCanvasRef}
          style={{
            position: 'absolute',
            backgroundColor: 'transparant',
            borderColor: 'yellow',
            borderWidth: 1,
          }}
          //
        />
        <Canvas
          ref={backgroundRef}
          style={{
            position: 'absolute',
            backgroundColor: 'transparant',
            borderColor: 'yellow',
            borderWidth: 1,
          }}
        />
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 36}}>
        <Button
          onPress={() => console.log('Button clicked')}
          title="Click me"></Button>
      </View>
    </View>
  );
}
