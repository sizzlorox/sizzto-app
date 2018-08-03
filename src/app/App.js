const React = require('react');
const { Route, Switch } = require('react-router-dom');

// Components
const Navbar = require('./components/nav-bar/Navbar');

// Views
const NotFound = require('./views/NotFound');
const Home = require('./views/Home');
const About = require('./views/About');
const News = require('./views/News');
const Test = require('./views/Test');

const { navbarLinks } = require('./utils/enumHelper');

class App extends React.Component {
  // Should initialize state in constructor instead of getInitialState when using ES6 Classes
  constructor(props) {
    super(props);
    // Locally defined state
    this.state = {
      navbar: navbarLinks,
      isLoading: true
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    return this.state.isLoading ?
      (
        <div>
          <h1>Loading...</h1>
        </div>
      )
      : (
        <React.Fragment>
          <div id='menu'>
            <Navbar items={this.state.navbar} />
          </div>
          <div id='content'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path='/news' component={News} />
              <Route path='/test' component={Test} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </React.Fragment>
      )
  }
}
module.exports = App;