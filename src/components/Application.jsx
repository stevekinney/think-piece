import React, { Component } from 'react';

import Posts from './Posts';
import Authentication from './Authenication';

import { Switch, Link, Route } from 'react-router-dom';
import UserProfile from './UserProfilePage';
import PostPage from './PostPage';

class Application extends Component {

  render() {
    return (
      <main className="Application">
        <Link to="/"><h1>Think Piece</h1></Link>
        <Authentication  />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/profile" component={UserProfile} />
          <Route path="/posts/:id" component={PostPage} />
        </Switch>
      </main>
    );
  }
}

export default Application;
