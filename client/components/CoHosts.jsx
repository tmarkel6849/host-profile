import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  line-height: 1.75;
  height: fit-content;
  display: ${props => Object.keys(props.coHosts).length === 0 ? 'none' : 'block'};

  @media only screen and (min-width: 1128px) {
    flex-basis: 66.667%;
    margin-left: 0px;
    margin-right: 0px;
  }
`;
const CoHostHeader = styled.div`
  font-size: 16px;
  font-weight: 800;
  margin-top: 32px;
  margin-bottom: 16px;
`;
const CoHost = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => props.margin};
`;
const CoHostPic = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;
const CoHostInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  vertical-align: middle;
`;
const CoHostName = styled.div`
  font-size: 16px;
  font-weight: 800;
`;
const CoHostDateJoined = styled.div`
  font - size: 16px;
  font - weight: 400;
  margin - top: 8px;
`;


export default function CoHosts(props) {
  const length = Object.keys(props.coHosts).length;
  const header = length > 0 ? 'Co-hosts' : 'Co-host';

  const coHostsArray = [];
  for (let key in props.coHosts) {
    coHostsArray.push(props.coHosts[key])
  }

  return (
    <Container coHosts={props.coHosts}>
      <CoHostHeader>{header}</CoHostHeader>
      {coHostsArray.map((coHost, i) => {
        return (
          <CoHost key={i} margin={(length > 1 && i === 0 ? '24px' : '0')}>
            <CoHostPic className='co-host-picture' src={coHost.coHostUrl} />
            <CoHostInfo>
              <CoHostName className='co-host-name'>{coHost.coHostName}</CoHostName>
              <CoHostDateJoined className='co-host-date-joined'>Joined in {coHost.coHostDateJoined}</CoHostDateJoined>
            </CoHostInfo>
          </CoHost>
        );
      })}
    </Container>
  );
}