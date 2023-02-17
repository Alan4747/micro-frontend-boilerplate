import React, { lazy } from "react";
import "./App.scss";
const renderMFE = (MFE: React.FunctionComponent) => {
  return (
    <React.Suspense fallback="Loading...">
      <MFE />
    </React.Suspense>
  );
};
const LeftApp = lazy(() => import("left/App"));
const RightApp = lazy(() => import("right/App"));

function App() {
  return (
    <div className="app-product">
      <span className="app-product-title">Product App</span>
      <div className="app-product-sub-mfe">
      <>{renderMFE(LeftApp)}</>
      <>{renderMFE(RightApp)}</>
      </div>
      <div className="app-product-label">
        <span>Product</span>
      </div>
    </div>
  );
}

export default App;
