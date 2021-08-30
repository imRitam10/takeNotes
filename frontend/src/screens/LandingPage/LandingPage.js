import React from "react";
import "./LandingPage.css";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Container>
      <div className="main">
        <Container>
          <Row>
            <div className="intro-text">
              <div>
                <h1 className="title">Welcome to TakeNote</h1>
                <h2 className="title">One Safe place for all of your notes.</h2>
              </div>
              <div className="buttonContainer">
                <Link to="/login">
                  <Button size="lg" className="landingbutton" variant="success">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="primary" className="landingbutton">
                    Signup
                  </Button>
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default LandingPage;
