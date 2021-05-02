import p5 from "p5";
import React, { useEffect, useRef, useState } from "react"
import { Alert, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import MathJax from "react-mathjax";
import { GraphType, N } from "../helpers/consts";
import { sketch, verifyInput } from "../helpers/fourier";
import { getFunctionFormula, getSummationFormula } from "../helpers/latexFormulas";
import { templates } from "../helpers/templates";
import { Instructions } from "./Instructions";

const initialState = {
    n: 8,
    speed: 7,
    equation: templates[0]
};

export const Canvas = () => {
    const canvasRef = useRef(null);
    const myP5 = useRef(null);
    const [state, setState] = useState(initialState);
    const [hasError, setHasError] = useState(false);

    const invokeP5 = () => {
        myP5.current = new p5(sketch(
            parseInt(state.n),
            parseFloat(state.speed),
            state.equation
        ), canvasRef.current);
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

    const onEquationChange = (key) => (e) => {
        setState({
            ...state,
            equation: {
                ...state.equation,
                [key]: e.target.value
            }
        });
    };

    const setTemplate = (template) => {
        setState({
            ...state,
            equation: template
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        try {
            verifyInput(state.equation);
            cleanUpP5();
            invokeP5();
            setHasError(false);
        } catch (e) {
            setHasError(true);
        }
    };

    return (
        <div className="wrapper">
            <div className="side-bar">
                {
                    hasError &&
                        <Alert
                            onClose={() => setHasError(false)}
                            dismissible
                            variant="danger"
                        >
                            Something is wrong with your inputs...
                        </Alert>
                }
                <Instructions/>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <h4>Equation</h4>
                        <div className="d-flex align-items-center">
                            <MathJax.Node formula={getSummationFormula(state.equation.nType)}/>
                            <Form.Control
                                className="mx-2"
                                value={state.equation.A}
                                onChange={onEquationChange('A')}
                            />
                            <MathJax.Node inline formula={getFunctionFormula(state.equation.graphType)}/>
                            <Form.Control
                                className="mx-2"
                                value={state.equation.coeff}
                                onChange={onEquationChange('coeff')}
                            />
                            <MathJax.Node inline formula={'x)'}/>
                        </div>
                    </Form.Group>
                    <Container className="p-0">
                        <Row>
                            <Col md={6}>
                                <h4>n</h4>
                                <div>
                                    {
                                        Object.entries(N).map(([type, label]) => (
                                            <Form.Check
                                                name="nGroup"
                                                type="radio"
                                                label={label}
                                                value={label}
                                                checked={state.equation.nType === label}
                                                onChange={onEquationChange('nType')}
                                            />
                                        ))
                                    }
                                </div>
                            </Col>
                            <Col md={6}>
                                <h4>Graph type</h4>
                                <div>
                                    {
                                        Object.entries(GraphType).map(([type, label]) => (
                                            <Form.Check
                                                name="graphTypeGroup"
                                                type="radio"
                                                label={label}
                                                value={label}
                                                checked={state.equation.graphType === label}
                                                onChange={onEquationChange('graphType')}
                                            />
                                        ))
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div>
                        <h4>Templates</h4>
                        <ListGroup>
                            {
                                templates.map((template) => (
                                    <ListGroup.Item
                                        action
                                        onClick={() => setTemplate(template)}
                                        active={state.equation === template}
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
                                type="number"
                                value={state.n}
                                onChange={onChange('n')}
                                required
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
                    <Form.Group as={Row}>
                        <Form.Label column sm="12">speed</Form.Label>
                        <Col sm="4">
                            <Form.Control 
                                type="number"
                                value={state.speed}
                                onChange={onChange('speed')}
                                required
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