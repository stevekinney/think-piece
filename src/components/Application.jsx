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

  handleCreate = async post => {
    const docRef = await firestore.collection('posts').add(post);
    const doc = await docRef.get();

    const newPost = {
      id: doc.id,
      ...doc.data(),
    };

    const { posts } = this.state;
    this.setState({ posts: [newPost, ...posts] });
  };

  handleRemove = async (id) => {
    const allPosts = this.state.posts;

    try {
      await firestore.collection('posts').doc(id).delete();
      const posts = allPosts.filter(post => id !== post.id);
      this.setState({ posts });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts
          posts={posts}
          onCreate={this.handleCreate}
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
