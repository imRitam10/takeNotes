import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/errorMessage";
import Loading from "../../components/loading";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Password do not match!!!");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);

        const { data } = await axios.post(
          "/api/users",
          { name, email, password, pic },
          config
        );

        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "takenote");
      data.append("cloud_name", "ritam");
      fetch("https://api.cloudinary.com/v1_1/ritam/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <Container>
      <div
        className="loginContainer"
        class="card border-warning"
        style={{ maxWidth: "40rem", margin: "150px auto" }}
      >
        <div
          class="card-header"
          style={{ userSelect: "auto;", fontSize: "25px", color: "black" }}
        >
          Register
        </div>
        <div class="card-body" style={{}}>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-2" controlId="name">
              <Form.Label style={{ color: "black" }}>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="please enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="regEmail">
              <Form.Label style={{ color: "black" }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="example123@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                <p> </p>
                <p>We'll never share your email with anyone else.</p>
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="regPassword">
              <Form.Label style={{ color: "black" }}>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label style={{ color: "black" }}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                placeholder="confirm your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label style={{ color: "black" }}>
                Profile Picture
              </Form.Label>
              <Form.Control
                onChange={(e) => postDetails(e.target.files[0])}
                type="file"
                // type="image/png"
                label="Upload Profile Picture"
                style={{ color: "black" }}
              />
            </Form.Group>

            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}

            <Button variant="warning" type="submit" style={{ color: "black" }}>
              Register
            </Button>
            {loading && <Loading />}

            <Row>
              <Col style={{ color: "black" }}>
                Have an Account ?
                <Link to="/login" style={{ color: "blue" }}>
                  {" "}
                  Login
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
