import React from "react";
import { Accordion, Badge, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import notes from "../../data/notes";

const MyNotes = () => {
  const deleteHandler = (id) => {
    if (window.confirm("are you sure?")) {
    }
  };

  return (
    <MainScreen title="Welcome Back Ritam...">
      <Link to="createnote">
        <Button
          style={{ marginleft: 10, marginRight: 6, fontWeight: 750 }}
          size="lg"
        >
          Create New Note
        </Button>
      </Link>

      {notes.map((note) => (
        <Accordion>
          <Card style={{ margin: 20 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontFamily: "Work Sans",
                }}
              >
                <Accordion.Header eventKey="0">
                  <p style={{ fontSize: 30 }}>{note.title}</p>
                </Accordion.Header>
              </span>
              <div>
                <Button
                  variant="primary"
                  size="sm"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                  href={`/note/${note._id}`}
                >
                  edit
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  size="sm"
                  style={{ fontSize: "18px", fontWeight: "600%" }}
                  onClick={() => deleteHandler(note._id)}
                >
                  delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Body>
              <Card.Body>
                <h5>
                  <Badge style={{ backgroundColor: "green" }}>
                    Category - {note.category}
                  </Badge>
                </h5>

                <blockquote className="blockquote mb-0">
                  <h4 variant="success" fontSize="25px">
                    {note.content}
                  </h4>
                  <footer className="blockquote-footer">
                    <p style={{ color: "black", fontWeight: 600 }}>
                      Created On - data
                    </p>
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Body>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
