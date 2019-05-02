// @flow
import React from 'react';
import HeaderContainer from 'containers/base/HeaderContainer' 
import Trending from './Trending';
import styled from 'styled-components';

const Content = styled.div`
    margin-top: 55px;
`

class Home extends React.Component{
    render(){
        return(
            <>
                <HeaderContainer/>
                <Content>
                    <Trending />
                </Content>
            </>
        )
    }
}

export default Home;