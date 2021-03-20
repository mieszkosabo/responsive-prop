import { defaultBreakpoints } from './defaultBreakpoints';
import { normalizeBreakpoints, normalizeValues, zip } from './utils';

type Breakpoints = string[] | number[];

type ValueType = number | string | number[] | string[];

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
  = (breakpoints: Breakpoints = defaultBreakpoints) => (propName: string, value: ValueType) => {
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
        if (Array.isArray(value)) {
          const _values = normalizeValues(value);
          return handleArray(_breakpoints, propName, _values)
        }
        throw new Error('ResponsivePropError: invalid value type!');
      }
      default:
        throw new Error('ResponsivePropError: invalid value type!');
    }
}