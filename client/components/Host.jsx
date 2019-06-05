import React from 'react';
import PhotoBoxContainer from './PhotoBoxContainer.jsx';
import DescriptionBox from './DescriptionBox.jsx';
import StatsBox from './StatsBox.jsx';

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
      fetch(`http://localhost:3005/host/${this.state.id}`, {
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

    let greeting = length > 0 ? 'Meet your hosts': 'Meet your host';

    return (
      <div id='host-profile'>
        <div id='greeting'>{greeting}</div>
        <div id='host-info'>
          <PhotoBoxContainer
            name={state.name}
            hostUrl={state.hostUrl} />
          <div id='info-container'>
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
          </div>
        </div>
        <div id='divider'></div>
      </div>
    );
  }
}