import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import Profile from './containers/profile';
import DynamicForm from './Reusable/dynamicForm';
import emailForm from './containers/emailForm';
import MessageComp from './containers/message';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/passwords/forgot" component={emailForm}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/signup" component={DynamicForm}></Route>
        <Route exact path="/activation-pending" component={MessageComp}></Route>
        <Route path="/" component={DynamicForm}></Route>
      </Switch>
    </Router>
  );
}



export default connect(null)(App);
