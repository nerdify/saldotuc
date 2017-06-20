import classNames from 'classnames';
import { format, isToday, isYesterday } from 'date-fns';
import React, { PureComponent } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
            </svg>
          </button>
          <button
            className={classNames('card__actions-action', { 'card__actions-action--active': isOpen })}
            onClick={this.toggle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="card__popover">
            <Menu onClickOutside={this.toggle}>
              <div className="Menu">
                <div className="Menu-group">
                  <div className="Menu-group-label">Acciones</div>
                  <MenuItem color="red" onClick={this.handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
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
