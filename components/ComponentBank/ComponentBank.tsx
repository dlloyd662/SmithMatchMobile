import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import * as Components from './DefaultComponents';

interface ComponentBankProps {
  setDesignSpaceComponents: Function;
  designSpaceComponents: Array<Object>;
}

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

  return (
    <View
      style={{
        flexDirection: 'row', // Set the flexDirection to row
        height: 70, // Set the height to scale components here
      }}>
      {Components.defaultComponentsArray.map((component, index) => {
        return (
          <TouchableHighlight
            style={styles.imageWrapper}
            key={index}
            onPress={() => {
              console.log(component.name);
              const designSpaceComponentsWithInsertedElement = [
                ...props.designSpaceComponents.slice(
                  0,
                  props.designSpaceComponents.length - 1,
                ),
                component,
                ...props.designSpaceComponents.slice(
                  props.designSpaceComponents.length - 1,
                ),
              ];
              props.setDesignSpaceComponents(
                designSpaceComponentsWithInsertedElement,
              );
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
