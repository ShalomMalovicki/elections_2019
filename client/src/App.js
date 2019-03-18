import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Main from './Components/Main';

class App extends Component {
  state = {
    modal: {
      isOpen: false,
      modal: null
    },
    parties: [
      {
        name: 'הליכוד',
        value: 0
      },
      {
        name: 'העבודה',
        value: 0
      },
      {
        name: 'כחול לבן',
        value: 0
      },
      {
        name: 'כולנו',
        value: 0
      },
      {
        name: 'רע"ם-בל"ד',
        value: 0
      },
      {
        name: 'ש"ס',
        value: 0
      },
      {
        name: 'הדות התורה',
        value: 0
      },
      {
        name: 'מרצ',
        value: 0
      },
      {
        name: 'ישראל ביתנו',
        value: 0
      },
      {
        name: 'איחוד מפלגות הימין',
        value: 0
      },
      {
        name: 'חד"ש-תע"ל',
        value: 0
      },
      {
        name: 'הימין החדש',
        value: 0
      },
      {
        name: 'גשר',
        value: 0
      }
    ]
  };

  increasePartyValue = party => {
    const { parties } = this.state;
    parties[party].value += 1;
    this.setState({
      ...this.state,
      parties
    });
  };

  decreasePartyValue = party => {
    const { parties } = this.state;
    if (parties[party].value > 0) {
      parties[party].value -= 1;
    }
    this.setState({
      ...this.state,
      parties
    });
  };

  getForm = formName => {
    switch (formName) {
      case 'login':
        return <Login isOpen={true} closeModal={this.closeForm} />;
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
      <>
        <header>
          <Navbar openForm={this.openForm} />
        </header>
        <section>
          <Main
            parties={this.state.parties}
            increasePartyValue={this.increasePartyValue}
            decreasePartyValue={this.decreasePartyValue}
          />
        </section>
        {this.state.modal.modal}
      </>
    );
  }
}

export default App;
