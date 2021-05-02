import p5 from "p5";
import React, { useEffect, useRef, useState } from "react"
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import MathJax from "react-mathjax";
import { sketch } from "../helpers/fourier";
import { summation } from "../helpers/latexFormulas";
import { templates } from "../helpers/templates";
import { Instructions } from "./Instructions";

const initialState = {
    n: 8,
    speed: 7,
    A: '(-1) ^ (n+1) / n',
    coeff: 'n * PI'
};

export const Canvas = () => {
    const canvasRef = useRef(null);
    const myP5 = useRef(null);
    const [state, setState] = useState(initialState);

    const invokeP5 = () => {
        myP5.current = new p5(sketch(
            parseInt(state.n),
            parseFloat(state.speed), {
                A: state.A,
                coeff: state.coeff
            }), canvasRef.current);
    };

    const cleanUpP5 = () => {
        myP5.current.remove();
    };

    useEffect(() => {
        invokeP5();

        return cleanUpP5;
    }, []);

    const onChange = (key) => (e) => {
        setState({
            ...state,
            [key]: e.target.value
        });
    };

    const setTemplate = (template) => {
        setState({
            ...state,
            A: template.A,
            coeff: template.coeff
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        cleanUpP5();
        invokeP5();
    };

    return (
        <div className="wrapper">
            <div className="side-bar">
                <Instructions/>
                <Form onSubmit={onSubmit}>
                    <h4>Equation</h4>
                    <Form.Group className="d-flex align-items-center">
                        <MathJax.Node formula={summation}/>
                        <Form.Control
                            className="mx-2"
                            value={state.A}
                            onChange={onChange('A')}
                        />
                        <MathJax.Node inline formula={'sin('}/>
                        <Form.Control
                            className="mx-2"
                            value={state.coeff}
                            onChange={onChange('coeff')}
                        />
                        <MathJax.Node inline formula={'x)'}/>
                    </Form.Group>
                    <div>
                        <h4>Templates</h4>
                        <ListGroup>
                            {
                                templates.map((template) => (
                                    <ListGroup.Item
                                        action
                                        onClick={() => setTemplate(template)}
                                    >
                                        {template.name}
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </div>
                    <Form.Group as={Row}>
                        <Form.Label column sm="12">n</Form.Label>
                        <Col sm="4">
                            <Form.Control
                                value={state.n}
                                onChange={onChange('n')}
                            />
                        </Col>
                        <Col sm="8">
                            <Form.Control
                                type="range"
                                min="1"
                                max="100"
                                value={state.n}
                                onChange={onChange('n')}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group>

                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="12">speed</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                value={state.speed}
                                onChange={onChange('speed')}
                            />
                        </Col>
                        <Col sm="8">
                            <Form.Control
                                type="range"
                                min="0"
                                max="100"
                                value={state.speed}
                                onChange={onChange('speed')}
                            />
                        </Col>
                    </Form.Group>
                    <Button
                        className="mr-2"
                        type="submit"
                    >
                        Apply Changes
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setState(initialState)}
                    >
                        Reset Changes
                    </Button>
                </Form>
            </div>
            <div className="main-content">
                <div id="canvas" className="canvas" ref={canvasRef}/>
            </div>
        </div>
    )
}