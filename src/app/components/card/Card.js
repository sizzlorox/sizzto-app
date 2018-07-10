const React = require('react');

// Components
const CardBody = require('./CardBody');

module.exports = ({ title, children, src }) => {
  return (
    <div className={classnames('card')}>
      <CardBody title={title} src={src}>
        {children}
      </CardBody>
    </div>
  );
};
