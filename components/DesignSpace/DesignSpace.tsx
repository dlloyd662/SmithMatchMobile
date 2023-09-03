import {
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import * as Components from '../Components';
import {useEffect, useState} from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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

  const data = [Components.defaultLoad, Components.defaultSource]; // default to 1:1
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

  const renderItem = ({item, index, drag, isActive}: any) => {
    // console.log('item', item);
    console.log('item', item.image);

    return (
      <TouchableHighlight
        style={styles.imageWrapper}
        key={index}
        onPress={() => {}}
        onLongPress={drag}>
        <View>
          <Image
            source={item.image}
            style={{...styles.image}}
            resizeMode="contain"
          />
          {/* <TextInput
            value={'1'}
            // style={{backgroundColor: 'white', height: 100, width: 100}}
            placeholder="sadasdfsd"
          /> */}
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        // data={props.designSpaceComponents}
        data={props.designSpaceComponents}
        renderItem={renderItem}
        keyExtractor={(item: any, index: number) => `draggable-item-${index}`}
        horizontal={true}
        onDragEnd={({data}: any) => props.setDesignSpaceComponents(data)}
        // style={{backgroundColor: 'white', height: 100, width: 100}}
      />
    </GestureHandlerRootView>
  );
}
