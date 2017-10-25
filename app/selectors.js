import { createSelector } from 'reselect'
/*
https://hackernoon.com/usage-of-reselect-in-a-react-redux-application-fcdca05cc00d
http://engineering.blogfoster.com/managing-complexity-in-redux-higher-order-reducers-and-async-state/
https://docs.mobify.com/progressive-web/0.15.0/guides/reselect/
*/

/*
BASE SELECTORS
*/
const select = {
  user: ({ user }) => user || {},
  config: ({ config }) => config || {}
}

/*
MEMOIZED SELECTORS (RESELECT)
*/

/*
SORTATION FUNCTIONS
*/
