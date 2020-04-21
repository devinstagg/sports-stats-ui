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
          <p>Current Head Coach: {nflTeam.headCoach}</p>
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

  /* FIELDS CHANGES */

  locationChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        location: event.target.value
      }
    })
  }

  teamMascotChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.user,
        teamMascot: event.target.value
      }
    })
  }

  conferenceChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.user,
        conference: event.target.value
      }
    })
  }

  divisionChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.user,
        division: event.target.value
      }
    })
  }

  headCoachChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.user,
        headCoach: event.target.value
      }
    })
  }

  regularSeasonWins2019Changed = (event) => {
    this.setState({
      userInput: {
        ...this.state.user,
        regularSeasonWins2019: event.target.value
      }
    })
  }

  playoffsChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.user,
        playoffs: event.target.value
      }
    })
  }

  render() {
    return (
      <div className="hub">
        <section className="adding">
          <h2 className="section-header">Add Your Team</h2>
          <label htmlFor="location-input">Location (Example - New England for the Patriots): </label>
          <input id="location-input" type="text" value={this.state.userInput.location} onChange={this.locationChanged} />
          <br />
          <label htmlFor="team-mascot-input">Mascot (Example - Patriots): </label>
          <input id="team-mascot-input" type="text" value={this.state.userInput.teamMascot} onChange={this.teamMascotChanged} />
          <br />
          <label htmlFor="conferece-input">Conference (AFC or NFC): </label>
          <input id="conference-input" type="text" value={this.state.userInput.conference} onChange={this.conferenceChanged} />
          <br />
          <label htmlFor="division-input">Division (North, South, East, or West): </label>
          <input id="division-input" type="text" value={this.state.userInput.division} onChange={this.divisionChanged} />
          <br />
          <label htmlFor="head-coach-input">Head Coach (Full Name): </label>
          <input id="head-coach-input" type="text" value={this.state.userInput.headCoach} onChange={this.headCoachChanged} />
          <br />
          <label htmlFor="regular-season-2019-wins-input">2019 Season Wins (number only): </label>
          <input id="regular-season-2019-wins-input" type="number" value={this.state.userInput.regularSeasonWins2019} onChange={this.regularSeasonWins2019Changed} />
          <br />
          <label htmlFor="playoffs-input">Made Playoffs? (Yes or No): </label>
          <input id="playoffs-input" type="text" value={this.state.userInput.playoffs} onChange={this.playoffsChanged} />
        </section>
        <section className="teams">
          <h2 className="section-header">NFL Teams</h2>
          {this.showNflTeams()}
        </section>
      </div>
    );
  }
}


