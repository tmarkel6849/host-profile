import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

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
const PhotoBoxContainer = styled.div`
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
// PHOTOBOX --- PHOTOBOX --- PHOTOBOX --- PHOTOBOX --- PHOTOBOX ---
const PhotoBox = styled.div`
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .06);
      `;
const HostImage = styled.img`
          width: 100%;
        `;
const ScriptName = styled.div`
          font-family: 'Dancing Script', cursive;
          font-size: 2em;
          text-align: center;
          width: 100%;
          height: 100px;
          line-height: 100px;
        `;
// PHOTOBOX --- PHOTOBOX --- PHOTOBOX --- PHOTOBOX --- PHOTOBOX --- 
// BUTTON --- BUTTON --- BUTTON --- BUTTON --- BUTTON --- 
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
// BUTTON --- BUTTON --- BUTTON --- BUTTON --- BUTTON --- 
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
      // id: Math.ceil(Math.random() * 100),
      // id: this.props.id,
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
        });
    } else if (this.state.name !== '') {
      fetch(`http://localhost:3004/host/name/${this.state.name}`, {
        method: 'GET'
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            id: data.id,
            description: data.description,
            interaction: data.interaction,
            dateJoined: data.dateJoined,
            languages: data.languages,
            responseRate: data.responseRate,
            responseTime: data.responseTime,
            hostUrl: data.hostUrl
          });
        });
    }
  }
  render() {
    const state = this.state;
    let interactionHeader = state.interaction === '' ? null : <DescHeader>Interaction with guests</DescHeader>;
    let interaction = state.interaction === '' ? null : <Description>{state.interaction}</Description>;

    return (
      <HostProfile>
        <MeetYourHost>Meet your host</MeetYourHost>
        <HostInfo>
          <PhotoBoxContainer>
            <PhotoBox><A href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
              <HostImage src={state.hostUrl} title={state.name} alt={state.name}></HostImage>
              <ScriptName>{state.name}</ScriptName></A>
            </PhotoBox>
            <A href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
              <BelowImageContact >CONTACT</BelowImageContact>
            </A>
          </PhotoBoxContainer>
          <InfoContainer>
            <DescriptionBox>
              <HiIm>Hi, I'm {state.name}</HiIm>
              <Description>{state.description}</Description>
              {interactionHeader}
              {interaction}
            </DescriptionBox>
            <StatsBox>
              <div id="info">
                <div className="info">Joined in {state.dateJoined}</div>
                <div className="info">Languages: {state.languages.join(', ')}</div>
                <div className="info">Response rate: {state.responseRate}</div>
                <div className="info">Response time: {state.responseTime}</div>
              </div>
              <A href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <Contact >CONTACT</Contact>
              </A>
            </StatsBox>
          </InfoContainer>
        </HostInfo>
      </HostProfile>
    );
  }
}