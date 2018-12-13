import React, { Component } from 'react'
import { firestore } from '../firebase';

class WithComments extends Component {
  state = { comments: [] };

  componentDidMount = () => {
    const { postId } = this.props;

    console.log({ postId });

    firestore
      .collection(`/posts/${postId}/comments`)
      .onSnapshot(snapshot => {
        const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('onSnapshot', {comments});
        this.setState({ comments });
      })
  }

  render() {

    return (
      <div>{this.props.children(this.state.comments)}</div>
    )
  }

}

export default WithComments;
