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
    return (
      <div id="host-profile">HOST!!!!!</div>
    );
  };
}

ReactDOM.render(<App />, document.getElementById('app'));