import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import Profile from './containers/Profile';
import DynamicForm from './Reusable/dynamicForm';
import EmailForm from './containers/EmailForm';
import MessageComp from './containers/Message';
import SoloPlay from './containers/SoloPlay';
import SinglePlayerGame from './containers/SinglePlayerGame';

import Instructions from './components/instructions';



function App() {
  if (window.location.search.includes('token=')) {
    localStorage.setItem('token', window.location.search.split('token=')[1]);
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/passwords/forgot" component={EmailForm}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/signup" component={DynamicForm}></Route>
        <Route exact path="/activation-pending" component={MessageComp}></Route>
        <Route exact path="/solo" component={SoloPlay}></Route>
        <Route exact path="/instructions" component={Instructions}></Route>
        <Route exact path="/single-player" component={SinglePlayerGame}></Route>
        <Route path="/" component={DynamicForm}></Route>
      </Switch>
    </Router>
  );
}



export default connect(null)(App);
