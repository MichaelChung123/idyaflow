import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TwitterLogin from 'react-twitter-auth';

import Tweets from "./Tweets";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      searchString: "",
      isAuthenticated: false,
      user: null,
      token: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchString: e.target.value
    });
  }

  // Sends search string to server, and performs get request to obtain tweets from Twitter API on server end
  handleSubmit(e) {
    e.preventDefault();

    axios.get('http://localhost:3001/getTweets', {
      params: {
        ID: this.state.searchString
      }
    }).then((res) => {

      let tweets = res.data;

      for (let tweet of tweets) {
        this.setState({
          tweets: [...this.state.tweets, tweet]
        });
      }

    }).catch((err) => {
      console.log(err);
    });
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({ isAuthenticated: true, user: user, token: token });
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null })
  };

  render() {

    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="button" >
              Log out
          </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl="http://localhost:3000/api/v1/auth/twitter"
          onFailure={this.onFailed} onSuccess={this.onSuccess}
          requestTokenUrl="http://localhost:3000/api/v1/auth/twitter/reverse" />
      );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {content}
          <p>
            Idyaflow Twitter Search
          </p>

          <form onSubmit={this.handleSubmit}>
            <label>Search: </label>

            <input
              id="searchString"
              type="text"
              value={this.state.searchString}
              onChange={this.handleChange}
            />

            <button type="submit">Search</button>
          </form>

          <Tweets tweets={this.state.tweets} />

        </header>
      </div>
    );
  }
}

export default App;
