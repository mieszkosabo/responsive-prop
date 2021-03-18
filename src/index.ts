import { normalizeBreakpoints, normalizeValues, zip } from './utils';

interface BreakpointsObject {
  [name: string]: number
}
// type Breakpoints = number[] | BreakpointsObject;
type Breakpoints = string[] | number[];

type ValueType = number | string | number[] | string[];

const handleObject = (propName: string, value: any) => {
  return `not implemented`;
}

const handleArray = (breakpoints: string[], propName: string, values: Array<string | null>) => {
    const pairs = zip(breakpoints, values);
    const queries = pairs.map(([bp, val]) => (
      bp !== '0px'
        ? [`@media screen and (min-width: ${bp}) {`,
          `  ${propName}: ${val};`,
          '}'].join('\n')
        : `${propName}: ${val};`
    )).join('\n');
    return queries;
}

export const createResponsiveProp 
  = (breakpoints: Breakpoints) => (propName: string, value: ValueType) => {
    if (breakpoints.length < 1) {
      throw new Error("ResponsivePropError: breakpoints can't be an empty array!");
    }
    const _breakpoints = normalizeBreakpoints(breakpoints);
    switch (typeof value) {
      case 'string': {
          return `${propName}: ${value};`;
      }
      case 'number': {
          return `${propName}: ${value}px;`;
      }
      case 'object': {
        const _values = normalizeValues(value);
        return Array.isArray(value) 
            ? handleArray(_breakpoints, propName, _values)
            : handleObject(propName, _values);
      }
      default:
        throw new Error('ResponsivePropError: invalid value type!');
    }
}
