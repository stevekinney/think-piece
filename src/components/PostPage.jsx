import React, { Component } from 'react';

import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';


import { withRouter } from 'react-router-dom';
import withUser from './withUser';

class PostPage extends Component {
  state = { post: null, comments: [] };

  get postId() {
    return this.props.match.params.id;
  }

  get postRef() {
    return firestore.doc(`posts/${this.postId}`);
  }

  get commentsRef() {
    return this.postRef.collection('comments');
  }

  unsubscribeFromPost = null;
  unsubscribeFromComments = null;

  componentDidMount = async () => {
    this.unsubscribeFromPost = this.postRef.onSnapshot(snapshot => {
      const post = collectIdsAndDocs(snapshot);
      this.setState({ post });
    });

    this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
      const comments = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromPost();
    this.unsubscribeFromComments();
  };

  createComment = comment => {
    const { user } = this.props;
    this.commentsRef.add({
      ...comment,
      user
    });
  };

  render() {
    const { post, comments } = this.state;
    console.log(this.props);
    return (
      <section>
        {post && <Post {...post} />}
        <Comments comments={comments} onCreate={this.createComment} />
      </section>
    );
  }
}

export default withRouter(withUser((PostPage)));
