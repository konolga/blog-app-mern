import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home'
import Signup from './user/Signup'


const MainRouter =()=>(
    <div>
        <Switch>
            <Route path="/signup" component = {Signup} />
            <Route path="/" component = {Home} />
            
        </Switch>
    </div>
);

export default MainRouter;