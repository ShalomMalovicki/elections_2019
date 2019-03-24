import React, { Component } from 'react';
import ApoloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import host from './host';

const client = new ApoloClient({
  uri: `${host}/graphql`,
  request: async operation => {
    const token = await localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});

class Store extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  }
}

export default Store;
