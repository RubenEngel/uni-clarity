import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.scss';
import App from './App';
import PrivacyPolicy from "./PrivacyPolicy"
import Contact from "./Contact"
import TermsOfService from "./TermsOfService"
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from "react-router-dom"

ReactDOM.render(  
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/terms-of-service" component={TermsOfService} />
    </Switch>
  </BrowserRouter>
       
  ,document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()