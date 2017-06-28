import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UpdateCardBalanceMutation($input: UpdateCardBalanceInput!) {
    updateCardBalance(input: $input) {
      card {
        balance
        id
      }
    }
  }
`;

function commit(environment, card, onCompleted) {
  return commitMutation(
    environment,
    {
      mutation,
      onCompleted,
      variables: {
        input: {
          cardId: card.id,
        },
      },
    }
  );
}

export default {commit};
