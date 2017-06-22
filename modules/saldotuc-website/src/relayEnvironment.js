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
    // https://github.com/facebook/relay/issues/1816
    if (operation.query.operation === 'mutation' && json.errors) {
      return Promise.reject(json.errors);
    }

    return Promise.resolve(json);
  });
}

const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
  network,
  store,
});
