import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// components
import Header from './components/header/header.jsx';
import Home from './components/home/home.jsx';
import Details from './components/details/details.jsx';

function App() {
  return (
    <div className="container">

      <Header />

      <BrowserRouter>
        <div>
            <Route exact path="/" component={Home}/>
            
          <Switch>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/details" component={Details}/>
          </Switch>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
