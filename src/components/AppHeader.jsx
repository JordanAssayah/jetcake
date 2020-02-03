import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LogoutButton from './LogoutButton.jsx';
import { AuthUserContext } from './Session';

import Logo from '../logo.svg';

export default class AppHeader extends Component {

  static propTypes = {
    authUser: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false
    };
  }

  toggleMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen });

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => {
          return (
            <nav className="container">
              <ul className="list-inline list-inline--justified mrgv">
                <li>
                  <img src={Logo} alt="logo" width="60"/>
                </li>
                <li className="hidden-sm-down">
                  <ul className="list-inline text-capitalize">
                    <li><Link to="/">home</Link></li>
                    {authUser && <li><Link to="/user/profile">my profile</Link></li>}
                  </ul>
                </li>
                <li className="hidden-sm-down">
                    {authUser === null
                      ? <ul className="list-inline list-inline--right list-inline--small">
                          <li><Link to="/register"><button className="btn btn--link text-capitalize">register</button></Link></li>
                          <li><Link to="/login"><button className="btn btn--primary text-capitalize">login</button></Link></li>
                        </ul>
                      : <ul className="list-inline list-inline--small">
                          <li>{authUser.email}</li>
                          <li><LogoutButton /></li>
                        </ul>
                    }
                </li>
                <li className="hidden-md-up">
                  <button className="btn btn--primary btn--small" onClick={this.toggleMenu}>[ {this.state.isMenuOpen ? '-' : '+'} ]</button>
                </li>
              </ul>
              <ul className={"list-stacked list-stacked--small hidden-md-up mrgb " + (!this.state.isMenuOpen && 'hidden')}>
                <li className="text-capitalize"><Link to="/">home</Link></li>
                {authUser && <li className="text-capitalize"><Link to="/user/profile">my profile</Link></li>}
                {authUser === null && <li className="text-capitalize"><Link to="/register">register</Link></li>}
                {authUser === null && <li className="text-capitalize"><Link to="/login">login</Link></li>}
                {authUser && <li><LogoutButton /></li>}
              </ul>
            </nav>
          )
        }}
      </AuthUserContext.Consumer>
    )
  }
}

