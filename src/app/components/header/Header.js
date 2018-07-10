const React = require('react');

// Components
const HeaderBackground = require('./HeaderBackground');
const HeaderTitle = require('./HeaderTitle');

module.exports = ({ src, text, subheader }) => {
  return (
    <div className={classnames('header')}>
      <HeaderBackground src={src} />
      <HeaderTitle text={text} subheader={subheader} />
    </div>
  );
};
