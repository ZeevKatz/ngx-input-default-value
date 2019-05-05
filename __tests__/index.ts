import { InputDefaultValue } from "../src";

describe("InputDefaultValue", () => {
  it("should assign the default value when value is null or undefined", () => {
    class Test {
      @InputDefaultValue("Default string")
      property: string;
    }
    const instance = new Test();
    instance.property = null;
    expect(instance.property).toEqual("Default string");
    instance.property = undefined;
    expect(instance.property).toEqual("Default string");
  });
  describe("should work with primitives", () => {
    it("should work with string", () => {
      class Test {
        @InputDefaultValue("Default string")
        property: string;
      }
      const instance = new Test();
      instance.property = "New string";
      expect(instance.property).toEqual("New string");
    });
    it("should work with boolean", () => {
      class Test {
        @InputDefaultValue(true)
        property: boolean;
      }
      const instance = new Test();
      instance.property = false;
      expect(instance.property).toEqual(false);
    });
    it("should work with number", () => {
      class Test {
        @InputDefaultValue(0)
        property: number;
      }
      const instance = new Test();
      instance.property = 1;
      expect(instance.property).toEqual(1);
    });
  });
  describe("should work with objects", () => {
    it("should work with simple object", () => {
      interface SimpleObject {
        string: string;
        number: number;
        boolean: boolean;
      }
      class Test {
        @InputDefaultValue<SimpleObject>({
          string: "Default string",
          number: 0,
          boolean: true
        })
        property: Partial<SimpleObject>;
      }
      const instance = new Test();
      instance.property = { string: "New string" };
      expect(instance.property).toEqual({
        string: "New string",
        number: 0,
        boolean: true
      });
    });
    it("should work with nested object", () => {
      type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends Array<infer U>
          ? Array<DeepPartial<U>>
          : DeepPartial<T[P]>
      };
      interface NestedObject {
        string: string;
        simpleObject: {
          string: string;
          number: number;
          boolean: boolean;
        };
      }
      class Test {
        @InputDefaultValue<NestedObject>({
          string: "Default string",
          simpleObject: {
            string: "Default string",
            number: 0,
            boolean: true
          }
        })
        property: DeepPartial<NestedObject>;
      }
      const instance = new Test();
      instance.property = { simpleObject: { string: "New string" } };
      expect(instance.property).toEqual({
        string: "Default string",
        simpleObject: {
          string: "New string",
          number: 0,
          boolean: true
        }
      });
    });
  });
  describe("should work with arrays", () => {
    it("should work with simple array", () => {
      class Test {
        @InputDefaultValue<[string, number, boolean]>([
          "Default string",
          0,
          true
        ])
        property: Partial<[string, number, boolean]>;
      }
      const instance = new Test();
      instance.property = ["New string"];
      expect(instance.property).toEqual(["New string", 0, true]);
    });
    it("should work with multidimensional array", () => {
      class Test {
        @InputDefaultValue<number[][]>([[0, 1, 2], [3, 4, 5]])
        property: number[][];
      }
      const instance = new Test();
      instance.property = [[-1]];
      expect(instance.property).toEqual([[-1, 1, 2], [3, 4, 5]]);
    });
  });
  describe("inheritance", () => {
    it("should work with subclass", () => {
      class Parent {
        @InputDefaultValue("Default string")
        property: string;
      }
      class Child extends Parent {
        constructor() {
          super();
        }
      }
      const instance = new Child();
      expect(instance.property).toEqual("Default string");
      instance.property = "New string";
      expect(instance.property).toEqual("New string");
    });
  });
});
