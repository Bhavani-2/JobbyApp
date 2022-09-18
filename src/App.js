import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'

import LoginPage from './components/LoginPage'

import Home from './components/Home'
import ProtectedRouter from './components/ProtectedRouter'
import Jobs from './components/Jobs'

import JobItemDetail from './components/JobItemDetail'

// import AllJobsSection from './components/AllJobsSection'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRouter exact path="/" component={Home} />
      <ProtectedRouter exact path="/jobs" component={Jobs} />
      <ProtectedRouter exact path="/jobs/:id" component={JobItemDetail} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
