import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import { Dashboard } from './dashboard'

export const MainComponent = () => {
    return (
        <>
            <Switch>
            <Route exact path="/"><Redirect to="/search" /></Route>
            <Route exact path="/search" component={Dashboard} />
            </Switch>
        </>
    )
}
