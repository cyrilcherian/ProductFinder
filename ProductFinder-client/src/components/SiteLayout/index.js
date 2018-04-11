import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import GoogleSignIn from '../GoogleSignIn';
import AlexaListingPage from '../AlexaListingPage';
import ProductListingPage from '../ProductListingPage';

class SiteLayout extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'
            component={() => (<GoogleSignIn />)} />
          <Route path='/home'
            component={() => (<AlexaListingPage />)} />
          <Route path='/details/:id' component={() => (<ProductListingPage/>)} />
          <Route component={() => <Redirect to='/'/>}/>
        </Switch>
      </Router>
    );
  }
}

export default SiteLayout;
