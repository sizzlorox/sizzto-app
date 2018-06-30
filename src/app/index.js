require('./app.scss');
const { library } = require('@fortawesome/fontawesome-svg-core');
const { faAngleUp } = require('@fortawesome/free-solid-svg-icons');
const { faBitcoin } = require('@fortawesome/free-brands-svg-icons');
const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');
const App = require('./App');

library.add(faAngleUp, faBitcoin);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'), (err) => console.log(err));