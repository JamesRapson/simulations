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
            <div className="m-auto text-center ">
              <div className="text-2xl mt-16">Yallambee NET</div>
              <nav>
                <div className="flex flex-wrap p-10">

                <Link to="/maze">
                  <div className="w-96 m-6 block rounded-lg bg-gray-200 p-6 hover:bg-gray-300">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 hover:underline">
                        Make Maker
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      Make a Maze
                    </p>
                  </div>
                </Link>

                <Link to="/bouncingSprites">
                  <div className="w-96 m-6 block rounded-lg bg-gray-200 p-6 hover:bg-gray-300">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 hover:underline">
                        Bouncing Sprites
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      This is a fun little program that replicates a Raster interupt bouncing sprite program I wrote as a kid on my C64 in assembler
                    </p>
                  </div>
                </Link>

                <Link to="/gasSimulation">
                  <div className="w-96 m-6 block rounded-lg bg-gray-200 p-6 hover:bg-gray-300">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 hover:underline">
                    Ideal Gas Simulation
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    A simulation of an idea gas that uses classic newtonian mechanics to model how gas molecules interact
                    </p>
                  </div>
                </Link>

                <Link to="/planetOrbit">
                  <div className="w-96 m-6 block rounded-lg bg-gray-200 p-6 hover:bg-gray-300">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 hover:underline">
                    Planet Orbit
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    A simulation of Planet Orbits using Newtonian mechanics (non Relativity)
                    </p>
                  </div>
                </Link>

                <a href="http://chess.yallambee.net/">
                  <div className="w-96 m-6 block rounded-lg bg-gray-200 p-6 hover:bg-gray-300">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 hover:underline">
                    Chess game
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    My implementation of a Chess UI. Sorry cant load/save a game yet
                    </p>
                  </div>
                </a>

                <a href="http://game-of-life.yallambee.net/">
                  <div className="w-96 m-6 block rounded-lg bg-gray-200 p-6 hover:bg-gray-300">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 hover:underline">
                    Game of Life
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    I have always wanted to implement a version of the classic game of life. 
                    </p>
                  </div>
                </a>              
                </div>
              </nav>
            </div>
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
