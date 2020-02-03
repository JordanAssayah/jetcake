import React, { Component } from 'react'

const INITIAL_STATE = {
  email: '',
  password: '',
  loading: false,
  error: null,
};

export default class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.setState({ loading: true });

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/user/profile');
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, loading, error } = this.state;
    return (
      <div className="grid" onSubmit={this.onSubmit}>
        <form className="grid__item sm-w-1/3">
          <div className="form-group">
            <label className="field-label text-capitalize">email</label>
            <input type="email" name="email" value={email} onChange={this.onChange} className="field" required/>
          </div>
          <div className="form-group">
            <label className="field-label text-capitalize">password</label>
            <input type="password" name="password" value={password} onChange={this.onChange} className="field" required/>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn--primary text-capitalize" value={loading ? 'processing...' : 'login'}/>
          </div>

          {error && <p className="msg--error">{error.message}</p>}
        </form>
      </div>
    )
  }
}
