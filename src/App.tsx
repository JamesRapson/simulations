import React from "react";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import { BouncingBalls } from "./component/ElasticCollisions/BouncingBalls";
import { GasSimulation } from "./component/ElasticCollisions/GasSimulation";
import { MazeMaker } from "./component/Maze/MazeMaker";
import { PlanetOrbit } from "./component/PlanetSimulation/PlanetOrbit";
import { RopeCtrl } from "./component/Rope/Rope";

function App() {
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
          <Route path="/ropeSimulation">
            <RopeCtrl />
          </Route>
          <Route path="/maze">
            <MazeMaker />
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
              <Link to="/ropeSimulation">
                <p>Rope Simulation</p>
              </Link>
              <Link to="/maze">
                <p>Maze Maker</p>
              </Link>
            </nav>
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
