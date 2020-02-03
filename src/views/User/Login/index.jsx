import React, { Component } from 'react';
import LoginFormBase from './LoginForm.jsx';
import { withFirebase } from '../../../components/Firebase';
import { withRouter } from 'react-router-dom';

const LoginForm = withRouter(withFirebase(LoginFormBase));

export default class Login extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-capitalize">login</h2>
        <LoginForm />
      </div>
    )
  }
}