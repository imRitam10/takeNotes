import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/errorMessage";
import { updateProfile } from "../../actions/userActions";
import Image from "react-bootstrap/Image";
import "../ProfileScreen/ProfileScreen.css";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics) {
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
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <Container>
      <div className="m">
        <Row>
          <Col>
            <div
              class="card-header"
              style={{ userSelect: "auto;", fontSize: "25px" }}
            >
              Update Profile
            </div>
            <div class="card-body">
              <Form onSubmit={submitHandler}>
                {loading && <Loading />}
                {success && (
                  <ErrorMessage variant="success">
                    Updated Successfully
                  </ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form.Group className="mb-2" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="example123@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    placeholder="confirm your password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>{" "}
                {picMessage && (
                  <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <Form.Group controlId="pic" className="mb-3">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control
                    onChange={(e) => postDetails(e.target.files[0])}
                    type="file"
                    label="Upload Profile Picture"
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" varient="primary">
                  Update
                </Button>
              </Form>
            </div>
          </Col>

          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Image
              style={{ width: "400px", height: "400px" }}
              src={pic}
              alt={name}
              className="profilePic"
              roundedCircle
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ProfileScreen;
