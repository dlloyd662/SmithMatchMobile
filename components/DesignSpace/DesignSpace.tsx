import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import * as Components from '../Components';
import {useEffect, useState} from 'react';

interface DesignSpaceProps {
  setDesignSpaceComponents: Function;
  designSpaceComponents: Array<any>;
}

export default function DesignSpace(props: DesignSpaceProps) {
  const [aspectRatio, setAspectRatio] = useState(1); // default to 1:1
  const [componentsArray, setComponentsArray] = useState([
    Components.defaultLoad,
    Components.defaultSource,
  ]); // default to 1:1

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
      backgroundColor: 'white',
      width: 50,
      aspectRatio: aspectRatio,
    },
  });
  return (
    <ScrollView
      horizontal={true} // Enable horizontal scrolling
      style={{
        flexDirection: 'row', // Set the flexDirection to row

        // alignItems: 'stretch',
      }}>
      {props.designSpaceComponents.map((component, index) => {
        return (
          <TouchableHighlight
            style={styles.imageWrapper}
            key={index}
            onPress={() => {}}>
            <Image
              source={component.image}
              style={{...styles.image}}
              resizeMode="contain"
            />
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
}
