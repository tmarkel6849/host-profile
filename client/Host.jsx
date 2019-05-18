import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      dateJoined: "",
      responseRate: "",
      responseTime: "",
      hostUrl: ""
    };
  }
  componentDidMount() {
    fetch('http://localhost:3004/host', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        name: data[0].name,
        description: data[0].description,
        dateJoined: data[0].dateJoined,
        responseRate: data[0].responseRate,
        responseTime: data[0].responseTime,
        hostUrl: data[0].hostUrl
      });
    })
    .catch(err => console.log('fetch error', err));
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
            <div className="description">Add interaction descriptions to data</div>
          </div>
          <div id="info-box" className="box">
            <div className="info">Joined in {state.dateJoined}</div>
            <div className="info">Languages:</div>
            <div className="info">Response rate: {state.responseRate}</div>
            <div className="info">Response time: {state.responseTime}</div>
          </div>
        </div>
      </div>
    );
  };
}

ReactDOM.render(<App />, document.getElementById('app'));