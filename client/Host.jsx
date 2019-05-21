import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const HostProfile = styled.section`
  font-family: 'Roboto', sans-serif;
  color: #484848;
  margin-left: 32px;
`;
const MeetYourHost = styled.div`
  margin-top: 32px;
  font-size: 32px;
  font-weight: 800;
  line-height: 40px;
  margin-bottom: 48px;
`;
const HostInfo = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const PhotoBox = styled.section`
  flex-basis: 25%;
  max-width: 338px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .06);
`;
const HostImage = styled.img`
  width: 100%;
`;
const ScriptName = styled.div`
  font-family: 'Dancing Script', cursive;
  font-size: 2em;
  text-align: center;
  padding: 24px 12px;
`;
const InfoContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-basis: 70%;
  line-height: 1.75em;
`;
const DescriptionBox = styled.div`
  flex-wrap: wrap;
  flex-basis: 60%;
`;
const DescHeader = styled.div`
  font-size: 16px;
  font-weight: 800;
`;
const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 32px;
`;
const StatsBox = styled.div`
  flex-wrap: wrap;
  flex-basis: 30%;
  margin-top: 32px;
`;
const Contact = styled.input`
  margin-top: 32px;
  padding: 10px 40px;
  color: #914669;
  font-weight: 600;
  background: transparent;
  border-color: #914669;
  border-style: solid;
  border-width: 2px;
  border-radius: 4px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 97,
      name: "",
      description: "",
      interaction: "",
      dateJoined: "",
      languages: [],
      responseRate: "",
      responseTime: "",
      hostUrl: ""
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3004/host/${this.state.id}`, {
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
  }
  contactPage() {

  }
  render() {
    const state = this.state;

    return (
      <HostProfile>
        <MeetYourHost>Meet your host</MeetYourHost>
        <HostInfo>
          <PhotoBox>
            <HostImage src="https://fake-profile-pictures.s3.amazonaws.com/female1.jpg" title={state.name} alt={state.name}></HostImage>
            <ScriptName>{state.name}</ScriptName>
          </PhotoBox>
          <InfoContainer>
            <DescriptionBox>
              <DescHeader>Hi, I'm {state.name}</DescHeader>
              <Description>{state.description}</Description>
              <DescHeader>Interaction with guests</DescHeader>
              <Description>{state.interaction}</Description>
            </DescriptionBox>
            <StatsBox>
              <div id="info">
                <div className="info">Joined in {state.dateJoined}</div>
                <div className="info">Languages: {state.languages.join(', ')}</div>
                <div className="info">Response rate: {state.responseRate}</div>
                <div className="info">Response time: {state.responseTime}</div>
              </div>
              <Contact defaultValue="CONTACT" type="button" />
            </StatsBox>
          </InfoContainer>
        </HostInfo>
      </HostProfile>
    );
  };
}

ReactDOM.render(<App />, document.getElementById('app'));