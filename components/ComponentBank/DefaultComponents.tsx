const unitsMap = new Map<string, number>();
unitsMap.set('G', 10 ^ 9);
unitsMap.set('M', 10 ^ 6);
unitsMap.set('k', 10 ^ 3);
unitsMap.set(' ', 10 ^ 0);
unitsMap.set('c', 10 ^ -2);
unitsMap.set('m', 10 ^ -3);
unitsMap.set('u', 10 ^ -6);
unitsMap.set('n', 10 ^ -9);
unitsMap.set('p', 10 ^ -12);

class Inductor {
  public value: number = 1;
  public unitPrefix: string = 'p';
  public unitPostfix: string = 'F';
  public unitsArray: Array<String> = [' ', 'm', 'u', 'p'];
  public componentType: string = 'capacitor';
  constructor() {}
}
class ShuntInductor extends Inductor {
  public image: any = require('../../images/Inductor_Parallel.png');
  componentConfiguration: string = 'shunt';
  constructor() {
    super();
  }
}

class SeriesInductor extends Inductor {
  public image: any = require('../../images/Inductor_Series.png');
  componentConfiguration: string = 'series';
  constructor() {
    super();
  }
}
class Capacitor {
  public value: number = 1;
  public unitPrefix: string = 'p';
  public unitPostfix: string = 'F';
  public unitsArray: Array<String> = [' ', 'm', 'u', 'p'];
  public componentType: string = 'capacitor';
  constructor() {}
}
class ShuntCapacitor extends Capacitor {
  public image: any = require('../../images/Capacitor_Parallel.png');
  componentConfiguration: string = 'shunt';
  constructor() {
    super();
  }
}

class SeriesCapacitor extends Capacitor {
  public image: any = require('../../images/Capacitor_Series.png');
  componentConfiguration: string = 'series';
  constructor() {
    super();
  }
}

class Resistor {
  public value: number = 50;
  public unitPrefix: string = 'm';
  public unitPostfix: string = 'Ω';
  public unitsArray: Array<String> = [' ', 'm', 'u', 'p'];
  public componentType: string = 'resistor';
  constructor() {}
}
class ShuntResistor extends Resistor {
  public image: any = require('../../images/Resistor_Parallel.png');
  componentConfiguration: string = 'shunt';
  constructor() {
    super();
  }
}

class SeriesResistor extends Resistor {
  public image: any = require('../../images/Resistor_Series.png');
  componentConfiguration: string = 'series';
  constructor() {
    super();
  }
}

class Line {
  public characteristicImpedance: number = 50;
  public unitPrefix: string = 'm';
  public unitPostfix: string = 'Ω';
  public unitsArray: Array<String> = [' ', 'm'];
  public lengthUnitPrefix: string = 'm';
  public lengthUnitPostfix: string = 'm';
  public lengthUnitsArray: Array<String> = [' ', 'c', 'm'];
  constructor() {}
}

class OpenStub extends Line {
  public image: any = require('../../images/TLine_Open.png');
  componentConfiguration: string = 'open';
  public componentType: string = 'stub';
  constructor() {
    super();
  }
}

class ShortStub extends Line {
  public image: any = require('../../images/TLine_Short.png');
  componentConfiguration: string = 'short';
  public componentType: string = 'stub';
  constructor() {
    super();
  }
}

class TransmissionLine extends Line {
  public image: any = require('../../images/TLine_Series.png');
  componentConfiguration: string = 'series';
  public componentType: string = 'transmissionLine';
  constructor() {
    super();
  }
}

class Port {
  public value: number = 50;
  public unitPrefix: string = '';
  public unitPostfix: string = 'Ω';
  constructor() {}
}

class Load extends Port {
  public componentType: string = 'load';
  public image: any = require('../../images/Load.png');

  constructor() {
    super();
  }
}
class Source extends Port {
  componentType: string = 'source';
  image: any = require('../../images/Source.png');

  constructor() {
    super();
  }
}
export const defaultSource = new Source();
export const defaultLoad = new Load();

export const defaultComponentsArray = [
  new ShuntInductor(),
  new SeriesInductor(),
  new ShuntCapacitor(),
  new SeriesCapacitor(),
  new ShuntResistor(),
  new SeriesResistor(),
  new ShortStub(),
  new OpenStub(),
  new TransmissionLine(),
];

let componentMap = new Map<string, object>();
defaultComponentsArray.forEach((component, index) => {
  componentMap.set(component.componentType, component);
});
export {componentMap};
