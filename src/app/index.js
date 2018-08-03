__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';
// TODO change nonce later to come from .env and regenerate
require('./app.scss');
const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');
const App = require('./App');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'), (err) => console.log(err));

if (module.hot) {
  module.hot.accept();
}