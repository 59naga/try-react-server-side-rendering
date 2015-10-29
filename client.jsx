// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router'

import routes from './client/routes.jsx'
import createBrowserHistory from 'history/lib/createBrowserHistory'

// Environment
process.env.IS_CLIENT= true
const history= createBrowserHistory()

// Boot
addEventListener('DOMContentLoaded',()=>{
  ReactDOM.render(
    <Router routes={routes} history={history} />,
    document.querySelector('main')
  )
})

// Don't publish(unavailable at node.js)
