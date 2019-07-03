// @flow
import React from 'react';
import styled from 'styled-components';

import UserInfo from 'components/user/UserInfo';

const WhiteBox = styled.div`
    margin: 0 400px;
    background: white;
`

const Wrapper = styled.div`
    padding: 20px;
`

const UserContainer = () => {
    return (
        <WhiteBox>
            <Wrapper>
                <UserInfo />
            </Wrapper>
        </WhiteBox>
    )
}

export default UserContainer;