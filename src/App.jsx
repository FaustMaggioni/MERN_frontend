import React from 'react'
import { Container} from '@material-ui/core'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import {BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

const App = () => {

    return (
        <Router>
        <Container maxwidth='lg'>
            <Navbar/>
            <Switch>
                <Route exact path='/'>
                    <Home></Home>
                </Route>
                <Route exact path={'/auth'}>
                    <Auth></Auth>
                </Route>
            </Switch>
        </Container>
        </Router>
    )
}

export default App
