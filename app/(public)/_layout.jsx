import { Slot, Redirect } from 'expo-router';
import { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../src/services/auth/authContext';

export default function PublicLayout() {
  const { user, logged, restored } = useContext(AuthContext);

  if (!restored) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#5c3b99'}}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (logged) {
    return <Redirect href={{ pathname: '/(app)/home', params: { userId: String(user?.id) } }} />;
  }

  return <Slot />;
}
