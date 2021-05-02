import {Parser} from 'expr-eval';

export const sketch = (n, speed, inputs) => (p) => {
    let time = 0;
    let wave = [];

    p.setup = () => {
        p.createCanvas(1000, 600);

    };

    p.draw = () => {
        p.background(0);
        p.translate(300, 300);

        let x = 0,
            y = 0;

        const radius = 100;
    
        for (let i = 1; i <= n; i++) {
            const prevX = x;
            const prevY = y;
            
            const A = Parser.evaluate(inputs.A, {
                n: i
            });

            const coeff = Parser.evaluate(inputs.coeff, {
                n: i
            });

            console.log(A, coeff)

            x += A * radius * Math.cos(coeff * time);
            y += A * radius * Math.sin(coeff * time);

            p.stroke(255);
            p.noFill();
            p.ellipse(prevX, prevY, A * radius * 2);


            p.fill(255);
            p.stroke(255);
            p.line(prevX, prevY, x, y)
            p.ellipse(x, y, 2);
        }

        wave.unshift(y);
        p.translate(200, 0);
        p.line(x - 200, y, 0, wave[0])

        p.beginShape();
        p.noFill();

        wave.forEach((point, index) => p.vertex(index, point));
        p.endShape();
    
        time += speed / 1000;
    
        if (wave.length > 1000) {
            wave.pop();
        }
    }
};