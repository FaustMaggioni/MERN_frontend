import React, {useState} from 'react'
import { Container} from '@material-ui/core'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import {BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

const App = () => {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    return (
        <Router>
        <Container maxwidth='lg'>
            <Navbar user={user} setUser={setUser}/>
            <Switch>
                <Route exact path='/'>
                    <Home user={user} setUser={setUser}></Home>
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
