// @flow
import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';

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

    padding-right: 1rem;
    padding-left: 1rem;
`;

// 로고
const Logo = styled.h1`
    font-size: 1.5rem;
    letter-spacing: 1px;
`;

// 중간 여백
const Spacer = styled.div`
    flex-grow: 1;
`;

const Header = ({children}) => {
        return (
            <Positioner>
                <WhiteBackground>
                    <HeaderContents>
                        <Logo>DOTIA</Logo>
                        <Spacer/>
                        {children}
                    </HeaderContents>
                </WhiteBackground>
            </Positioner>
        );
}

export default Header;