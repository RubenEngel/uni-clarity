import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './css/styles.css';
import App from './App';
import Home from './Home'


ReactDOM.render(

  <Router>

    <Switch>

      <Route path="/" exact component={Home} />
      <Route path="/app" component={App} />

    </Switch>

  </Router>
    

  ,document.getElementById('root')
);
