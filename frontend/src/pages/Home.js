// @flow
import React from 'react';
import styled from 'styled-components';

import HeaderContainer from 'containers/base/HeaderContainer'
import PostCardList from 'containers/common/PostCardList'

const Content = styled.div`
    margin-top: 55px;
`

const Home = () => (
    <>
        <HeaderContainer/>
        <Content>
            <PostCardList />
        </Content>
    </>
)


export default Home;