import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import { Fragment } from 'react'
import Login from '../src/components/Login'
import Signup from './components/Signup'
import RocketForm from './components/Rocket/Form'
import ViewRocket from './components/Rocket/View'
import SideBar from './components/Sidebar'
import RocketEdit from 'components/Rocket/Edit'
import LoaderComponent from 'components/Loader'

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Signup />} />

          {/* <Route exact path='/sidebar' element={<SideBar />} /> */}
          <Route path='/' element={<SideBar />}>
            <Route
              exact
              path='rocket/add'
              element={<RocketForm />}
            />
            <Route
              exact
              path='rocket/view'
              element={<ViewRocket />}
            />
            <Route
              exact
              path='rocket/edit/:id'
              element={<RocketEdit />}
            />
          </Route>
        </Routes>
      </Fragment>
    </Router>
  )
}

export default App
