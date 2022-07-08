import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  status: "",
  isLoggedIn: false,
  login: (token, userId, status) => {},
  logout: () => {},
});

let logoutTimer;

//This function will get the timestamp in milliseconds
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime; //note this will be a negative value
  return remainingDuration;
};

const tokenRemainingExpirationTime = () => {
  const storedToken = localStorage.getItem("token");
  const storedTokenExpirationTime = localStorage.getItem("tokenExpirationTime");
  const storedStatus = localStorage.getItem("status");
  const storedUserId = localStorage.getItem("userId");

  const tokenRemainingTime = calculateRemainingTime(storedTokenExpirationTime);

  if (tokenRemainingTime <= 3600000) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpirationTime");
    localStorage.removeItem("userId");
    localStorage.removeItem("status");
    return null;
  }

  return {
    token: storedToken,
    tokenTimeLeftBeforeExpiration: tokenRemainingTime,
    status: storedStatus,
    userId: storedUserId,
  };
};

export const AuthContextProvider = (props) => {
  const tokenDetails = tokenRemainingExpirationTime();

  let existingToken;
  let existingId;
  let existingStatus;
  if (tokenDetails) {
    existingToken = tokenDetails.token;
    existingId = tokenDetails.userId;
    existingStatus = tokenDetails.status;
  }

  const [token, setToken] = useState(existingToken);
  const [userId, setUserId] = useState(existingId);
  const [status, setStatus] = useState(existingStatus);
  const navigate = useNavigate();

  const userIsLoggedIn = !!token; //the !! converts a string to boolean
  const isAdmin = !!token && status === "admin";

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    setStatus(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpirationTime");
    localStorage.removeItem("status");
    navigate("/", { replace: true });
    window.location.reload(false);

    if (logoutTimer) {
      clearInterval(logoutTimer);
    }
  }, [navigate]);

  const logInHandler = (token, userId, status) => {
    const tokenExpiresIn = new Date(new Date().getTime() + 172800000); //2 days from time in milliseconds

    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpirationTime", tokenExpiresIn);
    localStorage.setItem("status", status);
    localStorage.setItem("userId", userId);

    const tokenRemainingTimeBeforeExpiration = calculateRemainingTime(
      tokenExpiresIn.toISOString() //will be converted to a date object by calculateRemaining time
    );

    setToken(token);
    setUserId(userId);
    setStatus(status);

    logoutTimer = setTimeout(logoutHandler, tokenRemainingTimeBeforeExpiration); //this timeout will be cleared if the user logs out manually
  };

  useEffect(() => {
    if (tokenDetails) {
      logoutTimer = setTimeout(
        logoutHandler,
        tokenDetails.tokenTimeLeftBeforeExpiration
      );
    }
  }, [tokenDetails, logoutHandler]);

  const contextValue = {
    token: token,
    admin: isAdmin,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
