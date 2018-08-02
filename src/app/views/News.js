const React = require('react');
const Parser = require('rss-parser');
const parser = new Parser();

class News extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Cyrpto-News (No styling yet)',
      rssFeed: process.env.NODE_ENV.includes('production')
        ? '//cryptscout.com/cryptocurrency-news-rss.php'
        : 'https://cors-anywhere.herokuapp.com/http://cryptscout.com/cryptocurrency-news-rss.php'
    };
  }

  componentDidMount() {
    this.getFeed();
  }

  async getFeed() {
    const feed = await parser.parseURL(this.state.rssFeed);
    this.setState({
      items: feed.items
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.title}</h1>
        {this.state.items ? this.state.items.map((entry, index) => {
          return (
            <div key={index}>
              <h4>{entry.title}</h4>
              <p>{entry.contentSnippet}</p>
              <a href={entry.link}>Link</a>
            </div>
          );
        }) : ''}
      </React.Fragment>
    );
  }

}
module.exports = News;