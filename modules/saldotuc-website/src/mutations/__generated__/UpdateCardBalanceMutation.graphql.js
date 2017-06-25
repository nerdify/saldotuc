/**
 * @flow
 * @relayHash d4153bd7da7fa77137ca5a504abc9e8d
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type UpdateCardBalanceMutationVariables = {|
  input: {
    cardId: string;
    clientMutationId?: ?string;
  };
|};

export type UpdateCardBalanceMutationResponse = {|
  +updateCardBalance: ?{|
    +card: ?{|
      +balance: ?number;
      +id: string;
      +updatedAt: ?string;
    |};
  |};
|};
*/


/*
mutation UpdateCardBalanceMutation(
  $input: UpdateCardBalanceInput!
) {
  updateCardBalance(input: $input) {
    card {
      balance
      id
      updatedAt
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateCardBalanceInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateCardBalanceMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateCardBalanceInput!"
          }
        ],
        "concreteType": "UpdateCardBalancePayload",
        "name": "updateCardBalance",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Card",
            "name": "card",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "balance",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "updatedAt",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "UpdateCardBalanceMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateCardBalanceInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "UpdateCardBalanceMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateCardBalanceInput!"
          }
        ],
        "concreteType": "UpdateCardBalancePayload",
        "name": "updateCardBalance",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Card",
            "name": "card",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "balance",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "updatedAt",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation UpdateCardBalanceMutation(\n  $input: UpdateCardBalanceInput!\n) {\n  updateCardBalance(input: $input) {\n    card {\n      balance\n      id\n      updatedAt\n    }\n  }\n}\n"
};

module.exports = batch;
