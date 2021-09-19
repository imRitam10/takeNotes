import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <Header setSearch={setSearch} />
        <main>
          <Route path="/" component={LandingPage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/createnotes" component={CreateNote} />
          <Route path="/note/:id" component={SingleNote} />
          <Route
            path="/mynotes"
            component={() => <MyNotes search={search} />}
          />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
