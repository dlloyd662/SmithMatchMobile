import {Image, StyleSheet, View} from 'react-native';

interface ComponentBankProps {}

export default function ComponentBank(props: ComponentBankProps) {
  const styles = StyleSheet.create({
    image: {
      backgroundColor: 'white',
      flex: 1,
      height: '100%', //Set height to scale components here
      marginRight: 2,
    },
  });
  const componentImages = [
    require('../../images/Inductor_Parallel.png'),
    require('../../images/Inductor_Series.png'),
    require('../../images/Resistor_Parallel.png'),
    require('../../images/Resistor_Series.png'),
    require('../../images/Capacitor_Parallel.png'),
    require('../../images/Capacitor_Series.png'),
    require('../../images/TLine_Open.png'),
    require('../../images/TLine_Short.png'),
    require('../../images/TLine_Series.png'),
  ];

  return (
    <View
      style={{
        flexDirection: 'row', // Set the flexDirection to row
        height: 70, // Set the height to scale components here
      }}>
      {componentImages.map((image, index) => {
        return (
          <Image
            resizeMode="contain"
            source={image}
            style={styles.image}
            key={index}
          />
        );
      })}
    </View>
  );
}
