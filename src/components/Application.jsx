import React, { Component } from 'react';

import Posts from './Posts';
import CurrentUser from './CurrentUser';

import { firestore, auth } from '../firebase';
import { collectIdsAndData, createUserDocument } from '../utilities';
import SignInOrSignUp from './SignInOrSignUp';
import Authentication from './Authenication';

class Application extends Component {

  render() {
    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication  />
        <Posts />
      </main>
    );
  }
}

export default Application;
