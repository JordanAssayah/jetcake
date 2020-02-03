import React, { Component } from 'react';
import { withFirebase } from '../../../components/Firebase';

const INITIAL_STATE = {
  uid: null,
  email: '',
  birthdate: '',
  phone: '',
  img: '',
  second_firstname: '',
  job: '',
  shoe_size: '',
  imgUrl: '',
  loading: false,
  error: null
};

class ProfileForm extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          this.setState({ uid: authUser.uid })
          this.props.firebase.getUserDocument(authUser.uid)
            .then(doc => {
              this.setState(doc.data())
              this.props.firebase.getPRofilePictureUrl(doc.data().img)
                .then(url => this.setState({ imgUrl: url }))
            })
            .catch(error => {
              this.setState({ error })
            });
        }
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  onSubmit = event => {
    const {
      uid,
      email,
      birthdate,
      phone,
      second_firstname,
      job,
      img,
      shoe_size,
    } = this.state;

    this.setState({ loading: true });

    const filename = this.fileInput.current.files[0] !== undefined
      ? this.fileInput.current.files[0].name
      : img
    ;

    this.props.firebase
      .createOrUpdateUserDocument(uid, {
        email,
        birthdate,
        phone,
        second_firstname,
        job,
        shoe_size,
        img: filename
      })
      .then(createdUser => {
        if (this.fileInput.current.files[0] !== undefined) {
          this.props.firebase
            .uploadProfilePicture(this.fileInput.current.files[0]);
        }
        this.props.firebase.getPRofilePictureUrl(filename)
          .then(url => this.setState({ imgUrl: url }))
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  triggerFileBrowser = () => document.querySelector('#profile-picture').click();

  render() {
    const {
      email,
      phone,
      birthdate,
      second_firstname,
      job,
      shoe_size,
      loading,
      imgUrl,
      error
    } = this.state;

    return (
      <div className="grid">
        <div className="grid__item sm-w-1/4">
          <img src={imgUrl} alt="profile" className="img-responsive" onClick={this.triggerFileBrowser}/>
          <input type="file" name="file" id="profile-picture" ref={this.fileInput} className="hidden" />
        </div>
        <form className="grid__item sm-w-3/4" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="field-label text-capitalize">email</label>
            <input type="email" name="email" value={email} onChange={this.onChange} className="field" required/>
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
            <button type="submit" className="btn btn--primary text-capitalize">
              { loading ? 'processing...' : 'save' }
            </button>
          </div>

          {error && <p className="msg--error">{error.message}</p>}
        </form>
      </div>
    )
  }
}

export default withFirebase(ProfileForm);