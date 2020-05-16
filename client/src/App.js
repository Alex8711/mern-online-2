import React, { useState, useCallback } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./shared/components/Navbar";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Upload from "./upload/Upload";
import HomePage from "./home/HomePage";
import ProductDetail from "./productDetail/ProductDetail";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <div>
          <Navbar />
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/upload" component={Upload} />
              <Route
                exact
                path="/product/:productId"
                component={ProductDetail}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
