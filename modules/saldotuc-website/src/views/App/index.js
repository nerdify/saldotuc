import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';

import CardForm from 'components/CardForm';
import CardList from 'components/CardList';
import Container from 'components/Container';

import withAuth from  'utils/withAuth';

import environment from 'relayEnvironment';

import { Title } from './style';

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
            <Container>
              <Title>Tarjetas</Title>

              <CardForm viewer={props.viewer}/>

              <CardList viewer={props.viewer}/>
            </Container>
          );
        }

        return null;
      }}
    />
  );
}

export default withAuth(App);
