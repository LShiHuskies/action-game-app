import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";


const store = createStore(rootReducer, applyMiddleware(thunk));

import DynamicForm from '../dynamicForm';




describe('DynamicForm', () => {
    it('should match snapshot', () => {
      const tree = renderer.create(<Provider store={store}>
          <Router>
            <Switch>
             <Route component={DynamicForm}></Route>
            </Switch>
          </Router>
        </Provider>);
        expect(tree.toJSON()).toMatchSnapshot();
    });
  });
  