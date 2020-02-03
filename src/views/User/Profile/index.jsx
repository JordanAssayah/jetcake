import React, { Component } from 'react';
import ProfileForm from './ProfileForm.jsx';

export default class Profile extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-capitalize">my profile</h2>
        <ProfileForm />
      </div>
    )
  }
}

