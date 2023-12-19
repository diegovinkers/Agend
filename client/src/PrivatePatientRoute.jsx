import { useContext } from "react"; 
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";


function PrivatePatientRoute() {
  const { loading, user, userVerify } = useContext(AuthContext); 

  if (loading) return <h1>Loading...</h1>;
  

  if (loading || !userVerify || userVerify.role !== "patient") return <Navigate to="/" replace />;

  return <Outlet />;
}

export default PrivatePatientRoute;