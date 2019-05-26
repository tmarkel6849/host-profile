import React from 'react';
import styled from 'styled-components';

// STATS --- STATS --- STATS --- STATS --- STATS --- STATS --- STATS ---
const Container = styled.div`
  margin-top: 32px;

  @media only screen and (min-width: 1128px) {
    flex-basis: 33.333%;
    margin-left: -24px;
    margin-top: 0;
  }

  @media only screen and (min-width: 1440px) {
    margin-left: 11.111%;
    padding-left: 12px;
    padding-right: 12px;
  }
`;
// STATS --- STATS --- STATS --- STATS --- STATS --- STATS --- STATS ---
// BUTTON --- BUTTON --- BUTTON --- BUTTON --- BUTTON --- 
const Contact = styled.button`
  margin-top: 32px;
  padding: 10px 54px;
  color: #914669;
  font-weight: 600;
  background: transparent;
  border-color: #914669;
  border-style: solid;
  border-width: 2px;
  border-radius: 4px;
  cursor: pointer;

  @media only screen and (min-width: 744px) and (max-width: 1127px) {
    display: none;
  }
`;
const A = styled.a`
  text-decoration:none;
  cursor: pointer;
  color: #484848;
`;
// BUTTON --- BUTTON --- BUTTON --- BUTTON --- BUTTON ---

export default function StatsBox(props) {
  return (
    <Container>
      <div id='stats'>
        <div id='joined-in'>Joined in {props.dateJoined}</div>
        <div id='languages'>Languages: {props.languages.join(', ')}</div>
        <div id='response-rate'>Response rate: {props.responseRate}</div>
        <div id='response-time'>Response time: {props.responseTime}</div>
      </div>
      <A href='http://lilbub.com/about'>
        <Contact id='main-button'>CONTACT</Contact>
      </A>
    </Container>
  );
}
