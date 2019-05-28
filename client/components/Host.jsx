import React from 'react';
import styled from 'styled-components';
import PhotoBoxContainer from './PhotoBoxContainer.jsx';
import DescriptionBox from './DescriptionBox.jsx';
import StatsBox from './StatsBox.jsx';

const HostProfile = styled.section`
  font-family: 'Roboto', sans-serif;
  max-width: 1760px;
  color: #484848;
  padding-left: 24px;
  padding-right: 24px;
  
  @media only screen and (min-width: 744px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  
  @media only screen and (min-width: 1128px) {
    padding-left: 80px;
    padding-right: 80px;
  }
  
  @media only screen and (min-width: 1440px) {
    padding-left: 80px;
    padding-right: 80px;
  }
`;
const MeetYourHost = styled.div`
  margin-top: 48px;
  font-size: 24px;
  font-weight: 800;
  line-height: 40px;
  margin-bottom: 32px;
  flex-basis: 100%;

  @media only screen and (min-width: 744px) {
    font-size: 32px;
  }
`;
const HostInfo = styled.section`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (min-width: 744px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;
const InfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  line-height: 1.75em;
  flex-basis: 100%;
  margin-top: 32px;

  @media only screen and (min-width: 744px) {
    flex-basis: 66.667%;
    margin-left: 24px;
    margin-top: 0;
  }

  @media only screen and (min-width: 1128px) {
    flex-basis: 75%;
    flex-direction: row;
  }
  
  @media only screen and (min-width: 1440px) {
    flex-basis: 83.333%;
    flex-direction: row;
  }
`;

export default class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || -1,
      name: '',
      description: '',
      interaction: '',
      coHosts: {},
      dateJoined: '',
      languages: [],
      responseRate: '',
      responseTime: '',
      hostUrl: ''
    };
  }
  componentDidMount() {
    if (this.state.id !== -1) {
      fetch(`http://localhost:3004/host/id/${this.state.id}`, {
        method: 'GET'
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            name: data.name,
            description: data.description,
            interaction: data.interaction,
            coHosts: data.coHosts,
            dateJoined: data.dateJoined,
            languages: data.languages,
            responseRate: data.responseRate,
            responseTime: data.responseTime,
            hostUrl: data.hostUrl
          });
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    let state = JSON.parse(JSON.stringify(this.state));
    const length = Object.keys(state.coHosts).length;

    let greeting = 'Meet your host';
    if (length > 0) {
      greeting = 'Meet your hosts';
    }

    return (
      <HostProfile>
        <MeetYourHost>{greeting}</MeetYourHost>
        <HostInfo>
          <PhotoBoxContainer
            name={state.name}
            hostUrl={state.hostUrl} />
          <InfoContainer>
            <DescriptionBox
              name={state.name}
              description={state.description}
              interaction={state.interaction}
              coHosts={state.coHosts} />
            <StatsBox 
              dateJoined={state.dateJoined}
              languages={state.languages}
              responseRate={state.responseRate}
              responseTime={state.responseTime} />
          </InfoContainer>
        </HostInfo>
      </HostProfile>
    );
  }
}