import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  if (!id) return {};
  const { data, refetch, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });
  const repository = data?.repository;

  return { repository, refetch, loading };
};

export default useRepository;
