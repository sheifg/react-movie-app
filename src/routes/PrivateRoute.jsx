import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const PrivateRoute = () => {
  const { currentUserTracking } = useAuth();

  const location = useLocation();
  console.log("LOCATION: ", location);
  // replace: to remove the details movie page from the history
  /* 
  ? The replace attribute in the <Navigate /> component is used to modify the browser's history stack. Specifically, when the navigation happens (in this case, redirecting to the /login page), the replace attribute ensures that the current entry in the history stack is replaced with the new one (/login).
  
  ? This means that the user won't be able to go back to the previous page by pressing the browser's back button because the previous entry is removed from the history stack.
  
  ? Without replace, the redirection would add a new entry to the history stack, allowing the user to go back to the previous page using the back button.
  */
  return currentUserTracking ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
