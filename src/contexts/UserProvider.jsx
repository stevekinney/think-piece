import React, { Component, createContext } from 'react';
import { auth, createUserDocument, firestore, getUserDocument } from '../firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = { user: null };

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      let unsubscribeFromUser;
      if (user) {
        unsubscribeFromUser = firestore.collection('users').doc(user.uid).onSnapshot(async snapshot => {
          const currentUser = await getUserDocument(user.uid);
          console.log({currentUser});
          this.setState({ user: currentUser });
        });
        const currentUser = await createUserDocument(user);
        return this.setState({ user: currentUser });
      } else {
        unsubscribeFromUser && unsubscribeFromUser();
        this.setState({ user: null });
      }
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
