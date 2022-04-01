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
import SinglePlayerGame from './containers/singlePlayerGame';
import GameOver from './containers/GameOver';
import GameProfile from './containers/GameProfile';
import MyAccount from './containers/MyAccount';
import VersusModeLobby from './containers/VersusModeLobby';
import VersusPlayerGame from './containers/VersusPlayerGame';

import Instructions from './components/Instructions';



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
        <Route exact path="/game-over" component={GameOver}></Route>
        <Route exact path="/games/:id" component={GameProfile}></Route>
        <Route exact path="/my-account" component={MyAccount}></Route>
        <Route exact path="/VersusLobby" component={VersusModeLobby}></Route>
        <Route exact path="/VersusBattle" component={VersusPlayerGame}></Route> 
        <Route path="/" component={DynamicForm}></Route>
      </Switch>
    </Router>
  );
}



export default connect(null)(App);
