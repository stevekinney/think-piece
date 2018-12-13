import React from 'react';
import { render } from 'react-dom';

import './index.scss';

import Application from './components/Application';
import PostsProvider from './contexts/PostsProvider';
import UserProvider from './contexts/UserProvider';

render(
  <UserProvider>
    <PostsProvider>
      <Application />
    </PostsProvider>
  </UserProvider>,
  document.getElementById('root'),
);
