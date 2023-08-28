import { SafeAreaView } from 'react-native';
import Background from './components/Background';
import SmithChart from './components/SmithChart';

export default function App() {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SmithChart/>
    </SafeAreaView>
  );
}
