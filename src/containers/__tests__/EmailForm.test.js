import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';


import {
    Router,
    Switch,
    Route
  } from "react-router-dom";


import rootReducer from '../../reducers';
import EmailForm from '../EmailForm';

const store = createStore(rootReducer, applyMiddleware(thunk));
const memoryHistory = createMemoryHistory();

memoryHistory.entries[0].pathname = '/passwords/forgot';






const renderComponent = () => {
    const helpers = render(
      <Provider store={store}>
        <Router history={memoryHistory}>
          <Switch>
            <Route exact path="/passwords/forgot" component={EmailForm}></Route>
          </Switch>
        </Router>
      </Provider>
    );
    return { ...helpers };
}



describe('<EmailForm />', () => {

  describe('EmailForm Snapshot', () => {
    it('should match snapshot', () => {
        const tree = renderer.create(
            <Provider store={store}>
            <Router history={memoryHistory}>
              <Switch>
                <Route> <EmailForm /> </Route>
              </Switch>
            </Router>
          </Provider>
        );
    
        expect(tree.toJSON()).toMatchSnapshot();
      });
  });

  describe('EmailForm', () => {
    let OriginalConsoleError

    beforeAll(() => {
      OriginalConsoleError = console.error;
      console.error = jest.fn();
    });

    afterAll(() => {
      console.error = OriginalConsoleError;
    });

    describe('Heading Title', () => {
      it('should render a heading title', () => {
        renderComponent();

        expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('Forgot Your Username or Password?');
      });
    });

    describe('Heading Description', () => {
      it('should render a <p> with the description', () => {
        renderComponent();

        expect(screen.getByText("Provide your email address and we'll send you instructions to reset your account.")).toBeInTheDocument();
      });
    });

    describe('Email', () => {
      describe('Email Input', () => {
        it('should render Two Email Labels', () => {
          renderComponent();
    
          expect(screen.getAllByText('Email')).toHaveLength(2);
        });
      });
    
      describe('Email HelperTexts', () => {
        it('should render email helper text', () => {
          renderComponent();
    
          expect(screen.getByText(/Please enter your email/i)).toHaveClass('MuiFormHelperText-root MuiFormHelperText-contained Mui-required');
        });
      });

      describe('When entering Email in text input', () => {
        it('should allow user to type', () => {
          renderComponent();

          const Email = screen.getByLabelText('Email *');
          const EmailHelperText = screen.getByText('Please enter your email');

          expect(Email).toBeInTheDocument();
          expect(Email.closest("input").value).toEqual("");

          fireEvent.change(Email, { target: { value: "Hello" } });
    
          expect(Email.closest("input").value).toEqual("Hello");
          expect(EmailHelperText).toHaveStyle({ color: 'rgba(0, 0, 0, 0.54)' });
        });

        describe('After entering the Email in Text Input and removing it', () => {
          it('should make the outline of input box and helper text red', () => {
            renderComponent();

            const Email = screen.getByLabelText('Email *');

            expect(Email).toBeInTheDocument();
            expect(Email.closest("input").value).toEqual("");

            fireEvent.change(Email, { target: { value: "Hello" } });
    
            expect(Email.closest("input").value).toEqual("Hello");

            fireEvent.change(Email, { target: { value: "" } });

            expect(Email.closest("input").value).toEqual("");

            const EmailHelperText = screen.getByText('Please enter your email');

            expect(EmailHelperText).toHaveStyle({ color: 'rgb(244, 67, 54)' });
          });
        });
      });
    });

    describe('BACK button', () => {
      it('should render a back button', () => {
        renderComponent();

        expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
      });

      describe('when clicked', () => {
        it('will go back to the base path', () => {
          renderComponent();

          fireEvent.click(screen.getByRole('button', { name: 'Back' }))

          expect(memoryHistory.location.pathname).toBe('/');
        });
      });
    });
  });
});

