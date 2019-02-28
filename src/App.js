import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const Form = ({ status, message, onValidated }) => {
  let email, firstName, highschool;
  const submit = () =>
    email &&
    firstName &&
    highschool &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value,
      FNAME: firstName.value,
      HIGHSCHOOL: highschool.value
    });

  return (
    <div
      style={{
        background: '#efefef',
        borderRadius: 2,
        padding: 25,
        display: 'inline-block'
      }}
    >
      {status === 'sending' && <div style={{ color: 'blue' }}>Sending...</div>}
      {status === 'error' && (
        <div
          style={{ color: 'red' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === 'success' && (
        <div
          style={{ color: 'green' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        className="Form-input"
        ref={node => (firstName = node)}
        type="text"
        placeholder="First name"
      />
      <br />
      <input
        className="Form-input"
        ref={node => (highschool = node)}
        type="text"
        placeholder="Highschool"
      />
      <br />
      <input
        className="Form-input"
        ref={node => (email = node)}
        type="email"
        placeholder="Email address"
      />
      <br />
      <button className="Form-button" onClick={submit}>
        Submit
      </button>
    </div>
  );
};

class App extends Component {
  render() {
    const url =
      'https://hackvictoria.us18.list-manage.com/subscribe/post?u=ee70a895a8e3588793fb3f906&amp;id=11b75276d1';
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            The first high-school hackathon in BC, Canada.
          </h1>
          <p>
            This event is undergoing planning, fund-raising and development.
          </p>
          <p>Tentative date: 25 May, 2019</p>
        </header>
        <p>Interested in attending? Join our mailing list.</p>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <Form
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
