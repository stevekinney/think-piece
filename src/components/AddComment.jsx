import React, { Component } from 'react';
import withUser from './withUser';

class AddComment extends Component {
  state = { content: '' };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onCreate, user } = this.props;

    onCreate(this.state, user);

    this.setState({ content: '' });
  };

  render() {
    const { content } = this.state;
    console.log(this.props);
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

AddComment.defaultProps = {
  onCreate() {}
};

export default withUser(AddComment);
