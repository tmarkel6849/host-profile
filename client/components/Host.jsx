import React from 'react';
import styled from 'styled-components';
import PhotoBoxContainer from './PhotoBoxContainer.jsx';

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

    @media only screen and (min-width: 744px) {
      flex-direction: row;
    }
  `;
// PHOTOBOXCONTAINER --- PHOTOBOXCONTAINER --- PHOTOBOXCONTAINER --- PHOTOBOXCONTAINER --- 
// INFOCONTAINER --- INFOCONTAINER --- INFOCONTAINER --- INFOCONTAINER ---
const InfoContainer = styled.section`
      display: flex;
      flex-direction: column;
      line-height: 1.75em;
      flex-basis: 100%;
      margin-top: 32px;

      @media only screen and (min-width: 744px) {
        flex-basis: 66.667%;
        margin-left: 16px;
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
// DESCRIPTION --- DESCRIPTION --- DESCRIPTION --- DESCRIPTION --- DESCRIPTION --- 
const DescriptionBox = styled.div`
        line-height: 1.75;
        height: fit-content;

        @media only screen and (min-width: 1128px) {
          flex-basis: 66.667%;
          margin-left: 32px;
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
const DescHeader = styled.div`
          font-size: 16px;
          font-weight: 800;
          margin-top: 32px;
        `;
const Description = styled.div`
          font-size: 16px;
          font-weight: 400;
          margin-top: 8px;
        `;
// DESCRIPTION --- DESCRIPTION --- DESCRIPTION --- DESCRIPTION --- DESCRIPTION --- 
// STATS --- STATS --- STATS --- STATS --- STATS --- STATS --- STATS ---
const StatsBox = styled.div`
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
// BUTTON --- BUTTON --- BUTTON --- BUTTON --- BUTTON --- 
// INFOCONTAINER --- INFOCONTAINER --- INFOCONTAINER --- INFOCONTAINER ---
const A = styled.a`
  text-decoration:none;
  cursor: pointer;
  color: #484848;
`;

export default class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || -1,
      name: this.props.name || '',
      description: '',
      interaction: '',
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
    const state = this.state;
    let interactionHeader = state.interaction === '' ? null : <DescHeader>Interaction with guests</DescHeader>;
    let interaction = state.interaction === '' ? null : <Description id='interaction'>{state.interaction}</Description>;

    return (
      <HostProfile>
        <MeetYourHost>Meet your host</MeetYourHost>
        <HostInfo>
          <PhotoBoxContainer name={state.name} hostUrl={state.hostUrl}/>
          <InfoContainer>
            <DescriptionBox>
              <HiIm id='hi-im'>Hi, I'm {state.name}</HiIm>
              <Description id='description'>{state.description}</Description>
              {interactionHeader}
              {interaction}
            </DescriptionBox>
            <StatsBox>
              <div id='stats'>
                <div id='joined-in'>Joined in {state.dateJoined}</div>
                <div id='languages'>Languages: {state.languages.join(', ')}</div>
                <div id='responseRate'>Response rate: {state.responseRate}</div>
                <div id='responseTime'>Response time: {state.responseTime}</div>
              </div>
              <A href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                <Contact id='main-button'>CONTACT</Contact>
              </A>
            </StatsBox>
          </InfoContainer>
        </HostInfo>
      </HostProfile>
    );
  }
}