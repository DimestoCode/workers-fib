import { fibonacciFormula } from './helpers'

// eslint-disable-next-line no-restricted-globals
self.onmessage = (e) => {
    console.log('here')
    const startTime = new Date().getTime()
    const num = fibonacciFormula(e.data)

    console.log('num', num)

    postMessage({ time: new Date().getTime() - startTime, value: num })
}

export {}
