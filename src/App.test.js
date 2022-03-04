import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const store = createStore(rootReducer, applyMiddleware(thunk));

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('render a login form on login', () => {
//   const { debug } = render(<Provider store={store}>
//     <App />
//   </Provider>);

//   console.log(debug());

//   const linkElement = screen.getByText(/submit/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('render a login form on login', () => {
//   const { debug } = render(<Provider store={store}>
//     <App />
//   </Provider>);

//   console.log(debug());

//   const linkElement = screen.getByText(/submit/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('when on default render of app', () => {

  it('should match snapshot', () => {
    const tree = renderer.create(<Provider store={store}>
      <App />
    </Provider>);
      expect(tree.toJSON()).toMatchSnapshot();
  });

});
