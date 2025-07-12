import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
 
  return children;
};

export default PrivateRoute;
