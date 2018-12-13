import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withUser = Component => {

  const WrappedComponent = props => (
    <UserContext.Consumer>
      {user => <Component user={user} {...props} />}
    </UserContext.Consumer>
  );

  WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})`;

  return WrappedComponent;
};

export default withUser;
