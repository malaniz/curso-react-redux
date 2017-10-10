# Introduction to Decorator
*Decorators* is a syntactical structure which enables us to modify Javascript
Classes, properties (methods also) and object literals at design time while
keeping the _syntax declarative_.

## Installation
```bash
npm install --save-dev babel-plugin-transform-decorators-legacy
```

and modify your webpack with:
```javascript
...
"presets": ["es2015", "stage-0", "react"],
"plugins": [ "transform-decorators-legacy" ]
...
```

## Type of Decorators
A. Property Dec
B. Method Dec
C. Class Dec

### Property Doc
```javascript
// decorators.js
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

export default { readonly }
```
It'll be used as:
```javascript
import { readonly } from 'decorators';

class MyClass {
  @readonly
  myproperty = 'Test123';
}
```

### Method Dec
```javascript
import React,{ Component } from 'react';

export default function MethodLogger(IncludeArguments){
  return (target, key, descriptor) => {
    const msg = 'Called Method';
    const name = target.constructor.name;
    const func = descriptor.value;
    descriptor.value = function ( ...args )
    {
      if(IncludeArguments){
        console.log( `${name}#${key} Called with Args: ${args}` );
      }else{
        console.log( `${name}#${key} Called` );
      }
      return func.apply( this, args );
    };
    return descriptor;
  };
}
```
Used as:

```javascript
import React,{ Component } from 'react';
import autobind from 'autobind-decorator';

import MethodLogger from '../util-decorators/logger';

@autobind
class ActionComponent extends Component {

  @MethodLogger(true)
  onActionClick(buttonName){
    // Any Logic on Button Click
  }
...
...
<button style={buttonStyle} onClick={() => this.onActionClick('StaticButton1') }> StaticButton1 </button>
```


### Class Dec
```javascript
import React,{ Component } from 'react';
import abdata from '../mockdata/abdata';

export default function ABTestDecorator(SubscribedExperiments, overrideProps){
  return (InnerComponent) => {
    class ABTestHoC extends Component {
      render() {
        let overridenProps = Object.assign({},this.props);
        let subscribedABData = {};
        SubscribedExperiments.map((experimentName) => {
          if(abdata.experiments[experimentName] && abdata.experiments[experimentName].isActive){
            subscribedABData = Object.assign({}, subscribedABData, abdata.experiments[experimentName].metaData);
          }
        });

        if(overrideProps) {
          Object.keys(subscribedABData).map((propName) => {
            overridenProps[propName] = subscribedABData[propName];
          });
        }

        return <InnerComponent {...overridenProps} abData={subscribedABData} />;
      }
    };

    return ABTestHoC;
  };
}
```
Used
```javascript
import React,{ Component } from 'react';
import ABTestDecorator from '../util-decorators/abtest';

@ABTestDecorator(['DynamicInfoExperiment'], true)
class InfoComponent extends Component {
...
```
