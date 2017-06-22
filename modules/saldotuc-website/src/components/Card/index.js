import classNames from 'classnames';
import { format, isToday, isYesterday } from 'date-fns';
import React, { PureComponent } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import Icon from 'components/Icon';
import Menu from './menu';
import MenuItem from 'components/MenuItem';

import DeleteCardMutation from 'mutations/DeleteCardMutation';
import UpdateCardBalanceMutation from 'mutations/UpdateCardBalanceMutation';

import './styles.css';

class Card extends PureComponent {
  state = {
    isOpen: false,
    loading: false,
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
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

  getTimeLabel() {
    const { updatedAt } = this.props.card;

    if (isToday(updatedAt)) {
      return 'Hoy';
    } else if (isYesterday(updatedAt)) {
      return 'Ayer';
    }

    return format(updatedAt, 'D-M-YYYY');
  }

  render() {
    const { card } = this.props;
    const { isOpen } = this.state;

    const className = classNames('card', {
      'card--warning': card.balance < 10,
      'card--danger': card.balance === 0,
    });

    return (
      <div className={className}>
        <div>
          <div className="card__balance">C$ {card.balance}</div>
          <div className="card__meta">
            <div className="card__meta-date">{this.getTimeLabel()}</div>
            <div className="card__meta-time">{format(card.updatedAt, 'hh:mm A')}</div>
          </div>
        </div>
        <div className="card__content">
          <div className="card__name">{card.name}</div>
          <div className="card__number">
            <div className="card__number-label">Número</div>
            <div className="card__number-number">{card.number}</div>
          </div>
        </div>
        <div className="card__actions">
          <button
            className={classNames('card__actions-action', { 'card__actions-action--loading': this.state.loading })}
            onClick={this.handleUpdateBalance}
          >
            <Icon name="attach_money" size={20} />
          </button>
          <button
            className={classNames('card__actions-action', { 'card__actions-action--active': isOpen })}
            onClick={this.toggle}
          >
            <Icon name="more_horiz" />
          </button>
        </div>

        {isOpen && (
          <div className="card__popover">
            <Menu onClickOutside={this.toggle}>
              <div className="Menu">
                <div className="Menu-group">
                  <div className="Menu-group-label">Acciones</div>
                  <MenuItem color="red" onClick={this.handleDelete}>
                    <Icon name="highlight_off" />
                    Eliminar tarjeta
                  </MenuItem>
                </div>
              </div>
            </Menu>
          </div>
        )}
      </div>
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
      updatedAt
    }
  `,
  viewer: graphql`
    fragment Card_viewer on User {
      id
    }
  `,
});
