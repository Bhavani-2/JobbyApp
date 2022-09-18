import {Link, withRouter} from 'react-router-dom'
import {AiTwotoneHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-large-view">
          <Link className="link" to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/jobs" className="link">
                Jobs
              </Link>
            </li>
          </ul>
          <button type="button" className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
        <div className="nav-mobile-view">
          <Link to="/jobs" className="link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="mobile-view-logo"
            />
          </Link>
          <ul className="mobile-logo-unorder-section">
            <li className="mobile-list-view">
              <Link to="/" className="mobile-link">
                <AiTwotoneHome size="25" className="icon" />
              </Link>
            </li>
            <li className="mobile-list-view">
              <Link to="/jobs" className="mobile-link">
                <BsBriefcaseFill size="25" className="icon" />
              </Link>
            </li>
          </ul>
          <FiLogOut size="25" className="icon logout-icon" />
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
