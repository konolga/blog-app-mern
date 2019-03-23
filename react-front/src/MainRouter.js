import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'


const MainRouter =()=>(
    <div>
        <Switch>
            <Route path="/signup" component = {Signup} />
            <Route path="/signin" component = {Signin} />
            <Route path="/" component = {Home} />
            
        </Switch>
    </div>
);

export default MainRouter;