import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/errorMessage";
import Loading from "../../components/loading";

function SingleNote({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    history.push("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(match.params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/mynotes");
  };

  return (
    <Container>
      <div
        className="editNote"
        class="card border-info"
        style={{ maxWidth: "50rem", margin: "150px auto" }}
      >
        <Card>
          <Card.Header>
            <h4 style={{ color: "black", marginTop: "5px" }}>Edit your Note</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={updateHandler}>
              {loadingDelete && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
              )}
              <Form.Group className="mb-3" controlId="title">
                <Form.Label style={{ color: "black" }}>Title</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Enter the title"
                  style={{ color: "black" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="content">
                <Form.Label style={{ color: "black" }}>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the content"
                  style={{ color: "black" }}
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="content">
                <Form.Label style={{ color: "black" }}>Category</Form.Label>
                <Form.Control
                  type="content"
                  placeholder="Enter the Category"
                  style={{ color: "black" }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <Button variant="primary" type="submit">
                Update Note
              </Button>
              <Button
                className="mx-2"
                variant="danger"
                onClick={() => deleteHandler(match.params.id)}
              >
                Delete Note
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className="text-muted">
            <p style={{ color: "black" }}>
              Updated on - {date.substring(0, 10)}
            </p>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
}

export default SingleNote;
