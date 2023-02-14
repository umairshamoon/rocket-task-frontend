import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (props) => {
  console.log(props)
  //   let isAuthenticated = false
  //   const user = localStorage.getItem('user')
  //   if (JSON.parse(user)?.token) {
  //     isAuthenticated = true
  //   }
  //   return isAuthenticated ? (
  return <Route {...props} />
  //   ) : (
  //     <Redirect
  //       to={{
  //         pathname: '/loginChef',
  //       }}
  //     />
  //   )
}

export default PrivateRoute
