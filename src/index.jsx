// Dependencies
import React from 'react'

import finder from './actions/finder'
import result from './stores/result'
import {App,Home} from './views'

// Public
let routes= [
  {
    path: '/',
    component: App,

    indexRoute: {
      component: Home,
      onEnter: finder.summaries,
    },
    childRoutes: [
      {
        path: ':tag',
        component: Home,
        onEnter: finder.summaries,
      },
    ],
  },
]

export default routes
