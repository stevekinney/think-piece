import React, { Component } from 'react';

import { withRouter, Link, Redirect } from 'react-router-dom';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { collectIdsAndData } from '../utilities';

class PostPage extends Component {
  state = { post: null, comments: [], loaded: false };

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
      const post = collectIdsAndData(snapshot);
      this.setState({ post, loaded: true });
    });

    this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
      const comments = snapshot.docs.map(collectIdsAndData);
      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromPost();
    this.unsubscribeFromComments();
  };

  createComment = (comment, user) => {
    console.log('create comment');
    this.commentsRef.add({
      ...comment,
      user,
    });
  };

  render() {
    const { post, comments, loaded } = this.state;

    if (!loaded) return <p>Loading…</p>;

    console.log(comments);

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
