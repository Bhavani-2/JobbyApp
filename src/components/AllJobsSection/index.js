import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import FilterGroup from '../FilterGroup'

import JobCard from '../JobCard'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class AllJobsSection extends Component {
  state = {
    jobList: [],
    employmentType: [],
    activeSalaryId: 0,
    apiStatus: apiStatusConstant.inProgress,
    searchInput: '',
  }

  componentDidMount() {
    this.getJob()
  }

  getJob = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {employmentType, activeSalaryId, searchInput} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${activeSalaryId}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  changeEmploymentType = type => {
    this.setState(
      prev => ({employmentType: [...prev.employmentType, type]}),
      this.getJob,
    )
  }

  changeSalary = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJob)
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJob()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderFailureView = () => (
    <div className="failureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.getJob}>
        Retry
      </button>
    </div>
  )

  renderLodingViiew = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsListView = () => {
    const {jobList} = this.state
    const count = jobList.length > 0

    return count ? (
      <div className="all-job-section">
        <ul>
          {jobList.map(each => (
            <JobCard jobDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-job-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="head-no-job">No Jobs Found</h1>
        <p className="para-no-job">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLodingViiew()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.success:
        return this.renderJobsListView()
      default:
        return null
    }
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="main-job-section">
        <FilterGroup
          searchInput={searchInput}
          // changeSearchInput={this.changeSearchInput}
          // enterSearchInput={this.enterSearchInput}
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          changeEmploymentType={this.changeEmploymentType}
          changeSalary={this.changeSalary}
          // activeEmploymentType={activeEmploymentType}
          // activeSalaryId={activeSalaryId}
        />
        <div className="jobcard-section">
          <button
            testid="searchButton"
            type="button"
            className="containersearch"
          >
            <input
              value={searchInput}
              type="search"
              className="input-value"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterSearchInput}
            />
            <BsSearch className="search-icon" />
          </button>
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
