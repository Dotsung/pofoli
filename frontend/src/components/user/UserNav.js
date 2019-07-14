// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser as followerIcon } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper, faHeart, faStar, faUser as followingIcon } from '@fortawesome/free-regular-svg-icons'
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
    padding: 0 500px;
    width: 100%;
    height: 30px;
    display: flex;
    box-sizing: border-box;

    @media (max-width: 1920px) {
        padding: 0 500px;
    }
    @media (max-width: 1600px) {
        padding: 0 400px;
    }
    @media (max-width: 1400px) {
        padding: 0 200px;
    }
    @media (max-width: 900px) {
        padding: 0 100px;
    }
    @media (max-width: 700px) {
        padding: 0;
    }
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

    @media (max-width: 700px) {
        display: none;
    }
`

const MobileItem = styled(NavLink)`
    width: 100%;
    text-align: center;
    margin: 0;
    color: ${oc.gray[9]};
    display: none;

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

    @media (max-width: 700px) {
        display: block;
    }
`

const UserInfo = ({username}) => {
    return (
        <Wrapper>
            <Item to={'/user/'+username+'/posts/'} activeClassName="active">Post</Item>
            <Item to={'/user/'+username+'/hearts/'} activeClassName="active">Heart</Item>
            <Item to={'/user/'+username+'/stars/'} activeClassName="active">Star</Item>
            <Item to={'/user/'+username+'/following'} activeClassName="active">Following</Item>
            <Item to={'/user/'+username+'/follower'} activeClassName="active">Follower</Item>
            
            <MobileItem to={'/user/'+username+'/posts/'} activeClassName="active"><FontAwesomeIcon icon={faNewspaper}/></MobileItem>
            <MobileItem to={'/user/'+username+'/hearts/'} activeClassName="active"><FontAwesomeIcon icon={faHeart}/></MobileItem>
            <MobileItem to={'/user/'+username+'/stars/'} activeClassName="active"><FontAwesomeIcon icon={faStar}/></MobileItem>
            <MobileItem to={'/user/'+username+'/following/'} activeClassName="active"><FontAwesomeIcon icon={followingIcon}/></MobileItem>
            <MobileItem to={'/user/'+username+'/follower/'} activeClassName="active"><FontAwesomeIcon icon={followerIcon}/></MobileItem>
        </Wrapper>
    )
}

export default UserInfo;