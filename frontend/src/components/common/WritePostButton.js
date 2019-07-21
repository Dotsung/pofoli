import React from 'react';

import styled from 'styled-components';
import oc from 'open-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';

const NewPostButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  font-size: 3rem;
  z-index: 15;
  display: block;
  background-color: ${oc.indigo[6]};
  color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  &:hover{
    background-color: ${oc.indigo[8]};
    color: ${oc.gray[3]};
  }
  &:focus{
    outline: 0;
  }
`

const Icon = styled(FontAwesomeIcon)`
    font-size: 2rem;
    display: block;
    margin: auto;
    padding: 0;
`

const WritePostButton = () => {
    return (
        <Link to="/write">
            <NewPostButton>
                <Icon icon={faPlus} />
            </NewPostButton>
        </Link>
    );
};

export default WritePostButton;