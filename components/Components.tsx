export const defaultSeriesInductor = {
  name: 'defaultSeriesInductor',
  image: require('../images/Inductor_Series.png'),
};
export const defaultShuntInductor = {
  name: 'defaultShuntInductor',
  image: require('../images/Inductor_Parallel.png'),
};
export const defaultSeriesResistor = {
  name: 'defaultSeriesResistor',
  image: require('../images/Resistor_Series.png'),
};
export const defaultShuntResistor = {
  name: 'defaultShuntResistor',
  image: require('../images/Resistor_Parallel.png'),
};
export const defaultSeriesCapacitor = {
  name: 'defaultSeriesCapacitor',
  image: require('../images/Capacitor_Series.png'),
};
export const defaultShuntCapacitor = {
  name: 'defaultShuntCapacitor',
  image: require('../images/Capacitor_Parallel.png'),
};
export const defaultOpenStub = {
  name: 'defaultOpenStub',
  image: require('../images/TLine_Open.png'),
};
export const defaultShortStub = {
  name: 'defaultShortStub',
  image: require('../images/TLine_Short.png'),
};
export const defaultTransmissionLine = {
  name: 'defaultTransmissionLine',
  image: require('../images/TLine_Series.png'),
};
export const defaultLoad = {
  name: 'defaultLoad',
  image: require('../images/Source.png'),
};
export const defaultSource = {
  name: 'defaultSource',
  image: require('../images/Load.png'),
};

export const defaultComponentsArray = [
  defaultSeriesInductor,
  defaultShuntInductor,
  defaultSeriesCapacitor,
  defaultShuntCapacitor,
  defaultSeriesResistor,
  defaultShortStub,
  defaultOpenStub,
  defaultTransmissionLine,
];

let componentMap = new Map<string, object>();
defaultComponentsArray.forEach((component, index) => {
  componentMap.set(component.name, component);
});
export {componentMap};
