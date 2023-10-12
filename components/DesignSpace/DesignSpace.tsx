import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import * as Components from '../ComponentBank/DefaultComponents';
import {useEffect, useState} from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface DesignSpaceProps {
  setDesignSpaceComponents: Function;
  designSpaceComponents: Array<any>;
  tempX: number;
  tempY: number;
}

export default function DesignSpace(props: DesignSpaceProps) {
  const [aspectRatio, setAspectRatio] = useState(1); // default to 1:1

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
    inputRowContainer: {
      backgroundColor: 'white',
      flexDirection: 'row',
      borderColor: 'gray',
      borderWidth: 1,
    },
    inputRowInput: {
      flexGrow: 1,
      textAlign: 'center',
      borderColor: 'black',
      // borderWidth: 1,
    },
    inputRowSuffix: {
      // alignSelf: 'center',
    },
  });

  const renderItem = ({item, index, drag, isActive}: any) => {
    console.log(item);
    return (
      <View>
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
          </View>
        </TouchableHighlight>

        <View style={styles.inputRowContainer}>
          <TextInput
            // value={props.tempX.toString()}
            value={item.value.toString()}
            style={styles.inputRowInput}
          />
          <Text>
            {item.unitPrefix}
            {item.unitPostfix}
          </Text>
        </View>
        {item.lengthUnitsArray && (
          <View style={styles.inputRowContainer}>
            <TextInput
              value={props.tempY.toString()}
              style={styles.inputRowInput}
            />
            <Text>
              {item.lengthUnitPrefex}
              {item.lengthUnitPostfix}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        data={props.designSpaceComponents}
        renderItem={renderItem}
        keyExtractor={(item: any, index: number) => `draggable-item-${index}`}
        horizontal={true}
        onDragEnd={({data}: any) => props.setDesignSpaceComponents(data)}
      />
    </GestureHandlerRootView>
  );
}
