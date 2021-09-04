import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/errorMessage";
import Loading from "../../components/loading";
import { login } from "../../actions/userActions";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <Container>
      <div
        class="card border-success "
        style={{
          maxWidth: "40rem",
          userSelect: "auto",
          margin: "150px auto",
        }}
      >
        <div
          class="card-header"
          style={{ userSelect: "auto;", fontSize: "25px", color: "black" }}
        >
          Login
        </div>

        <div class="card-body" style={{ userSelect: "auto" }}>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label style={{ color: "black" }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                <p> </p>
                <p>We'll never share your email with anyone else.</p>
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label style={{ color: "black" }}>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit" style={{ color: "black" }}>
              Submit
            </Button>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <p> </p>
            <Row>
              <Col style={{ color: "black" }}>
                New Here ? No Problem
                <Link to="/register" style={{ color: "blue" }}>
                  {" "}
                  Register Here
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
