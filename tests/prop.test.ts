import createResponsiveProp from '../src/index';

const dummyBreakpoints = [1, 2, 3, 4, 5];

test('smoke test 1', () => {
  const rp = createResponsiveProp(dummyBreakpoints);
  expect(rp('width', 5)).toBe('width: 5px;');
});

test('smoke test 2', () => {
  const rp = createResponsiveProp(dummyBreakpoints);
  expect(rp('width', '5em')).toBe('width: 5em;');
});

const arrayNumBreakpoints = [576, 768, 992, 1200, 1400];

test('number array 1', () => {
  const rp = createResponsiveProp(arrayNumBreakpoints);
  expect(rp('width', [300, 400, 560])).toBe(
`width: 300px;
@media screen and (min-width: 576px) {
  width: 400px;
}
@media screen and (min-width: 768px) {
  width: 560px;
}`
  );
});

test('units array 1', () => {
  const rp = createResponsiveProp(arrayNumBreakpoints);
  expect(rp('width', ['300em', '400em', '560em'])).toBe(
`width: 300em;
@media screen and (min-width: 576px) {
  width: 400em;
}
@media screen and (min-width: 768px) {
  width: 560em;
}`
  );
});

const shortBreakpoints = [576, 690];
test('short breakpoints', () => {
  const rp = createResponsiveProp(shortBreakpoints);
  expect(rp('width', [100, 200, 300, 400])).toBe(
`width: 100px;
@media screen and (min-width: 576px) {
  width: 200px;
}
@media screen and (min-width: 690px) {
  width: 300px;
}`
  );
});

test('default breakpoints', () => {
  const rp = createResponsiveProp();
  expect(rp('width', [100, 200, 300, 400, 500])).toBe(
`width: 100px;
@media screen and (min-width: 480px) {
  width: 200px;
}
@media screen and (min-width: 768px) {
  width: 300px;
}
@media screen and (min-width: 1024px) {
  width: 400px;
}
@media screen and (min-width: 1280px) {
  width: 500px;
}`
  );
});

test('empty breakpoints', () => {
  const rp = createResponsiveProp([]);
  const t = () => rp('width', ['300em', '400em', '560em']);
  expect(t).toThrow(Error);
});