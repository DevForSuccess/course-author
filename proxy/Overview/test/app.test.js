const React = require('react');
const renderer = require ('react-test-renderer');
const App = require('../client/app.jsx');
const Enzyme = require ('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
import 'regenerator-runtime/runtime';
import { shallow, mount, render } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-dom', () => ({
  render: jest.fn(),
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    Events: []
  }
}));

describe('Overview rendering',() =>{
  test('App should render correctly', () => {
    const root = document.createElement("div");
    root.id = "app";
    document.body.appendChild(root);
    const wrapper = render(<App />);
    expect(render).toHaveBeenCalledWith(<App />, root)
  });
});
