import React, { Component } from 'react';
import RegisterFormBase from './RegisterForm.jsx';
import { withFirebase } from '../../../components/Firebase';
import { withRouter } from 'react-router-dom';

const RegisterForm = withRouter(withFirebase(RegisterFormBase));

export default class Register extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-capitalize">register</h2>
        <RegisterForm />
      </div>
    )
  }
}