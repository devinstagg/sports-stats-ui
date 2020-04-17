import React, { Component, Fragment } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    nflTeams: [],
    userInput: {
      location: '',
      teamMascot: '',
      conference: '',
      division: '',
      headCoach: '',
      regularSeasonWins2019: '',
      playoffs: ''
    }
  }
  showNflTeams = () => {
    return this.state.nflTeams.map((nflTeam) => {
      return (
        <div key={this._id}>
          <h2>{nflTeam.location} {nflTeam.teamMascot}</h2>
          <p>Conference & Division: {nflTeam.conference} {nflTeam.division}</p>
          <p>2020 Head Coach: {nflTeam.headCoach}</p>
          <p>2019 Wins: {nflTeam.regularSeasonWins2019}</p>
          <p>Playoffs? {nflTeam.playoffs}</p>
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
      <div className="hub">
        <section className="adding">
          <h2 className="section-header">Add Your Team</h2>
          <label htmlFor="location-input">Location (Example - New England for the Patriots): </label>
          <input id="location-input" type="text" value={this.state.userInput.location} onChange={this.locationChanged}/>
        </section>
        <section className="teams">
          <h2 className="section-header">NFL Teams</h2>
          {this.showNflTeams()}
        </section>
      </div>
    );
  }
}


