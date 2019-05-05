[![npm](https://img.shields.io/npm/dt/ngx-input-default-value.svg)]()
[![npm](https://img.shields.io/npm/l/ngx-input-default-value.svg)]()
[![Build Status](https://api.travis-ci.org/zeevkatz/ngx-input-default-value.svg?branch=master)]()

# Angular | Default value for inputs and properties️ ⚡

 A simple way to set default values to your component inputs and properties using a decorator.

🚀 See it in action on [Stackblitz](https://stackblitz.com/edit/ngx-input-default-value-demo)

---

### Installation

```bash
yarn add ngx-input-default-value
```

or 

```bash
npm install ngx-input-default-value --save
```

---

### Usage

```typescript
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
