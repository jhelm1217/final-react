import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import App from './App'
import ErrorPage from './ErrorPage'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import CreateNewUser from './CreateNewUser'
import { AuthContext } from './context'
import CreateMessage from './CreateMessage'
import MessageList from './MessageList'
import Dashboard from './Dashboard'
import CompletedTrip from './CompletedTrips'
import UpcomingTrips from './UpcomingTrips'
import CreateATrip from './CreateATrip'
// import TripDetails from './TripDetails'
// import UpdateTrip from './UpdateTrip'


function Layout() {
  return (
    <>
      <Header />
        <div id='page-content'>
          <Outlet />
        </div>
      <Footer />
    </>
  )
}

// const Protected = ({component}) => {
//   const { auth } = useContext(AuthContext)
//   return auth?.accessToken ? (
//     <>
//       {component}
//     </>
//   ) : (
//     <Navigate to="/login" replace={true} />
//   )
// }


// const ProtectedRoute = ({ element }) => {
//   const { auth } = useContext(AuthContext);
//   return auth.accessToken ? element : <Navigate to="/login" replace />;
// };



const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/create-user',
        element: <CreateNewUser />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path:'/dashboard',
        element: <Dashboard />
      },
      {
        path: '/get-messages',
        element: <MessageList />
      },
      {
        path: '/create-message',
        element: <CreateMessage />
      },
      {
        path: '/get-completed-trips/',
        element: <CompletedTrip />
      },
      {
        path: '/create-trip/',
        element: <CreateATrip />
      },
      {
        path: '/get-trips/',
        element: <UpcomingTrips />
      },
      // {
      //   path: 'update-trip/`${tripId}',
      //   element: < UpdateTrip />
      // },
     

    ]
  }
])

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(undefined)
  
  const auth = {
    accessToken,
    setAccessToken,
  }

  return(
    <AuthContext.Provider value={{ auth: auth }} >
      {children}
    </AuthContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)
