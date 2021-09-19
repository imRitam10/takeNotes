import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        paddingTop: "5px",
        paddingBottom: "5px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center">Copyright &copy; TakeNote</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
