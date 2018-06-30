const App = require('./App');

describe('App.js', () => {

  beforeEach(() => {
    // this.wrapper = shallow((<App />));
  });

  it('Calls componentWillMount()', () => {
    const spyWillMount = sinon.spy(App.prototype, 'componentWillMount');
    shallow((<App />));
    expect(spyWillMount.calledOnce).to.equal(true);
  });

  it('Calls componentDidMount()', () => {
    const spyDidMount = sinon.spy(App.prototype, 'componentDidMount');
    shallow((<App />));
    expect(spyDidMount.calledOnce).to.equal(true);
  });

  it('Initialized with NavbarLinks', () => {
    const wrapper = shallow((<App />));
    expect(wrapper.state()).to.have.property('navbar');
    expect(wrapper.state().navbar).to.have.equal(enumHelper.navbarLinks);
  });

});