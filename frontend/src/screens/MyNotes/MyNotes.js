import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/errorMessage";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const history = useHistory();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    successCreate,
    history,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <div className="yo">
      <MainScreen title={`Welcome Back ${userInfo && userInfo.name} `}>
        <Link to="createnotes">
          <Button
            style={{ marginLeft: 10, marginRight: 6, fontWeight: 750 }}
            size="lg"
          >
            Create New Note
          </Button>
        </Link>

        {loadingDelete && <Loading />}
        {errorDelete && <ErrorMessage variant="warning">{error}</ErrorMessage>}
        {loading && <Loading />}
        {error && <ErrorMessage variant="warning">{error}</ErrorMessage>}

        {notes &&
          notes
            .filter((filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )
            .reverse()
            .map((note) => (
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
                      <Row>
                        <Button
                          variant="primary"
                          size="sm"
                          style={{ fontSize: "18px", fontWeight: 600 }}
                          href={`/note/${note._id}`}
                        >
                          edit
                        </Button>
                      </Row>
                      <Row>
                        <Button
                          variant="danger"
                          className="mx-2"
                          size="sm"
                          style={{ fontSize: "18px", fontWeight: "600%" }}
                          onClick={() => deleteHandler(note._id)}
                        >
                          delete
                        </Button>
                      </Row>
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
    </div>
  );
};

export default MyNotes;
