# responsive-prop 
A small package that creates media queries based on breakpoints and props.
Could be useful for creating reusable and responsive styled components.

## Install
```npm install responsive-prop```

## Usage

~~~typescript
import { createResponsiveProp } from 'responsive-prop'

// breakpoints should be an array of numbers (which will be changed to px
const myBreakpoints1 = [450, 728, 1200, 1400];
// or array of strings with your fav units
const myBreakpoints2 = ['450px', '728px', '1200px', '1400px'];
const myBreakpoints3 = ['450em', '728em', '1200em', '1400em'];

const rp = createResponsiveProp(myBreakpoints1);

// when no arguments are given, default breakpoints are used:
// const defaultBreakpoints = ["480px", "768px", "1024px", "1280px"];
const rp2 = createResponsiveProp();

rp('width', 20);
// outputs:
// width: 20px;

rp('font-size', '1.3rem');
// outputs:
// font-size: 1.3rem;

rp('width', [300, 400, 560]);
// outputs:
// width: 300px;
// @media screen and (min-width: 450px) {
//   width: 400px;
// }
// @media screen and (min-width: 728px) {
//   width: 560px;
// }
~~~

Breakpoints and values can be of different sizes. Internally, both arrays are getting zipped.

~~~typescript
const shortBreakpoints = [576, 690];
const rp3 = createResponsiveProp(shortBreakpoints);
rp3('width', [100, 200, 300, 400]);
// outputs:
// width: 100px;
// @media screen and (min-width: 576px) {
//   width: 200px;
// }
// @media screen and (min-width: 690px) {
//   width: 300px;
// }
~~~

## 💅 Styled Components Example

~~~typescript
import styled from 'styled-components';
import { createResponsiveProp } from 'responsive-prop';
const rp = createResponsiveProp(); // using default breakpoints here

const ResponsiveRect = styled.div`
    ${rp('width', [200, 300, 550, 720])}
    ${rp('background-color', ['red', 'blue'])}
    
    ${({ theme }) => rp('padding', theme.dims.paddings)} // pretty lit
    height: 200px;
`;


function App() {
  return (
      <ResponsiveRect />
  );
}

export default App;
~~~

## Roadmap

I might add possibility to use object syntax in future. 
