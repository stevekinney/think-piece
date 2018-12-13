import React, { useContext } from 'react'
import { UserContext } from '../providers/UserProvider';
import CurrentUser from './CurrentUser';
import SignInOrSignUp from './SignInOrSignUp';

const Authentication = () => {
  const { user, loaded } = useContext(UserContext);

  if (!loaded) return null;

  return (
    <div>
      {user ? <CurrentUser {...user} /> : <SignInOrSignUp />}
    </div>
  )
};

export default Authentication;
