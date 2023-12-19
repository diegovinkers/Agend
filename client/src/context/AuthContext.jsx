import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verityTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (userData, role) => {
    try {
      const res = await registerRequest(userData, role); 
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(Array.isArray(error.response.data) ? error.response.data : [error.response.data.message]);
    }
  };


  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch (error) {
      setErrors(Array.isArray(error.response.data) ? error.response.data : [error.response.data.message]);
    }
  };


  const logout = () =>{
    Cookies.remove("token");
    setIsAuthenticated(false)
    setUser(null)
  }
  useEffect(() => {
    if (errors.length > 0) {
      const errorTimer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(errorTimer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
    
      try {
        const res = await verityTokenRequest();
        if (res.data) {
          setIsAuthenticated(true);
          setUser(res.data.decodedToken); 
        } else {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  },[isAuthenticated]);
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
