import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';

import './App.css';
import Form from './Reusable/form';
import SignUpOrLogin from './Reusable/signupOrLogin';
import SignUpForm from './Reusable/signUpForm';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <Form />
        </Route>
        <Route path="/signup">
          <div className="App">
            <header className="App-header">
              <SignUpForm />
            </header>
          </div>
        </Route>
        <Route path="/">
          <div className="App">
            <header className="App-header">
              <Form />
              <SignUpOrLogin />
            </header>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}



export default connect(null)(App);
