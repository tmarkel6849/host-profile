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
  };
  componentDidMount() {
    fetch('http://localhost:3004/host', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      console.log('data', data);
      this.setState({
        name: data.name,
        description: data.description,
        dateJoined: data.dateJoined,
        responseRate: data.responseRate,
        responseTime: data.responseTime,
        hostUrl: data.hostUrl
      });
    })
    .catch(console.log);
  };
  render() {
    return (
      <div id="host-profile">HOST!!!!!</div>
    );
  };
}

ReactDOM.render(<App />, document.getElementById('app'));