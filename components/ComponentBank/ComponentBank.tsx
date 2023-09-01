import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import * as Components from '../Components';

interface ComponentBankProps {}

export default function ComponentBank(props: ComponentBankProps) {
  const styles = StyleSheet.create({
    image: {
      backgroundColor: 'white',
      flex: 1,
      height: '100%', //Set height to scale components here
    },
    imageWrapper: {
      flexDirection: 'row', // Set the flexDirection to row
      height: '100%', //Set height to scale components here
      flex: 1,
      marginRight: 2,
    },
  });

  const components = [
    Components.defaultSeriesInductor,
    Components.defaultShuntInductor,
    Components.defaultSeriesCapacitor,
    Components.defaultShuntCapacitor,
    Components.defaultSeriesResistor,
    Components.defaultShortStub,
    Components.defaultOpenStub,
    Components.defaultTransmissionLine,
  ];

  return (
    <View
      style={{
        flexDirection: 'row', // Set the flexDirection to row
        height: 70, // Set the height to scale components here
      }}>
      {components.map((component, index) => {
        return (
          <TouchableHighlight
            style={styles.imageWrapper}
            key={index}
            onPress={() => {
              console.log(component.message);
            }}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={component.image}
            />
          </TouchableHighlight>
        );
      })}
    </View>
  );
}
