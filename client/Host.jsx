import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 38,
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
      <div id="host-profile">
        <div id="meet-your-host">Meet your host</div>
        <div id="host-info">
          <div id="photo-box" className="box">
            <div id="photo">{state.hostUrl}</div>
            <div id="script-name">{state.name}</div>
          </div>
          <div id="desc-box" className="box">
            <div className="desc-heading">Hi, I'm {state.name}</div>
            <div className="description">{state.description}</div>
            <div className="desc-heading">Interaction with guests</div>
            <div className="description">{state.interaction}</div>
          </div>
          <div id="info-box" className="box">
            <div id="info">
              <div className="info">Joined in {state.dateJoined}</div>
              <div className="info">Languages:{state.languages}</div>
              <div className="info">Response rate: {state.responseRate}</div>
              <div className="info">Response time: {state.responseTime}</div>
            </div>
            <div id="contact-button">
              <input type="button" onClick={this.contactPage.bind(this)} value="Contact"></input>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

ReactDOM.render(<App />, document.getElementById('app'));