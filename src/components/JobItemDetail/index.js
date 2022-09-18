import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetail extends Component {
  state = {
    jobItemList: {},
    similarJobItemList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  getFormattedSkillData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobItem = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Barer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = this.getFormattedData(data.job_details)
      const updatedSkillData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSkillData(eachSimilarJob),
      )

      this.setState({
        jobItemList: updatedData,
        similarJobItemList: updatedSkillData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLodingViiew = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobItem-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobItemfailureImage"
        alt="failure view"
      />
      <h1 className="jobItem-failure-head">Oops! Something Went Wrong</h1>
      <p className="jobItem-failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.getJobItem}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {jobItemList, similarJobItemList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobItemList
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="full-job-container">
        <div className="jobItemDetails-container">
          <div className="jobItem-logocontainer">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="jobItem-logo"
            />
            <div className="jobItem-logocontainer-inner">
              <h1 className="jobItem-title">{title}</h1>
              <div className="jobItem-ratingconainer">
                <AiFillStar className="star-icon" />
                <p className="jobItem-Rating-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobItem-location-salary-container">
            <div className="jobItem_location-employmentType-container">
              <div className="responsive">
                <GoLocation className="location-logo" />
                <p className="jobItem-location-para">{location}</p>
              </div>
              <div className="responsive">
                <BsBriefcaseFill className="location-logo" />
                <p className="jobItem-location-para">{employmentType}</p>
              </div>
            </div>
            <p className="jobItem-package-para">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="jobItem-Description-container">
            <div className="jobItem-description-link-container">
              <h1 className="jobItem-descreption-head">Description</h1>
              <a className="a" href={companyWebsiteUrl}>
                Visit
                <BiLinkExternal className="bi-link" />
              </a>
            </div>
            <p className="jobItem-description-para"> {jobDescription}</p>
          </div>
          <h1 className="skill-head">Skills</h1>

          <ul className="skill-container">
            {skills.map(eachSkill => (
              <SkillsCard key={eachSkill.id} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="lifeatCompany-head">Life at Company</h1>
          <div className="lifeAtCompany-container">
            <p className="lifeatCompany-para">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="lifeAtCompany-image"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-cards">
          {similarJobItemList.map(eachItem => (
            <SimilarJobItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobItemDetails()
      case apiStatusConstant.inProgress:
        return this.renderLodingViiew()
      case apiStatusConstant.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="get-jobItem-details-container">
          {this.renderJobItem()}
        </div>
      </>
    )
  }
}

export default JobItemDetail
