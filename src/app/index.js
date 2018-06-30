require('./app.scss');
const { BrowserRouter } = require('react-router-dom');
const App = require('./App');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'), (err) => console.log(err));