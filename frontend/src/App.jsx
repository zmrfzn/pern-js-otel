import React, { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import viteLogo from '/vite.svg'
import './App.css'

//stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  

//components 
import TutorialsList from "./components/TutorialsList";
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import Published from "./components/Published";
import PageNotFound from "./components/PageNotFound";

function App() {
  
  const location = useLocation();

  useEffect(() => {
    // console.log(`Entered anon -> ${window.newrelic}`)
    // window.newrelic.addPageAction('navigation', { path: location.pathname })

  }, [location]);

  return (
    <>
  <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
        <img src={viteLogo} alt="Vite logo" height={40}/>
          <span className="pl-1">React App</span>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/published"} className="nav-link">
              Published Tutorials
            </Link>
          </li>
        </div>
      </nav>

      <div className="container-fluid mt-3">
        <Routes>
          <Route path="/" element={<TutorialsList />} />
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/published" element={<Published />} />
          <Route path="/add" element={<AddTutorial />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />
          <Route path="*" element={<PageNotFound />}/>
          <Route path="/404/:id" element={<PageNotFound />}/>
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App
