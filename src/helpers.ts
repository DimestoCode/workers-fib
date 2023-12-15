export const ordinal_suffix = (num: number) => {
    const j = num % 10
    const k = num % 100
    switch (true) {
        case j === 1 && k !== 11:
            return num + 'st'
        case j === 2 && k !== 12:
            return num + 'nd'
        case j === 3 && k !== 13:
            return num + 'rd'
        default:
            return num + 'th'
    }
}

export const fibonacciFormula = (n: number): number =>
    n < 2 ? n : fibonacciFormula(n - 1) + fibonacciFormula(n - 2)
