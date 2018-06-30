const React = require('react');

class NavbarLink extends React.Component {

  render() {
    return (
      <a href={this.props.url}>{this.props.text}</a>
    );
  }

}
module.exports = NavbarLink;