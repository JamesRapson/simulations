import React from "react";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import { BouncingBalls } from "./component/BouncingBalls";
import { GasSimulation } from "./component/GasSimulation";
import { PlanetOrbit } from "./component/PlanetSimulation/PlanetOrbit";

function App() {
  //const sprites = createSpritesFromList();

  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path={"/bouncingBalls"}>
            <BouncingBalls />
          </Route>
          <Route path="/gasSimulation">
            <GasSimulation />
          </Route>
          <Route path="/planetOrbit">
            <PlanetOrbit />
          </Route>

          <Route path="/">
            <div className="text-2xl">Links</div>
            <nav>
              <Link to="/bouncingBalls">
                <p>Bouncing Balls</p>
              </Link>
              <Link to="/gasSimulation">
                <p>Gas Simulation</p>
              </Link>
              <Link to="/planetOrbit">
                <p>Planet Orbit</p>
              </Link>
            </nav>
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
