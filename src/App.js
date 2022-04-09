import React from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateEmail from './CreateEmail';
import Dashboard from './Dashboard'
import { emails } from './emails';
import Login from './Login';


const App = () => {
    localStorage.setItem('emails', JSON.stringify(emails));
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => (<Redirect to='/dashboard' />)} />
                    <Route path="/dashboard" render={(props) => (localStorage.getItem('isLoggedIn')
                        ? <Dashboard {...props} /> : <Redirect to='/login' />)} />
                    <Route path="/login" render={(props) => (!localStorage.getItem('isLoggedIn')
                        ? <Login {...props} /> : <Redirect to='/' />)} />
                     <Route path="/compose" render={(props) => (localStorage.getItem('isLoggedIn')
                        ? <CreateEmail {...props} /> : <Redirect to='/login' />)} />
                    
                </Switch>
            </Router>
        </div>
    )
}

export default App;