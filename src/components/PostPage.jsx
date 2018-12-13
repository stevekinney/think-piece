import React, { Component } from 'react';

import { withRouter, Link, Redirect } from 'react-router-dom';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';

const collectDocAndData = doc => ({
  id: doc.id,
  ...doc.data(),
});

class PostPage extends Component {
  state = { post: {}, comments: [] };

  get postId() {
    return this.props.match.params.id;
  }

  get postRef() {
    return firestore.doc(`/posts/${this.postId}`);
  }

  get commentsRef() {
    return this.postRef.collection('comments');
  }

  unsubscribeFromPost = [];
  unsubscribeFromComments = [];

  componentDidMount = async () => {
    this.unsubscribeFromPost = this.postRef.onSnapshot(snapshot => {
      const post = collectDocAndData(snapshot);
      this.setState({ post });
    });

    this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
      const comments = snapshot.docs.map(collectDocAndData);
      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromPost();
    this.unsubscribeFromComments();
  };

  createComment = (comment, user) => {
    this.commentsRef.add({
      ...comment,
      user,
    });
  };

  render() {
    const { post, comments } = this.state;

    if (!post) {
      return <Redirect to="/" />;
    }

    return (
      <section>
        {post && <Post {...post} />}
        <Comments
          comments={comments}
          postId={post.id}
          onCreate={this.createComment}
        />
        <footer>
          <Link to="/">&larr; Back</Link>
        </footer>
      </section>
    );
  }
}

export default withRouter(PostPage);
