// @flow
import React from 'react';
import styled from 'styled-components';
import AuthForm from 'components/auth/AuthForm';
import oc from 'open-color';
import { Link } from 'react-router-dom';

class AuthContainer extends React.Component {
    render(){
        return (
            <AuthForm />
        )
    }
}

export default AuthContainer;