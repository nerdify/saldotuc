import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import Card from 'components/Card';

function CardList(props) {
  return (
    <div>
      {props.viewer.cards.edges.map(edge =>
        <Card
          card={edge.node}
          key={edge.node.id}
          viewer={props.viewer}
        />
      )}
    </div>
  )
}

export default createFragmentContainer(CardList, {
  viewer: graphql`
    fragment CardList_viewer on User {
      ...Card_viewer
      cards(first: 2147483647) @connection(key: "CardList_cards") {
        edges {
          node {
            id
            ...Card_card
          }
        }
      }
    }
  `,
});
