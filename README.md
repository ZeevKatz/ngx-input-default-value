[![npm](https://img.shields.io/npm/dt/@katze/ngx-input-default-value.svg)](https://www.npmjs.com/package/@katze/ngx-input-default-value)
[![npm](https://img.shields.io/npm/l/@katze/ngx-input-default-value.svg)](https://www.npmjs.com/package/@katze/ngx-input-default-value)
[![Build Status](https://travis-ci.com/ZeevKatz/ngx-input-default-value.svg?branch=master)](https://travis-ci.org/ZeevKatz/ngx-input-default-value)

# Angular | Default value for inputs and properties️ ⚡

 A simple way to set default values to your component inputs and properties using a decorator.

🚀 See it in action on [Stackblitz](https://stackblitz.com/edit/ngx-input-default-value-demo)

---

### Installation

```bash
yarn add @katze/ngx-input-default-value
```

or 

```bash
npm install @katze/ngx-input-default-value --save
```

---

### Usage

```typescript
import { Component, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { InputDefaultValue } from '@katze/ngx-input-default-value';

type SimpleObject = { bar: string, foo: string };

@Component({
  selector: 'simple-component',
  templateUrl: './simple-component.component.html',
  styleUrls: ['./simple-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleComponent implements OnChanges {
  @Input()
  @InputDefaultValue<SimpleObject>({
    bar: 'Default bar value',
    foo: 'Default foo value'
  })
  simpleObject: Partial<SimpleObject>;
  
  ngOnChanges(changes: SimpleChanges) {
    // In case: 
    // <simple-component></simple-component>
    this.simpleObject; // => { bar: 'Default bar value', foo: 'Default foo value' }
    
    // In case: 
    // <simple-component [simpleObject]="{bar: 'New bar value'}"></simple-component>
    this.simpleObject; // => { bar: 'New bar value', foo: 'Default foo value' }
  }
}
```


### Use with any class

```typescript
import { InputDefaultValue } from '@katze/ngx-input-default-value';

type SimpleObject = { bar: string, foo: string };

class SimpleClass {
  @InputDefaultValue<SimpleObject>({
    bar: 'Default bar value',
    foo: 'Default foo value'
  })
  simpleObject: Partial<SimpleObject>;
}

const instance = new SimpleClass();

instance.simpleObject;
// => { bar: 'Default bar value', foo: 'Default foo value' }

instance.simpleObject = {
  bar: 'New bar value'
};

instance.simpleObject;
// => { bar: 'New bar value', foo: 'Default foo value' }

instance.simpleObject = null;

instance.simpleObject;
// => { bar: 'Default bar value', foo: 'Default foo value' }
```
