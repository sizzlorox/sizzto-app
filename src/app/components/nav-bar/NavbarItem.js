const React = require('react');

// Components
const Navbar = require('./Navbar');
const NavbarLink = require('./NavbarLink');

module.exports = ({ url, text, submenu, activeClassName }) => {
  return (
    <li className={classnames('menu-item')}>
      <NavbarLink url={url} activeClassName={activeClassName} text={text} />
      {submenu && <Navbar items={submenu} />}
    </li>
  );
};
