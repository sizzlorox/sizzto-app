const React = require('react');
const Parallax = require('parallax-js');
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

class HeaderTitle extends React.Component {

  componentDidMount() {
    const scene = document.getElementById('header-title');
    const parallaxInstance = new Parallax(scene);
  }

  render() {
    return (
      <div data-relative-input='true' data-hover-only='true' className={classnames('header-title')} id='header-title'>
        <h1 data-depth='0.2'>
          <FontAwesomeIcon icon={['fab', 'bitcoin']} />
          {this.props.text}
        </h1>
        {this.props.subheader && <h4 data-depth='0.6'>{this.props.subheader}</h4>}
      </div>
    );
  }

}
module.exports = HeaderTitle;