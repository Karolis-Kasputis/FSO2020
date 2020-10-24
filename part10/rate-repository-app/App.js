import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './src/utilities/apolloClient';
import AuthStorage from './src/utilities/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();

export default function App() {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient(authStorage)}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
}
