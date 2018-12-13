import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';

class PostPage extends Component {
  state = { post: {}, comments: [] };

  componentDidMount = async () => {
    const postId = this.props.match.params.id;
    const postDoc = await firestore.doc(`/posts/${postId}`).get();

    const commentsSnapshot = await firestore
      .collection(`/posts/${postId}/comments`)
      .get();

    const comments = commentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const post = {
      id: postDoc.id,
      ...postDoc.data(),
    };

    this.setState({ post, comments });
  };

  createComment = (comment, user) => {
    firestore.collection(`/posts/${this.props.match.params.id}/comments`).add({
      ...comment, user
    })
  };

  render() {
    const { post, comments } = this.state;

    return (
      <section>
        {post && <Post {...post} />}
        <Comments comments={comments} postId={post.id} onCreate={this.createComment} />
        <footer>
          <Link to="/">&larr; Back</Link>
        </footer>
      </section>
    );
  }
}

export default withRouter(PostPage);
