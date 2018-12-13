import React, { Component, createContext } from 'react';
import { auth } from '../firebase';
import { createUserDocument } from '../utilities';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = { user: null, loaded: false };

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userInfo => {
      const user = await createUserDocument(userInfo);
      this.setState({ user, loaded: true });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { children } = this.props;

    return <UserContext.Provider value={this.state}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
