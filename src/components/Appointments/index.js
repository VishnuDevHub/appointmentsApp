// Write your code here

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isStarBtnClicked: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const appointmentDate = new Date(date)
    const formattedDate = format(appointmentDate, 'dd MMMM yyyy, EEEE')
    console.log(formattedDate)
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachObj => {
        if (eachObj.id === id) {
          return {...eachObj, isFavorite: !eachObj.isFavorite}
        }
        return eachObj
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onClickStarred = () => {
    this.setState(prevState => ({
      isStarBtnClicked: !prevState.isStarBtnClicked,
    }))
  }

  getFilteredAppointments = () => {
    const {isStarBtnClicked, appointmentsList} = this.state

    if (isStarBtnClicked === true) {
      return appointmentsList.filter(eachObj => eachObj.isFavorite === true)
    }
    return appointmentsList
  }

  render() {
    const {title, date, isStarBtnClicked} = this.state
    // console.log(appointmentsList)

    const filteredAppointments = this.getFilteredAppointments()

    const starBtnClassName = isStarBtnClicked
      ? 'stared-button active'
      : 'stared-button'

    return (
      <div className="app-container">
        <div className="card">
          <h1>Add Appointment</h1>
          <div className="card-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appoint-img"
              alt="appointments"
            />
            <div>
              <form onSubmit={this.onAddAppointment}>
                <label className="label-title" htmlFor="titleName">
                  TITLE
                </label>
                <br />
                <input
                  id="titleName"
                  type="text"
                  className="title-input"
                  onChange={this.onChangeTitle}
                  placeholder="Title"
                  value={title}
                />
                <br />
                <label className="label-title" htmlFor="dateName">
                  DATE
                </label>
                <br />
                <input
                  id="dateName"
                  type="date"
                  className="title-input"
                  onChange={this.onChangeDate}
                  value={date}
                />
                <br />
                <button className="button-add" type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>
          <hr className="horizontal" />
          <div className="head-button-container">
            <h1>Appointments</h1>
            <button
              type="button"
              className={starBtnClassName}
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-list-container">
            {filteredAppointments.map(eachObj => (
              <AppointmentItem
                appointmentDetails={eachObj}
                key={eachObj.id}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
