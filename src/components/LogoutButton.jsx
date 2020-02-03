import React from 'react';
import { withFirebase } from './Firebase';
import { withRouter } from 'react-router-dom';


const LogoutButton = ({ firebase, history }) => (
  <button className="btn btn--default text-capitalize" onClick={() => {history.replace('/login'); firebase.doSignOut()} }>
    logout
  </button>
);

export default withRouter(withFirebase(LogoutButton));