// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
    padding: 0 500px;
    width: 100%;
    height: 30px;
    display: flex;
    box-sizing: border-box;
`

const Item = styled(NavLink)`
    width: 100%;
    text-align: center;
    margin: 0;
    color: ${oc.gray[9]};

    &:link{
        color: ${oc.gray[9]};
        text-decoration: none;
    }
    &:visited{
        color: ${oc.gray[9]};
        text-decoration: none;
    }
    &:hover{
        color: ${oc.indigo[7]};
    }
    &.active{
        color: ${oc.indigo[7]};
        border-bottom: 2px solid ${oc.indigo[7]};
    }
`

const UserInfo = () => {
    return (
        <Wrapper>
            <Item to='/user/post' activeClassName="active">Post</Item>
            <Item to='/user/heart' activeClassName="active">Heart</Item>
            <Item to='/user/star' activeClassName="active">Star</Item>
            <Item to='/user/follow' activeClassName="active">Follow</Item>
            <Item to='/user/follower' activeClassName="active">Follower</Item>
        </Wrapper>
    )
}

export default UserInfo;