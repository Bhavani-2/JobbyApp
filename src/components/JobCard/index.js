import {Link} from 'react-router-dom'
import './index.css'
import {AiTwotoneStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

const JobCard = props => {
  const {jobDetails} = props

  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
    packagePerAnnum,
  } = jobDetails

  return (
    <li className="jobdetailslist">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="card-details-section">
          <div className="card-logo-head-section">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="card-logo"
            />
            <div className="card-head-rating-details">
              <h1 className="jobcard-head">{title}</h1>
              <div className="card-star-rating-details">
                <AiTwotoneStar className="star" />
                <p className="card-rating-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="card-location-package-details">
            <div className="location-details">
              <MdLocationOn className="location" />
              <p className="location-para">{location}</p>

              <p className="location-para">{employmentType}</p>
            </div>
            <div className="package-details">
              <p className="package-para">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <h1 className="package-para">Description</h1>
          <p className="description-para">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
