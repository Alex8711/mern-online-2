import React, { useState, useCallback } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./shared/components/Navbar";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Upload from "./upload/Upload";
import HomePage from "./home/HomePage";
import ProductDetail from "./productDetail/ProductDetail";
import Cart from "./cart/Cart";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const login = useCallback((uid, token, user) => {
    setToken(token);
    setUserId(uid);
    setUser(user);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        user: user,
        login: login,
        logout: logout,
      }}
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
              <Route exact path="/:userId/cart" component={Cart} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
