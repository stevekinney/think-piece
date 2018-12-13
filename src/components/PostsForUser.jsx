import React, { Component } from 'react'
import { firestore } from '../firebase';
import { collectIdsAndData } from '../utilities';

class PostsForUser extends Component {
  state = { posts: [] };

  unsubscribe = null;

  componentDidMount = () => {
    const { uid } = this.props;
    this.unsubscribe = firestore.collection('posts').where('user.uid', '==', uid).orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndData);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  render() {
    return (
      <div className="Posts">
        {this.props.children(this.state.posts)}
      </div>
    )
  }
}

export default PostsForUser;
