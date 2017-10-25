import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import { Paper } from 'react-md'

@connect(state => ({
  user: state.user,
  db: state.db,
  config: state.config
}))
class FrontPage extends React.Component {
  render ({ user, db, config } = this.props) {
    return (
      <article>
        <Helmet title='Home' />
        <Paper zIndex={1}>
          <h1>Unslacker Web Companion</h1>
          <h6>Developer: Ryan Keller</h6>
        </Paper>
        <Paper zIndex={1}>
          <section>
            <h3>Database Client-Side Cache:</h3>
            <p>Any query data cached by Redux-Query</p>
            <code>{JSON.stringify(db)}</code>
          </section>
        </Paper>
        <Paper zIndex={1}>
          <section>
            <h3>User Data:</h3>
            <p>Auth data passed to the client</p>
            <code>{JSON.stringify(user)}</code>
          </section>
        </Paper>
        <Paper zIndex={1}>
          <section>
            <h3>Server-Loaded Site Config:</h3>
            <p>This is a pre-loaded document containing enumerations for the client side. Injected into the store as state.config</p>
            <code>{JSON.stringify(config)}</code>
          </section>
        </Paper>
      </article>
    )
  }
}

export default FrontPage
