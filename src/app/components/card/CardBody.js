const React = require('react');

// Components
const CardImage = require('./CardImage');

module.exports = ({ title, children, src }) => {
  return (
    <div className={classnames('card-body')}>
      {src ? <CardImage src={src} /> : ''}
      <h3>{title}</h3>
      <hr />
      {children}
    </div>
  );
};
