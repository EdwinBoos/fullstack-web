import React from 'react';
import ReactDOM from 'react-dom';
import NewUser from '../component/NewUser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});
