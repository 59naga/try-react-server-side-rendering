// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router'

import routes from './src'
import createBrowserHistory from 'history/lib/createBrowserHistory'

// Environment
process.env.IS_CLIENT= true
const history= createBrowserHistory()

// Boot
addEventListener('DOMContentLoaded',()=>{
  ReactDOM.render(
    <Router routes={routes} history={history}  />,
    document.querySelector('main')
  )
})
