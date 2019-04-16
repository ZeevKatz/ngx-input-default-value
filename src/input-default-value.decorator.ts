import { defaultsDeep, isArray, isNil, isObject } from 'lodash-es';

/**
 * Sets a given default value to the decorated property when his value is "null" or "undefined".
 * In case the type of the decorated property is "Array" or "Object" it will do assignment recursively for all properties or cells.
 *
 * @param {T} defaultValue - A default value to use for the decorated property.
 * @return {PropertyDecorator}
 */
export function InputDefaultValue<T>(defaultValue: T): PropertyDecorator {
  return (
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T> = {
      configurable: true,
      enumerable: true
    }
  ): TypedPropertyDescriptor<T> => {
    const privatePropertyKey = `_${propertyKey}`;
    const originalSetter =
      descriptor.set || (val => (target[privatePropertyKey] = val));

    descriptor.get = descriptor.get || (() => target[privatePropertyKey]);
    descriptor.set = (value: Partial<T>) => {
      if (isNil(value)) {
        originalSetter.call(target, defaultValue);
      } else if (isObject(defaultValue) || isArray(defaultValue)) {
        originalSetter.call(target, defaultsDeep(value, defaultValue));
      } else {
        originalSetter.call(target, value);
      }
    };

    originalSetter.call(target, defaultValue);
    return descriptor;
  };
}
