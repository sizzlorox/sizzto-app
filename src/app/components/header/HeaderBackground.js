const React = require('react');

class HeaderBackground extends React.Component {

  render() {
    return (
      <img id='background' src={this.props.src} />
    );
  }

}
module.exports = HeaderBackground;