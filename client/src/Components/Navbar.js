import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Collapse,
  Container,
  Navbar as RSNavbar,
  NavbarToggler,
  Nav,
  NavbarBrand,
  NavItem,
  NavLink as RSNavLink
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export class Navbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  logout = async () => {
    await localStorage.removeItem('token');
    this.props.refetch();
  };

  render() {
    return (
      <header>
        <RSNavbar color="primary" dark expand="md" className="mb-4">
          <Container>
            <NavbarBrand href="#">בחירות 2019</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink to="/" exact className="nav-link" activeClassName="active">
                    דף הבית &nbsp;
                    <FontAwesomeIcon icon="home" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/others-votes" exact className="nav-link" activeClassName="active">
                    מה אחרים בחרו
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                {this.props.me ? (
                  <NavItem>
                    <RSNavLink href="#" onClick={this.logout}>
                      יציאה &nbsp;
                      <FontAwesomeIcon icon="sign-out-alt" />
                    </RSNavLink>
                  </NavItem>
                ) : (
                  <NavItem>
                    <RSNavLink href="#" onClick={() => this.props.openForm('login')}>
                      כניסה &nbsp;
                      <FontAwesomeIcon icon="sign-in-alt" />
                    </RSNavLink>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
          </Container>
        </RSNavbar>
      </header>
    );
  }
}

export default withRouter(Navbar);
