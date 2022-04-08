import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import {
    Router,
    Switch,
    Route,
  } from "react-router-dom";


import rootReducer from '../../reducers';
import SoloPlay from '../soloPlay';
import { postUser } from '../../actions';


const store = createStore(rootReducer, applyMiddleware(thunk));

const memoryHistory = createMemoryHistory();

memoryHistory.entries[0].pathname = '/solo';

const renderComponent = () => {
    const helpers = render(
      <Provider store={store}>
        <Router history={memoryHistory}>
          <Switch>
            <Route> <SoloPlay /> </Route>
          </Switch>
        </Router>
      </Provider>
    );


    return { ...helpers };
}




describe('<SoloPlay />', () => {

    describe('On Render', () => {
        let location;
        const mockLocation = new URL("https://example.com/solo");
        beforeEach(() => {
            location = window.location;
            mockLocation.replace = jest.fn();
    
            delete window.location;
            window.location = mockLocation;

        });
    
        afterEach(() => {
            window.location = location;
        });

        describe('When user is not logged in', () => {
            it('should direct the user back to the base path', () => {
                renderComponent();

                expect(memoryHistory.location.pathname).toEqual('/');
            });
        });

        describe('When user is logged in', () => {
            beforeAll(() => {
                store.dispatch(postUser)({ username: process.env['USERNAME'], password: process.env['PASSWORD'] });
            });

            describe('Heading H5', () => {
                it('should render the title of the form', () => {
                    renderComponent();

                    const H5Header = screen.getByRole('heading', { level: 5 });
                    expect(H5Header).toHaveStyle("margin: 25px 0px;");
                    expect(H5Header).toHaveTextContent("Welcome to Campaign Mode");
                });
            });

            describe('Heading H6', () => {
                it('should render 3 H6s as expected', () => {
                    renderComponent();

                    const H6Header = screen.getAllByRole('heading', { level: 6 });

                    expect(H6Header).toHaveLength(3);
                });

                it('should render Game Difficulty header tag', () => {
                    renderComponent();

                    const Game_Difficulty = screen.getByRole('heading', { name: 'Game Difficulty' });

                    expect(Game_Difficulty).toHaveTextContent('Game Difficulty');
                });

                it('should render Select Weapon header tag', () => {
                    renderComponent();

                    const Select_Weapon = screen.getByRole('heading', { name: 'Select Weapon' });

                    expect(Select_Weapon).toHaveTextContent('Select Weapon');
                });

                it('should render Backup Supply header tag', () => {
                    renderComponent();

                    const Backup_Supply = screen.getByRole('heading', { name: 'Backup Supply' });

                    expect(Backup_Supply).toHaveTextContent('Backup Supply');
                });
            });

            describe('Pistrol', () => {

                it('should render pistol button', () => {
                    renderComponent();

                    const Pistol = screen.getByRole('button', { name: 'Pistol' });
    
                    expect(Pistol).toBeInTheDocument();
                });

                describe('when clicked', () => {
                    it('should render a popup with 3 dropdowns', () => {
                        renderComponent();

                        fireEvent.click(screen.getByRole('button', { name: 'Pistol' }));

                        const listItems = screen.getAllByRole('menuitem');

                        expect(listItems).toHaveLength(3);
                    });


                    describe('When Shotgun dropdown is clicked', () => {
                        it('should update the button text', () => {
                            renderComponent();

                            const Pistol = screen.getByRole('button', { name: 'Pistol' });

                            fireEvent.click(Pistol);
                            const Shotgun = screen.getByRole('menuitem', { name: 'Shotgun' });
                            fireEvent.click(Shotgun);
                            
                            expect(screen.queryByRole('button', { name: 'Pistol' })).not.toBeInTheDocument();
                            expect(screen.getByRole('button', { name: 'Shotgun' })).toBeInTheDocument();
                        });
                    });
                });
            });


            describe('Novice', () => {
                it('should render novice button', () => {
                    renderComponent();

                    const Novice = screen.getByRole('button', { name: 'Novice' });
    
                    expect(Novice).toBeInTheDocument();
                });

                describe('when clicked', () => {
                  it('should render a popup with 3 dropdowns', () => {
                    renderComponent();

                    fireEvent.click(screen.getByRole('button', { name: 'Novice' }));

                    const listItems = screen.getAllByRole('menuitem');

                    expect(listItems).toHaveLength(3);
                  });

                describe('When Intermediate dropdown is clicked', () =>  {
                    it('should update the button text', () => {
                        renderComponent();

                        const Novice = screen.getByRole('button', { name: 'Novice' });

                        fireEvent.click(Novice);
                        const Intermediate = screen.getByRole('menuitem', { name: 'Intermediate' });
                        fireEvent.click(Intermediate);
                        
                        expect(screen.queryByRole('button', { name: 'Novice' })).not.toBeInTheDocument();
                        expect(screen.getByRole('button', { name: 'Intermediate' })).toBeInTheDocument();
                    });
                  });
                });

            });


            describe('Food', () => {
                it('should render food button', () => {
                    renderComponent();

                    const Food = screen.getByRole('button', { name: 'Food' });

                    expect(Food).toBeInTheDocument();
                });


                describe('when clicked', () => {
                    it('should render a popup with 3 dropdowns', () => {
                      renderComponent();
  
                      fireEvent.click(screen.getByRole('button', { name: 'Food' }));
  
                      const listItems = screen.getAllByRole('menuitem');
  
                      expect(listItems).toHaveLength(3);
                    });


                    describe('When Food dropdown is clicked', () =>  {
                        it('should update the button text', () => {
                            renderComponent();
    
                            const Food = screen.getByRole('button', { name: 'Food' });
    
                            fireEvent.click(Food);
                            const MedPack = screen.getByRole('menuitem', { name: 'MedPack' });
                            fireEvent.click(MedPack);
                            
                            expect(screen.queryByRole('button', { name: 'Food' })).not.toBeInTheDocument();
                            expect(screen.getByRole('button', { name: 'MedPack' })).toBeInTheDocument();
                        });
                      });
                });

            });


            describe('Instructions', () => {
                it('should render a button with Instructions', () => {
                    renderComponent();

                    const Instructions = screen.getByRole('button', { name: 'Instructions' });

                    expect(Instructions).toBeInTheDocument();
                });

                describe('when the Instructions button is clicked', () => {
                    it('should navigate to the instructions path', () => {
                        renderComponent();

                        const Instructions = screen.getByRole('button', { name: 'Instructions' });

                        fireEvent.click(Instructions);

                        expect(memoryHistory.location.pathname).toBe('/instructions');
                    });
                });
            });

            describe('Start Game', () => {
                it('should render the start game button', () => {
                    renderComponent();

                    const StartGame = screen.getByRole('button', { name: 'Start Game' });

                    expect(StartGame).toBeInTheDocument();
                });
            });


        });

    });

});




