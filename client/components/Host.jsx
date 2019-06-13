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
    this.getHost = this.getHost.bind(this);
  }

  componentDidMount() {
    this.getHost();
  }

  getHost() {
    fetch('/postgres/randomentry')
      .then(response => response.json())
      .then(result => {
        let host = result.host,
            cohosts = result.cohosts,
            languages = result.languages
        this.setState({
          id: host.id,
          name: host.name,
          description: host.description,
          interaction: host.interaction,
          coHosts: cohosts,
          dateJoined: host.datejoined,
          languages: languages,
          responseRate: host.responserate,
          responseTime: host.responsetime,
          hostUrl: host.hosturl
        })
      })
  }

  render() {
    const state = this.state;
    const length = Object.keys(state.coHosts).length;
    let greeting = length > 0 ? 'Meet your hosts': 'Meet your host';

    return (
      <div id='host-profile'>
        <div id='greeting'>
          {greeting}
        </div>
        <div id='host-info'>
          <PhotoBoxContainer
            name={this.state.name}
            hostUrl={this.state.hostUrl} />
          <div id='info-container'>
            <DescriptionBox
              name={this.state.name}
              description={this.state.description}
              interaction={this.state.interaction}
              coHosts={this.state.coHosts} />
            <StatsBox
              dateJoined={this.state.dateJoined}
              languages={this.state.languages}
              responseRate={this.state.responseRate}
              responseTime={this.state.responseTime} />
          </div>
        </div>
        <div id='divider'></div>
      </div>
    );
  }
}