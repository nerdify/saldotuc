import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';

import CardForm from 'components/CardForm';
import CardList from 'components/CardList';

import withAuth from  'utils/withAuth';

import environment from 'relayEnvironment';

import './styles.css';

function App() {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query AppQuery {
          viewer {
            id
            ...CardList_viewer
          }
        }
      `}
      render={({ props }) => {
        if (props) {
          return (
            <div className="container">
              <h1 className="App-title">Tarjetas</h1>

              <CardForm viewer={props.viewer}/>

              <CardList viewer={props.viewer}/>
            </div>
          );
        }

        return null;
      }}
    />
  );
}

export default withAuth(App);
