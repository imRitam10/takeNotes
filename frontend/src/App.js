import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import CreateNote from "./screens/CreateNote/CreateNote";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Route path="/" component={LandingPage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/createnotes" component={CreateNote} />
          <Route path="/mynotes" component={MyNotes} />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
