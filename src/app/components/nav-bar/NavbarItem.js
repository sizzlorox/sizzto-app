const React = require('react');

// Components
const Navbar = require('./Navbar');
const NavbarLink = require('./NavbarLink');

class NavbarItem extends React.Component {
  render() {
    return (
      <li id='menuItem'>
        <NavbarLink url={this.props.url} text={this.props.text} />
        {this.props.submenu && <Navbar items={this.props.submenu} />}
      </li>
    )
  }
}
module.exports = NavbarItem;