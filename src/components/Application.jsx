import React, { Component } from 'react';

import Posts from './Posts';
import { firestore } from '../firebase';

class Application extends Component {
  state = {
    posts: [],
  };

  componentDidMount = async () => {
    const snapshot = await firestore.collection('posts').get();

    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    this.setState({ posts });
  };

  handleCreate = async (post) => {
    const documentReference = await firestore.collection('posts').add(post);
    const data = await documentReference.get();

    const newPost = {
      id: documentReference.id,
      ...data
    }

    const { posts } = this.state;
    this.setState({ posts: [newPost, ...posts] });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} />
      </main>
    );
  }
}

export default Application;
