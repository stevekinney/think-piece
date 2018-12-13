import React, { useContext } from 'react'
import { UserContext } from '../providers/UserProvider';
import SignIn from './SignIn';
import CurrentUser from './CurrentUser';

const Authentication = () => {
  const { user, loaded } = useContext(UserContext);

  if (!loaded) return null;

  return (
    <div>
      {user ? <CurrentUser {...user} /> : <SignIn />}
    </div>
  )
};

export default Authentication;
