// @flow
import React from 'react';
import styled from 'styled-components';

import HeaderContainer from 'containers/base/HeaderContainer'
import PostCardList from 'components/common/PostCardList'

const Content = styled.div`
    margin-top: 55px;
`

class Home extends React.Component{
    render(){
        return(
            <>
                <HeaderContainer/>
                <Content>
                    <PostCardList />
                </Content>
            </>
        )
    }
}

export default Home;