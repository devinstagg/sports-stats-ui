import React, { Component, Fragment } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    nflTeams: [],
  }
  showNflTeams = () => {
    return this.state.nflTeams.map((nflTeam) => {
      return (
        <div key={this._id} className="nfl">
          <section>
            <h2>{nflTeam.location} {nflTeam.team_mascot}</h2>
            <p>Conference & Division: {nflTeam.conference} {nflTeam.division}</p>
            <p>2020 Head Coach: {nflTeam.head_coach}</p>
          </section>
        </div>
      )
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
        <h1>NFL Teams</h1>
        {this.showNflTeams()}
      </div>
    );
  }
}


