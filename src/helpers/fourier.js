import {Parser} from 'expr-eval';
import { GraphType, N } from './consts';

const xyGraphMap = {
    [GraphType.COSINE]: {
        xFunc: Math.sin,
        yFunc: Math.cos
    },
    [GraphType.SINE]: {
        xFunc: Math.cos,
        yFunc: Math.sin
    }
};

const getNValue = (n, nType) => {
    const nMap = {
        [N.ALL]: n,
        [N.ODD]: 2 * n - 1,
        [N.EVEN]: 2 * n,
    };

    return nMap[nType]
};

export const verifyInput = (inputs) => {
    Parser.evaluate(inputs.A, {
        n: 0
    });
    Parser.evaluate(inputs.coeff, {
        n: 0
    });
}

export const sketch = (n, speed, inputs) => (p) => {
    let time = 0;
    let wave = [];

    p.setup = () => {
        p.createCanvas(1000, 600);

    };

    p.draw = () => {
        p.background('#eee');
        p.translate(300, 300);

        let x = 0,
            y = 0;

        const radius = 100;
    
        for (let i = 1; i <= n; i++) {
            const prevX = x;
            const prevY = y;
            
            const A = Parser.evaluate(inputs.A, {
                n: getNValue(i, inputs.nType)
            });

            const coeff = Parser.evaluate(inputs.coeff, {
                n: getNValue(i, inputs.nType)
            });

            const {
                xFunc,
                yFunc
            } = xyGraphMap[inputs.graphType];


            x -= A * radius * xFunc(coeff * time);
            y -= A * radius * yFunc(coeff * time);

            p.stroke('#17a2b8');
            p.noFill();
            p.strokeWeight(1);
            p.ellipse(prevX, prevY, A * radius * 2);


            p.fill(255);
            p.strokeWeight(2);
            p.stroke('#17a2b8');
            p.line(prevX, prevY, x, y)
            p.ellipse(x, y, 2);
        }

        wave.unshift(y);
        p.translate(200, 0);
        p.line(x - 200, y, 0, wave[0])

        p.beginShape();
        p.noFill();
        p.strokeWeight(2);

        wave.forEach((point, index) => p.vertex(index, point));
        p.endShape();
    
        time += speed / 1000;
    
        if (wave.length > 1000) {
            wave.pop();
        }
    }
};