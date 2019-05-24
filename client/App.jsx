import React from 'react';
import ReactDOM from 'react-dom';
import Host from './components/Host.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'id': 90,
      'name': 'Trevino'
    };
  }

  render() {
    return (
      <Host id={this.state.id} name={this.state.name}/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));