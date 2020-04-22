import React, { Component } from 'react';
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
      regularSeasonWins2019: 0,
      playoffs: ''
    }
  }

  submit = async () => {
    const nflTeam = this.state.userInput

    const response = await fetch(`${process.env.REACT_APP_API_URL}/nfl-teams`, {
      method: nflTeam._id ? 'PUT' : 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(nflTeam)
    })
    const successful = response.status === 201 || response.status === 200

    if (successful) {
      await this.getNflTeams()

      this.setState({
        userInput: {
          location: '',
          teamMascot: '',
          conference: '',
          division: '',
          headCoach: '',
          regularSeasonWins2019: 0,
          playoffs: ''
        }, 
        error: null
      })
    } else {
      const error = await response.json()

      this.setState({ error })
      console.log(error)
    }
  }

  deleteNflTeam = async (event) => {
    const nflTeamId = event.target.attributes.getNamedItem('nflteamid').value

    const response = await fetch(`${process.env.REACT_APP_API_URL}/nfl-teams/${nflTeamId}`, {
      method: 'DELETE',
      mode: 'cors'
    })

    const success = response.status === 200
    
    if (success) {
      await this.getNflTeams()
    }
  }

  editNflTeam = async (event) => {
    const nflTeamId = event.target.attributes.getNamedItem('nflteamid').value
    const nflTeam = this.state.nflTeams.reduce((nflTeamToUpdate, nflTeam) => {
      return nflTeam._id === nflTeamId ? nflTeam : nflTeamToUpdate
    }, null) 

    if (nflTeam) {
      this.setState({
        userInput: nflTeam
      })
    }
  }

  showNflTeams = () => {
    return this.state.nflTeams.map((nflTeam) => {
      return (
        <div key={nflTeam._id}>
          <h2>{nflTeam.location} {nflTeam.teamMascot}</h2>
          <p>Conference & Division: {nflTeam.conference} {nflTeam.division}</p>
          <p>Current Head Coach: {nflTeam.headCoach}</p>
          <p>2019 Wins: {nflTeam.regularSeasonWins2019}</p>
          <p>Playoffs? {nflTeam.playoffs}</p>
          <button nflteamid={nflTeam._id} onClick={this.editNflTeam}>Edit This Team</button>
          <button className="delete-button"  nflteamid={nflTeam._id} onClick={this.deleteNflTeam}>Delete This Team</button>
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
        ...this.state.userInput,
        teamMascot: event.target.value
      }
    })
  }

  conferenceChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        conference: event.target.value
      }
    })
  }

  divisionChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        division: event.target.value
      }
    })
  }

  headCoachChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        headCoach: event.target.value
      }
    })
  }

  regularSeasonWins2019Changed = (event) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        regularSeasonWins2019: event.target.value
      }
    })
  }

  playoffsChanged = (event) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        playoffs: event.target.value
      }
    })
  }

  render() {
    return (
      <div className="hub">
        <section className="adding">
          <h2 className="section-header">Add Your Team</h2>
          <div>
            <label htmlFor="location-input">Location (Example - New England for the Patriots): </label>
            <input id="location-input" type="text" value={this.state.userInput.location} onChange={this.locationChanged} />
          </div>
          <div>
            <label htmlFor="team-mascot-input">Mascot (Example - Patriots): </label>
            <input id="team-mascot-input" type="text" value={this.state.userInput.teamMascot} onChange={this.teamMascotChanged} />
          </div>
          <div>
            <label htmlFor="conferece-input">Conference (AFC or NFC): </label>
            <input id="conference-input" type="text" value={this.state.userInput.conference} onChange={this.conferenceChanged} />
          </div>
          <div>
            <label htmlFor="division-input">Division (North, South, East, or West): </label>
            <input id="division-input" type="text" value={this.state.userInput.division} onChange={this.divisionChanged} />
          </div>
          <div>
            <label htmlFor="head-coach-input">Head Coach (Full Name): </label>
            <input id="head-coach-input" type="text" value={this.state.userInput.headCoach} onChange={this.headCoachChanged} />
          </div>
          <div>
            <label htmlFor="regular-season-2019-wins-input">2019 Season Wins (number only): </label>
            <input id="regular-season-2019-wins-input" type="number" value={this.state.userInput.regularSeasonWins2019} onChange={this.regularSeasonWins2019Changed} />
          </div>
          <div>
            <label htmlFor="playoffs-input">Made Playoffs? (Yes or No): </label>
            <input id="playoffs-input" type="text" value={this.state.userInput.playoffs} onChange={this.playoffsChanged} />
          </div>
          <button onClick={this.submit}>Submit</button>
        </section>
        <section className="teams">
          <h2 className="section-header">NFL Teams</h2>
          {this.showNflTeams()}
        </section>
      </div>
    );
  }
}


