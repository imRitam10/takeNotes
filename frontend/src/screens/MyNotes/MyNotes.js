import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { listNotes } from "../../actions/notesActions";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/errorMessage";

const MyNotes = () => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    if (window.confirm("are you sure?")) {
    }
  };

  const history = useHistory();
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.name} `}>
      <Link to="createnotes">
        <Button
          style={{ marginLeft: 10, marginRight: 6, fontWeight: 750 }}
          size="lg"
        >
          Create New Note
        </Button>
      </Link>

      {loading && <Loading />}
      {error && <ErrorMessage variant="warning">{error}</ErrorMessage>}

      {notes?.map((note) => (
        <Accordion key={note._id}>
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
                  <p style={{ fontSize: "22px" }}>{note.title}</p>
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
                    <p style={{ color: "black", margin: "5px" }}>
                      Created On{" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
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
