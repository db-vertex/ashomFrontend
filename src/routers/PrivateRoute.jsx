import { useSelector } from 'react-redux';
import { Navigate, Outlet, } from 'react-router-dom';
import { getUserToken } from '../API/LocalStore';

const PrivateRoute = ({children }) => {
  const token = getUserToken();
  if (!token) {
    return <Navigate to="/login" state={{
          redirect_url: window.location.pathname
      }} replace />;
  }

  return <Outlet/>;
};

export default PrivateRoute;