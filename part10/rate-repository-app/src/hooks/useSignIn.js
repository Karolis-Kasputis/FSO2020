import { SIGN_IN } from '../graphql/mutations';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useHistory } from 'react-router-native';

const useSignIn = () => {
  const [mutate, { data }] = useMutation(SIGN_IN);
  const auth = useContext(AuthStorageContext);

  const history = useHistory();
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } }
    });
    const token = data.authorize.accessToken;
    await auth.setAccessToken(token);
    await client.resetStore();
    history.push('/');

    return token;
  };
  return { signIn, data };
};

export default useSignIn;
