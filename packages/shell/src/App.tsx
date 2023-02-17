import React, { lazy } from "react";
import "./App.scss";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const renderMFE = (MFE: React.FunctionComponent) => {
  return (
    <React.Suspense fallback="Loading...">
      <MFE />
    </React.Suspense>
  );
};
const ProductApp = lazy(() => import("product/App"));
const UserApp = lazy(() => import("user/App"));

function App() {
  return (
    <Router>
      <div className="app">
        <div>
          <Header />
        </div>
        <React.Suspense fallback="Loading...">
          <Switch>
            <Route exact path="/">
              <Redirect to="product" />
            </Route>
            <Route path="/product" render={() => renderMFE(ProductApp)} />
            <Route path="/user" render={() => renderMFE(UserApp)} />
          </Switch>
        </React.Suspense>
        <div className="app-label">
          <span>Shell</span>
        </div>
      </div>
    </Router>
  );
}

export default App;
