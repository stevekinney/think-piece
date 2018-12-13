import React, { Component } from 'react';

import Posts from './Posts';
import UserDashboard from './UserDashboard';

class Application extends Component {
  render() {
    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <UserDashboard />
        <Posts />
      </main>
    );
  }
}

export default Application;
