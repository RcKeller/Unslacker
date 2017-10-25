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
          <h1>T-Mobile Boilerplate</h1>
          <h6>Developer: Ryan Keller</h6>
          <section>
            <h3>User Data:</h3>
            <code>{JSON.stringify(user)}</code>
          </section>
          <section>
            <h3>Database Client-Side Cache:</h3>
            <code>{JSON.stringify(db)}</code>
          </section>
          <section>
            <h3>Server-Loaded Config:</h3>
            <code>{JSON.stringify(config)}</code>
          </section>
        </Paper>
      </article>
    )
  }
}

export default FrontPage
