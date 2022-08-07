import {Button, Col, Container, Row} from "react-bootstrap";
import {useState} from "react";
import {Navigate} from "react-router-dom";

const Main = () => {
    const [logout, setLogout] = useState(false);
    function handleLogout() {
        setLogout(true)
    }
    return (
        <Container fluid>
            <Col className={"d-flex justify-content-center text-center"}>
                <Row>
                    <h1>Logged in!</h1>
                    <Button variant={"primary"}
                    onClick={handleLogout}>Logout</Button>
                </Row>
            </Col>
            {logout ? <Navigate to={"/logout"} /> : null}
        </Container>
    )
}

export default Main;