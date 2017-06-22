import React, { PureComponent } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import Icon from 'components/Icon';

import DeleteCardMutation from 'mutations/DeleteCardMutation';
import UpdateCardBalanceMutation from 'mutations/UpdateCardBalanceMutation';

import {
  Action,
  ActionList,
  Balance,
  Circle,
  Meta,
  Name,
  Number,
  Wrapper,
} from './style';

class Card extends PureComponent {
  state = {
    loading: false,
  }

  handleUpdateBalance = () => {
    this.setState({
      loading: true,
    });

    UpdateCardBalanceMutation.commit(
      this.props.relay.environment,
      this.props.card,
      () => {
        this.setState({
          loading: false,
        });
      }
    );
  }

  handleDelete = () => {
    DeleteCardMutation.commit(
      this.props.relay.environment,
      this.props.viewer,
      this.props.card
    )
  }

  render() {
    const { card } = this.props;
    const { balance } = card;

    let color = '#7fbc3d';

    if (balance === 0) {
      color = '#f46b66';
    } else if (balance < 10) {
      color = '#ffbf41';
    }

    return (
      <Wrapper>
        <Name>
          {card.name}
        </Name>
        <Meta>
          <Circle color={color} size={12} />
          <Number>
            {card.number}
          </Number>
          <Balance>
            C$ {balance}
          </Balance>
        </Meta>
        <ActionList>
          <Action onClick={this.handleUpdateBalance}>
            <Icon name="attach_money" size={20} />
            <div>Consultar Saldo</div>
          </Action>
          <Action onClick={this.handleDelete}>
            <Icon name="highlight_off" size={20} />
            <div>Eliminar</div>
          </Action>
        </ActionList>
      </Wrapper>
    );
  }
}

export default createFragmentContainer(Card, {
  card: graphql`
    fragment Card_card on Card {
      balance
      id
      name
      number
    }
  `,
  viewer: graphql`
    fragment Card_viewer on User {
      id
    }
  `,
});
