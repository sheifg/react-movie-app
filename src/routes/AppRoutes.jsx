import { Route, Routes } from "react-router-dom";
import { Home, Login, MovieDetails, Register } from "../pages";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        {/* details page is a dynamic page, so we need the id. 
      details/:jane
      details/:id */}
        <Route path="/details/:id" element={<MovieDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
