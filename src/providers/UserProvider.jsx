import React, { Component, createContext } from 'react';
import { auth } from '../firebase';
import { createUserDocument, collectIdsAndData } from '../utilities';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = { user: null, loaded: false };

  unsubscribeFromAuth = null;
  unsubscribeFromUser = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userInfo => {
      const userRef = await createUserDocument(userInfo);

      userRef.onSnapshot(snapshot => {
        const user = collectIdsAndData(snapshot);
        this.setState({ user, loaded: true });
      });
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
