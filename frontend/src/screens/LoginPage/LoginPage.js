import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/errorMessage";
import Loading from "../../components/loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div
        class="card border-success "
        style={{
          maxWidth: "50rem",
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: "black" }}>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit
            </Button>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <p> </p>
            <Row>
              <Col style={{ color: "black" }}>
                New Customer ? No Problem
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
