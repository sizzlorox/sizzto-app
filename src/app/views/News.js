const React = require('react');

class News extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Still developing this part!',
      rssFeed: process.env.NODE_ENV.includes('production')
        ? 'http://cryptscout.com/cryptocurrency-news-rss.php'
        : 'https://cors-anywhere.herokuapp.com/http://cryptscout.com/cryptocurrency-news-rss.php'
    };
  }

  componentDidMount() {
    this.getFeed();
  }

  getFeed() {
    fetch(this.state.rssFeed)
      .then(results => results)
      .then(results => {
        console.log(results);
        // const title = doc.getElementsByTagName('title')[0].innerHTML;
        // const entries = Array.from(doc.getElementsByTagName('entry'))
        //   .map((entry) => {
        //     console.log(entry.getElementsByTagName('title')[0].textContent);
        //     console.log(entry.getElementsByTagName('content')[0].textContent);
        //     return {
        //       title: entry.getElementsByTagName('title')[0].textContent,
        //       content: entry.getElementsByTagName('content')[0].textContent
        //     };
        //   });
        // console.log(entries);
        // this.setState({
        //   title,
        //   entries
        // });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.title}</h1>
        {this.state.entries ? this.state.entries.map((entry, index) => {
          return (
            <React.Fragment key={index}>
              {entry.content}
            </React.Fragment>
          );
        }) : ''}
      </React.Fragment>
    );
  }

}
module.exports = News;