import React from "react";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import { BouncingSprites } from "./component/ElasticCollisions/BouncingSprites";
import { GasSimulation } from "./component/ElasticCollisions/GasSimulation";
import { MazeMaker } from "./component/Maze/MazeMaker";
import { PlanetOrbit } from "./component/PlanetSimulation/PlanetOrbit";
import { RopeCtrl } from "./component/Rope/Rope";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path={"/bouncingSprites"}>
            <BouncingSprites />
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
            <div className="text-2xl mt-16">Links</div>
            <nav>
              <Link to="/bouncingSprites">
                <div className="hover:underline">Bouncing Sprites</div>
              </Link>
              <Link to="/gasSimulation">
                <div className="hover:underline">Ideal Gas Simulation</div>
              </Link>
              <Link to="/planetOrbit">
                <div className="hover:underline">Planet Orbit</div>
              </Link>
            </nav>
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
