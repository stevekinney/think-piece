import React, { Component } from 'react';

import Posts from './Posts';
import UserDashboard from './UserDashboard';

import { Route, Switch } from 'react-router-dom';
import PostPage from './PostPage';

class Application extends Component {
  render() {
    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <UserDashboard />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/:id" component={PostPage} />
        </Switch>
      </main>
    );
  }
}

export default Application;
