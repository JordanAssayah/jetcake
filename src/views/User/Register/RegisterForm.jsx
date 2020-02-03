import React, { Component } from 'react'

const INITIAL_STATE = {
  email: '',
  password: '',
  confirm_password: '',
  birthdate: '',
  phone: '',
  second_firstname: '',
  job: '',
  shoe_size: null,
  loading: false,
  error: null
};

export default class RegisterForm extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {
      email,
      password,
      birthdate,
      phone,
      second_firstname,
      job,
      shoe_size,
    } = this.state;

    this.setState({ loading: true });

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.props.firebase
          .createOrUpdateUserDocument(authUser.user.uid, {
            email,
            birthdate,
            phone,
            second_firstname,
            job,
            shoe_size,
            img: 'avatar.jpg'
          })
          .then(createdUser => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push('/user/profile');
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      email,
      password,
      confirm_password,
      birthdate,
      second_firstname,
      job,
      shoe_size,
      phone,
      loading,
      error
    } = this.state;

    const isInvalid =
      password !== confirm_password ||
      password === '' ||
      email === '' ||
      birthdate === '' ||
      phone === '' ||
      shoe_size === null ||
      job === '' ||
      second_firstname === '';

    return (
      <div className="grid">
        <form className="grid__item sm-w-1/3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="field-label text-capitalize">email</label>
            <input type="email" name="email" value={email} onChange={this.onChange} className="field" required/>
          </div>
          <div className="form-group">
            <label className="field-label text-capitalize">password</label>
            <input type="password" name="password" value={password} onChange={this.onChange} className="field" required/>
          </div>
          <div className="form-group">
            <label className="field-label text-capitalize">password confirmation</label>
            <input type="password" name="confirm_password" value={confirm_password} onChange={this.onChange} className="field" required/>
          </div>
          <div className="form-group">
            <label className="field-label text-capitalize">date of birth</label>
            <input type="date" name="birthdate" value={birthdate} onChange={this.onChange} className="field" required/>
          </div>
          <div className="form-group">
            <label className="field-label text-capitalize">phone number</label>
            <input type="text" name="phone" value={phone} onChange={this.onChange} className="field" required/>
          </div>


          <div className="form-group">
            <label className="field-label text-capitalize">What is your second firstname?</label>
            <input type="text" name="second_firstname" value={second_firstname} onChange={this.onChange} className="field" required/>
          </div>
          <div className="form-group">
            <label className="field-label text-capitalize">What is your day job?</label>
            <input type="text" name="job" value={job} onChange={this.onChange} className="field" required/>
          </div>
          <div className="form-group">
            <label className="field-label text-capitalize">What is your shoe size?</label>
            <input type="number" name="shoe_size" value={shoe_size} onChange={this.onChange} className="field" required/>
          </div>


          <div className="form-group mrgt">
            <button type="submit" className={"btn btn--primary text-capitalize " + (isInvalid === true ? 'btn--disabled' : '')} disabled={isInvalid}>
              { loading ? 'processing...' : 'register' }
            </button>
          </div>

          {error && <p className="msg--error">{error.message}</p>}
        </form>
      </div>
    )
  }
}
