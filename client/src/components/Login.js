import "./Login.css";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, Navigate, useParams} from "react-router-dom";
import {useState} from "react";
import {BarLoader, BeatLoader} from "react-spinners";
import {useCookies} from "react-cookie";

const LoginFormContainer = (props) => {
    const [cookies, setCookie] = useCookies(['account-token']);
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [logged, setLogged] = useState(false);
    const [error, setError] = useState(null);
    let action = props.action;
    if(action === undefined) {
        return undefined;
    }
    action = action.toLowerCase();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if(loginData.password.length < 8) {
            setLoading(false);
            setError("Password must be at least 8 characters long!");
            return;
        }
        fetch(`http://127.0.0.1:8888/auth/${action}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginData)
        })
            .then(async res => {
                const obj = await res.json();
                if(res.ok && obj !== undefined && obj.success) {
                    setCookie('account-token', obj.token);
                    setLogged(true);
                } else {
                    setError((obj || {
                        message: "Unknown response!"
                    }).message);
                }
            }, () => {
                setError("Connection with server was closed!");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleChange = (e) => {
        const {id, value} = e.target
        setLoginData({
            ...loginData,
            [id]: value
        });
    }

    return (
        <Col>
            <Row className="login-form">
                <Col className="login-content">
                    <h1>{
                        action.substring(0, 1).toUpperCase()
                        + action.substring(1)
                    }</h1>
                    <p><small>Please input your details to continue!</small></p>
                    <hr />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username" >
                            <Form.Label>Enter Username:</Form.Label>
                            <Form.Control type="text" placeholder="Username..."
                                          onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Enter Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password..."
                                          onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                Password is securely encrypted.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" color={"#B69330"}>
                            {loading ? "Logging in..." : "Go Inside"} <BeatLoader size={8}
                                        margin={0}
                                        loading={loading}
                            />
                        </Button>
                    </Form>
                </Col>
            </Row>
            <NotRegistered action={action} />
            <ErrorContainer error={error} />
            {logged
            ? <Navigate to={"/"} />
            : null}
        </Col>
    )
}

const NotRegistered = (props) => {
    const action = props.action;
    const link = `/auth/${action === "login" ? "register" : "login"}`
    return (
        <Row className="not-registered">
            <Link to={link}>
                유 {
                    action === "login"
                        ? "Don't have account?"
                        : "Already have account?"
                }
            </Link>
        </Row>
    )
}

const ErrorContainer = (props) => {
    const err = props.error
    if(err == null) {
        return null;
    }
    return (
        <Row className={"error"}>
            <p>{err}</p>
        </Row>
    );
}

const Login = () => {
    const params = useParams();
    const action = params.action;
    return (
        <Container fluid>
            <Row className="content-holder">
                <Col></Col>
                <LoginFormContainer action={action} />
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Login;