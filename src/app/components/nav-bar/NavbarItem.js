const React = require('react');

// Components
const Navbar = require('./Navbar');
const NavbarLink = require('./NavbarLink');

class NavbarItem extends React.Component {
  render() {
    return (
      <li className={classnames('menu-item')}>
        <NavbarLink url={this.props.url} activeClassName={this.props.activeClassName} text={this.props.text} />
        {this.props.submenu && <Navbar items={this.props.submenu} />}
      </li>
    )
  }
}
module.exports = NavbarItem;