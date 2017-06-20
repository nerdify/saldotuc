import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import AuthService from 'utils/AuthService';

const auth = new AuthService();

function fetchQuery(operation, variables) {
  return fetch('https://saldotuc.com/api/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${auth.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables,
      query: operation.text,
    }),
  }).then((response) => {
    return response.json();
  }).then((json) => {
    const { errors } = json;

    if (errors) {
      // make sure relay treats this as an error
      return { errors, data: null };
    }

    return json;
  });
}

const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
  network,
  store,
});
