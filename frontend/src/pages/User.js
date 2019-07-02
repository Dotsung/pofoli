// @flow
import React from 'react';
import styled from 'styled-components';

import HeaderContainer from 'containers/base/HeaderContainer'

const Content = styled.div`
    margin-top: 55px;
`

const User = () => (
    <>
        <HeaderContainer/>
        <Content>
            User
        </Content>
    </>
)


export default User;