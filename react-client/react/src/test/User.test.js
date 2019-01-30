import React from 'react';
import ReactDOM from 'react-dom';
import User from '../component/User';

it('renders without crashing', () => {
  const match = { params : { userId : 2 }};
  const div = document.createElement('div');
  ReactDOM.render(<User match={match}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
