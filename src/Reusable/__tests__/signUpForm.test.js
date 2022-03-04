import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import SignUpForm from '../signUpForm';
import rootReducer from '../../reducers';


const store = createStore(rootReducer, applyMiddleware(thunk));


const renderComponent = () => {
    const helpers = render(<Provider store={store}>
           <SignUpForm />
         </Provider>);
  
    return { ...helpers };
  };


  describe('SignUpForm', () => {

    describe('Heading with title', () => {
        it('should render a heading with title', () => {
            renderComponent();

            const headingTag = screen.getByRole('heading', { level: 1 });
            expect(headingTag).toHaveTextContent('Create Account');
            expect(headingTag).toHaveStyle("color: rgb(40, 44, 52); text-align: center; margin-top: 0px; padding-top: 15px");
        });
    });

    describe('First Name', () => {
        it('should have first name field', () => {
            renderComponent();

            const firstName = screen.getByLabelText("First Name");
            const firstNameHelperText = screen.getByText("Please enter your first name");

            expect(firstName).toBeInTheDocument();
            expect(firstName.closest("input").value).toEqual("");

            fireEvent.change(firstName, { target: { value: "Hello" } });
            expect(firstName.closest("input").value).toEqual("Hello");
            expect(firstNameHelperText).toBeInTheDocument();
        });
    });

    describe('Last Name', () => {
        it('should have last name field', () => {
            renderComponent();

            const lastName = screen.getByLabelText("Last Name");
            const lastNameHelperText = screen.getByText("Please enter your last name");

            expect(lastName).toBeInTheDocument();
            expect(lastName.closest("input").value).toEqual("");

            fireEvent.change(lastName, { target: { value: "Hello" } });
            expect(lastName.closest("input").value).toEqual("Hello");
            expect(lastNameHelperText).toBeInTheDocument();
        });
    });

    describe('Username', () => {
        it('should have username field', () => {
            renderComponent();

            const userName = screen.getByLabelText("Username *");
            const userNameHelperText = screen.getByText("Please enter your username");

            expect(userName).toBeInTheDocument();
            expect(userName.closest("input").value).toEqual("");

            fireEvent.change(userName, { target: { value: "Hello" } });
            expect(userName.closest("input").value).toEqual("Hello");
            expect(userNameHelperText).toBeInTheDocument();
        });
    });

    describe('Email', () => {
        it("should have an email field", () => {
            renderComponent();

            const email = screen.getByLabelText("Email *");
            const emailHelperText = screen.getByText("Please enter your email");

            expect(email).toBeInTheDocument();
            expect(email.closest("input").value).toEqual("");

            fireEvent.change(email, { target: { value: "Hello" } });
            expect(email.closest("input").value).toEqual("Hello");
            expect(emailHelperText).toBeInTheDocument();
        });
    });

    describe('Password', () => {
        it('should have aa password field', () => {
            renderComponent();

            const password = screen.getByLabelText("Password *");
            const passwordHelperText = screen.getByText("Please enter your password");

            expect(password).toBeInTheDocument();
            expect(password.closest("input").value).toEqual("");

            fireEvent.change(password, { target: { value: "Hello" } });
            expect(password.closest("input").value).toEqual("Hello");
            expect(passwordHelperText).toBeInTheDocument();
        });
    });

    describe('Submit', () => {
        it('should a submit button', () => {
            renderComponent();
            const submit = screen.getByText('Submit');

            expect(fireEvent.click(submit)).toBe(true);
        });
    });

  });



