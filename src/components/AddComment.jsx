import React, { Component } from 'react';
import withUser from './withUser';
import { withRouter } from 'react-router-dom';
import { firestore } from '../firebase';

class AddComment extends Component {
  state = { content: '' };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();


    const { user } = this.props.user;
    const { id: postId } = this.props.match.params;

    firestore.collection(`posts/${postId}/comments`).add({
      ...this.state, user
    });

    this.setState({ content: '' });
  };

  render() {
    const { content } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="AddComment">
        <input
          type="text"
          name="content"
          placeholder="Comment"
          value={content}
          onChange={this.handleChange}
        />
        <input className="create" type="submit" value="Create Comment" />
      </form>
    );
  }
}

export default withRouter(withUser(AddComment));
