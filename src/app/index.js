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