import React from 'react';
import './App.css';
import githubLogo from './images/githublogo.png';
import lambdaLogo from './images/lambdalogo.png';
import CardGrid from './components/CardGrid';
import Search from './components/Search';

class App extends React.Component {
  state = {
    searchedUser: '',
    user: {},
    followers: []
  }

  // user = 'sundakat';

  componentDidMount() {
    // api call to my user account
    fetch(`https://api.github.com/users/sundakat`)
      .then(res => res.json())
      .then(res => this.setState({ user: res }))
      .catch(err => console.log('Error Occurred:', err));
    // api call to my followers
    fetch(`https://api.github.com/users/sundakat/followers`)
      .then(res => res.json())
      .then(res =>
        res.map(user =>
          // api call to fetch my followers account information
          fetch(`https://api.github.com/users/${user.login}`)
            .then(res => res.json())
            .then(res => this.setState({ followers: [...this.state.followers, res] }))
        )
        
      )
      .catch(err => console.log('Followers Error: ', err))
  }

  searchNewUser = e => {
    this.state.followers = []
    e.preventDefault()
    // api call to my user account
    fetch(`https://api.github.com/users/${this.state.searchedUser}`)
      .then(res => res.json())
      .then(res => this.setState({ user: res }))
      .catch(err => console.log('Error Occurred:', err))
    // api call to my followers
    fetch(`https://api.github.com/users/${this.state.searchedUser}/followers`)
      .then(res => res.json())
      .then(res =>
        res.map(user =>
    //       // api call that fetches my followers account information
          fetch(`https://api.github.com/users/${user.login}`)
            .then(res => res.json())
            .then(res => this.setState({
              followers: [...this.state.followers, res]
            }))
        )
      )
      .catch(err => console.log('Followers Error: ', err))
  }

  handleChanges = e => {
    this.setState({
      searchedUser: e.target.value
    })
  }
  render() {
    return (
      <div className='App container'>
        <div className='header'>
          <img src={githubLogo} alt="User Pic" />
          <span role='img' aria-label='heart'>❤️'s</span>
          <img src={lambdaLogo} alt="Lambda School Logo" />
        </div>
        <Search
          handleChanges={this.handleChanges}
          searchUser={this.searchNewUser}
          searchResult={this.searchedUser}
        />
        <CardGrid
          user={this.state.user}
          followers={this.state.followers}
        />
      </div>
    );
  }
}

export default App;
