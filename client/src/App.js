import React, { useState, useCallback, useEffect } from "react";
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

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);

    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem("userData"));
    if (storeData && storeData.token) {
      login(storeData.userId, storeData.token);
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <div>
          <Navbar />
          <div style={{ marginTop: "20px" }}>
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
              <Route exact path="/cart" component={Cart} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
