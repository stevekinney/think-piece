import React, { Component } from 'react';

import Posts from './Posts';

import { Route, Switch, Link } from 'react-router-dom';
import PostPage from './PostPage';
import UserProfile from './UserProfile';
import UserDashboard from './UserDashboard';

class Application extends Component {
  render() {
    return (
      <main className="Application">
        <Link to="/"><h1>Think Piece</h1></Link>
        <UserDashboard />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/posts/:id" component={PostPage} />
        </Switch>
      </main>
    );
  }
}

export default Application;
