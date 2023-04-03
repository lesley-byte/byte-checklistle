// src/hoc/withAuth.js
import React from 'react';
import { Redirect } from 'react-router-dom';
import authServiceInstance from './auth';

const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      // If the user is not signed in, redirect them to the homepage
      if (!authServiceInstance.loggedIn()) {
        return <Redirect to="/" />;
      }

      // If the user is signed in, render the WrappedComponent
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;
