const React = require('react');

class HeaderTitle extends React.Component {

  componentDidMount() {
    const scene = document.getElementById('header-title');
  }

  render() {
    return (
      <div className={classnames('header-title')} id='header-title'>
        <h1>
          {this.props.text}
        </h1>
        {this.props.subheader && <h4>{this.props.subheader}</h4>}
      </div>
    );
  }

}
module.exports = HeaderTitle;