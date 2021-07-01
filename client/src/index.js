import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
require('dotenv').config()

render((<BrowserRouter>
    <Switch>
      <Route path={process.env.REACT_APP_PUBLIC_URL + "/"} component={App} />
    </Switch>
</BrowserRouter>), document.getElementById('root'))
