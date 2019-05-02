import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import Header from 'components/base/Header';
import styled from 'styled-components';

const StyledButton = styled.button`
    border: 1px solid #000000;
`

class HeaderContainer extends Component {
    render() {
        return (
            <Header>
                <StyledButton>Login</StyledButton>
            </Header>
        );
    }
}

export default HeaderContainer;