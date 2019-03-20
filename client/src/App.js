import React, { Component } from 'react';
import ApoloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Main from './Components/Main';
import parties from './parties';
import Alert from './Components/Alert';

const client = new ApoloClient({
  uri: `http://localhost:4000/graphql`
});

class App extends Component {
  state = {
    alert: null,
    visible: false,
    modal: {
      isOpen: false,
      modal: null
    },
    parties,
    sum: parties.reduce((sum, { value }) => sum + value, 0)
  };

  onDismiss = () => {
    this.setState({
      ...this.state,
      alert: null,
      visible: false
    });
  };

  increasePartyValue = party => {
    const { parties } = this.state;
    if (this.state.sum === 120) {
      this.setState({
        ...this.state,
        alert: (
          <Alert
            color="danger"
            visible={true}
            onDismiss={this.onDismiss}
            title="אופס!"
            message="לא נשארו מנדטים"
          />
        )
      });
    } else {
      parties[party].value += 1;
      this.setState({
        ...this.state,
        parties,
        sum: parties.reduce((sum, { value }) => sum + value, 0)
      });
    }
  };

  decreasePartyValue = party => {
    const { parties } = this.state;
    if (parties[party].value > 0) {
      parties[party].value -= 1;
      this.setState({
        ...this.state,
        parties,
        sum: parties.reduce((sum, { value }) => sum + value, 0)
      });
    }
  };

  getForm = formName => {
    switch (formName) {
      case 'login':
        return <Login isOpen={true} closeModal={this.closeForm} openForm={this.openForm} />;
      case 'register':
        return <Register isOpen={true} closeModal={this.closeForm} />;

      default:
        return null;
    }
  };

  openForm = formName => {
    this.setState({
      ...this.state,
      modal: {
        isOpen: true,
        modal: this.getForm(formName)
      }
    });
  };

  closeForm = () => {
    this.setState({
      ...this.state,
      modal: {
        isOpen: false,
        modal: null
      }
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <header>
          <Navbar openForm={this.openForm} />
        </header>
        <section className="container">
          {this.state.alert}
          <Main
            parties={this.state.parties}
            increasePartyValue={this.increasePartyValue}
            decreasePartyValue={this.decreasePartyValue}
          />
        </section>
        {this.state.modal.modal}
      </ApolloProvider>
    );
  }
}

export default App;
