import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Form from './form';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

const renderComponent = () => {
    const helpers = render(<Provider store={store}>
           <Form />
         </Provider>);
  
    return { ...helpers };
  };



describe('login form', () => {

    describe('heading title', () => {
        it('should render a heading with a title', () => {
            renderComponent();

            const signIn = screen.getByRole('heading', { level: 1 });

            expect(signIn).toHaveTextContent("Please Sign In");
            expect(signIn).toHaveStyle("color: rgb(40, 44, 52); text-align: center; margin-top: 0px; padding-top: 15px;");
        });
    });

    describe('Username', () => {
        it('should have a Username field', () => {
            renderComponent();

            const usernameTextBox = screen.getByLabelText("Username");
            const userNameHelperText = screen.getByText("Please enter your username");

            expect(usernameTextBox).toBeInTheDocument();
            expect(usernameTextBox.closest("input").value).toEqual("");
      
            fireEvent.change(usernameTextBox, { target: { value: 'Hello' } });
            expect(usernameTextBox.closest("input").value).toEqual("Hello");
            expect(userNameHelperText).toBeInTheDocument();
        });
    });

    describe('Password', () => {
        it('should have a Password field', () => {
            renderComponent();

            const passwordTextBox = screen.getByLabelText("Password");
            const passwordHelperText = screen.getByText("Please enter your password");

            expect(passwordTextBox).toBeInTheDocument();
            expect(passwordTextBox.closest("input").value).toEqual("");
      
            fireEvent.change(passwordTextBox, { target: { value: 'Hello' } });
            expect(passwordTextBox.closest("input").value).toEqual("Hello");
            expect(passwordHelperText).toBeInTheDocument();
        });
    });

    describe('Forgot Username or Password', () => {
        it('should have a forgot username/password button', () => {
            renderComponent();

            const forgotButton = screen.getByRole('button', { name: "Forgot Username or Password" });

            expect(forgotButton).toBeInTheDocument();
            
            expect(fireEvent(forgotButton, new MouseEvent('click'))).toBe(true);
        });
    });

    describe('Submit', () => {
        it('should be able to submit the form', () => {
            renderComponent();

            const submit = screen.getByText('Submit');

            expect(submit).toBeInTheDocument();
            expect(fireEvent.click(submit)).toBe(true);
        });
    });
});
