import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { GET_ME } from './queries';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Main from './Components/Main';
import OthersVotes from './Components/OthersVotes';
class App extends Component {
  state = {
    alert: null,
    visible: false,
    modal: {
      isOpen: false,
      modal: null
    }
  };

  getForm = formName => {
    switch (formName) {
      case 'login':
        return (
          <Login
            isOpen={true}
            closeModal={this.closeForm}
            openForm={this.openForm}
            refetch={this.refetch}
          />
        );
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

  refetch = () => {
    this.props.data.refetch();
  };

  render() {
    return (
      <>
        <Router>
          <Navbar openForm={this.openForm} me={this.props.data.me} refetch={this.refetch} />
          <Route
            exact
            path="/"
            render={() => (
              <section className="container">
                {this.state.alert}
                <Main me={this.props.data.me} openForm={this.openForm} />
              </section>
            )}
          />
          <Route exact path="/others-votes" component={OthersVotes} />
        </Router>
        {this.state.modal.modal}
      </>
    );
  }
}

export default graphql(GET_ME)(App);
