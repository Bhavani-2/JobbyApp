import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileDetails: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Barer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderLodingViiew = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-failure-view">
      <button
        type="button"
        testid="button"
        className="profile-retry-button"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {profileDetails} = this.state

    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profileView">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="name-head">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderProfileDetails()
      case apiStatusConstant.inProgress:
        return this.renderLodingViiew()
      case apiStatusConstant.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }
}

export default Profile
