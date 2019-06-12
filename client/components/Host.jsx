import React from 'react';
import PhotoBoxContainer from './PhotoBoxContainer.jsx';
import DescriptionBox from './DescriptionBox.jsx';
import StatsBox from './StatsBox.jsx';

export default class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || -1,
      name: 'Barbara',
      description: 'Tashia and I are both former educators that work hard to play hard. We are easy-going, outdoor-loving people and love learning other peoples\' stories. We get out of town most weekends and can often be found with a great cup of coffee or a cold IPA in our hands. We are passionate about sharing our love of the outdoors with others as much as possible, but when we are home, we need a comfortable place to lay our heads.',
      interaction: 'Your host will be on the property and available for anything you need during your stay.',
      coHosts: {},
      dateJoined: 'March 2017',
      languages: ['English'],
      responseRate: '100%',
      responseTime: 'within an hour',
      hostUrl: 'https://s3-us-west-1.amazonaws.com/fake-profile-pictures/host30.jpg'
    };
    this.getHost = this.getHost.bind(this);
  }

  // componentDidMount() {
  //   console.log('component mounted, heading for fetch');
  //   this.getHost();
  // }

  getHost() {
    fetch('/postgres/lastentry')
      .then(response => response.json())
      .then(result => {
        // make return fit the following: ob1 is primary, following are cohosts
        this.setState({
          id: result.id,
          name: result.name,
          description: result.description,
          interaction: result.interaction,
          coHosts: JSON.parse(result.dateJoined),
          dateJoined: result.coHosts,
          languages: ['English'],
          responseRate: result.responseRate,
          responseTime: result.responseTime,
          hostUrl: result.hostUrl
        })
      })
  }

  render() {
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


// componentDidMount() {
//   if (this.state.id !== -1) {
//     fetch(`http://192.168.99.100:3005/host/id/${this.state.id}`, {
//       method: 'GET'
//     })
//       .then(res => res.json())
//       .then(data => {
//         this.setState({
//           name: data.name,
//           description: data.description,
//           interaction: data.interaction,
//           coHosts: data.coHosts,
//           dateJoined: data.dateJoined,
//           languages: data.languages,
//           responseRate: data.responseRate,
//           responseTime: data.responseTime,
//           hostUrl: data.hostUrl
//         });
//       })
//       .catch(err => console.log(err));
//   }
// }