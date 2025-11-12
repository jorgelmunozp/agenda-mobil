import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../src/services/auth/authContext';

export default function Index() {
  const { user, logged } = useContext(AuthContext);

  return <Redirect href={logged ? { pathname: '/(app)/home', params: { userId: String(user?.id) } } : '/(public)/login'} />;
}
