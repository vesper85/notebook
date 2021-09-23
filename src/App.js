import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/Notes/NotesState';
import Alert from './components/Alert';



function App() {
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <Alert message="this a an alert" />
      <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </NoteState>
     
   </>
  );
}

export default App;

