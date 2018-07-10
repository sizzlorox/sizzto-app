const React = require('react');
const { NavLink } = require('react-router-dom');

module.exports = ({ url, activeClassName, text }) => {
  return (
    <NavLink exact to={url} activeClassName={activeClassName}>{text}</NavLink>
  );
};
