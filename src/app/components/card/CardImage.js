const React = require('react');

module.exports = ({ src }) => {
  return (
    <img className={classnames('card-image')} src={src} />
  );
};
