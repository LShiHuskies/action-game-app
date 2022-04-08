import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import renderer from 'react-test-renderer';


import {
    Router,
    Switch,
    Route
  } from "react-router-dom";



import ButtonAppBar from '../buttonAppBar';



const history = createMemoryHistory();
const renderComponent = () => {
    const helpers = render(<Router history={history}>
        <Switch>
          <Route> <ButtonAppBar /> </Route>
        </Switch>
      </Router>);

    return { ...helpers };
}



describe('<ButtonAppBar />', () => {
    it('should match snapshot', () => {
        const tree = renderer.create(<Router history={history}>
            <Switch>
              <Route> <ButtonAppBar /> </Route>
            </Switch>
          </Router>);

          expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should have a button on page', () => {
        renderComponent();

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    describe('when clicking the button', () => {
        it('should trigger the opening with dropdown menu with 3 menuitems', () => {
            renderComponent();
            fireEvent.click(screen.getByRole('button'));

            expect(screen.getByRole('menu')).toBeInTheDocument();
            expect(screen.getByRole('menuitem', { name: 'Profile' })).toBeInTheDocument();
            expect(screen.getByRole('menuitem', { name: 'My account' })).toBeInTheDocument();
            expect(screen.getByRole('menuitem', { name: 'Logout' })).toBeInTheDocument();
        });


        describe('after clicking profile selection', () => {
        
            describe('when the current pathnaame is already profile', () => {
                let location;
                const mockLocation = new URL("https://example.com/profile");
                beforeEach(() => {
                    location = window.location;
                    mockLocation.replace = jest.fn();
            
                    delete window.location;
                    window.location = mockLocation;
                });
            
                afterEach(() => {
                    window.location = location;
                });
    
                it('should not push into the history', () => {
                    renderComponent();
                    fireEvent.click(screen.getByRole('button'));
                    const previousHistoryLength = history.length;
                    fireEvent.click(screen.getByRole('menuitem', { name: 'Profile' }));
    
                    expect(previousHistoryLength).toEqual(history.length);
                });
            });



            describe('when the current pathname is not already profile', () => {
                let location;
                const mockLocation = new URL("https://example.com/something");
                let originalError;
                beforeEach(() => {
                    location = window.location;
                    mockLocation.replace = jest.fn();
            
                    delete window.location;
                    window.location = mockLocation;
                    originalError = console.error;
                    console.error = jest.fn();
                });
            
                afterEach(() => {
                    window.location = location;
                    console.error = originalError;
                });

                it('should direct to the profile path', () => {
                    renderComponent();
                    fireEvent.click(screen.getByRole('button'));
    
                    fireEvent.click(screen.getByRole('menuitem', { name: 'Profile' }));

                    expect(history.length).toBe(2);
                });
            });


        });

    });


});
