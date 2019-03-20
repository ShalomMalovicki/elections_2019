import gql from 'graphql-tag';

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      path
      message
    }
  }
`;
