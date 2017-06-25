/**
 * @flow
 * @relayHash c76632119692aa30642ea1d93f27eeb9
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeleteCardMutationVariables = {|
  input: {
    cardId: string;
    clientMutationId?: ?string;
  };
|};

export type DeleteCardMutationResponse = {|
  +deleteCard: ?{|
    +deletedCardId: string;
  |};
|};
*/


/*
mutation DeleteCardMutation(
  $input: DeleteCardInput!
) {
  deleteCard(input: $input) {
    deletedCardId
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteCardInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteCardMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteCardInput!"
          }
        ],
        "concreteType": "DeleteCardPayload",
        "name": "deleteCard",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedCardId",
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
  "name": "DeleteCardMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteCardInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeleteCardMutation",
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
            "type": "DeleteCardInput!"
          }
        ],
        "concreteType": "DeleteCardPayload",
        "name": "deleteCard",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedCardId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation DeleteCardMutation(\n  $input: DeleteCardInput!\n) {\n  deleteCard(input: $input) {\n    deletedCardId\n  }\n}\n"
};

module.exports = batch;
