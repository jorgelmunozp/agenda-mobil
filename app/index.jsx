// app/index.jsx
import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../src/services/auth/authContext';

export default function Index() {
  const { logged } = useContext(AuthContext);

  return <Redirect href={logged ? '/(app)/home' : '/(public)/login'} />;
}
