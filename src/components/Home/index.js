import './index.css'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="para">
            Millions of people are searching for jobs, salary
            information,company review. Find the job that fits your ability and
            potential
          </p>
          <Link to="/jobs">
            <button type="button" className="find-job-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
