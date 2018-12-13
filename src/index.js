import React from 'react';
import { render } from 'react-dom';

import './index.scss';

import Application from './components/Application';

import PostsProvider from './providers/PostsProvider';
import UserProvider from './providers/UserProvider';

import { BrowserRouter as Router } from 'react-router-dom';

render(
  <Router>
    <UserProvider>
      <PostsProvider>
        <Application />
      </PostsProvider>
    </UserProvider>
  </Router>,
  document.getElementById('root'),
);
