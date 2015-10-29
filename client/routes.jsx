// Dependencies
import finder from './actions/finder'

import {App,Home} from './views'

// Public
const routes= [
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
