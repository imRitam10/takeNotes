import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/errorMessage";

function CreateNote({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/mynotes");
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <div
        className="loginContainer"
        class="card border-info"
        style={{ maxWidth: "50rem", margin: "150px auto" }}
      >
        <Card>
          <Card.Header>
            <h4 style={{ color: "black", marginTop: "5px" }}>
              Create a new Note
            </h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label
                  style={{ color: "black", size: "18px", fontWeight: "600" }}
                >
                  Title
                </Form.Label>
                <Form.Control
                  style={{ color: "black" }}
                  type="title"
                  value={title}
                  placeholder="Enter the title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="content">
                <Form.Label
                  style={{ color: "black", size: "18px", fontWeight: "600" }}
                >
                  Content
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={content}
                  placeholder="Enter the content"
                  rows={4}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ color: "black" }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="content">
                <Form.Label
                  style={{ color: "black", size: "18px", fontWeight: "600" }}
                >
                  Category
                </Form.Label>
                <Form.Control
                  type="content"
                  value={category}
                  placeholder="Enter the Category"
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ color: "black" }}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Button
                type="submit"
                variant="success"
                style={{ color: "black" }}
              >
                Create Note
              </Button>
              <Button
                className="mx-2"
                onClick={resetHandler}
                variant="danger"
                style={{ color: "black" }}
              >
                Reset Feilds
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className="text-muted">
            <p style={{ color: "black" }}>
              {" "}
              Creating on - {new Date().toLocaleDateString()}
            </p>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
}

export default CreateNote;
