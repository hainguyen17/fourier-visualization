import { GraphType, N } from "./consts";

export const getSummationFormula = (nType) => {
    const nMap = {
        [N.ALL]: '1,2,3,...',
        [N.ODD]: '1,3,5,...',
        [N.EVEN]: '2,4,6,...',
    }
    return `\\sum_{n=${nMap[nType]}}^{\\infty}`
};

export const getFunctionFormula = (graphType) => {
    const graphMap = {
        [GraphType.SINE]: 'sin',
        [GraphType.COSINE]: 'cos',
    }

    return `${graphMap[graphType]}(`
}