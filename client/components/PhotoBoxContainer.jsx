import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex-basis: 100%;
  max-width: 327px;
  height: fit-content;
  
  @media only screen and (min-width: 744px) {
    flex-basis: 33.333%;
  }
  
  @media only screen and (min-width: 1128px) {
    flex-basis: 25%;
    max-width: 302px;
  }
  
  @media only screen and (min-width: 1440px) {
    flex-basis: 16.667%;
  }
`;
const PhotoBox = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .06);
`;
const HostImage = styled.img`
  width: 100%;
`;
const Badge = styled.div`
  position: absolute;
  bottom: 12px;
  right: 7px;
`;
const ScriptName = styled.div`
  font-family: 'Dancing Script', cursive;
  font-size: 2em;
  text-align: center;
  width: 100%;
  height: 100px;
  line-height: 100px;
`;
const BelowImageContact = styled.button`
  margin-top: 32px;
  padding: 10px 54px;
  color: #914669;
  font-weight: 600;
  width: 100%;
  background: transparent;
  border-color: #914669;
  border-style: solid;
  border-width: 2px;
  border-radius: 4px;
  cursor: pointer;
  display: none;

  @media only screen and (min-width: 744px) and (max-width: 1127px) {
    display: block;
  }
`;
const A = styled.a`
  text-decoration:none;
  cursor: pointer;
  color: #484848;
`;


export default function PhotoBoxContainer(props) {
  return (
    <Container id='photo-box-container'>
      <PhotoBox>
        <A id='photo-box-link' href="http://lilbub.com/about">
          <HostImage src={props.hostUrl} title={props.name} alt={props.name}></HostImage>
          <ScriptName>{props.name}</ScriptName>
        </A>
      </PhotoBox>
      <A href="http://lilbub.com/about">
        <BelowImageContact id='below-image-button'>CONTACT</BelowImageContact>
      </A>
    </Container>
  );
} 