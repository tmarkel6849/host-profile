import React from 'react';
import ReactDOM from 'react-dom';
import Host from './components/Host.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'id': Math.ceil(Math.random() * 100)
      // 'id': 1 // no co-hosts
      // 'id': 9 // one co-host
      // 'id': 5 // two co-hosts
    };
  }

  render() {
    return (
      <Host id={this.state.id}/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('host'));