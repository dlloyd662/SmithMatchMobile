import {SafeAreaView} from 'react-native';
import SmithChart from './components/SmithChart/SmithChart';
import ComponentBank from './components/ComponentBank/ComponentBank';
import DesignSpace from './components/DesignSpace/DesignSpace';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ComponentBank />
      <SmithChart />
      <DesignSpace />
    </SafeAreaView>
  );
}
