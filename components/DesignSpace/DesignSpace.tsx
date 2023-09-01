import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import * as Components from '../Components';
import {useEffect, useState} from 'react';

interface DesignSpaceProps {
  // componentsArray: any;
}

export default function DesignSpace() {
  const [aspectRatio, setAspectRatio] = useState(1); // default to 1:1
  const componentsArray = [Components.defaultLoad, Components.defaultSource];

  useEffect(() => {
    const imageSource = Image.resolveAssetSource(Components.defaultLoad.image);

    if (imageSource && imageSource.width && imageSource.height) {
      setAspectRatio(imageSource.width / imageSource.height);
    }
  }, []);

  const styles = StyleSheet.create({
    image: {
      height: '100%',
    },
    imageWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      width: 50,
      aspectRatio: aspectRatio,
    },
  });
  return (
    <View
      style={{
        flexDirection: 'row', // Set the flexDirection to row
        height: 50, // Set the height to scale components here
        backgroundColor: 'yellow',
        alignItems: 'stretch',
      }}>
      {componentsArray.map((component, index) => {
        return (
          <TouchableHighlight
            style={styles.imageWrapper}
            key={index}
            onPress={() => {
              console.log(component.message);
            }}>
            <Image
              source={component.image}
              style={{...styles.image}}
              resizeMode="contain"></Image>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}
