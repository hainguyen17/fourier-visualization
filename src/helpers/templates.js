export const templates = [
    {
        name: 'square wave',
        A: '4 / (PI * (2 * n - 1))',
        coeff: '(2 * n - 1) * PI'
    },
    {
        name: 'sawtooth wave',
        A: '-1 / n',
        coeff: 'n * PI'
    },
    {
        name: 'triangle wave',
        A: '8 * ((-1) ^ ((2 * n - 2) / 2)) / ((PI * (2 * n - 1)) ^ 2)',
        coeff: '(2 * n - 1) * PI'
    }
]