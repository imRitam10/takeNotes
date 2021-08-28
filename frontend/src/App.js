import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Route path="/" component={LandingPage} exact />
          <Route path="/mynotes" component={MyNotes} />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
