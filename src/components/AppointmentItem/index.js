// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {id, title, date, isFavorite} = appointmentDetails

  const onClickStar = () => {
    toggleIsFavorite(id)
  }

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-item-container">
      <div>
        <p className="title">{title}</p>
        <p className="date">{date}</p>
      </div>
      <button
        type="button"
        className="star-btn"
        onClick={onClickStar}
        data-testid="star"
      >
        <img src={starImgUrl} className="star-img" alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
