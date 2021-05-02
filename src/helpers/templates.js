import { GraphType, N } from "./consts";

export const templates = [
    {
        name: 'square wave',
        A: '4 / (PI * n)',
        coeff: 'n * PI',
        nType: N.ODD,
        graphType: GraphType.SINE
    },
    {
        name: 'sawtooth wave',
        A: '-1 / n',
        coeff: 'n * PI',
        nType: N.ALL,
        graphType: GraphType.SINE
    },
    {
        name: 'triangle wave',
        A: '8 * ((-1) ^ ((n - 1) / 2)) / ((PI * n) ^ 2)',
        coeff: 'n * PI',
        nType: N.ODD,
        graphType: GraphType.SINE
    },
    {
        name: 'parabola wave',
        A: '4 / ((PI * n) ^ 2)',
        coeff: 'n * PI',
        nType: N.ALL,
        graphType: GraphType.COSINE
    },
    {
        name: 'Full-wave rectified sine',
        A: '-4 / (PI * (n ^ 2 - 1))',
        coeff: 'n * PI',
        nType: N.EVEN,
        graphType: GraphType.COSINE
    }
]