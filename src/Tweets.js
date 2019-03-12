import React, { Component } from 'react';

class Tweets extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
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
