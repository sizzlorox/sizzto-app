class HeaderTitle extends React.Component {

  render() {
    return (
      <div id='header-title'>
        <h1>{this.props.text}</h1>
        {this.props.subheader && <h4>{this.props.subheader}</h4>}
      </div>
    );
  }

}
module.exports = HeaderTitle;