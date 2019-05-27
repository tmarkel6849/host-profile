import React from 'react';
import styled from 'styled-components';
import CoHosts from './CoHosts.jsx';

const Container = styled.div`
  line-height: 1.75;
  height: fit-content;

  @media only screen and (min-width: 1128px) {
    flex-basis: 66.667%;
    margin-right: 64px;
  }
`;
const HiIm = styled.div`
  font-size: 16px;
  font-weight: 800;
  
  @media only screen and (max-width: 744px) {
    display: none;
  }
`;
const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 8px;
`;
const InterHeader = styled.div`
  font-size: 16px;
  font-weight: 800;
  margin-top: 32px;
  display: ${props => props.show ? 'block' : 'none'};
`;
const Interaction = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 8px;
`;

export default function DescriptionBox(props) {
  return (
    <Container>
      <HiIm id='hi-im'>Hi, I'm {props.name}</HiIm>
      <Description id='description'>{props.description}</Description>
      <InterHeader id='interact-header' show={props.interaction === '' ? false : true}>Interaction with guests</InterHeader>
      <Interaction id='interaction' show={props.interaction === '' ? false : true}>{props.interaction}</Interaction>
      <CoHosts coHosts={props.coHosts} />
    </Container>
  );
}