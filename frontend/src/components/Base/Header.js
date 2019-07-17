// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

// 상단 고정
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 10;
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
`;

// 해더의 내용
const HeaderContents = styled.div`
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 1rem;
`;

// 로고
const Logo = styled(Link)`
    font-size: 1.5rem;
    letter-spacing: 1px;
    font-weight: bold;
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
`;

// 중간 여백
const Spacer = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
`;

const Header = ({setDropdown, children}) => {
        return (
            <Positioner>
                <WhiteBackground>
                    <HeaderContents >
                        <Logo to='/'>DOTIA</Logo>
                        <Spacer onClick={()=>{setDropdown(false)}}/>
                        {children}
                    </HeaderContents>
                </WhiteBackground>
            </Positioner>
        );
}

export default Header;