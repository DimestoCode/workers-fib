import { fibonacciFormula } from "./helpers";

let currNum = 0;

const calculate = () => {
  const startTime = new Date().getTime();
  const num = fibonacciFormula(currNum);
  currNum++;

  postMessage({ time: new Date().getTime() - startTime, value: num });
  calculate();
};

const handleFibCalculation = () => {
  calculate();
};

// eslint-disable-next-line no-restricted-globals
self.onmessage = handleFibCalculation;

export {};
