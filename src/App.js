import React, { Component, Fragment } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    nflTeams: [],
  }

  
  showNflTeams = () => {
    return this.state.nflTeams.map((nflTeam) => {
      console.log(nflTeam)
      return (<div key={this._id}>{JSON.stringify(nflTeam)}</div>)
    })
  }

  getNflTeams = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/nfl-teams`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'accept': 'application/json'
      }
    })
    const successfulGet = response.status === 200 || 304

    if (successfulGet) {
      const nflTeams = await response.json()

      this.setState({ nflTeams })
    } else {
      console.log(response)
    }
  }

  componentDidMount() {
    this.getNflTeams()
  }



  render() {
    return (
      <div>
        {this.showNflTeams()}
      </div>
    );
  }
}


