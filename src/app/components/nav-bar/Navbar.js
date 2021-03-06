const React = require('react');

// Components
const NavbarItem = require('./NavbarItem');

class Navbar extends React.Component {
  generateItem(item, key) {
    return <NavbarItem text={item.text} url={item.url} activeClassName={item.activeClassName} submenu={item.submenu} key={key} />
  }

  render() {
    return (
      <ul className={classnames('navbar')}>
        {this.props.items.map(this.generateItem)}
      </ul>
    )
  }
}
module.exports = Navbar;