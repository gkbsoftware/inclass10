var React = require('react');
var moment = require('moment');

var Tweet = React.createClass({
  render: function() {
    return <div className="tweet">
      <b>{"@ " + this.props.username + " - "}</b>
      <em>{moment(this.props.created_at).fromNow()}</em>
      <br/>
      {this.props.body}
    </div>;
  }
})

var Tweets = React.createClass({
  render: function() {
    var tweets = this.props.data.rows.map(function(tweet){
      return <Tweet {...tweet} />;
    });

    return (
      <div className="tweets">
        <h1>Tweets</h1>
        {tweets}
      </div>
    )}
})

module.exports = Tweets;
