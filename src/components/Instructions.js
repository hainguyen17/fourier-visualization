import MathJax from "react-mathjax";

const instructions = [
    {
        formuala: `\\frac{(-1)^{n+1}}{n}`,
        instruction: '(-1) ^ (n+1) / n'
    },
    {
        formuala: `\\pi`,
        instruction: 'PI'
    },
    {
        formuala: `e`,
        instruction: 'E'
    }
]
export const Instructions = () => (
    <div>
        <h4>Instructions</h4>
        <span>Examples of the inputs</span>
        <div>
            {
                instructions.map((item) => (
                    <div className="d-flex align-items-center">
                        <MathJax.Node formula={item.formuala}/>
                        <span>{`: ${item.instruction}`}</span>
                    </div>
                ))
            }
        </div>
    </div>
)