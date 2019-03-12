import React, { Component } from 'react';

class Tweets extends Component {

    render() {
        // Mapping through tweet prop which contains the twitter API response data objects
        let tweetComponents = this.props.tweets.map((item, i) => {
            return (
                <ul key={i}><li>{item.user.name}</li><li>{item.user.screen_name}</li><li>{item.text}</li><br></br></ul>
            );
        });

        return (
            <div className="Tweets">
                <ul>{tweetComponents}</ul>
            </div>
        );
    }
}

export default Tweets;
