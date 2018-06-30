const { Route, Switch } = require('react-router-dom');

// Components
const Navbar = require('./components/nav-bar/Navbar');

// Views
const Home = require('./views/Home');

class App extends React.Component {
  // Should initialize state in constructor instead of getInitialState when using ES6 Classes
  constructor(props) {
    super(props);
    // Locally defined state
    this.state = {
      navbar: [
        {
          text: 'Home',
          url: '#'
        },
        {
          text: 'About',
          url: '#'
        },
        {
          text: 'Contact us',
          url: '#'
        }
      ],
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
        <div>
          <div id='menu'>
            <Navbar items={this.state.navbar} />
          </div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={Home} />
          </Switch>
        </div>
      )
  }
}
module.exports = App;