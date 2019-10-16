import React from "react";

import loadable from "@loadable/component";
//import pMinDelay from 'p-min-delay';
//import { timeout } from 'promise-timeout';

import logo from "./logo.svg";
import "./App.scss";
import "whatwg-fetch";

import store from "./redux/store";
import { barActionCreator } from "./components/results/reducer";

/*
const WelcomeLoadable = loadable(() =>
    pMinDelay(timeout(import('./components/welcome/welcome'), 2000), 1000), {
    fallback: <div>Loading...</div>
});
*/

const ErrorBoundary = loadable(() =>
  import("./shared/error-boundaty/errorBoundary")
);
const WelcomeLoadable = loadable(() => import("./components/welcome/welcome"));
const PrefetchLoadable = loadable(() =>
  import(/* webpackPrefetch: true */ "./components/welcome/welcome-prefetch")
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPrefetchLoadable: null
    };
  }
  componentDidMount() {
    this.loadingButton = document.querySelector(".loading");
    store.subscribe(() => {
      this.store = store.getState();
      if (this.store["barReducer"]["isPending"] === false) {
        this.loadingButton.innerHTML = null;
      }
    });
  }
  handleClick = () => {
    this.loadingButton.innerHTML = "Loading...";
    store.dispatch(barActionCreator());
    /*
        import('./modules/aModule')
            .then(({ moduleA }) => {
                console.log("imported")
            })
            .catch(err => {
                console.log("err")
            });
     */
    this.setState({ showPrefetchLoadable: "show" });
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <ErrorBoundary>
              <WelcomeLoadable />
            </ErrorBoundary>
            {this.state.showPrefetchLoadable && (
              <ErrorBoundary>
                <PrefetchLoadable className={this.state.showPrefetchLoadable} />
              </ErrorBoundary>
            )}
            <button
              onClick={this.handleClick}
              onMouseOver={() => PrefetchLoadable.preload()}
            >
              Click me
            </button>
            <div className="loading" />
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </React.Fragment>
    );
  }
}
