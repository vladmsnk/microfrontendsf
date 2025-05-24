import React, { Suspense, useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";

const ProfileApp = React.lazy(() => import("profile/src/components/App.js"));
const CardsApp = React.lazy(() => import("cards/src/components/App.js"));
const AuthApp = React.lazy(() => import("auth/src/components/App.js"));
const Footer = React.lazy(() => import("shared/src/components/Footer.js"));
const ProtectedRoute = React.lazy(() => import("auth/src/components/ProtectedRoute.js"));

import { CurrentUserContext } from '../../../shared/CurrentUserContext';
import api from '../../../shared/utils/api';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api
        .checkToken(token)
        .then((res) => {
          setCurrentUser(res.data);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router>
        <div className="host-container">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <ProtectedRoute
                path="/profile"
                component={ProfileApp}
                loggedIn={isLoggedIn}
              />

              <ProtectedRoute
                path="/cards"
                component={CardsApp}
                loggedIn={isLoggedIn}
              />

              <Route path="/auth">
                {isLoggedIn ? <Redirect to="/cards" /> : <AuthApp />}
              </Route>

              <Route exact path="/">
                {isLoggedIn ? <Redirect to="/cards" /> : <Redirect to="/auth/signin" />}
              </Route>
            </Switch>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;