const React = require('react');

class Host extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: ""
    }
  };
  render() {
    return (
      <div id="host-profile">HOST!!!!!</div>
    );
  };
}

ReactDOM.render(<Host />, document.getElementById('app'));