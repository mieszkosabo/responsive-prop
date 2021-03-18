const isNumber = (value: any): value is number => typeof value === 'number';

const analyzeCSSValue = (value: number | string) => {
  const num = parseFloat(value.toString());
  const unit = value.toString().replace(String(num), "");
  return { unitless: !unit, value: num, unit };
}

const toPx = (value: number | string): string => {
  const { unitless } = analyzeCSSValue(value)
  return unitless || isNumber(value) ? `${value}px` : value
}

const toPxOrNull = (value: number | string | null): string | null => {
  if (value == null) {
    return null;
  }
  return toPx(value);
}

export const zip = <T, U>(arr1: Array<T>, arr2: Array<U>): [T, U][] => (
  arr1.length < arr2.length
    ? arr1.map((val, i) => [val, arr2[i]])
    : arr2.map((val, i) => [arr1[i], val])
);

export const normalizeBreakpoints = (breakpoints: number[] | string[]): string[] => (
  ["0px", ...breakpoints.map(toPx).sort((a, b) => parseInt(a) - parseInt(b))]
);

export const normalizeValues = (values: number[] | string[]): Array<string | null> => (
  values.map(toPxOrNull)
)