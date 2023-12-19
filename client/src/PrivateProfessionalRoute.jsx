import { useContext } from "react"; 
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function PrivateProfessionalRoute() {
  const { loading, user, userVerify } = useContext(AuthContext); 

  if (loading) return <h1>Loading...</h1>;
  

  if (loading || !userVerify || userVerify.role !== "professional") return <Navigate to="/" replace />;

  return <Outlet />;
}

export default PrivateProfessionalRoute;
