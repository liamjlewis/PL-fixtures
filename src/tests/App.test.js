import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../app';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});
