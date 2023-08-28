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
} from 'react-native';
import Points from './Points';
import CircleDragTest from './CircleDragTest';

interface SmithChartProps {}

export default function SmithChart(props: SmithChartProps) {
  const backgroundRef = useRef<Canvas>(null);
  const smithChartCanvasRef = useRef<Canvas>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;
    const canvas = backgroundRef.current;
    const ctx = canvas.getContext('2d');
    const {width, height} = Dimensions.get('window');
    canvas.width = width * 0.8;
    canvas.height = height * 0.8;

    console.log('hello');
    DrawBackground(canvas, ctx);
    // Points(canvas, ctx, 0, 0);
    // CircleDragTest(canvas, ctx);
  }, [backgroundRef.current]);

  let x = 0;

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      onPanResponderGrant: (event, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
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
      onPanResponderTerminationRequest: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (event, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (event, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return (
    <View style={{flex: 1}} {...panResponder.panHandlers}>
      <Canvas
        ref={smithChartCanvasRef}
        style={{width: '100%', height: '100%', backgroundColor: 'black'}}
      />
      <TouchableOpacity onPress={() => alert('Button clicked')}>
        <Text>Click Me</Text>
      </TouchableOpacity>
      <Text>This is test text: {x}</Text>
    </View>
  );
}
