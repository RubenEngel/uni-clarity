import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.scss';
import App from './App';
import PrivacyPolicy from './PrivacyPolicy';
import Contact from './Contact';
import About from './About';
import TermsOfService from './TermsOfService';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
// import { motion, AnimatePresence } from 'framer-motion';

function Index() {
  // const location = useLocation();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Route
        render={({ location }) => (
          // <AnimatePresence>
          <Switch>
            {/* <Route exact path */}
            {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              > */}
            <Route exact path="/" component={App} />
            {/* </motion.div> */}
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/terms-of-service" component={TermsOfService} />
          </Switch>
          // </AnimatePresence>
        )}
      ></Route>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
