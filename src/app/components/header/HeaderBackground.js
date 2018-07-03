const React = require('react');

class HeaderBackground extends React.Component {

  render() {
    return (
      <img data-depth='0.6' src={this.props.src} />
    );
  }

}
module.exports = HeaderBackground;