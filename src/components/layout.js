import {Container, Row, Col, Modal, InputGroup, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/layout.css';
import {useState, useEffect} from "react";

const Layout = () => {
    const [smShow, setSmShow] = useState(false);

    return(
        <>
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Col className="cell0" onClick={() => setSmShow(true)}>1 of</Col>
                        <Col className="cell0">2 of</Col>
                        <Col className="cell0">3 of</Col>
                    </Row>
                    <Row>
                        <Col className="cell0">1 of</Col>
                        <Col>2 of</Col>
                        <Col className="cell0">3 of</Col>
                    </Row>
                    <Row>
                        <Col className="cell0">1 of</Col>
                        <Col className="cell0">2 of</Col>
                        <Col className="cell0">3 of</Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col>4 of</Col>
                        <Col>5 of</Col>
                        <Col>6 of</Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col>7 of</Col>
                        <Col>8 of</Col>
                        <Col>9 of</Col>
                    </Row>
                </Col>
            </Row>
        </Container>

        <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
        <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
            수정
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup>
                {/* <FormControl as="textarea" aria-label="With textarea" /> */}
                <textarea autoFocus>dd</textarea>
            </InputGroup>
        </Modal.Body>
        </Modal>
        </>
    );
}

export default Layout;