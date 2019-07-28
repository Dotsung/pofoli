import React from "react";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
`;

const WaitingModal = ({ on }) => {
  return <Modal />;
};

export default WaitingModal;
