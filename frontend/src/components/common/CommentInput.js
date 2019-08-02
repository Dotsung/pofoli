// @flow
import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { observer, inject } from "mobx-react";

import * as commentApi from "lib/api/comment";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
    display: flex;
    margin: 5px 0;
    padding: 10px 0;

    @media (max-width: 700px) {
        border-top: 1px solid ${oc.gray[5]};
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff
        margin-bottom: 0px;
    }
`;

const UserThumbnail = styled.img`
  display: block;
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 50%;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 0.3rem;
  margin-left: 1rem;

  @media (max-width: 700px) {
    margin-left: 0;
    flex-direction: column;
    align-items: flex-end;
    padding: 0px 20px;
  }
`;

const Border = styled.span`
  position: absolute;
  display: block;
  top: 2rem;
  left: 0;
  height: 2px;
  width: 83%;
  background: ${oc.indigo[6]};
  transform: scaleX(0);
  transform-origin: 0 0;
  transition: all 0.15s ease;
  @media (max-width: 700px) {
    width: calc(100% - 40px);
    margin-left: 20px;
  }
`;
const SubmitButton = styled.button`
  margin-top: 1px;
  border: 2px solid ${oc.indigo[3]};
  background-color: ${oc.indigo[3]};
  font-size: 1rem;
  width: 4rem;
  height: 2rem;
  color: white;

  ${props =>
    props.on
      ? `border: 2px solid ${oc.indigo[7]};
            background-color: ${oc.indigo[7]};`
      : ``}
  @media (max-width: 700px) {
    ${props =>
      props.focus
        ? `display: block;
           margin-top: 8px;`
        : `display: none`};
  }
`;

const Input = styled.input`
  display: block;
  width: 83%;
  height: 2rem;
  border: 0;
  padding: 0;
  font-size: 1rem;
  border-bottom: 1px solid ${oc.indigo[2]};
  background: none;
  border-radius: 0;
  color: black;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(170, 170, 170, 0.3);
  }

  &:focus {
    background: none;
    outline: none;
  }

  &:focus ~ ${Border} {
    transform: scaleX(1);
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
`;

@inject("userStore")
@observer
class CommentInput extends React.Component {
  state = {
    body: "",
    focus: false
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.body === "") {
      return;
    }

    const body = this.state.body;

    this.props.appendComment({
      authorThumbnail: this.props.userStore.thumbnail,
      authorUsername: this.props.userStore.username,
      body: body
    });

    this.setState({
      body: ""
    });

    commentApi
      .write({
        token: this.props.userStore.token,
        body: body,
        postid: this.props.postid
      })
      .then(result => {
        console.log(result);
        console.log("성공");
      })
      .catch(result => {
        console.log(result);
        console.log("실패");
      });
  };

  handleFocus = () => {
    this.setState({ focus: true });
  };
  handleBlur = () => {
    setTimeout(() => {
      this.setState({ focus: false });
    }, 250);
  };
  render() {
    return (
      <Wrapper>
        <UserThumbnail src={this.props.userStore.thumbnail} />
        <Form onSubmit={this.onSubmit}>
          <Input
            name="body"
            value={this.state.body}
            onChange={this.onChange}
            autoComplete="off"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder="답글 남기기"
          />
          <Spacer />
          <SubmitButton
            focus={this.state.focus}
            on={this.state.body === "" ? 0 : 1}
          >
            댓글
          </SubmitButton>
          <Border />
        </Form>
      </Wrapper>
    );
  }
}

export default CommentInput;
