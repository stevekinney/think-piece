import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserProvider';

import CurrentUser from './CurrentUser';
import SignInOrSignUp from './SignInOrSignUp';

const UserDashboard = () => {
  const user = useContext(UserContext);

  return (
    <div>
      {user ? <CurrentUser {...user} /> : <SignInOrSignUp/> }
    </div>
  )
};

export default UserDashboard;
