const React = require('react');
const { NavLink } = require('react-router-dom');

class NavbarLink extends React.Component {

  render() {
    return (
      <NavLink to={this.props.url} activeClassName={this.props.activeClassName}>{this.props.text}</NavLink>
    );
  }

}
module.exports = NavbarLink;