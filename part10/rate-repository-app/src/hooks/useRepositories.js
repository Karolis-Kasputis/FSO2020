import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const useRepositories = () => {
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });
  const repositories = data?.repositories;

  return { repositories, loading, refetch };
};

export default useRepositories;
