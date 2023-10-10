import {SafeAreaView} from 'react-native';
import SmithChart from './components/SmithChart/SmithChart';
import ComponentBank from './components/ComponentBank/ComponentBank';
import DesignSpace from './components/DesignSpace/DesignSpace';
import {useState} from 'react';
import * as Components from './components/ComponentBank/DefaultComponents';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

export default function App() {
  const [designSpaceComponents, setDesignSpaceComponents] = useState([
    Components.defaultLoad,
    Components.defaultSource,
  ]);
  const [tempX, setTempX] = useState(0);
  const [tempY, setTempY] = useState(0);

  return (
    // <GestureHandlerRootView>
    <SafeAreaView style={{flex: 1}}>
      <ComponentBank
        designSpaceComponents={designSpaceComponents}
        setDesignSpaceComponents={setDesignSpaceComponents}
      />
      <DesignSpace
        tempX={tempX}
        tempY={tempY}
        setDesignSpaceComponents={setDesignSpaceComponents}
        designSpaceComponents={designSpaceComponents}
      />
      <SmithChart
        tempX={tempX}
        tempY={tempY}
        setTempY={setTempY}
        setTempX={setTempX}
      />
      {/* <p>{tempX}</p> */}
    </SafeAreaView>
    // </GestureHandlerRootView>
  );
}
