import React, { Component } from 'react';

import Posts from './Posts';
import CurrentUser from './CurrentUser';

import { firestore, auth } from '../firebase';
import { collectIdsAndData, createUserDocument } from '../utilities';
import SignInOrSignUp from './SignInOrSignUp';

class Application extends Component {
  state = {
    posts: [],
    user: null,
    userLoaded: false
  };

  unsubscribe = null; // NEW
  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore
      .collection('posts')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectIdsAndData);
        this.setState({ posts });
      });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userInfo => {
      const user = await createUserDocument(userInfo);
      console.log(user);
      this.setState({ user, userLoaded: true });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
    this.unsubscribeFromAuth();
  };


  render() {
    const { posts, user, userLoaded } = this.state;

    const userInformation = user ? <CurrentUser {...user} /> : <SignInOrSignUp />

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        { userLoaded && userInformation }
        <Posts posts={posts} onCreate={this.handleCreate} onRemove={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
