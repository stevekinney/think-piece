import React, { Component } from 'react';

import Posts from './Posts';
import { firestore } from '../firebase';
import { collectIdsAndData } from '../utilities';

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null; // NEW

  componentDidMount = async () => {
    this.unsubscribe = firestore.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => { // NEW
      const posts = snapshot.docs.map(collectIdsAndData);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => { // NEW
    this.unsubscribe();
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} onRemove={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
