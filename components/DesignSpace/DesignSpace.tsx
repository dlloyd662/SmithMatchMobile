import {Text, View} from 'react-native';

interface DesignSpaceProps {}

export default function DesignSpace(props: DesignSpaceProps) {
  return (
    <View
      style={{
        flexDirection: 'row', // Set the flexDirection to row
        height: 70, // Set the height to scale components here
        backgroundColor: 'yellow',
      }}>
      <Text>Design Space</Text>
    </View>
  );
}
