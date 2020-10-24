import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';
const createApolloClient = (authStorage) => {
  return new ApolloClient({
    uri: Constants.manifest.extra.APOLLO_URI,
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `${accessToken}` : ''
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
};
export default createApolloClient;
