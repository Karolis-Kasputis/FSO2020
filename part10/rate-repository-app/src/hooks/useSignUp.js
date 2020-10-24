import useSignIn from './useSignIn';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../graphql/mutations';
const useSignUp = () => {
  const [mutate] = useMutation(SIGN_UP);
  const { signIn } = useSignIn();

  const signUp = async (username, password) => {
    await mutate({ variables: { user: { username, password } } });
    await signIn({ username, password });
  };

  return { signUp };
};

export default useSignUp;
