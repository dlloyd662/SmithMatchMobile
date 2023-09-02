import {SafeAreaView} from 'react-native';
import SmithChart from './components/SmithChart/SmithChart';
import ComponentBank from './components/ComponentBank/ComponentBank';
import DesignSpace from './components/DesignSpace/DesignSpace';
import {useState} from 'react';
import * as Components from './components/Components';

export default function App() {
  const [designSpaceComponents, setDesignSpaceComponents] = useState([
    Components.defaultLoad,
    Components.defaultSource,
  ]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ComponentBank
        designSpaceComponents={designSpaceComponents}
        setDesignSpaceComponents={setDesignSpaceComponents}
      />
      <SmithChart />
      <DesignSpace
        setDesignSpaceComponents={setDesignSpaceComponents}
        designSpaceComponents={designSpaceComponents}
      />
    </SafeAreaView>
  );
}
