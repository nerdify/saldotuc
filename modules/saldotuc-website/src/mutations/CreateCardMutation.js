import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreateCardMutation($input: CreateCardInput!) {
    createCard(input: $input) {
      cardEdge {
        cursor
        node {
          balance
          id
          name
          number
        }
      }
    }
  }
`;

let tempID = 0;

function commit(environment, user, name, number, onCompleted, onError) {
  return commitMutation(
    environment,
    {
      mutation,
      onCompleted,
      onError,
      variables: {
        input: {
          name,
          number,
          clientMutationId: tempID++,
        },
      },
      updater: (store) => {
        const payload = store.getRootField('createCard');
        const newEdge = payload.getLinkedRecord('cardEdge');
        const userProxy = store.get(user.id);
        const conn = ConnectionHandler.getConnection(userProxy, 'CardList_cards');

        ConnectionHandler.insertEdgeAfter(conn, newEdge);
      },
    }
  )
}

export default {commit};
