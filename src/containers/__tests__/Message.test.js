import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import rootReducer from '../../reducers';
import MessageComp from '../message';

const store = createStore(rootReducer, applyMiddleware(thunk));

const history = createMemoryHistory();
const renderComponent = () => {

    const helpers = render(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route> <MessageComp /> </Route>
            </Switch>
          </Router>
        </Provider>
      );


    return { ...helpers };
}

describe('<MessageComp />', () => {
    let location;
    const mockLocation = new URL("https://example.com/messages");
    beforeEach(() => {
        location = window.location;
        mockLocation.replace = jest.fn();

        delete window.location;
        window.location = mockLocation;
    });

    afterEach(() => {
        window.location = location;
    });

    describe('When a user is created successfully', () => {
        beforeEach(() => {
            store.dispatch({ type: 'CREATED_USER', payload: { message: 'Hello' } });
        });

        afterEach(() => {
            store.dispatch({ type: 'CREATED_USER', payload: { message: '' } });
        });

        it('will render the message component prompting user to activate account', () => {
            renderComponent();

            expect(screen.getByText('Hello')).toBeInTheDocument();
        });

        it('will render with correct css styling', () => {
             renderComponent();

            expect(screen.getByTestId('custom-message')).toBeInTheDocument();
        });
    });

    describe('When a user is not created successfully', () => {
        it('will not render the Message Component', () => {
            renderComponent();

            expect(screen.queryByText('Hello')).not.toBeInTheDocument();
        });

        it('will redirect to /', () => {
            renderComponent();

            expect(history.length).toBe(1);
        });
    });

});


