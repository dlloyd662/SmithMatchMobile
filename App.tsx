import {SafeAreaView} from 'react-native';
import SmithChart from './components/SmithChart/SmithChart';
import ComponentBank from './components/ComponentBank/ComponentBank';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ComponentBank />
      <SmithChart />
    </SafeAreaView>
  );
}
