import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import '@elastic/eui/dist/eui_theme_light.css'
require('dotenv').config()

render((<BrowserRouter>
    <Switch>
      <Route component={App} />
    </Switch>
</BrowserRouter>), document.getElementById('root'))
