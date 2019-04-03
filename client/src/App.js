import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorBoundary from "react-error-boundary";
import Navbar from "./component/navbar/navbar";
let Login = React.lazy(() => import("./component/login/login"));
let Product = React.lazy(() => import("./component/product/product"));
let Home = React.lazy(() => import("./component/home/home"));

class App extends Component {
  render() {
    return (
      <ErrorBoundary FallbackComponent={MyErrorBoundary}>
        <Router>
          <div className="Appp">
            <Navbar />
            <React.Suspense fallback={<h4>...Loading</h4>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/Product" component={Product} />
                <Route component={NoMatch} />
              </Switch>
            </React.Suspense>
          </div>
        </Router>
      </ErrorBoundary>
    );
  }
}

export default App;

function MyErrorBoundary({ componentStack, error }) {
  return (
    <>
      <h1>Oops! An Error occured!</h1>
      <h3>here is what we know....</h3>
      <p>
        <strong>Error:</strong> {error && error.toString()}
      </p>
      <p>
        <strong>StackTrace:</strong> {componentStack}
      </p>
    </>
  );
}

function NoMatch({ location }) {
  console.log("{ location } est : ", location);

  return (
    <>
      <h1>Oops! An URL not fond!</h1>
      <h3>here is what we know....</h3>
      <p>
        <strong>
          Error: {location["pathname"]}
          {location["hash"]}
        </strong>
      </p>
    </>
  );
}
